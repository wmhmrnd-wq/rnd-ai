# Kevs AI Web App

A simple AI website using the OpenAI API with a Node.js + Express backend and a static frontend.

## Local setup

1. Install dependencies:
   npm install
2. Copy `.env.example` to `.env`
3. Add your OpenAI API key to `.env`
4. Start the app:
   npm run dev

## Deploy to Render

1. Push this folder to a GitHub repo.
2. In Render, create a new Web Service from that repo.
3. Render can read the included `render.yaml`, or you can set these manually:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add the environment variable:
   - `OPENAI_API_KEY` = your real API key
5. Deploy.

## Notes

- The frontend never calls OpenAI directly.
- Your API key stays on the server.
- Health check endpoint: `/health`


## Environment variables

- `OPENAI_API_KEY` - required
- `OPENAI_MODEL` - optional, defaults to `gpt-5.4`
- `KEVS_SYSTEM_PROMPT` - optional, overrides the built-in Kevs persona
