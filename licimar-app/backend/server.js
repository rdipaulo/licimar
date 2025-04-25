const express = require('express');
const { PrismaClient } = require('../node_modules/@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor backend rodando!');
});

app.get('/teste', (req, res) => {
    res.send('Rota de teste funcionando!');
  });
  
  app.get('/produtos', async (req, res) => {
    try {
      const produtos = await prisma.produto.findMany();
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  });

async function main() {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });