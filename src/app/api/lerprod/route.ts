import { lerProds } from '../../cadastro/modelingCads.mjs';
import { NextResponse } from "next/server";

export async function GET() {
  const data = await lerProds();
  return NextResponse.json(data);
};
/*export async function GET(req:any, res:any) {
  if (req.method === 'GET') {
      try {
          const conexaoDB = await conexao();
          const [rows] = await conexaoDB.query('SELECT * FROM cadastro');
          conexaoDB.end();
          res.status(200).json(rows); // Certifique-se de retornar um array de produtos
      } catch (error) {
          res.status(500).json({ message: error });
      }
  } else {
      res.status(405).end(); // Método não permitido
  }
}*/