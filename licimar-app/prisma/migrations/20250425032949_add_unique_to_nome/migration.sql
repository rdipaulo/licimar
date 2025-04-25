/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `TiposProduto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TiposProduto_nome_key" ON "TiposProduto"("nome");
