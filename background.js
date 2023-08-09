chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get(["targetNodeId", "superTagId", "endpoint", "apiToken"], (data) => {
      const payload = {
        targetNodeId: data.targetNodeId || "",
        nodes: [
          {
            name: `[${tab.title}](${tab.url})`,
            supertags: [
              {
                id: data.superTagId || "",
              },
            ],
          },
        ],
      };
  
      const endpoint = data.endpoint || "https://europe-west1-tagr-prod.cloudfunctions.net/addToNodeV2"; // デフォルトエンドポイント
      const token = data.apiToken || ""; // API Token
  
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
          console.log("POST successful:", data);
        })
        .catch(error => {
          console.error("POST error:", error);
        });
    });
  });
  