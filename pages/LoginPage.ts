import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly campoUsuario: Locator;
  readonly campoSenha: Locator;
  readonly botaoLogin: Locator;
  readonly mensagemErro: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoUsuario = page.locator('[data-test="username"]');
    this.campoSenha = page.locator('[data-test="password"]');
    this.botaoLogin = page.locator('[data-test="login-button"]');
    this.mensagemErro = page.locator('[data-test="error"]');
  }

  async navegar() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async realizarLogin(usuario: string, senha: string) {
    await this.campoUsuario.fill(usuario);
    await this.campoSenha.fill(senha);
    await this.botaoLogin.click();
  }
}