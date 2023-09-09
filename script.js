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
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    const chatP = document.createElement("p");
    chatP.textContent = message;
    chatLi.appendChild(chatP);
    return chatLi; // return chat <li> element
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
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
        generateResponse(incomingChatLi);
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
    chatBox.scrollTo(0, chatBox.scrollHeight);
});

minimiseBtn.addEventListener("click", () => {
    document.body.classList.remove("fullscreen");
    minimiseBtn.style.opacity = "0";
    maximiseBtn.style.opacity = "1";
    chatBox.scrollTo(0, chatBox.scrollHeight);
});