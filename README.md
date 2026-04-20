# LLBAI Production MVP

Deployable Next.js MVP for **LLBAI** by **Law Learning Bench**.

## Included in this version
- Branded navigation with the Law Learning Bench logo
- Tagline shown in the live product: **Unlock The World Of Law**
- Multiple drafting models:
  - Standard Notice
  - Police Complaint
  - Court Pleading
  - Research-Backed Draft
  - Revise Existing Draft
  - Senior Chamber Style
- OpenAI-powered API routes for drafting, research, and analysis

## Setup
```bash
npm install
cp .env.example .env
```

Set your environment variable in `.env`:
```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.4
```

Run locally:
```bash
npm run dev
```

Open:
```bash
http://localhost:3000
```

## Logo
The logo is already placed at:
```bash
/public/llb-logo.png
```

## Production notes
This is a strong branded MVP. For commercial launch, the next major additions should be:
- authentication
- payment gateway
- database and user history
- PDF upload/parser
- legal citation verification layer
- admin dashboard
