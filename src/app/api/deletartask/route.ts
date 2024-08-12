import { taskDelete } from "@/app/dashboard/modelingTaskNotes.mjs";
import { NextResponse } from "next/server";

export async function DELETE(req: any) {
try {  
    const { text } = await req.json();
    await taskDelete(text);
    return NextResponse.json({ success: true });
} catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
}
};