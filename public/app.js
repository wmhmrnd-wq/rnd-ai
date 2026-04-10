const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const systemPrompt = document.getElementById("systemPrompt");
const temperature = document.getElementById("temperature");
const temperatureValue = document.getElementById("temperatureValue");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");

temperature.addEventListener("input", () => {
  temperatureValue.textContent = temperature.value;
});

function addMessage(role, text, extraClass = "") {
  const article = document.createElement("article");
  article.className = `message ${role} ${extraClass}`.trim();

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = role === "user" ? "You" : "Kevs";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  article.append(meta, bubble);
  messages.appendChild(article);
  messages.scrollTop = messages.scrollHeight;
}

clearBtn.addEventListener("click", () => {
  messages.innerHTML = `
    <article class="message assistant">
      <div class="meta">Kevs</div>
      <div class="bubble">Hello. I’m Kevs — ready to help with formulation, product ideas, and practical R&D problem-solving.</div>
    </article>
  `;
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  messageInput.value = "";
  sendBtn.disabled = true;
  sendBtn.textContent = "Thinking...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        systemPrompt: systemPrompt.value,
        temperature: Number(temperature.value)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed.");
    }

    addMessage("assistant", data.reply || "No reply received.");
  } catch (error) {
    addMessage("assistant", error.message || "Something went wrong.", "error");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send Message";
    messageInput.focus();
  }
});
