export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImageUrl?: string;
    coverImagePath?: string;
    images: {
        path: string;
        url: string;
    }[];
    tags: string[];
    draft: boolean;
    publishedAt: string;
    updatedAt: string;
}

export interface PostPayload {
    post: Omit<Post, "id" | "publishedAt" | "updatedAt">;
    images: {
        filename: string;
        data: string;
        contentType: string;
    }[];
}
