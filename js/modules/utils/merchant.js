// @ts-check

import { Merchant as MC } from "steplix-emv-qrcps";

/**
 * @class Merchant
 * @classdesc Classe para gerar códigos EMVQR (PIX)
 */
export default class Merchant {
  /**
   * Cria um objeto EMVQR
   * @param {Object} params - Parâmetros para a criação do EMVQR
   * @param {string} params.chave - Chave PIX do recebedor
   * @param {string} params.nome - Nome do recebedor
   * @param {string} params.valor - Valor da transação
   * @param {string} params.referencia - Referência da transação
   * @returns {string} Código EMVQR gerado
   */
  static criar_codigo_pix({ chave, nome, valor, referencia }) {
    const emvqr = MC.buildEMVQR();

    emvqr.setPayloadFormatIndicator("01");
    emvqr.setCountryCode("BR");
    emvqr.setMerchantCategoryCode("0000");
    emvqr.setTransactionCurrency("986");
    const merchant_account_information = MC.buildMerchantAccountInformation();
    merchant_account_information.setGloballyUniqueIdentifier("BR.GOV.BCB.PIX");

    merchant_account_information.addPaymentNetworkSpecific("01", chave);

    emvqr.addMerchantAccountInformation("26", merchant_account_information);

    if (nome) {
      emvqr.setMerchantName(nome);
    }

    emvqr.setMerchantCity("SAOPAULO");

    if (valor && valor != "") {
      emvqr.setTransactionAmount(valor);
    }

    const additional_data_field_template = MC.buildAdditionalDataFieldTemplate();

    if (referencia) {
      additional_data_field_template.setReferenceLabel(referencia);
    } else {
      additional_data_field_template.setReferenceLabel("***");
    }

    emvqr.setAdditionalDataFieldTemplate(additional_data_field_template);

    return emvqr.generatePayload();
  }
}
