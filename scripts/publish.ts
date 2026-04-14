import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import type { PostPayload } from "../types/blog";

// ─── Firebase config (client SDK — safe to have locally) ───────────────────
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app, "us-central1");

// ─── Helpers ────────────────────────────────────────────────────────────────
const SUPPORTED_IMAGE_TYPES: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
};

function encodeImage(filePath: string) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = SUPPORTED_IMAGE_TYPES[ext];
    if (!contentType) throw new Error(`Unsupported image type: ${ext}`);
    const data = fs.readFileSync(filePath).toString("base64");
    return { data, contentType };
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
    const postDir = process.argv[2];
    if (!postDir) {
        console.error("Usage: npm run publish <path-to-post-folder>");
        process.exit(1);
    }

    const mdPath = path.join(postDir, "index.md");
    if (!fs.existsSync(mdPath)) {
        console.error(`No index.md found in ${postDir}`);
        process.exit(1);
    }

    // Parse frontmatter + markdown
    const raw = fs.readFileSync(mdPath, "utf-8");
    const { data: frontmatter, content: mdContent } = matter(raw);

    const required = ["title", "slug", "excerpt", "tags"];
    for (const field of required) {
        if (!frontmatter[field]) {
            console.error(`Missing required frontmatter field: ${field}`);
            process.exit(1);
        }
    }

    const htmlContent = await marked(mdContent);

    // Collect all images in the post folder
    const files = fs.readdirSync(postDir);
    const imageFiles = files.filter((f) =>
        Object.keys(SUPPORTED_IMAGE_TYPES).includes(
            path.extname(f).toLowerCase(),
        ),
    );

    const images = imageFiles.map((filename) => ({
        filename,
        ...encodeImage(path.join(postDir, filename)),
    }));

    console.log(`📝 Post: ${frontmatter.title}`);
    console.log(`🖼  Images found: ${images.length}`);
    console.log(`📌 Draft: ${frontmatter.draft ?? false}`);

    // Sign in to Firebase so the callable function accepts the request
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment");
        process.exit(1);
    }

    console.log("🔐 Signing in...");
    await signInWithEmailAndPassword(auth, email, password);

    // Call the Firebase Function
    const publishPost = httpsCallable<
        PostPayload,
        { id: string; action: string }
    >(functions, "publishPost");

    console.log("🚀 Publishing...");
    const { data } = await publishPost({
        post: {
            title: frontmatter.title,
            slug: frontmatter.slug,
            excerpt: frontmatter.excerpt,
            content: htmlContent,
            coverImageUrl: frontmatter.coverImage ?? undefined,
            images: [],
            tags: frontmatter.tags,
            draft: frontmatter.draft ?? false,
        },
        images,
    });

    console.log(`✅ Post ${data.action}: ${data.id}`);
}

main().catch((err) => {
    console.error("❌ Failed:", err.message);
    process.exit(1);
});
