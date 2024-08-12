Este é um projeto Next.js criado com `create-next-app`.

## Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

## Instalação

1. Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd Projeto-Gestor-PAC
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:
    ```plaintext
    DATABASE_HOST=<seu_host>
    DATABASE_USER=<seu_usuario>
    DATABASE_PASSWORD=<sua_senha>
    DATABASE_NAME=<seu_banco_de_dados>
    ```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`

Inicia o servidor de desenvolvimento.

Abra [http://localhost:3000](http://localhost:3000) para ver o resultado no navegador.

### `npm run build`

Compila o aplicativo para produção.

### `npm run start`

Inicia o servidor Next.js em modo de produção.

### `npm run lint`

Executa o ESLint para identificar e corrigir problemas de código.

## Estrutura do Projeto

- **src/**: Contém todo o código fonte do projeto.
- **public/**: Contém arquivos públicos, como imagens e ícones.
- **.env**: Arquivo de variáveis de ambiente.
- **next.config.js**: Configuração do Next.js.
- **tailwind.config.ts**: Configuração do Tailwind CSS.
- **tsconfig.json**: Configuração do TypeScript.

## Deploy

O método mais fácil de implantar seu aplicativo Next.js é usando a plataforma [Vercel](https://vercel.com/).

Para mais detalhes, consulte a [documentação de deployment do Next.js](https://nextjs.org/docs/deployment).

## Contribuição

Pull requests são bem-vindos. Para grandes mudanças, abra uma issue primeiro para discutir o que você gostaria de mudar.

Certifique-se de atualizar os testes conforme apropriado.
