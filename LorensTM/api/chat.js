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
// Функция для ИИ чата по Enter
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage(); // Вызываем твою основную функцию отправки
    }
});

// Функция для ручного ввода по Enter (в любом из полей)
const manualInputs = ['manual-p', 'manual-f', 'manual-c', 'manual-weight'];
manualInputs.forEach(id => {
    document.getElementById(id).addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addManualEntry();
        }
    });
});

// Логика добавления данных вручную
function addManualEntry() {
    const p = parseFloat(document.getElementById('manual-p').value) || 0;
    const f = parseFloat(document.getElementById('manual-f').value) || 0;
    const c = parseFloat(document.getElementById('manual-c').value) || 0;
    const w = parseFloat(document.getElementById('manual-weight').value) || 100;

    const calories = ((p * 4) + (f * 9) + (c * 4)) * (w / 100);
    
    // Здесь добавь вызов функции, которая отрисовывает строку в твоей таблице результатов
    console.log(`Добавлено: ${calories.toFixed(1)} ккал`);
    
    // Очистка полей
    manualInputs.forEach(id => document.getElementById(id).value = '');
}
