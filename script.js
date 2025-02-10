const micBtn = document.getElementById("mic-btn");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const responseBox = document.getElementById("response-box");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

micBtn.addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = (event) => {
    let userSpeech = event.results[0][0].transcript.toLowerCase();
    processInput(userSpeech);
};

sendBtn.addEventListener("click", () => {
    let textInput = chatInput.value;
    processInput(textInput);
    chatInput.value = "";
});

function processInput(input) {
    responseBox.innerText = `You: ${input}`;

    // Greetings
    if (input.includes("hello") || input.includes("hi mimi")) {
        speak("Hello boss, how can I help?");
    
    // General Info
    } else if (input.includes("who are you")) {
        speak("I am Mimi, your AI assistant.");
    } else if (input.includes("who created you")) {
        speak("I was created by Prashik.");
    
    // Google Search
    } else if (input.includes("who is") || input.includes("what is") || input.includes("how is")) {
        let query = input.replace(/who is|what is|how is/g, "").trim();
        speak(`I found this on Google.`);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    
    // Math Solver
    } else if (input.match(/\d+ [\+\-\*\/] \d+/)) {
        try {
            let result = eval(input);
            speak(`The answer is ${result}`);
        } catch {
            speak("Sorry, I couldn't calculate that.");
        }
    
    // Set Alarm (Timer)
    } else if (input.includes("set alarm for")) {
        let time = input.match(/\d+ (am|pm)/);
        if (time) {
            speak(`Alarm set for ${time[0]}`);
            setTimeout(() => { alert("⏰ Alarm ringing!"); }, 5000); // (Demo 5 sec)
        } else {
            speak("Please specify a valid time.");
        }

    // Call Feature (Dial a number)
    } else if (input.includes("call")) {
        let contact = input.replace("call", "").trim();
        speak(`Calling ${contact}`);
        window.open(`tel:${contact}`, "_self");

    // Play Song
    } else if (input.includes("play song")) {
        let song = input.replace("play song", "").trim();
        if (song) {
            speak(`Playing ${song} on YouTube.`);
            window.open(`https://www.youtube.com/results?search_query=${song}`, "_blank");
        } else {
            speak("Please say a song name.");
        }

    // Fun Responses
    } else if (input.includes("how are you")) {
        speak("I'm fine, what about you?");
    } else if (input.includes("tell me a joke")) {
        speak("Why did the computer catch a cold? Because it left its Windows open!");
    
    } else {
        speak("I didn't understand that, boss.");
    }
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}