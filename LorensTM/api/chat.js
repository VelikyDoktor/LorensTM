export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.AI_SECRET_KEY;
  const { message } = req.body;

  if (!apiKey) return res.status(500).json({ error: 'Ключ AI_SECRET_KEY не найден в Vercel' });

  try {
    // Используем v1 и прямую ссылку на модель
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();

    // Если Google вернул ошибку (например, ключ не активен или лимиты)
    if (data.error) {
      console.error('Детали ошибки Google:', JSON.stringify(data.error, null, 2));
      return res.status(response.status).json({ 
        error: `Google API Error: ${data.error.message}`,
        code: data.error.code 
      });
    }

    if (data.candidates && data.candidates[0].content) {
      const reply = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ reply });
    }

    return res.status(500).json({ error: 'Неожиданный формат ответа от ИИ' });

  } catch (err) {
    console.error('Ошибка выполнения функции:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера: ' + err.message });
  }
}
