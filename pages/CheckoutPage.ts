import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly nome: Locator;
  readonly sobrenome: Locator;
  readonly cep: Locator;
  readonly botaoContinuar: Locator;
  readonly botaoFinalizar: Locator;
  readonly mensagemSucesso: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nome = page.locator('[data-test="firstName"]');
    this.sobrenome = page.locator('[data-test="lastName"]');
    this.cep = page.locator('[data-test="postalCode"]');
    this.botaoContinuar = page.locator('[data-test="continue"]');
    this.botaoFinalizar = page.locator('[data-test="finish"]');
    this.mensagemSucesso = page.locator('.complete-header');
  }

  async preencherDados(fName: string, lName: string, zip: string) {
    await this.nome.fill(fName);
    await this.sobrenome.fill(lName);
    await this.cep.fill(zip);
    await this.botaoContinuar.click();
  }
}