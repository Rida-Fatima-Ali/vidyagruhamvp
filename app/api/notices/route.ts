import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";

export async function GET() {
  try {
    const notices = mvpDb.getNotices();
    return NextResponse.json({ success: true, notices });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch notices." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, priority, authorName } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const newNotice = mvpDb.createNotice({
      title,
      content,
      priority: priority || "normal",
      authorName: authorName || "System Administrator",
    });

    return NextResponse.json(
      { success: true, message: "Notice published successfully.", notice: newNotice },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Failed to publish notice." }, { status: 500 });
  }
}
