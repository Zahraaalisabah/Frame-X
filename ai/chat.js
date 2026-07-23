document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("ai-chat-toggle");
    const chatBox = document.getElementById("ai-chat-box");
    const closeBtn = document.getElementById("ai-chat-close");
    const sendBtn = document.getElementById("ai-send-btn");
    const inputField = document.getElementById("ai-input");
    const messagesContainer = document.getElementById("ai-chat-messages");

    if (toggleBtn && chatBox) {
        toggleBtn.addEventListener("click", () => chatBox.classList.toggle("hidden"));
    }
    if (closeBtn && chatBox) {
        closeBtn.addEventListener("click", () => chatBox.classList.add("hidden"));
    }

    if (sendBtn && inputField) {
        sendBtn.addEventListener("click", handleUserSend);
        inputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleUserSend();
        });
    }

    function handleUserSend() {
        const text = inputField.value.trim();
        if (!text) return;

        // عرض رسالة الزبون
        appendMsg(text, "user");
        inputField.value = "";

        // معالجة الرد عبر العقل الذكي
        setTimeout(() => {
            const botReply = brain.processInput(text);
            appendMsg(botReply, "bot");
        }, 400);
    }

    function appendMsg(text, sender) {
        if (!messagesContainer) return;
        const msgDiv = document.createElement("div");
        msgDiv.className = `ai-msg ${sender}`;
        msgDiv.innerHTML = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});