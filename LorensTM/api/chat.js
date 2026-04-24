export default async function handler(req, res) {
    // Разрешаем только POST запросы
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешен' });
    }

    const { message } = req.body;
    const apiKey = process.env.AI_SECRET_KEY;

    // Проверка, что ключ вообще есть в настройках Vercel
    if (!apiKey) {
        return res.status(500).json({ error: 'API ключ не найден в настройках Vercel' });
    }

    try {
        // Используем стабильную версию v1 вместо v1beta
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        const data = await response.json();

        // Если Google вернул ошибку (например, по ключу)
        if (data.error) {
            console.error('Ошибка от Google API:', data.error);
            return res.status(500).json({ error: data.error.message });
        }

        const aiText = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply: aiText });

    } catch (error) {
        console.error('Системная ошибка:', error);
        res.status(500).json({ error: 'Не удалось связаться с ИИ' });
    }
}
