import conexao from '../dataBaseProdutos.mjs';

export async function taskInsert(data) {
    const conexaoDB = await conexao();
    const [reqTask] = await conexaoDB.query('INSERT INTO tasks (text, completed) VALUES (?, ?)', [data.text, data.completed]);
    return reqTask;
};

export async function taskRead() {
    const conexaoDB = await conexao();
    const [resTask] = await conexaoDB.query('SELECT * FROM tasks');
    return resTask;
};

export async function taskDelete(text) {
    const conexaoDB = await conexao();
    await conexaoDB.query('DELETE FROM tasks WHERE text = ?', [text]);
};

export async function noteInsert(data) {
    const conexaoDB = await conexao();
    const reqNote = await conexaoDB.query('INSERT INTO notes (text) VALUES (?)', [data.text]);
    return reqNote;
};

export async function noteRead() {
    const conexaoDB = await conexao();
    const [resNote] = await conexaoDB.query('SELECT * FROM notes');
    return resNote;
};

export async function noteDelete(text) {
    const conexaoDB = await conexao();
    await conexaoDB.query('DELETE FROM notes WHERE text = ?', [text]);
};