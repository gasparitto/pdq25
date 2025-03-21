// @ts-check

/**
 * @class Erro
 * @classdesc Classe para manipular mensagens de erro
 */
export default class Erro {
  /**
   * Mostra uma mensagem de erro em um input
   * @param {Element} input
   */
  static mostrar_erro(input) {
    input.classList.add("is-invalid");
  }

  /**
   * Limpa a mensagem de erro de um input
   * @param {HTMLElement} input
   */
  static limpar_erro(input) {
    input.classList.remove("is-invalid");
  }

  /**
   * Limpa todas as mensagens de erro
   * @param {HTMLElement} formulario
   */
  static limpar_erros(formulario) {
    formulario.querySelectorAll(".is-invalid").forEach((input) => input.classList.remove("is-invalid"));
  }
}
