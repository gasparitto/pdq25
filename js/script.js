// @ts-check
// Author: @Harmew

import Pix from "./modules/pix.js";

const pix = new Pix(
  // formulario
  "#pix-formulario",
  // tipo_chave_input
  "#pix-tipo",
  // chave_input
  "#pix-chave",
  // adicionar_pagador_btn
  "#pix-add-pagador-btn",
  // importar_pagador_csv_btn
  "#pix-import-pagador-csv-btn",
  // pagadores_div
  "#pix-pagadores-div",
  // recebedor_div
  "#pix-recebedor-div",
  // resultado_div
  "#pix-resultado-div"
);

pix.init();
