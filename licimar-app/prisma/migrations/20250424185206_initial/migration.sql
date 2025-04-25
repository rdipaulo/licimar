-- CreateTable
CREATE TABLE "Vendedor" (
    "id_vendedor" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT,

    CONSTRAINT "Vendedor_pkey" PRIMARY KEY ("id_vendedor")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id_produto" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo_produto_id" INTEGER NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "TiposProduto" (
    "id_tipos_produto" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "TiposProduto_pkey" PRIMARY KEY ("id_tipos_produto")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id_pedido" SERIAL NOT NULL,
    "vendedor_id" INTEGER NOT NULL,
    "data_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_pedido" TEXT NOT NULL DEFAULT 'pendente',
    "quantidade_gelo_seco" DECIMAL(65,30),
    "preco_gelo_seco" DECIMAL(65,30),

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "PedidoProduto" (
    "id_pedido_produto" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade_pedida" INTEGER NOT NULL,
    "quantidade_retorno" INTEGER NOT NULL DEFAULT 0,
    "quantidade_vendida" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PedidoProduto_pkey" PRIMARY KEY ("id_pedido_produto")
);

-- CreateTable
CREATE TABLE "Retorno" (
    "id_retorno" SERIAL NOT NULL,
    "pedido_produto_id" INTEGER NOT NULL,
    "data_retorno" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidade" INTEGER NOT NULL,
    "produto_id" INTEGER,

    CONSTRAINT "Retorno_pkey" PRIMARY KEY ("id_retorno")
);

-- CreateTable
CREATE TABLE "Danificado" (
    "id_danificado" SERIAL NOT NULL,
    "pedido_produto_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Danificado_pkey" PRIMARY KEY ("id_danificado")
);

-- CreateTable
CREATE TABLE "Divida" (
    "id_divida" SERIAL NOT NULL,
    "vendedor_id" INTEGER NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',

    CONSTRAINT "Divida_pkey" PRIMARY KEY ("id_divida")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendedor_cpf_key" ON "Vendedor"("cpf");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_tipo_produto_id_fkey" FOREIGN KEY ("tipo_produto_id") REFERENCES "TiposProduto"("id_tipos_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_vendedor_id_fkey" FOREIGN KEY ("vendedor_id") REFERENCES "Vendedor"("id_vendedor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoProduto" ADD CONSTRAINT "PedidoProduto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retorno" ADD CONSTRAINT "Retorno_pedido_produto_id_fkey" FOREIGN KEY ("pedido_produto_id") REFERENCES "PedidoProduto"("id_pedido_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retorno" ADD CONSTRAINT "Retorno_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id_produto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Danificado" ADD CONSTRAINT "Danificado_pedido_produto_id_fkey" FOREIGN KEY ("pedido_produto_id") REFERENCES "PedidoProduto"("id_pedido_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Danificado" ADD CONSTRAINT "Danificado_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Divida" ADD CONSTRAINT "Divida_vendedor_id_fkey" FOREIGN KEY ("vendedor_id") REFERENCES "Vendedor"("id_vendedor") ON DELETE RESTRICT ON UPDATE CASCADE;
