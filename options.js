document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("options-form");
  const saveButton = document.getElementById("save-button");

  saveButton.addEventListener("click", () => {
    const endpoint = document.getElementById("endpoint").value;
    const apiToken = document.getElementById("apiToken").value;
    const targetNodeId = document.getElementById("targetNodeId").value;
    const superTagId = document.getElementById("superTagId").value;

    chrome.storage.sync.set({
      endpoint: endpoint,
      apiToken: apiToken,
      targetNodeId: targetNodeId,
      superTagId: superTagId
    }, () => {
      console.log("Options saved:", endpoint, apiToken, targetNodeId, superTagId);
    });
  });

  chrome.storage.sync.get(["endpoint", "apiToken", "targetNodeId", "superTagId"], (data) => {
    document.getElementById("endpoint").value = data.endpoint || "";
    document.getElementById("apiToken").value = data.apiToken || "";
    document.getElementById("targetNodeId").value = data.targetNodeId || "";
    document.getElementById("superTagId").value = data.superTagId || "";
  });
});
