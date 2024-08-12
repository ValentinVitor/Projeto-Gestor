import { criarProd } from '../../cadastro/modelingCads.mjs';
import { criarProd2 } from '../../cadastro/controle.mjs';
import { NextApiRequest, NextApiResponse } from "next";

/*export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Requisição recebida:", req.method, req.body); // Log da requisição recebida
    if (req.method === 'POST') {
      const data = req.body;
      try {
        const result = await criarProd(data); // Esperar a conclusão da inserção no banco de dados
        console.log("Resultado da criação:", result);
        res.status(200).json({ message: 'Produto inserido com sucesso' });
      } catch (error) {
        console.error("Erro ao inserir produto:", error);
        res.status(500).json({ error: 'Erro ao inserir produto' });
      }
    } else {
      res.status(405).json({ error: 'Método não permitido' });
    }
}*/


import { NextResponse } from "next/server";
import conexao from '@/app/dataBaseProdutos.mjs';

export async function POST(req:any) {
  const data = await req.json()
  const result = await criarProd(data)
  return NextResponse.json({ message: "Rota e função de controle chamada! Sucesso!", result, });
}

/*export async function GET() {
  const data = await lerProds()
  return NextResponse.json({ message: "Rota e função de controle chamada! Sucesso!", data, });
}*/

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