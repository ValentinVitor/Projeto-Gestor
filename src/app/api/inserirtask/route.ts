import { taskInsert } from "@/app/dashboard/modelingTaskNotes.mjs";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    const data = await req.json();
    const result = await taskInsert(data);
    return NextResponse.json({message: 'Rota e função de inserir task chamada! Sucesso!', result});
    
};