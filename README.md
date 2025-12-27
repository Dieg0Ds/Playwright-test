# Automação de Testes - Sauce Demo

Este projeto contém a automação de 10 cenários de teste para o site Sauce Demo, utilizando **Playwright** e **TypeScript**. O objetivo foi construir uma estrutura organizada, fácil de manter e que garanta que as principais funções do site funcionem corretamente.

## 🛠️ Tecnologias e Padrões

* **Framework:** Playwright
* **Linguagem:** TypeScript
* **Organização:** Padrão Page Object Model (POM)

---

## 🏗️ Como o projeto foi estruturado

Para este desafio, escolhi separar o código em duas partes principais:

1. **Pages:** Onde ficam mapeados os botões e campos de cada tela. Isso evita que o código fique repetitivo e facilita mudanças caso o site mude.
2. **Tests:** Onde estão os roteiros de teste. Eles são divididos por blocos (Login, Carrinho e Checkout) para que os resultados fiquem bem organizados.

**Uso de IA no processo:**
Utilizei IA como suporte para estruturar o padrão POM e organizar as pastas de forma eficiente. O foco foi usar o *prompt engineering* para garantir que o código seguisse boas práticas de mercado, corrigindo manualmente os seletores e a lógica para que os testes fossem 100% estáveis.

---

## 📋 O que foi testado?

A suíte cobre 10 pontos fundamentais da jornada do usuário:

* Login com sucesso e erro.
* Logout.
* Adição e remoção de produtos (na lista principal e dentro do carrinho).
* Validação do contador de itens.
* Ordenação de produtos por preço.
* Fluxo completo de compra (Checkout) e validação de erro em campos vazios.

---

## 🚀 Como rodar os testes

1. **Instale as dependências:**
```bash
npm install

```


2. **Instale os navegadores do Playwright:**
```bash
npx playwright install

```


3. **Rode os testes no terminal:**
```bash
npx playwright test

```


4. **Para ver os testes rodando com interface visual:**
```bash
npx playwright test --ui

```
