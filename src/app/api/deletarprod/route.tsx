import { deletar } from "@/app/cadastro/modelingCads.mjs";
import { NextResponse } from "next/server";

export async function DELETE(req: any) {
    try {
      const { id } = await req.json();
      await deletar(id);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message });
    };
  };