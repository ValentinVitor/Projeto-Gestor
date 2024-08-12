import { taskRead } from "@/app/dashboard/modelingTaskNotes.mjs"
import { NextResponse } from "next/server"

export async function GET() {
    const data = await taskRead();
    return NextResponse.json(data);
};