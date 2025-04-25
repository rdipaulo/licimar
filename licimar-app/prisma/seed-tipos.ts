import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTiposProduto(): Promise<void> {
  try {
    await prisma.tiposProduto.createMany({
      data: [
        { nome: 'sorvete' },
        { nome: 'bebida' },
        { nome: 'bomboniere' },
        { nome: 'gelo seco' },
      ],
      skipDuplicates: true, // Adicionado para evitar erros se executado múltiplas vezes
    });

    console.log('Tipos de produto inseridos ou já existentes.');
  } catch (error) {
    console.error('Erro ao inserir tipos de produto:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTiposProduto()
  .then(() => console.log('Script de seed de tipos de produto finalizado.'))
  .catch((e) => console.error(e));