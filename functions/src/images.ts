import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getStorage } from "firebase-admin/storage";

function requireAdmin(auth: any) {
    if (!auth || auth.token.email !== process.env.ADMIN_EMAIL) {
        throw new HttpsError("permission-denied", "Not authorised");
    }
}

// Returns a signed URL the client uploads to directly
export const getImageUploadUrl = onCall(async (req) => {
    requireAdmin(req.auth);
    const { filename, contentType } = req.data as {
        filename: string;
        contentType: string;
    };

    const bucket = getStorage().bucket();
    const path = `blog/${Date.now()}-${filename}`;
    const file = bucket.file(path);

    const [signedUrl] = await file.getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000,
        contentType,
    });

    // Public read URL (once uploaded)
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${path}`;
    return { signedUrl, publicUrl, path };
});

// Delete an image by its storage path
export const deleteImage = onCall(async (req) => {
    requireAdmin(req.auth);
    const { path } = req.data as { path: string };
    await getStorage().bucket().file(path).delete();
    return { success: true };
});
