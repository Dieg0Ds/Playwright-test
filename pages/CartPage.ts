import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly botaoCheckout: Locator;
  readonly itensNoCarrinho: Locator;
  readonly botaoRemoverMochila: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botaoCheckout = page.locator('[data-test="checkout"]');
    this.itensNoCarrinho = page.locator('.cart_item');
    this.botaoRemoverMochila = page.locator('[data-test="remove-sauce-labs-backpack"]');
  }

  async irParaCheckout() { await this.botaoCheckout.click(); }
  async removerMochilaNoCarrinho() { await this.botaoRemoverMochila.click(); }
}