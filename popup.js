const toggle = document.getElementById("toggle");

// Load saved state
chrome.storage.local.get(["enabled"], (result) => {
  toggle.checked = result.enabled ?? true;
});

// When toggled
toggle.addEventListener("change", async () => {
  const enabled = toggle.checked;

  // Save state
  chrome.storage.local.set({ enabled });

  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send message to content script
  chrome.tabs.sendMessage(tab.id, {
    type: "TOGGLE_CHAT",
    enabled
  });
});