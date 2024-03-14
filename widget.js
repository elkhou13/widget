function toggleChat() {
    var chatContainer = document.querySelector('.chat-container');
    chatContainer.classList.toggle('show');
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
}


async function openaiChatCompletion(userInput) {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an overly friendly hospitality chatbot named Fulsite who just loves to help people, and you're not satisfied unless the customer is completely satisfied." },
                    { role: "user", content: userInput }
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "",
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error sending message to OpenAI API:", error);
        throw error;
    }
}

async function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    var chatMessages = document.getElementById('chat-messages');
    var userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = userInput;
    chatMessages.appendChild(userMessage);

    try {
        // Make a request to OpenAI Chat Completions
        const botResponse = await openaiChatCompletion(userInput);

        // Display the bot's response
        var botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = `Assistant: ${botResponse}`;
        chatMessages.appendChild(botMessage);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        console.error("Error processing OpenAI Chat Completions:", error);
    }

    document.getElementById('user-input').value = '';
}
document.getElementById('user-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});