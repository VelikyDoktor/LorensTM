export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { message } = req.body;
    const apiKey = process.env.AI_SECRET_KEY; // Тот ключ, который ты сохранишь в Vercel

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Ты помощник по диетологии. Ответь кратко: ${message}` }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        res.status(200).json({ reply: aiText });
    } catch (error) {
        res.status(500).json({ error: "Ошибка ИИ" });
    }
}
