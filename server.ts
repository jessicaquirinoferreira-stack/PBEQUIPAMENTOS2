import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface QuotePayload {
  nome: string;
  telefone: string;
  email: string;
  equipamento: string;
  cidade: string;
  prazo: string;
  descricao: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value: unknown, maxLength = 400): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

async function persistQuote(record: Record<string, string>) {
  const dataDir = path.resolve(__dirname, 'data');
  const filePath = path.join(dataDir, 'orcamentos.json');
  await fs.mkdir(dataDir, { recursive: true });

  let existing: Array<Record<string, string>> = [];
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }

  existing.push(record);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/orcamentos', async (req, res) => {
    try {
      const body = (req.body ?? {}) as Partial<QuotePayload>;
      const nome = sanitizeText(body.nome, 120);
      const telefone = sanitizeText(body.telefone, 40);
      const email = sanitizeText(body.email, 160);
      const equipamento = sanitizeText(body.equipamento, 160);
      const cidade = sanitizeText(body.cidade, 120);
      const prazo = sanitizeText(body.prazo, 120);
      const descricao = sanitizeText(body.descricao, 1200);

      const digitsOnly = telefone.replace(/\D/g, '');

      if (nome.length < 3) {
        return res.status(400).json({ error: 'Informe seu nome completo.' });
      }
      if (digitsOnly.length < 8) {
        return res.status(400).json({ error: 'Informe um telefone ou WhatsApp válido com DDD.' });
      }
      if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: 'Informe um endereço de e-mail válido.' });
      }
      if (!equipamento) {
        return res.status(400).json({ error: 'Selecione ou informe o equipamento desejado.' });
      }
      if (cidade.length < 2) {
        return res.status(400).json({ error: 'Informe a cidade onde o equipamento será utilizado.' });
      }
      if (!prazo) {
        return res.status(400).json({ error: 'Informe o prazo ou período estimado de locação.' });
      }
      if (descricao.length < 10) {
        return res.status(400).json({ error: 'Descreva brevemente a necessidade do projeto ou operação.' });
      }

      const now = new Date();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const protocol = `PB-${now.getFullYear()}-${randomSuffix}`;
      const receivedAt = now.toISOString();

      await persistQuote({
        protocol,
        receivedAt,
        nome,
        telefone,
        email,
        equipamento,
        cidade,
        prazo,
        descricao,
      });

      return res.status(201).json({
        ok: true,
        protocol,
        receivedAt,
        summary: {
          nome,
          equipamento,
          cidade,
          prazo,
        },
      });
    } catch (error) {
      console.error('Erro ao registrar solicitação de orçamento:', error);
      return res.status(500).json({
        error: 'Não foi possível registrar sua solicitação no momento. Tente novamente em instantes.',
      });
    }
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`P.B. Equipamentos server running on http://0.0.0.0:${port}`);
  });
}

startServer();
