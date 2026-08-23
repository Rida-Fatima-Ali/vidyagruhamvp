import { NextResponse } from "next/server";
import { mvpDb } from "@/lib/supabase/database";

export async function GET() {
  try {
    const requests = mvpDb.getCoverRequests();
    return NextResponse.json({ success: true, requests });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch cover requests." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // Action 1: Create a new cover request
    if (action === "create" || !action) {
      const { facultyId, subjectId, date, startTime, endTime, room, reason } = body;
      if (!subjectId || !date || !startTime || !endTime || !room || !reason) {
        return NextResponse.json(
          { error: "All fields (subject, date, time, room, reason) are required." },
          { status: 400 }
        );
      }

      const newReq = mvpDb.createCoverRequest({
        facultyId: facultyId || "fac-rec-001",
        subjectId,
        date,
        startTime,
        endTime,
        room,
        reason,
      });

      return NextResponse.json({ success: true, request: newReq }, { status: 201 });
    }

    // Action 2: Accept an open cover request
    if (action === "accept") {
      const { requestId, acceptingFacultyId } = body;
      if (!requestId) {
        return NextResponse.json({ error: "requestId is required." }, { status: 400 });
      }

      const result = mvpDb.acceptCoverRequest(
        requestId,
        acceptingFacultyId || "fac-rec-004"
      );

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        message: "Cover request accepted successfully.",
        request: result.request,
      });
    }

    return NextResponse.json({ error: "Invalid action specified." }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process cover request." }, { status: 500 });
  }
}
