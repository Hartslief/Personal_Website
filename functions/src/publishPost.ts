import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { initializeApp, getApps } from "firebase-admin/app";
import type { PostPayload } from "./types";

if (!getApps().length) initializeApp();

const db = getFirestore();
const adminEmail = defineSecret("ADMIN_EMAIL");

export const publishPost = onCall({ secrets: [adminEmail] }, async (req) => {
    // Auth check — only you can call this
    if (!req.auth) {
        throw new HttpsError("unauthenticated", "Login required");
    }
    if (req.auth.token.email !== adminEmail.value()) {
        throw new HttpsError("permission-denied", "Not authorised");
    }

    const { post, images } = req.data as PostPayload;
    const bucket = getStorage().bucket();
    const postsRef = db.collection("posts");

    // Upload images to Storage, collect their public URLs
    const imageMap: Record<string, string> = {};

    await Promise.all(
        images.map(async (img) => {
            const storagePath = `blog/${post.slug}/${img.filename}`;
            const file = bucket.file(storagePath);
            const buffer = Buffer.from(img.data, "base64");

            await file.save(buffer, {
                metadata: { contentType: img.contentType },
                public: true,
            });

            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;
            imageMap[img.filename] = publicUrl;
        }),
    );

    // Swap local image filenames in content with real Storage URLs
    let content = post.content;
    for (const [filename, url] of Object.entries(imageMap)) {
        content = content.replace(filename, url);
    }

    // Same for coverImageUrl if it references a local filename
    const coverImageUrl = post.coverImageUrl
        ? (imageMap[post.coverImageUrl] ?? post.coverImageUrl)
        : undefined;

    // Check if post with this slug already exists (update vs create)
    const existing = await postsRef
        .where("slug", "==", post.slug)
        .limit(1)
        .get();

    if (!existing.empty) {
        // Update existing post
        await existing.docs[0].ref.update({
            ...post,
            content,
            coverImageUrl,
            updatedAt: FieldValue.serverTimestamp(),
        });
        return { id: existing.docs[0].id, action: "updated" };
    }

    // Create new post
    const ref = await postsRef.add({
        ...post,
        content,
        coverImageUrl,
        publishedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
    });

    return { id: ref.id, action: "created" };
});
