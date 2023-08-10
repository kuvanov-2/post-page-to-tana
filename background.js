chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "pageInfo") {
    chrome.storage.sync.get(["targetNodeId", "superTagIds"], (data) => {
      const payload = {
        targetNodeId: data.targetNodeId || "",
        nodes: [
          {
            name: `[${tab.title}](${tab.url})`,
            supertags: data.superTagIds.map((id) => ({ id: id })),
          },
        ],
      };

      const endpoint =
        data.endpoint ||
        "https://europe-west1-tagr-prod.cloudfunctions.net/addToNodeV2"; // デフォルトエンドポイント
      const token = data.apiToken || ""; // API Token

      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("POST successful:", data);
        })
        .catch((error) => {
          console.error("POST error:", error);
        });
    });
  }
});
