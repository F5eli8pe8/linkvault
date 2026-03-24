# 🔖 LinkVault

Uma aplicação para salvar, organizar e pesquisar seus links favoritos.

## 🛠️ Tecnologias

- [Next.js 14](https://nextjs.org/)
- [MySQL](https://www.mysql.com/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS Modules

## ✨ Funcionalidades

- Salvar links com título, URL e descrição
- Organizar por tags
- Buscar por título ou descrição
- Favoritar links
- Deletar links

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js
- MySQL

### Instalação

1. Clone o repositório
\`\`\`bash
git clone https://github.com/SEU_USUARIO/linkvault.git
cd linkvault
\`\`\`

2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

3. Configure o banco de dados
\`\`\`bash
cp .env.example .env
\`\`\`
Edite o `.env` com suas credenciais do MySQL.

4. Rode as migrações
\`\`\`bash
npx prisma migrate dev
\`\`\`

5. Inicie o servidor
\`\`\`bash
npm run dev
\`\`\`

Acesse [http://localhost:3000](http://localhost:3000)
