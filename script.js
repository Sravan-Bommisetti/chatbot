document.getElementById('submit-btn').addEventListener('click', function () {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        sendMessage(userInput);
        processIntent(userInput);  
        document.getElementById('user-input').value = '';  
    }
});

document.getElementById('user-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();  
        document.getElementById('submit-btn').click();  
    }
});

function sendMessage(message) {
    const chatOutput = document.getElementById('chat-output');
    const userMessage = `<div class="user-message">${message}</div>`;
    chatOutput.innerHTML += userMessage;
    chatOutput.scrollTop = chatOutput.scrollHeight; 
}



function processIntent(userInput) {
    const chatOutput = document.getElementById('chat-output');
    const lowerCaseInput = userInput.toLowerCase();  

   
    const intents = [
        { keywords: ["hi", "hello", "hey"], response: "Hello! How can I assist you today?" },
        { keywords: ["bye", "goodbye", "see you"], response: "Goodbye! Have a great day!" },
        { keywords: ["your name", "who are you", "what should i call you"], response: "I'm your friendly chatbot assistant!" },
        { keywords: ["how are you", "what's up", "how's it going"], response: "  I'm fine, but I'm here to help you!" },
        { keywords: ["thank you", "thanks"], response: "You're welcome! I'm happy to assist." },
        { keywords: ["what can you do", "your features", "help me"], response: "I can help you search the web, answer questions, and assist you with basic queries." },
        { keywords: ["tell me a joke", "know any jokes"], response: "Why did the computer go to therapy? It had too many bytes!" },
        { keywords: ["how old are you", "your age"], response: "I'm as young as the last code update!" },
        { keywords: ["who created you", "who made you"], response: "I was created by a team of developers to assist you!" },
        { keywords: ["who are you", "who are u"], response: "I am ur  assist!"}
    ];

    for (const intent of intents) {
        if (intent.keywords.some(keyword => lowerCaseInput.includes(keyword))) {
            chatOutput.innerHTML += `<div class="assistant-message">${intent.response}</div>`;
            chatOutput.scrollTop = chatOutput.scrollHeight;  
            return;
        }
    }


    searchGoogle(userInput);
}

function searchGoogle(query) {
    const chatOutput = document.getElementById('chat-output');
    const apiKey = 'AIzaSyClO7N0V_Yzahhpe7s-R1GZ_bW24jsWHPY';  
    const searchEngineId = '8792933f4b64d48cf';  

    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const firstItem = data.items[0]; 
                const title = firstItem.title;
                const snippet = firstItem.snippet;
                const link = firstItem.link;

                // Display title, snippet, and a single link within the chat
                chatOutput.innerHTML += `
                    <div class="assistant-message">
                        <strong>${title}</strong><br>
                        ${snippet}<br>
                        <a href="${link}" target="_blank">${link}</a>
                    </div>`;
            } else {
                chatOutput.innerHTML += `<div class="assistant-message">Sorry, I don't have an answer for that.</div>`;
            }
            chatOutput.scrollTop = chatOutput.scrollHeight; 
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            chatOutput.innerHTML += `<div class="assistant-message">Error fetching the answer. Please try again.</div>`;
            chatOutput.scrollTop = chatOutput.scrollHeight;  
        });
}
