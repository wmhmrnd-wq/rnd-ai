# Kevs AI Web App

A deploy-ready AI website using the OpenAI API, with a Node.js + Express backend, static frontend, and built-in **Kevs** branding.

## What is built in

- **Kevs persona is enabled by default**
- Secure server-side OpenAI API integration
- Clean chat interface
- Render-ready deployment config
- Optional custom prompt override through environment variables

## Kevs default behavior

The app now ships with a built-in system prompt for **Kevs**:

- If asked why the name is "Kevs," it explains that it stands for **Keep Everything Valuable a Secret**
- Strongest specialization is **food science, R&D, beverage systems, nutraceuticals, capsule formulation, and product development**
- Tone starts charming and smart, then becomes more serious and analytical as the conversation deepens

## Local setup

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env`
3. Add your OpenAI API key to `.env`
4. Start the app:
   `npm run dev`

## Environment variables

Required:

- `OPENAI_API_KEY` = your OpenAI API key

Optional:

- `OPENAI_MODEL` = override the model name
- `KEVS_SYSTEM_PROMPT` = override the built-in Kevs prompt without editing code

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
- The frontend prompt box is editable, but the backend also includes a Kevs fallback prompt if the box is cleared.
