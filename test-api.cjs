async function main() {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Hello, reply with OK" }] }]
    })
  });
  const data = await response.json();
  console.log(data);
}
main();
