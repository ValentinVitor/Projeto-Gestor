import { lerInvProds } from '../../inventario/modelingProdGrap.mjs'
import { NextResponse } from "next/server";

export async function GET() {
  const data = await lerInvProds();
  return NextResponse.json(data);
};