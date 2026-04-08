import { onDocumentWritten } from "firebase-functions/v2/firestore";

export const revalidateOnPostChange = onDocumentWritten(
    "posts/{postId}",
    async (event) => {
        const postId = event.params.postId;
        // Call Next.js revalidation API
        await fetch(
            `https://calebhartslief.co.za/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=/blog/${postId}`,
        );
    },
);
