import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Desafio Técnico Sauce Demo', () => {
  let login: LoginPage;
  let inventory: InventoryPage;
  let cart: CartPage;
  let checkout: CheckoutPage;

  const USUARIO = 'standard_user';
  const SENHA = 'secret_sauce';

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
    await login.navegar();
  });

  test.describe('Bloco 1: Autenticação', () => {
    test('1. Login com credenciais inválidas', async () => {
      await login.realizarLogin('usuario_incorreto', 'senha_incorreta');
      await expect(login.mensagemErro).toBeVisible();
    });

    test('2. Login com credenciais válidas', async ({ page }) => {
      await login.realizarLogin(USUARIO, SENHA);
      await expect(page).toHaveURL(/inventory.html/);
    });

    test('3. Logout do sistema', async ({ page }) => {
      await login.realizarLogin(USUARIO, SENHA);
      await inventory.deslogar();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

  test.describe('Bloco 2: Carrinho e Produtos', () => {
    test.beforeEach(async () => { await login.realizarLogin(USUARIO, SENHA); });

    test('4. Adicionar item ao carrinho', async () => {
      await inventory.adicionarMochila();
      await expect(inventory.contadorCarrinho).toHaveText('1');
    });

    test('5. Remover item do catálogo', async () => {
      await inventory.adicionarMochila();
      await inventory.removerMochilaNoCatalogo();
      await expect(inventory.contadorCarrinho).not.toBeVisible();
    });

    test('6. Verificar contador com múltiplos itens', async () => {
      await inventory.adicionarMochila();
      await inventory.adicionarLanterna();
      await expect(inventory.contadorCarrinho).toHaveText('2');
    });

    test('7. Ordenação de produtos (Preço: Low to High)', async ({ page }) => {
      await inventory.ordenar('lohi');
      const precos = await page.locator('.inventory_item_price').allInnerTexts();
      const valores = precos.map(p => Number.parseFloat(p.replace('$', '')));
      expect(valores).toEqual([...valores].sort((a, b) => a - b));
    });

    test('8. Remover item de dentro da página do carrinho', async ({ page }) => {
      await inventory.adicionarMochila();
      await page.goto('https://www.saucedemo.com/cart.html');
      await cart.removerMochilaNoCarrinho();
      await expect(cart.itensNoCarrinho).toHaveCount(0);
    });
  });

  test.describe('Bloco 3: Finalização de Compra', () => {
    test.beforeEach(async () => { await login.realizarLogin(USUARIO, SENHA); });

    test('9. Fluxo completo de compra', async ({ page }) => {
      await inventory.adicionarMochila();
      await page.goto('https://www.saucedemo.com/cart.html');
      await cart.irParaCheckout();
      await checkout.preencherDados('Teste', 'SDET', '12345');
      await checkout.botaoFinalizar.click();
      await expect(checkout.mensagemSucesso).toHaveText('Thank you for your order!');
    });

    test('10. Erro ao avançar no checkout com campos vazios', async ({ page }) => {
      await page.goto('https://www.saucedemo.com/checkout-step-one.html');
      await checkout.botaoContinuar.click();
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });
  });
});