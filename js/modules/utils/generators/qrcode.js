// @ts-check

import QR from "qrcode";

/**
 * @class QRCode
 * @classdesc Classe para gerar QRCode
 */
export default class QRCode {
  /**
   * Gera um QRCode a partir de um texto
   * @param {String} pix
   * @returns {Promise<String>}
   */
  static async gerar_qrcode(pix) {
    try {
      return await QR.toDataURL(pix);
    } catch (err) {
      throw new Error("Falha ao gerar o QRCode");
    }
  }
}
