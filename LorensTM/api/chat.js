export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

    const apiKey = process.env.AI_SECRET_KEY;
    const { message } = req.body;

    // ПРОВЕРКА КЛЮЧА: если ключа нет, мы увидим это в логах
    if (!apiKey) {
        console.error("ОШИБКА: API ключ AI_SECRET_KEY не найден в переменных окружения Vercel!");
        return res.status(500).json({ error: 'Ключ не настроен в Vercel' });
    }

    try {
        // ВНИМАНИЕ: Используем v1beta и правильное имя модели
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();

        // Если Google прислал ошибку (например, 404 или 400)
        if (data.error) {
            console.error("Google API Error:", data.error);
            return res.status(data.error.code || 500).json({ error: data.error.message });
        }

        if (data.candidates && data.candidates[0].content) {
            const reply = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply });
        }

        return res.status(500).json({ error: 'ИИ прислал пустой ответ' });

    } catch (err) {
        console.error("System Error:", err);
        return res.status(500).json({ error: 'Ошибка сервера: ' + err.message });
    }
}
