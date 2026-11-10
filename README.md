# Pet Shop Patas & Pelos - Fase 1 (Fundamentos de Sistemas Web)

Este repositório contém a **Fase 1** do Projeto da Disciplina de **Fundamentos de Sistemas Web**.

Nesta fase inicial, o objetivo é construir a estrutura e marcação da plataforma web de comércio de produtos e serviços para pet shop utilizando estritamente **HTML5 semântico**, em conformidade com as Aulas 1 a 5 da disciplina.

> **Importante:** Conforme os requisitos do projeto da Fase 1, não há aplicação de estilização CSS (nem Bootstrap) e não há inclusão de funções em JavaScript. Toda a estilização e interatividade serão implementadas na Fase 2.

---

## 📁 Estrutura de Pastas do Projeto

```text
src/
├── index.html          # Página web principal estruturada em HTML5 puro
├── README.md           # Arquivo de documentação e ajuda da plataforma
└── imagens/            # Imagens locais dos produtos
    ├── cama-pet.jpeg
    ├── brinquedo-mordedor.png
    ├── racao-caes.png
    ├── racao-gatos.png
    ├── tapete-higienico.png
    └── fralda-pet.png
```

---

## 🐾 Funcionalidades Implementadas

1. **Cabeçalho (`<header>`):**
   - Nome, lema e identificação do Pet Shop.
   - Informações essenciais de horário de funcionamento e telefone.
   - Menu de navegação por âncoras internas (`<nav>`) para todas as seções da página.

2. **Catálogo de Produtos (`<main>` e `<section>`):**
   - Apresentação de pelo menos 2 produtos em cada uma das 3 categorias obrigatórias:
     - **Acessórios:** Cama Pet Aconchego e Brinquedo Mordedor Resistente.
     - **Rações Não Perecíveis:** Ração Cães Adultos 15kg e Ração Gatos Castrados 10kg.
     - **Higiene e Limpeza:** Tapete Higiênico (30 un) e Fralda Descartável Pet (12 un).
   - Cada produto contém imagem local com caminhos relativos (`imagens/nome.png`), descrição detalhada e valor em reais (R$).

3. **Serviços Oferecidos:**
   - Detalhamento de Banho e Tosa Tradicional e Tosa Higiênica.
   - Apresentação clara dos valores nas modalidades **Sem Tele-Busca** e **Com Tele-Busca**, estruturados em tabela HTML (`<table>`).

4. **Rodapé (`<footer>`):**
   - Informações legais completas.
   - Informações para contato direto (e-mail com link `mailto:`, telefone e WhatsApp).
   - Direitos autorais e indicação de autoria acadêmica.
