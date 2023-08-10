document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("options-form");
  const saveButton = document.getElementById("save-button");
  const addSuperTagButton = document.getElementById("addSuperTag");
  const superTagInputs = document.getElementById("superTagInputs");

  addSuperTagButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.name = "superTagId";
    superTagInputs.appendChild(input);
  });

  saveButton.addEventListener("click", () => {
    const endpoint = document.getElementById("endpoint").value;
    const apiToken = document.getElementById("apiToken").value;
    const targetNodeId = document.getElementById("targetNodeId").value;
    const superTagIdInputs = document.getElementsByName("superTagId");
    const superTagIds = Array.from(superTagIdInputs).map(input => input.value).filter(value => value !== "");

    chrome.storage.sync.set(
      {
        endpoint: endpoint,
        apiToken: apiToken,
        targetNodeId: targetNodeId,
        superTagIds: superTagIds,
      },
      () => {
        console.log(
          "Options saved:",
          endpoint,
          apiToken,
          targetNodeId,
          superTagIds
        );
      }
    );
  });

  chrome.storage.sync.get(
    ["endpoint", "apiToken", "targetNodeId", "superTagId"],
    (data) => {
      document.getElementById("endpoint").value = data.endpoint || "";
      document.getElementById("apiToken").value = data.apiToken || "";
      document.getElementById("targetNodeId").value = data.targetNodeId || "";
      document.getElementById("superTagId").value = data.superTagId || "";
    }
  );
});
