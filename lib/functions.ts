import { getFunctions, httpsCallable } from "firebase/functions";
import type { Post } from "@/types/blog";
import { app } from "@/app/utils/firebase.browser";

const functions = getFunctions(app);

export const getPostsFn = httpsCallable<void, Post[]>(functions, "getPosts");
export const getPostFn = httpsCallable<{ slug: string }, Post>(
    functions,
    "getPost",
);
