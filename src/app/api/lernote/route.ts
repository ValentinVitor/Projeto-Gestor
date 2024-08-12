import { noteRead } from "@/app/dashboard/modelingTaskNotes.mjs";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await noteRead();
  return NextResponse.json(data);
};