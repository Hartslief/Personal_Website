import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps } from "firebase-admin/app";
import type { Post } from "./types";

if (!getApps().length) initializeApp();
const db = getFirestore();
const postsRef = db.collection("posts");

export const getPosts = onCall(async () => {
    const snap = await postsRef
        .where("draft", "==", false)
        .orderBy("publishedAt", "desc")
        .get();

    return snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        publishedAt: d.data().publishedAt?.toDate().toISOString() ?? null,
        updatedAt: d.data().updatedAt?.toDate().toISOString() ?? null,
    })) as Post[];
});

export const getPost = onCall(async (req) => {
    const { slug } = req.data as { slug: string };
    if (!slug) throw new HttpsError("invalid-argument", "Slug is required");

    const snap = await postsRef
        .where("slug", "==", slug)
        .where("draft", "==", false)
        .limit(1)
        .get();

    if (snap.empty) throw new HttpsError("not-found", "Post not found");

    const d = snap.docs[0];
    return {
        id: d.id,
        ...d.data(),
        publishedAt: d.data().publishedAt?.toDate().toISOString() ?? null,
        updatedAt: d.data().updatedAt?.toDate().toISOString() ?? null,
    } as Post;
});
