const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input #send-btn");
const maximiseBtn = document.querySelector(".maximise-btn");
const minimiseBtn = document.querySelector(".minimise-btn");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);

    if (className === "outgoing") {
        const chatP = document.createElement("p");
        chatP.textContent = message;
        chatLi.appendChild(chatP);
    } else {
        const imgTag = `<img src="botimg.svg" class="chat-robot"/>`;
        const chatP = document.createElement("p");
        chatP.textContent = message;  
        chatLi.innerHTML = imgTag;
        chatLi.appendChild(chatP);
    }
    
    return chatLi;
}

const handleChat = () => {
    userMessage = chatInput.value; // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        // generateResponse(incomingChatLi);
    }, 600);
    chatInput.value = "";
}

sendChatBtn.addEventListener("click", handleChat);

closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
    chatbotToggler.style.opacity = "1";
});

chatbotToggler.addEventListener("click", () => {
    document.body.classList.add("show-chatbot");
    chatbotToggler.style.opacity = "0";
});

maximiseBtn.addEventListener("click", () => {
    document.body.classList.add("fullscreen");
    maximiseBtn.style.opacity = "0";
    minimiseBtn.style.opacity = "1";
    chatbox.scrollTo(0, chatbox.scrollHeight + inputInitHeight);
});

minimiseBtn.addEventListener("click", () => {
    document.body.classList.remove("fullscreen");
    minimiseBtn.style.opacity = "0";
    maximiseBtn.style.opacity = "1";
    chatbox.scrollTo(0, chatbox.scrollHeight + inputInitHeight);
});