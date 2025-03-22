/**
 * @file Definições de tipos para o sistema Pix
 */

/**
 * Pagador Object
 * @typedef {Object} Pagador
 * @property {HTMLInputElement} referencia_input - Input do pagador
 * @property {HTMLInputElement} valor_input - Input do pagador
 * @property {string} id - ID do pagador
 * @property {string} referencia - Referência do pagador
 * @property {string} valor - Valor a ser pago
 * @property {string | undefined} pix - Código Pix
 */

/**
 * Pagador CSV
 * @typedef {Object} PagadorCSV
 * @property {string} referencia - Referência do pagador
 * @property {string} valor - Valor a ser pago
 */

export const _types = {};
