# Gestão da Igreja

## Descrição

Este é um projeto de sistema de gestão para igrejas, desenvolvido com React, TypeScript, Shadcn UI e Supabase. Ele oferece funcionalidades para gerenciar membros, finanças, eventos, células e muito mais.

## Funcionalidades

- **Dashboard:** Visão geral das principais informações da igreja.
- **Membros:** Cadastro e gestão de membros.
- **Finanças:** Controle de entradas e saídas financeiras.
- **Eventos:** Criação e gerenciamento de eventos.
- **Células:** Gestão de células e seus membros.
- **Autenticação:** Sistema de autenticação de usuários.

## Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Shadcn UI:** Biblioteca de componentes de interface do usuário reutilizáveis.
- **Supabase:** Plataforma de backend como serviço (BaaS) para armazenamento de dados e autenticação.
- **Tailwind CSS:** Framework CSS para estilização.
- **Framer Motion:** Biblioteca para animações.
- **React Router:** Biblioteca para gerenciamento de rotas.
- **Zod:** Biblioteca para validação de dados.

## Pré-requisitos

- Node.js
- npm ou yarn
- Conta no Supabase

## Instalação

1.  Clone o repositório:

    ```bash
    git clone <repositorio>
    ```

2.  Instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  Configure as variáveis de ambiente:

    - Crie um arquivo `.env` na raiz do projeto.
    - Adicione as seguintes variáveis:

      ```
      VITE_SUPABASE_URL=<URL do seu projeto Supabase>
      VITE_SUPABASE_ANON_KEY=<chave anon do seu projeto Supabase>
      ```

4.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

## Estrutura de Pastas

````markdown
# Gestão da Igreja

## Descrição

Este é um projeto de sistema de gestão para igrejas, desenvolvido com React, TypeScript, Shadcn UI e Supabase. Ele oferece funcionalidades para gerenciar membros, finanças, eventos, células e muito mais.

## Funcionalidades

- **Dashboard:** Visão geral das principais informações da igreja.
- **Membros:** Cadastro e gestão de membros.
- **Finanças:** Controle de entradas e saídas financeiras.
- **Eventos:** Criação e gerenciamento de eventos.
- **Células:** Gestão de células e seus membros.
- **Autenticação:** Sistema de autenticação de usuários.

## Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Shadcn UI:** Biblioteca de componentes de interface do usuário reutilizáveis.
- **Supabase:** Plataforma de backend como serviço (BaaS) para armazenamento de dados e autenticação.
- **Tailwind CSS:** Framework CSS para estilização.
- **Framer Motion:** Biblioteca para animações.
- **React Router:** Biblioteca para gerenciamento de rotas.
- **Zod:** Biblioteca para validação de dados.

## Pré-requisitos

- Node.js
- npm ou yarn
- Conta no Supabase

## Instalação

1.  Clone o repositório:

    ```bash
    git clone <repositorio>
    ```

2.  Instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  Configure as variáveis de ambiente:

    - Crie um arquivo `.env` na raiz do projeto.
    - Adicione as seguintes variáveis:

      ```
      VITE_SUPABASE_URL=<URL do seu projeto Supabase>
      VITE_SUPABASE_ANON_KEY=<chave anon do seu projeto Supabase>
      ```

4.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

## Estrutura de Pastas
````

├── src
│ ├── App.tsx # Componente principal da aplicação
│ ├── components # Componentes reutilizáveis
│ │ ├── ui # Componentes da Shadcn UI
│ │ └── ...
│ ├── context # Contextos da aplicação (ex: AuthContext)
│ ├── hooks # Hooks personalizados
│ ├── pages # Páginas da aplicação
│ ├── services # Serviços (ex: Supabase)
│ ├── types # Definições de tipos
│ ├── lib # Funções utilitárias
│ ├── index.css # Estilos globais
│ └── main.tsx # Ponto de entrada da aplicação
├── public # Arquivos estáticos
├── .env # Variáveis de ambiente
├── tailwind.config.ts # Configuração do Tailwind CSS
├── vite.config.ts # Configuração do Vite
├── tsconfig.json # Configuração do TypeScript
└── package.json # Arquivo de manifesto do projeto

```

## Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

[MIT](https://opensource.org/license/mit/)

-+-+-+-+-+
```
