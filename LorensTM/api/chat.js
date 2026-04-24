export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

    const apiKey = process.env.AI_SECRET_KEY;
    const { message } = req.body;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "Ты помощник по расчету калорий, составу БЖУ продуктов и блюд, питанию, ЗОЖ и спорту для похудения. Отвечай кратко и на русском языке. Добавляй в конце каждого ответа интересную цитату про здоровье" },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        const reply = data.choices[0].message.content;
        return res.status(200).json({ reply });

    } catch (err) {
        return res.status(500).json({ error: 'Ошибка Groq: ' + err.message });
    }
}
