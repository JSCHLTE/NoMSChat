let observer;

function getChatElement() {
  return document.querySelector("iframe");
}

function hideChat() {
  const chat = getChatElement();
  if (chat) {
    chat.style.display = "none";
  }
}

function showChat() {
  const chat = getChatElement();
  if (chat) {
    chat.style.display = "";
  }
}

function start() {
  hideChat();

  observer = new MutationObserver(hideChat);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function stop() {
  if (observer) observer.disconnect();
  showChat();
}

// Load initial state
chrome.storage.local.get(["enabled"], (result) => {
  if (result.enabled ?? true) {
    start();
  }
});

// Listen for instant toggle messages
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "TOGGLE_CHAT") {
    if (message.enabled) {
      start();
    } else {
      stop();
    }
  }
});