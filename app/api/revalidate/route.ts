import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { secret, slug } = await req.json();

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    revalidatePath("/blog");
    if (slug) revalidatePath(`/blog/${slug}`);

    return NextResponse.json({ revalidated: true });
}
