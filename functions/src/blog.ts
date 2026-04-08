import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { initializeApp, getApps } from "firebase-admin/app";
import type { Post } from "../../app/types/blog";

if (!getApps().length) initializeApp();
const db = getFirestore();
const postsRef = db.collection("posts");

// Helper: ensure caller is authenticated admin
function requireAdmin(
    auth: { uid: string; token: { email?: string } } | undefined,
) {
    if (!auth) throw new HttpsError("unauthenticated", "Login required");
    if (auth.token.email !== process.env.ADMIN_EMAIL) {
        throw new HttpsError("permission-denied", "Not authorised");
    }
}

export const getPosts = onCall(async (req) => {
    const includeDrafts =
        !!req.auth && req.auth.token.email === process.env.ADMIN_EMAIL;
    let query = postsRef.orderBy("publishedAt", "desc");
    if (!includeDrafts) query = query.where("draft", "==", false) as any;
    const snap = await query.get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
});

export const getPost = onCall(async (req) => {
    const { slug } = req.data as { slug: string };
    const snap = await postsRef.where("slug", "==", slug).limit(1).get();
    if (snap.empty) throw new HttpsError("not-found", "Post not found");
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
});

export const createPost = onCall(async (req) => {
    requireAdmin(req.auth);
    const data = req.data as Omit<Post, "id">;
    // Check slug uniqueness
    const existing = await postsRef.where("slug", "==", data.slug).get();
    if (!existing.empty)
        throw new HttpsError("already-exists", "Slug already taken");
    const ref = await postsRef.add({
        ...data,
        publishedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
    });
    return { id: ref.id };
});

export const updatePost = onCall(async (req) => {
    requireAdmin(req.auth);
    const { id, ...data } = req.data as Partial<Post> & { id: string };
    await postsRef
        .doc(id)
        .update({ ...data, updatedAt: FieldValue.serverTimestamp() });
    return { success: true };
});

export const deletePost = onCall(async (req) => {
    requireAdmin(req.auth);
    const { id } = req.data as { id: string };
    await postsRef.doc(id).delete();
    return { success: true };
});
