# Auth JWT + RBAC API

**Backend de Autenticação e Controle de Permissões** | Node.js • TypeScript • Fastify • Prisma • PostgreSQL

<p align="center">
  <a href="https://www.thomaseduardo.com.br"><img src="https://img.shields.io/badge/Portfolio-thomaseduardo.com.br-E8620A?style=for-the-badge&logo=vercel&logoColor=white" /></a>
  <a href="https://github.com/devthomaseduardo/auth-jwt-rbac"><img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" /></a>
</p>

---

## Sobre o Projeto

API backend profissional para autenticação e autorização com **JWT + RBAC** (Role-Based Access Control). Desenvolvida com foco em segurança, escalabilidade e boas práticas de engenharia.

Parte do ecossistema **TERON Studio** e do portfólio profissional de Thomas Eduardo.

**Processo de Engenharia de 6 Etapas** aplicado:
1. Discovery & Alinhamento
2. Arquitetura & Planejamento
3. Desenvolvimento
4. Validação & QA
5. Deploy & Monitoramento
6. Iteração & Entrega

## Stack Técnica

| Camada              | Tecnologias                                      |
|---------------------|--------------------------------------------------|
| **Framework**       | Fastify (Node.js)                                |
| **Linguagem**       | TypeScript                                       |
| **ORM**             | Prisma                                           |
| **Banco de Dados**  | PostgreSQL                                       |
| **Autenticação**    | JWT + Refresh Token                              |
| **Segurança**       | bcrypt, Zod (validação), RBAC                    |
| **Infra & Deploy**  | Docker, Vercel/AWS, GitHub Actions               |

## Funcionalidades

- Cadastro e login de usuários
- Hash seguro de senhas
- Geração e validação de Access Token (JWT)
- Refresh Token para renovação de sessão
- Middleware de autenticação
- Controle de acesso por roles (RBAC)
- Rotas públicas e protegidas
- Validação de dados com Zod
- Documentação com exemplos (curl)
- Estrutura limpa e escalável

## Desenvolvimento Local

**Requisitos:** Node.js 18+, pnpm, PostgreSQL (ou Docker)

```bash
git clone https://github.com/devthomaseduardo/auth-jwt-rbac.git
cd auth-jwt-rbac
pnpm install

# Configure o .env com DATABASE_URL e JWT secrets
pnpm prisma migrate dev
pnpm dev
```

Abra em `http://localhost:3000` (ou porta configurada).

### Scripts

```bash
pnpm dev      # Desenvolvimento
pnpm build    # Build
pnpm start    # Produção
pnpm lint     # ESLint
pnpm prisma studio  # Visualizar banco
```

## Estrutura do Projeto

```
src/
  routes/           # Rotas da API
  middleware/       # Auth e RBAC
  services/         # Lógica de negócio
  utils/            # Helpers (JWT, hash)
  schemas/          # Validação Zod
prisma/
  schema.prisma     # Modelo do banco
.env.example
README.md
```

## Deploy

Preparado para deploy em Vercel, Railway ou AWS com Docker.

## Licença
Uso pessoal e profissional. Todos os direitos reservados © Thomas Eduardo.

---

**Construído com processo, segurança e atenção aos detalhes.**

> Veja o portfólio completo em [www.thomaseduardo.com.br](https://www.thomaseduardo.com.br)