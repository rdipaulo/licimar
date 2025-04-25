import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteProdutos() {
  try {
    await prisma.produto.deleteMany();
    console.log('Todos os registros da tabela "Produto" foram apagados.');
  } catch (error) {
    console.error('Erro ao deletar registros:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteProdutos();