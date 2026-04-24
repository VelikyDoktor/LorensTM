xport default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

    const apiKey = process.env.AI_SECRET_KEY;
    const { message } = req.body;

    try {
        // Меняем v1 на v1beta — это решит проблему "model not found"
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();

        // Проверка на ошибки от самого Google
        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        // Извлекаем ответ
        if (data.candidates && data.candidates[0].content) {
            const reply = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply });
        } else {
            return res.status(500).json({ error: 'ИИ прислал пустой ответ' });
        }

    } catch (err) {
        return res.status(500).json({ error: 'Ошибка сервера: ' + err.message });
    }
}
