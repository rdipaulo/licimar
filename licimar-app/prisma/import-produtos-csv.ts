import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';
import * as fs from 'fs/promises';

const prisma = new PrismaClient();

async function importProdutosCsv(): Promise<void> {
  const csvFilePath = 'prisma/produtos.csv';
  const csvFileContent = await fs.readFile(csvFilePath, { encoding: 'utf8' });

  parse(csvFileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    delimiter: ';',
  }, async (err, records) => {
    if (err) {
      console.error('Erro ao analisar o arquivo CSV:', err);
      await prisma.$disconnect();
      return;
    }

    try {
        for (const record of records) {
            console.log('Registro completo do CSV:', record);
            const { nome, marca, tipo: tipoNome, preco: precoStr, estoque: estoqueStr } = record;
    
            console.log('Valor de nome APÓS desestruturação:', nome); // LOG ADICIONADO
    
            const preco = parseFloat(precoStr);
            const estoque = parseInt(estoqueStr, 10);
    
            const tipoProduto = await prisma.tiposProduto.findUnique({
              where: { nome: tipoNome?.trim() },
            });
    
            if (tipoProduto) {
              await prisma.produto.create({
                data: {
                  nome: nome as string,
                  marca: marca as string | null,
                  preco: preco,
                  estoque: estoque,
                  tipo_produto_id: tipoProduto.id_tipos_produto,
                },
              });
              console.log('Produto criado com sucesso:', nome);
            } else {
              console.warn(`Tipo de produto não encontrado: ${tipoNome} para o produto ${nome}`);
            }
          }

      console.log('Dados de produtos importados com sucesso do CSV!');
    } catch (error) {
      console.error('Erro ao inserir dados no banco de dados:', error);
    } finally {
      await prisma.$disconnect();
    }
  });
}

importProdutosCsv()
  .then(() => console.log('Script de importação de produtos do CSV finalizado.'))
  .catch((e) => console.error(e));