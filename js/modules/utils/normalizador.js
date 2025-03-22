// @ts-check

/** @classdesc Classe para normalizar textos */
export default class Normalizador {
  /**
   * Normaliza um texto removendo tags HTML
   * @param {FormDataEntryValue | Null} text Texto a ser normalizado
   * @returns {String} Texto normalizado
   */
  static normalizar = (text) => {
    if (!text) return "";

    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  /**
   * Normaliza a referência
   * @param {String} referencia Referência a ser normalizada
   * @returns {String} Referência normalizada
   */
  static normalizar_referencia = (referencia) => {
    return this.normalizar(referencia).replace(/\s+/g, "").toUpperCase();
  };

  /**
   * Normaliza um valor
   * @param {String} valor Valor a ser normalizado
   * @returns {String} Valor normalizado
   */
  static normalizar_valor = (valor) => {
    return valor.replace(",", ".").replace(/\s+/g, "").replace("R$", "");
  };
}
