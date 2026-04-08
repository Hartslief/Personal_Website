export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImageUrl?: string;
    coverImagePath?: string;
    tags: string[];
    draft: boolean;
    publishedAt: string;
    updatedAt: string;
}
