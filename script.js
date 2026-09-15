/* =========================================================
   M POPAL'S AI CHAT
   PHASE 1 — PREMIUM UI ENGINE
   ========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
   ========================================================= */

const sidebar =
    document.getElementById("sidebar");

const sidebarClose =
    document.getElementById("sidebarClose");

const menuButton =
    document.getElementById("menuButton");

const sidebarToggle =
    document.getElementById("sidebarToggle");

const mobileOverlay =
    document.getElementById("mobileOverlay");


const newChatButton =
    document.getElementById("newChatButton");

const topNewChatButton =
    document.getElementById("topNewChatButton");


const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const composer =
    document.getElementById("composer");

const composerGlow =
    document.getElementById("composerGlow");

const messagesContainer =
    document.getElementById("messagesContainer");

const welcomeScreen =
    document.getElementById("welcomeScreen");


const searchButton =
    document.getElementById("searchButton");

const topSearchButton =
    document.getElementById("topSearchButton");

const sidebarSearchButton =
    document.getElementById(
        "sidebarSearchButton"
    );


const searchPanel =
    document.getElementById("searchPanel");

const closeSearchPanel =
    document.getElementById(
        "closeSearchPanel"
    );

const chatSearchInput =
    document.getElementById(
        "chatSearchInput"
    );


const settingsButton =
    document.getElementById(
        "settingsButton"
    );

const settingsPanel =
    document.getElementById(
        "settingsPanel"
    );

const closeSettings =
    document.getElementById(
        "closeSettings"
    );


const helpButton =
    document.getElementById("helpButton");

const helpPanel =
    document.getElementById("helpPanel");

const closeHelp =
    document.getElementById("closeHelp");


const modelSelector =
    document.getElementById(
        "modelSelector"
    );

const modelMenu =
    document.getElementById("modelMenu");


const moreButton =
    document.getElementById("moreButton");

const moreMenu =
    document.getElementById("moreMenu");


const topbar =
    document.querySelector(".topbar");


const modeButton =
    document.getElementById("modeButton");


const attachButton =
    document.getElementById(
        "attachButton"
    );


const voiceButton =
    document.getElementById(
        "voiceButton"
    );


const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );

const modalCancel =
    document.getElementById(
        "modalCancel"
    );

const modalConfirm =
    document.getElementById(
        "modalConfirm"
    );


const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById(
        "toastMessage"
    );


const historyItems =
    document.getElementById(
        "historyItems"
    );


/* =========================================================
   STATE
   ========================================================= */

let conversation = [];

let currentModel =
    "M POPAL'S AI";

let searchMode = false;

let sidebarCollapsed = false;

let currentChatId =
    createId();


/* =========================================================
   HELPERS
   ========================================================= */

function createId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}


function escapeHTML(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function scrollChatToBottom() {

    const chatPage =
        document.getElementById(
            "chatPage"
        );

    requestAnimationFrame(() => {

        chatPage.scrollTo({

            top:
                chatPage.scrollHeight,

            behavior:
                "smooth"
        });

    });
}


function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(
        window.__toastTimer
    );

    window.__toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2200);
}


/* =========================================================
   SIDEBAR
   ========================================================= */

function openMobileSidebar() {

    sidebar.classList.add("open");

    mobileOverlay.classList.add(
        "active"
    );
}


function closeMobileSidebar() {

    sidebar.classList.remove(
        "open"
    );

    mobileOverlay.classList.remove(
        "active"
    );
}


menuButton.addEventListener(
    "click",
    openMobileSidebar
);


sidebarClose.addEventListener(
    "click",
    closeMobileSidebar
);


mobileOverlay.addEventListener(
    "click",
    closeMobileSidebar
);


sidebarToggle.addEventListener(
    "click",
    () => {

        sidebarCollapsed =
            !sidebarCollapsed;

        sidebar.classList.toggle(
            "collapsed",
            sidebarCollapsed
        );

    }
);


/* =========================================================
   MENUS
   ========================================================= */

function closeFloatingMenus() {

    modelMenu.classList.remove(
        "open"
    );

    moreMenu.classList.remove(
        "open"
    );
}


modelSelector.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        moreMenu.classList.remove(
            "open"
        );

        modelMenu.classList.toggle(
            "open"
        );

    }
);


moreButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        modelMenu.classList.remove(
            "open"
        );

        moreMenu.classList.toggle(
            "open"
        );

    }
);


document.addEventListener(
    "click",
    event => {

        if (
            !modelMenu.contains(event.target) &&
            !modelSelector.contains(event.target)
        ) {

            modelMenu.classList.remove(
                "open"
            );

        }

        if (
            !moreMenu.contains(event.target) &&
            !moreButton.contains(event.target)
        ) {

            moreMenu.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   MODEL SELECTION
   ========================================================= */

document
    .querySelectorAll(
        "[data-model]"
    )
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const model =
                    item.dataset.model;

                currentModel =
                    model;

                const modelName =
                    document.querySelector(
                        ".model-name"
                    );

                modelName.textContent =
                    model;


                document
                    .querySelectorAll(
                        ".floating-menu-item[data-model]"
                    )
                    .forEach(option => {

                        option.classList.remove(
                            "selected"
                        );

                    });


                item.classList.add(
                    "selected"
                );


                closeFloatingMenus();

                showToast(
                    `${model} selected`
                );

            }
        );

    });


/* =========================================================
   INPUT
   ========================================================= */

function resizeInput() {

    messageInput.style.height =
        "auto";

    const height =
        Math.min(
            messageInput.scrollHeight,
            180
        );

    messageInput.style.height =
        height + "px";
}


function updateComposerState() {

    const hasText =
        messageInput.value.trim()
        .length > 0;


    sendButton.disabled =
        !hasText;


    composer.classList.toggle(
        "typing",
        hasText
    );


    composerGlow.classList.toggle(
        "active",
        hasText
    );
}


messageInput.addEventListener(
    "input",
    () => {

        resizeInput();

        updateComposerState();

    }
);


/* =========================================================
   SEND MESSAGE
   ========================================================= */

function sendMessage() {

    const text =
        messageInput.value.trim();


    if (!text) {
        return;
    }


    if (welcomeScreen) {

        welcomeScreen.style.display =
            "none";

    }


    const userMessage = {

        id:
            createId(),

        role:
            "user",

        content:
            text,

        timestamp:
            Date.now()

    };


    conversation.push(
        userMessage
    );


    renderUserMessage(
        userMessage
    );


    addHistoryItem(
        text
    );


    messageInput.value = "";

    resizeInput();

    updateComposerState();


    /*
       TEMPORARY RESPONSE

       This is only the UI phase.

       Real AI API connection comes later.
    */

    setTimeout(
        () => {

            const aiMessage = {

                id:
                    createId(),

                role:
                    "assistant",

                content:
                    generateDemoResponse(text),

                timestamp:
                    Date.now()

            };


            conversation.push(
                aiMessage
            );


            renderAIMessage(
                aiMessage
            );

        },
        650
    );

}


sendButton.addEventListener(
    "click",
    sendMessage
);


/* =========================================================
   ENTER / SHIFT ENTER
   ========================================================= */

messageInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================================
   DEMO AI RESPONSE
   ========================================================= */

function generateDemoResponse(text) {

    const lower =
        text.toLowerCase();


    if (
        lower.includes("hello") ||
        lower.includes("hi")
    ) {

        return (
            "Hello! 👋\n\n" +
            "Welcome to M POPAL'S AI CHAT."
        );

    }


    if (
        lower.includes("who are you")
    ) {

        return (
            "I am M POPAL'S AI CHAT.\n\n" +
            "The AI engine and web search " +
            "will be connected in the next phase."
        );

    }


    return (
        "Your message was received successfully.\n\n" +
        "M POPAL'S AI is currently running " +
        "in UI/demo mode. The real AI model " +
        "will be connected in the next phase."
    );
}


/* =========================================================
   USER MESSAGE RENDER
   ========================================================= */

function renderUserMessage(message) {

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "message user-message";


    const bubble =
        document.createElement(
            "div"
        );

    bubble.className =
        "user-bubble";


    bubble.textContent =
        message.content;


    wrapper.appendChild(
        bubble
    );


    messagesContainer.appendChild(
        wrapper
    );


    scrollChatToBottom();
}


/* =========================================================
   AI MESSAGE RENDER
   ========================================================= */

function renderAIMessage(message) {

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "message ai-message";


    const avatar =
        document.createElement(
            "div"
        );

    avatar.className =
        "ai-avatar";

    avatar.textContent =
        "M";


    const content =
        document.createElement(
            "div"
        );

    content.className =
        "ai-content";

    content.textContent =
        message.content;


    wrapper.appendChild(
        avatar
    );

    wrapper.appendChild(
        content
    );


    messagesContainer.appendChild(
        wrapper
    );


    scrollChatToBottom();
}


/* =========================================================
   NEW CHAT
   ========================================================= */

function startNewChat() {

    conversation = [];

    currentChatId =
        createId();


    messagesContainer.innerHTML =
        "";


    welcomeScreen.style.display =
        "";


    messageInput.value =
        "";


    resizeInput();

    updateComposerState();

    closeFloatingMenus();

    closeMobileSidebar();

    showToast(
        "New chat started"
    );

}


newChatButton.addEventListener(
    "click",
    startNewChat
);


topNewChatButton.addEventListener(
    "click",
    startNewChat
);


/* =========================================================
   QUICK PROMPTS
   ========================================================= */

document
    .querySelectorAll(
        ".quick-prompt"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const prompt =
                    button.dataset.prompt;

                messageInput.value =
                    prompt;

                resizeInput();

                updateComposerState();

                messageInput.focus();

            }
        );

    });


/* =========================================================
   SEARCH PANEL
   ========================================================= */

function openSearchPanel() {

    searchPanel.classList.add(
        "open"
    );

    setTimeout(
        () => {

            chatSearchInput.focus();

        },
        250
    );

}


function closeSearch() {

    searchPanel.classList.remove(
        "open"
    );

    chatSearchInput.value =
        "";

}


sidebarSearchButton.addEventListener(
    "click",
    openSearchPanel
);


topSearchButton.addEventListener(
    "click",
    openSearchPanel
);


closeSearchPanel.addEventListener(
    "click",
    closeSearch
);


/* =========================================================
   SEARCH CHAT
   ========================================================= */

chatSearchInput.addEventListener(
    "input",
    () => {

        const query =
            chatSearchInput.value
                .trim()
                .toLowerCase();


        const results =
            document.getElementById(
                "searchResults"
            );


        if (!query) {

            results.innerHTML = `

                <div class="empty-search">

                    <span>⌕</span>

                    <p>
                        Search your conversations
                    </p>

                </div>

            `;

            return;
        }


        const matches =
            conversation.filter(
                item =>
                    item.content
                        .toLowerCase()
                        .includes(query)
            );


        if (!matches.length) {

            results.innerHTML = `

                <div class="empty-search">

                    <span>⌕</span>

                    <p>
                        No matching messages
                    </p>

                </div>

            `;

            return;
        }


        results.innerHTML =
            matches
                .map(
                    item => `

                    <button
                        class="history-item"
                        style="margin: 4px 18px; width: calc(100% - 36px);"
                    >

                        <span class="history-icon">
                            ◌
                        </span>

                        <span class="history-title-text">
                            ${escapeHTML(
                                item.content
                            )}
                        </span>

                    </button>

                `
                )
                .join("");

    }
);


/* =========================================================
   SETTINGS
   ========================================================= */

settingsButton.addEventListener(
    "click",
    () => {

        settingsPanel.classList.add(
            "open"
        );

        closeMobileSidebar();

    }
);


closeSettings.addEventListener(
    "click",
    () => {

        settingsPanel.classList.remove(
            "open"
        );

    }
);


/* =========================================================
   HELP
   ========================================================= */

helpButton.addEventListener(
    "click",
    () => {

        helpPanel.classList.add(
            "open"
        );

        closeMobileSidebar();

    }
);


closeHelp.addEventListener(
    "click",
    () => {

        helpPanel.classList.remove(
            "open"
        );

    }
);


/* =========================================================
   SEARCH MODE
   ========================================================= */

searchButton.addEventListener(
    "click",
    () => {

        searchMode =
            !searchMode;


        searchButton.classList.toggle(
            "active",
            searchMode
        );


        if (searchMode) {

            messageInput.placeholder =
                "Search the web...";

            showToast(
                "Web search mode enabled"
            );

        } else {

            messageInput.placeholder =
                "Message M POPAL'S AI...";

        }

    }
);


/* =========================================================
   ATTACHMENT
   ========================================================= */

attachButton.addEventListener(
    "click",
    () => {

        showToast(
            "File upload will be added later"
        );

    }
);


/* =========================================================
   VOICE
   ========================================================= */

voiceButton.addEventListener(
    "click",
    () => {

        showToast(
            "Voice input will be added later"
        );

    }
);


/* =========================================================
   MODE BUTTON
   ========================================================= */

modeButton.addEventListener(
    "click",
    () => {

        showToast(
            "Standard mode selected"
        );

    }
);


/* =========================================================
   HISTORY
   ========================================================= */

function addHistoryItem(text) {

    const existing =
        historyItems.querySelector(
            ".history-item.active"
        );


    if (
        existing &&
        existing
            .querySelector(
                ".history-title-text"
            )
            ?.textContent ===
            "New conversation"
    ) {

        existing.remove();

    }


    const item =
        document.createElement(
            "button"
        );

    item.className =
        "history-item active";


    item.innerHTML = `

        <span class="history-icon">
            ◌
        </span>

        <span class="history-title-text">
            ${escapeHTML(
                text
            )}
        </span>

    `;


    historyItems.prepend(
        item
    );


    historyItems
        .querySelectorAll(
            ".history-item"
        )
        .forEach(
            element => {

                element.classList.remove(
                    "active"
                );

            }
        );


    item.classList.add(
        "active"
    );

}


/* =========================================================
   MORE MENU — CLEAR
   ========================================================= */

const dangerButton =
    document.querySelector(
        ".floating-menu-item.danger"
    );


if (dangerButton) {

    dangerButton.addEventListener(
        "click",
        () => {

            closeFloatingMenus();

            modalOverlay.classList.add(
                "open"
            );

        }
    );

}


modalCancel.addEventListener(
    "click",
    () => {

        modalOverlay.classList.remove(
            "open"
        );

    }
);


modalConfirm.addEventListener(
    "click",
    () => {

        conversation = [];

        messagesContainer.innerHTML =
            "";

        welcomeScreen.style.display =
            "";

        modalOverlay.classList.remove(
            "open"
        );

        showToast(
            "Conversation cleared"
        );

    }
);


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMobileSidebar();

            closeSearch();

            settingsPanel.classList.remove(
                "open"
            );

            helpPanel.classList.remove(
                "open"
            );

            modalOverlay.classList.remove(
                "open"
            );

            closeFloatingMenus();

        }

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

resizeInput();

updateComposerState();


console.log(
    "M POPAL'S AI CHAT — Premium UI loaded."
);
