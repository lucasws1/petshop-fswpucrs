# Pet Shop Patas & Pelos - Fase 2 (Fundamentos de Sistemas Web)

Projeto da disciplina **Fundamentos de Sistemas Web** (PUCRS - Graduação Online).
Plataforma web de um pet shop, para tutores consultarem produtos e serviços, se cadastrarem e agendarem banho ou banho e tosa.

- **Repositório:** https://github.com/lucasws1/petshop-fswpucrs
- **Site (GitHub Pages):** https://lucasws1.github.io/petshop-fswpucrs/
- **Autor:** Lucas Weyne Schuch

A **Fase 1** (HTML5 puro, sem CSS e sem JavaScript) continua disponível na tag `fase-1` do repositório.

---

## Como acessar

Abra o link do GitHub Pages acima em qualquer navegador moderno. Para rodar localmente, baixe o repositório e abra o arquivo `index.html` no navegador (não é preciso instalar nada). O Bootstrap é carregado por CDN, então é necessário ter conexão com a internet.

## Estrutura de pastas

```text
.
├── index.html           # Página inicial: carrossel, sobre, produtos, serviços
├── cadastro.html        # Formulário de cadastro do cliente e do pet
├── agendamento.html     # Agendamento de banho ou banho e tosa
├── README.md            # Este arquivo de ajuda
└── assets/
    ├── css/style.css    # Estilos próprios (paleta, cards, carrossel, formulários)
    ├── js/app.js        # JavaScript comentado (rodapé, máscaras, validações, agendamento)
    └── imagens/         # Imagens dos produtos
```

## Funcionalidades

### Todas as páginas
- **Navbar do Bootstrap** fixa no topo, responsiva (vira menu "hambúrguer" no celular), com dropdown de produtos e botão de agendamento.
- **Rodapé** com endereço, contato, links rápidos, horário e botão de WhatsApp.
- **Indicador "Aberto agora / Fechado no momento"** no rodapé, calculado por JavaScript com a data e a hora atuais (segunda a sábado, das 8h às 19h) e atualizado a cada minuto.
- **Ano do copyright** preenchido automaticamente por JavaScript.

### Página inicial (`index.html`)
- **Carrossel** do Bootstrap com os 6 produtos em destaque: troca sozinho a cada 5 segundos, pausa com o mouse e tem setas e indicadores. Cada slide leva à categoria do produto.
- **Catálogo** em cards do Bootstrap, dividido em três categorias (acessórios, rações não perecíveis e higiene e limpeza), com imagem, descrição e valor.
- **Tabela de serviços** com os valores de Banho e de Banho e Tosa, com e sem tele-busca.

### Cadastro (`cadastro.html`)
- Um único formulário com duas partes: **dados do cliente** (nome, CPF, data de nascimento, sexo, telefone, e-mail, endereço e preferência de contato) e **dados do pet** (nome, espécie, raça, idade, porte, observações e vacinas).
- Usa campos variados: texto, e-mail, telefone, número, data, botões de opção (radio), caixas de seleção (checkbox), listas (select), lista de sugestões (datalist) e área de texto, com `placeholder` e campos obrigatórios (`required`).
- **Máscaras** de digitação para CPF, telefone e CEP.
- **Validação do CPF** pelos dígitos verificadores, além do formato.
- Ao enviar, os campos com problema são destacados em vermelho, com mensagem explicativa. Se estiver tudo certo, aparece uma mensagem de sucesso.

### Agendamento (`agendamento.html`)
- Escolha do **serviço** (Banho ou Banho e Tosa) e do **atendimento** (Tele-busca ou Entrega do pet no local).
- Na tele-busca, aparecem os campos do endereço de busca, que só são exigidos nessa opção.
- **Calendário** para escolher o dia (`type="date"`) e campo de horário (`type="time"`).
- Regras: não aceita datas passadas nem domingos, horário entre 8h e 18h (de 30 em 30 minutos) e não aceita horário que já passou no dia de hoje.
- **Resumo lateral** com serviço, atendimento, data, horário e valor total, atualizado na hora.
- Se o cliente já fez o cadastro neste navegador, nome, telefone, pet e endereço vêm preenchidos. Esses dados ficam apenas no navegador do próprio usuário (`localStorage`), sem o CPF.

> O site não tem servidor: o cadastro e o agendamento são apenas simulados, e nenhum dado é enviado a lugar algum.

## Acessibilidade (deficientes visuais)

- **Textos alternativos (`alt`)** descritivos em todas as imagens, incluindo as do carrossel.
- **Rótulos (`label`)** associados a todos os campos dos formulários e grupos de opções agrupados com `fieldset` e `legend`, para que leitores de tela anunciem cada campo corretamente.
- **Landmarks e nomes** nas regiões de navegação (`aria-label` na navbar, no carrossel e nos links do rodapé).
- **Controles do carrossel** com texto para leitor de tela ("Produto anterior", "Próximo produto").
- **Mensagens dinâmicas** (alertas de erro e de sucesso e valor do resumo) com `role="alert"` e `aria-live`, para serem lidas automaticamente.
- **Link "Pular para o conteúdo"** em todas as páginas, para quem navega pelo teclado.
- Campos obrigatórios identificados também por `required`, e não apenas pelo asterisco visual.

## Ajustes realizados em relação à Fase 1

1. **Estrutura de arquivos:** imagens movidas para `assets/imagens/`, e criados `assets/css/style.css` e `assets/js/app.js`, conforme a organização de pastas mostrada na Aula 10.
2. **Bootstrap 5:** a navegação, os cards, as tabelas e os formulários passaram a usar o Bootstrap, com a identidade visual (verde, laranja e creme) definida no CSS próprio.
3. **Navegação:** o menu deixou de ser uma lista de âncoras e virou navbar responsiva. Foram incluídas as páginas de cadastro e agendamento.
4. **Catálogo:** os produtos passaram de blocos de texto para cards, com imagem, descrição curta e valor.
5. **Serviços:** a tabela agora apresenta os serviços **Banho** e **Banho e Tosa**, conforme o enunciado, com os valores de cada um com e sem tele-busca.
6. **Rodapé:** reorganizado em colunas, com horário, WhatsApp, indicador aberto/fechado e link para voltar ao topo.
7. **Menu de produtos:** o botão do dropdown recebeu `id` e o menu passou a ser associado a ele com `aria-labelledby`, corrigindo a semântica para leitores de tela.
8. **Código comentado:** o `app.js` está dividido em seções comentadas (rodapé, utilitários, cadastro e agendamento).

## Tecnologias

HTML5, CSS3, [Bootstrap 5.3](https://getbootstrap.com/) (via CDN) e JavaScript puro, sem outras bibliotecas.
