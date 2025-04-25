/*
  Warnings:

  - You are about to drop the `Danificado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Danificado" DROP CONSTRAINT "Danificado_pedido_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "Danificado" DROP CONSTRAINT "Danificado_produto_id_fkey";

-- DropTable
DROP TABLE "Danificado";
