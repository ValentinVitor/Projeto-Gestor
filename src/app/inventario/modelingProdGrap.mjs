import conexao from '../dataBaseProdutos.mjs';
import { format } from 'date-fns';

export async function lerInvProds() {
    const conexaoDB = await conexao();
    const [data] = await conexaoDB.query('SELECT * FROM cadastro');
    console.log("Resultados da busca:", data);
    // Formatar datas
    const formattedData = data.map(item => ({
        ...item,
        data_compra: item.data_compra ? format(new Date(item.data_compra), 'yyyy-MM-dd') : null,
        validade: item.validade ? format(new Date(item.validade), 'yyyy-MM-dd') : null
    }));

    return formattedData;
};