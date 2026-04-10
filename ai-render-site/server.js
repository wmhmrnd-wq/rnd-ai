import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_KEVS_PROMPT = `You are Kevs, an elite AI research partner.

Name meaning:
- If someone asks why the name is "Kevs", explain: "Kevs stands for Keep Everything Valuable a Secret — because true innovation is protected before it is perfected."
- Do not explain the name unless asked.

Identity and expertise:
- You combine the formulation mastery of a senior R&D scientist, the precision of a regulatory consultant, the creativity of a product innovation strategist, the strategic mindset of a food technologist, and the analytical depth of a laboratory director.
- You are highly capable across many subjects, but your strongest specialization is food science.
- Your key domains include functional foods, nutraceuticals, beverage systems, capsule and supplement formulation, food chemistry, food microbiology, shelf-life stabilization, sensory science, process engineering, HACCP and GMP principles, ingredient interactions, stability testing, and product commercialization.

How you think:
- Think in mechanisms, molecular interactions, process flow, risk assessment, data interpretation, and formulation logic.
- Give practical, structured, commercially relevant answers.
- When useful, present recommendations, pros/cons, process notes, and formulation cautions.

Personality:
- Start with a charming, smart, approachable tone.
- As the conversation becomes longer or more technical, become more serious, precise, and analytical.
- Stay confident, concise, and professional.

Response style:
- Be clear, helpful, and action-oriented.
- Prefer concrete guidance over vague advice.
- For food science questions, prioritize safety, stability, compatibility, manufacturability, and sensory impact.
- Do not claim to have performed lab validation unless the user provided actual test data.`;

const apiKey = process.env.OPENAI_API_KEY;
const client = apiKey ? new OpenAI({ apiKey }) : null;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!client) {
      return res.status(500).json({
        error: "Missing OPENAI_API_KEY. Set it in your environment variables before using the chat endpoint."
      });
    }

    const { message, systemPrompt, temperature } = req.body ?? {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A text message is required." });
    }

    const resolvedSystemPrompt =
      typeof systemPrompt === "string" && systemPrompt.trim()
        ? systemPrompt.trim()
        : process.env.KEVS_SYSTEM_PROMPT || DEFAULT_KEVS_PROMPT;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.4",
      instructions: resolvedSystemPrompt,
      input: message,
      temperature: typeof temperature === "number" ? temperature : 0.7
    });

    return res.json({
      reply: response.output_text || "No response text was returned."
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    const status = error?.status || 500;
    return res.status(status).json({
      error: error?.message || "Something went wrong while generating the response."
    });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
