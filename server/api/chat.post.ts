export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const apiKey = process.env.OPENAI_API_KEY;
  const response = await $fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: body.message }],
    },
  });

  return response;
});
