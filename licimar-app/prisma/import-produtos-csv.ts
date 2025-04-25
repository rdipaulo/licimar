import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';
import * as fs from 'fs/promises';

const prisma = new PrismaClient();

async function importProdutosCsv(): Promise<void> {
  const csvFilePath = 'prisma/produtos.csv';
  const csvFileContent = await fs.readFile(csvFilePath, { encoding: 'utf8' });

  parse(
    csvFileContent,
    {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      delimiter: ';',
    },
    async (err, records) => {
      if (err) {
        console.error('Erro ao analisar o arquivo CSV:', err);
        await prisma.$disconnect();
        return;
      }

      try {
        for (const record of records) {
          const nome = record['nome']?.trim();
          const marca = record['marca']?.trim();
          const tipoNome = record['tipo']?.trim().toLowerCase(); // Normaliza o tipo para letras minúsculas
          const precoStr = record['preco']?.trim();
          const estoqueStr = record['estoque']?.trim();

          const preco = parseFloat(precoStr);
          const estoque = estoqueStr ? parseInt(estoqueStr, 10) : null;

          // Buscar o tipo de produto na tabela TiposProduto
          let tipoProduto = await prisma.tiposProduto.findUnique({
            where: { nome: tipoNome },
          });

          // Criar o tipo de produto se não existir
          if (!tipoProduto) {
            tipoProduto = await prisma.tiposProduto.create({
              data: { nome: tipoNome },
            });
            console.log(`Tipo de produto criado: ${tipoNome}`);
          }

          // Criar o produto com a referência correta
          await prisma.produto.create({
            data: {
              nome,
              marca: marca || null,
              preco,
              estoque,
              tipo_produto_id: tipoProduto.id_tipos_produto,
            },
          });
          console.log('Produto criado com sucesso:', nome);
        }

        console.log('Dados de produtos importados com sucesso do CSV!');
      } catch (error) {
        console.error('Erro ao inserir dados no banco de dados:', error);
      } finally {
        await prisma.$disconnect();
      }
    }
  );
}

importProdutosCsv()
  .then(() => console.log('Script de importação de produtos do CSV finalizado.'))
  .catch((e) => console.error(e));