import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly contadorCarrinho: Locator;
  readonly seletorOrdenacao: Locator;
  readonly botaoMenu: Locator;
  readonly linkLogout: Locator;
  // Botões de itens específicos
  readonly addMochila: Locator;
  readonly removerMochila: Locator;
  readonly addLanterna: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contadorCarrinho = page.locator('.shopping_cart_badge');
    this.seletorOrdenacao = page.locator('[data-test="product-sort-container"]');
    this.botaoMenu = page.locator('#react-burger-menu-btn');
    this.linkLogout = page.locator('#logout_sidebar_link');
    
    // Seletores fixos e confiáveis
    this.addMochila = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.removerMochila = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.addLanterna = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  }

  async adicionarMochila() { await this.addMochila.click(); }
  async removerMochilaNoCatalogo() { await this.removerMochila.click(); }
  async adicionarLanterna() { await this.addLanterna.click(); }
  
  async ordenar(opcao: string) { await this.seletorOrdenacao.selectOption(opcao); }

  async deslogar() {
    await this.botaoMenu.click();
    await this.linkLogout.click();
  }
}