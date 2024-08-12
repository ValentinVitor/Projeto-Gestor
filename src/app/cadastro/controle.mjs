import { criarProd, deletarProd } from "./modelingCads.mjs";



export async function criarProd2(req, res) {
    try {
        const prod = await criarProd(req.body);
        res.status(201).json({ message: "Sucesso ao cadastrar produto!"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};
/*
export async function deletarProd2(req, res) {
    try {
        const prod = await deletarProd(req.params.id);
        if (!prod) {
            return res.status(404).json({ message: 'Não foi possível encontrar o produto :( ' });
        }
        res.status(200).json({ message: 'Apagado do sistema com sucesso :) ' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};
*/