/* =========================================
   M POPAL'S AI CHAT
   PHASE 1
========================================= */


const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const chatArea =
    document.getElementById("chatArea");

const newChat =
    document.getElementById("newChat");

const topNewChat =
    document.getElementById("topNewChat");

const menuButton =
    document.getElementById("menuButton");

const closeSidebar =
    document.getElementById("closeSidebar");

const sidebar =
    document.getElementById("sidebar");

const searchButton =
    document.getElementById("searchButton");


/* =========================================
   USER COLOR SYSTEM
========================================= */

const userColors = [
    "yellow",
    "blue",
    "pink"
];

let colorIndex = 0;


function getNextUserColor() {

    const color =
        userColors[colorIndex];

    colorIndex++;

    if (
        colorIndex >=
        userColors.length
    ) {

        colorIndex = 0;
    }

    return color;
}


/* =========================================
   TEXTAREA
========================================= */

function resizeTextarea() {

    messageInput.style.height =
        "auto";

    messageInput.style.height =
        Math.min(
            messageInput.scrollHeight,
            180
        ) + "px";
}


messageInput.addEventListener(
    "input",
    resizeTextarea
);


/* =========================================
   SEND BUTTON
========================================= */

function updateSendButton() {

    sendButton.disabled =
        messageInput.value.trim()
        === "";
}


messageInput.addEventListener(
    "input",
    updateSendButton
);


/* =========================================
   USER MESSAGE
========================================= */

function addUserMessage(text) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message user-message";


    const bubble =
        document.createElement("div");

    bubble.className =
        "user-bubble " +
        getNextUserColor();

    bubble.textContent =
        text;


    wrapper.appendChild(
        bubble
    );


    chatArea.appendChild(
        wrapper
    );


    scrollToBottom();
}


/* =========================================
   AI MESSAGE
========================================= */

function addAIMessage(text) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message ai-message";


    const avatar =
        document.createElement("div");

    avatar.className =
        "ai-avatar";

    avatar.textContent =
        "M";


    const content =
        document.createElement("div");

    content.className =
        "ai-content";

    content.textContent =
        text;


    wrapper.appendChild(
        avatar
    );

    wrapper.appendChild(
        content
    );


    chatArea.appendChild(
        wrapper
    );


    scrollToBottom();
}


/* =========================================
   SEND
========================================= */

function sendMessage() {

    const text =
        messageInput.value.trim();


    if (!text) {
        return;
    }


    const welcome =
        document.getElementById(
            "welcome"
        );


    if (welcome) {

        welcome.style.display =
            "none";
    }


    addUserMessage(
        text
    );


    messageInput.value = "";

    resizeTextarea();

    updateSendButton();


    /*
        TEMPORARY PHASE 1 RESPONSE.

        Real AI will be connected
        in a later phase.
    */

    setTimeout(() => {

        addAIMessage(
            "M POPAL'S AI is ready. The real AI model and web search will be connected in the next phase."
        );

    }, 500);
}


/* =========================================
   SEND BUTTON CLICK
========================================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


/* =========================================
   ENTER
========================================= */

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }

    }
);


/* =========================================
   NEW CHAT
========================================= */

function startNewChat() {

    chatArea.innerHTML = `

        <div
            class="welcome"
            id="welcome">

            <div class="main-logo">
                M
            </div>

            <h1>
                How can I help you?
            </h1>

            <p>
                Ask M POPAL'S AI anything.
            </p>

            <div class="suggestions">

                <button class="suggestion">
                    <span>✦</span>
                    Explain something
                </button>

                <button class="suggestion">
                    <span>⌕</span>
                    Search the web
                </button>

                <button class="suggestion">
                    <span>✎</span>
                    Help me write
                </button>

                <button class="suggestion">
                    <span>◇</span>
                    Help me learn
                </button>

            </div>

        </div>

    `;


    messageInput.value = "";

    resizeTextarea();

    updateSendButton();

    bindSuggestions();

    closeMobileSidebar();
}


newChat.addEventListener(
    "click",
    startNewChat
);


topNewChat.addEventListener(
    "click",
    startNewChat
);


/* =========================================
   SUGGESTIONS
========================================= */

function bindSuggestions() {

    const buttons =
        document.querySelectorAll(
            ".suggestion"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function() {

                const text =
                    this.innerText
                        .replace(
                            /\n/g,
                            " "
                        )
                        .trim();


                messageInput.value =
                    text;

                resizeTextarea();

                updateSendButton();

                messageInput.focus();
            }
        );

    });
}


bindSuggestions();


/* =========================================
   MOBILE SIDEBAR
========================================= */

menuButton.addEventListener(
    "click",
    function() {

        sidebar.classList.add(
            "open"
        );

    }
);


closeSidebar.addEventListener(
    "click",
    closeMobileSidebar
);


function closeMobileSidebar() {

    sidebar.classList.remove(
        "open"
    );
}


/* =========================================
   SEARCH MODE
========================================= */

let searchMode = false;


searchButton.addEventListener(
    "click",
    function() {

        searchMode =
            !searchMode;


        searchButton.classList.toggle(
            "search-active",
            searchMode
        );


        if (searchMode) {

            messageInput.placeholder =
                "Search the web...";

        } else {

            messageInput.placeholder =
                "Message M POPAL'S AI...";
        }


        messageInput.focus();
    }
);


/* =========================================
   SCROLL
========================================= */

function scrollToBottom() {

    setTimeout(() => {

        chatArea.scrollTo({

            top:
                chatArea.scrollHeight,

            behavior:
                "smooth"
        });

    }, 50);
}


/* =========================================
   START
========================================= */

resizeTextarea();

updateSendButton();

console.log(
    "M POPAL'S AI CHAT - Phase 1 loaded."
);
