// Obtém o cliente
import mysql from 'mysql2/promise';

export default async function conexao() {
// Cria a conexão com o Banco de Dados
const connectionProd = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cadastroprodutos',
});
  return connectionProd;
};
