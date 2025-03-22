// @ts-check

// Author: @Harmew

import Pix from "./modules/pix.js";

const pix = new Pix(
  "#pix-formulario",
  "#pix-tipo",
  "#pix-chave",
  "#pix-add-pagador-btn",
  "#pix-import-pagador-csv-btn",
  "#pix-pagadores-div",
  "#pix-recebedor-div",
  "#pix-resultado-div",
);

pix.init();
