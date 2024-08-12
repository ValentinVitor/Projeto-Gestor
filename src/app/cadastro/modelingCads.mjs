import conexao from '../dataBaseProdutos.mjs';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export async function criarProd(data) {
    const conexaoDB = await conexao();
    console.log("Dados a serem inseridos:", data);
    const [result] = await conexaoDB.query('INSERT INTO cadastro (categoria, nome, marca, quantidade, valor_total, data_compra, validade) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [data.categoria, data.nome, data.marca, data.quantidade, data.valor_total, data.data_compra, data.validade]);
    console.log("Resultado da inserção:", result);
    return { id: result.insertId, ...data };
};

export async function lerProds() {
    const conexaoDB = await conexao();
    const [data] = await conexaoDB.query('SELECT * FROM cadastro');
    console.log("Resultados da busca:", data);
    // Formatar datas
    const formattedData = data.map(item => ({
        ...item,
        data_compra: item.data_compra ? format(new Date(item.data_compra), 'dd/MM/yyyy', { locale: ptBR }) : null,
        validade: item.validade ? format(new Date(item.validade), 'dd/MM/yyyy', { locale: ptBR }) : null
    }));

    return formattedData;
};

export async function deletar(id) {
    const conexaoDB = await conexao();
    await conexaoDB.query('DELETE FROM cadastro WHERE id = ?', [id]);
};
