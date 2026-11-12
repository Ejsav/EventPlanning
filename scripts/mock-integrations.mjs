// Local stand-in for Resend and a CRM webhook, for verifying lead delivery
// end to end without real credentials. Writes every request to .data/mock-requests.ndjson.
// Usage: node scripts/mock-integrations.mjs   (listens on :4010)
//   RESEND_API_BASE=http://localhost:4010 RESEND_API_KEY=test INQUIRY_TO_EMAIL=team@example.com \
//   INQUIRY_FROM_EMAIL="Sound & Stone <hello@example.com>" LEAD_WEBHOOK_URL=http://localhost:4010/hook npm run build && npm start
import http from "node:http";
import { appendFileSync, mkdirSync } from "node:fs";

mkdirSync(".data", { recursive: true });
const failWebhook = process.env.MOCK_FAIL_WEBHOOK === "1";
const failEmail = process.env.MOCK_FAIL_EMAIL === "1";
http
  .createServer((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      appendFileSync(".data/mock-requests.ndjson", JSON.stringify({ path: req.url, headers: { authorization: req.headers.authorization, "x-webhook-secret": req.headers["x-webhook-secret"] }, body: JSON.parse(body || "{}") }) + "\n");
      const fail = (req.url === "/hook" && failWebhook) || (req.url === "/emails" && failEmail);
      res.writeHead(fail ? 500 : 200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(fail ? { error: "mock failure" } : { id: "mock_" + Date.now() }));
    });
  })
  .listen(4010, () => console.log("mock integrations on :4010"));
