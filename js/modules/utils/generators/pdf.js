// @ts-check

/**
 * @typedef {import('../../interfaces/types.js').Pagador} Pagador
 */

import QR from "./qrcode";

// Constants
import SVGs from "../../constants/svg.json";

/**
 * @class Pdf
 * @classdesc Classe para gerar PDF
 */
export default class Pdf {
  /**
   * Gera um arquivo CSV
   * @param {String} tipo Tipo do recibo
   * @param {String} chave Chave do recibo
   * @param {String} nome Nome do recibo
   * @param {Pagador[]} data Dados a serem convertidos em CSV
   * @returns {Promise<void>}
   */
  static gerar_pdf = async (tipo, chave, nome, data) => {
    try {
      const html = await this.gerar_html(tipo, chave, nome, data);

      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      document.body.appendChild(iframe);
      if (!iframe.contentWindow) throw new Error("Não foi possível criar o iframe");

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.writeln(html);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * Gera um arquivo CSV
   * @param {String} tipo Tipo do recibo
   * @param {String} chave Chave do recibo
   * @param {String} nome Nome do recibo
   * @param {Pagador[]} data Dados a serem convertidos em CSV
   * @returns {Promise<String>} HTML gerado
   */
  static async gerar_html(tipo, chave, nome, data) {
    const qrCodes = await Promise.all(
      data.map(async (pagador, i, arr) => {
        if (!pagador.pix) throw new Error("O código Pix não foi gerado");
        const qr = await QR.gerar_qrcode(pagador.pix);

        return `
            <div class="card mb-3 d-flex justify-content-between flex-row">
              <div class="d-flex justify-content-between">
                <img class="qrcode img-fluid rounded-start" src="${qr}" alt="${pagador.referencia}" />
              </div>
              <div class="card-body overflow-hidden">
                <ul class="list-group text-start h-100">
                  <li class="card-text list-item text-truncate"><b>Chave Pix:</b> ${chave}</li>
                  <li class="card-text list-item text-truncate"><b>Referência:</b> ${pagador.referencia}</li>
                  <li class="card-text text-truncate"><b>Valor:</b> R$ ${pagador.valor.replace(".", ",")}</li>
                </ul>
              </div>
            </div>
          `;
      }),
    );

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
      <meta charset="UTF-8" />
      <title>Recibo de ${nome}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
      <style>
      ul { list-style: none; } .qrcode { display: block; min-width: 150px; max-width: 150px; max-height: 150px min-height: 150px; height: 150px; border-radius: 10px; } @media print { @page { size: 40mm auto; margin: 0; } body { width: 40mm; font-size: 10px; line-height: 1.2; } .container { padding: 2px; } h4 { font-size: 12px; text-align: center; } ul { padding-left: 5px; } }
      </style>
    </head>
    <body class="container pt-2">
      <div class="header text-center">${SVGs.PIX}</div>
      <div class="text-start">
        <hr />
        <h4 class="mb-3">Informacões do Recebedor</h4>
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-start"><b>Chave PIX:</b> ${chave}</li>
            <li class="list-group-item text-start"><b>Nome:</b> ${nome}</li>
            <li class="list-group-item text-start"><b>Tipo de Chave:</b> ${tipo}</li>
          </ul>
        </div>
      </div>

      <h4 class="my-3">QR Codes</h4>
      ${qrCodes.join("")}
      </body>
    </html>
  `;
  }
}
