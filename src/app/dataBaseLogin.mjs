// Obtém o cliente
import mysql from 'mysql2/promise';

// Cria a conexão com o Banco de Dados
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Login',
});

connection.connect(err => { 
  if (err) {
      console.error("Erro ao conectar ao bancos de dados de LOGIN:", err);
      return;
  } else {
      console.log("Conexão bem sucedida com o banco de dados de LOGIN!");
  }
});

export default connection;