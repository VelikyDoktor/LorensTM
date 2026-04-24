// Файл: api/chat.js
export default async function handler(req, res) {
    // Проверяем, что запрос пришел правильным методом
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешен' });
    }

    const userMessage = req.body.message;
    
    // Вот здесь мы берем секретный ключ из безопасного хранилища Vercel
    const apiKey = process.env.AI_SECRET_KEY; 

    try {
        // Делаем запрос к ИИ (для примера взята структура, похожая на OpenAI/Groq)
        const aiResponse = await fetch('URL_АПИ_ВЫБРАННОЙ_НЕЙРОСЕТИ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` 
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        const data = await aiResponse.json();
        
        // Вытаскиваем ответ ИИ и отправляем обратно на наш сайт
        const reply = data.choices[0].message.content;
        res.status(200).json({ reply: reply });

    } catch (error) {
        res.status(500).json({ error: 'Проблема со связью с ИИ' });
    }
}