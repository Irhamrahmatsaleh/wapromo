"use client";

import { useState } from "react";

const SNIPPETS = {
  curl: {
    lang: "bash",
    code: `curl -X POST https://api.wapromo.id/v1/messages/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "6281234567890",
    "type": "text",
    "text": {
      "body": "Halo! Pesanan #WA-8821 sudah dikirim. Resi: JNE9918237."
    }
  }'`,
  },
  js: {
    lang: "javascript",
    code: `const response = await fetch("https://api.wapromo.id/v1/messages/send", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    to: "6281234567890",
    type: "text",
    text: {
      body: "Halo! Pesanan #WA-8821 sudah dikirim. Resi: JNE9918237."
    }
  })
});

const result = await response.json();
console.log(result.message_id, result.status);`,
  },
  python: {
    lang: "python",
    code: `import requests

url = "https://api.wapromo.id/v1/messages/send"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "to": "6281234567890",
    "type": "text",
    "text": {
        "body": "Halo! Pesanan #WA-8821 sudah dikirim. Resi: JNE9918237."
    }
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,
  },
  php: {
    lang: "php",
    code: `<?php
$ch = curl_init("https://api.wapromo.id/v1/messages/send");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY",
        "Content-Type: application/json"
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "to" => "6281234567890",
        "type" => "text",
        "text" => [
            "body" => "Halo! Pesanan #WA-8821 sudah dikirim. Resi: JNE9918237."
        ]
    ]),
    CURLOPT_RETURNTRANSFER => true
]);
$result = json_decode(curl_exec($ch), true);
curl_close($ch);`,
  },
};

type TabKey = keyof typeof SNIPPETS;

interface ApiCodeTabsProps {
  copiedLabel?: string;
}

export function ApiCodeTabs({ copiedLabel = "Tersalin!" }: ApiCodeTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("curl");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPETS[activeTab].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API not available
    }
  };

  return (
    <div className="api-code-window" aria-label="Contoh Kode API">
      <div className="api-code-header">
        <div className="api-code-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="api-code-tabs" role="tablist">
          {(["curl", "js", "python", "php"] as TabKey[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`api-tab-btn${activeTab === tab ? " is-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "curl"
                ? "cURL"
                : tab === "js"
                ? "Node.js"
                : tab === "python"
                ? "Python"
                : "PHP"}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="api-copy-btn"
          onClick={handleCopy}
          aria-label={copied ? copiedLabel : "Copy code"}
        >
          {copied ? (
            <span className="api-copied-indicator">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{copiedLabel}</span>
            </span>
          ) : (
            <span className="api-copy-indicator">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>Copy</span>
            </span>
          )}
        </button>
      </div>
      <div className="api-code-body">
        <pre tabIndex={0}>
          <code>{SNIPPETS[activeTab].code}</code>
        </pre>
      </div>
    </div>
  );
}
