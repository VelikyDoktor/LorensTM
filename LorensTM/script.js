// Функция для ИИ
async function askAI() {
    const input = document.getElementById('userInput');
    const responseEl = document.getElementById('response');
    
    if (!input || !input.value.trim()) return;
    
    const message = input.value;
    if (responseEl) responseEl.innerText = "Думаю...";

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        if (responseEl) responseEl.innerText = data.reply || data.error;
    } catch (err) {
        if (responseEl) responseEl.innerText = "Ошибка связи с сервером";
        console.error(err);
    }
}

// Функция для калькулятора
function addManualEntry() {
    const p = parseFloat(document.getElementById('manual-p')?.value) || 0;
    const f = parseFloat(document.getElementById('manual-f')?.value) || 0;
    const c = parseFloat(document.getElementById('manual-c')?.value) || 0;
    const w = parseFloat(document.getElementById('manual-weight')?.value) || 0;

    if (w === 0) return;

    const calories = ((p * 4) + (f * 9) + (c * 4)) * (w / 100);
    const display = document.getElementById('manual-result');
    if (display) {
        display.innerText = `Результат: ${calories.toFixed(1)} ккал`;
    }
}

// Настройка Enter
document.addEventListener('DOMContentLoaded', () => {
    // Для поля ИИ (обрати внимание на ID 'userInput' из твоего HTML)
    const aiInput = document.getElementById('userInput');
    if (aiInput) {
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') askAI();
        });
    }

    // Для полей калькулятора
    const manualIds = ['manual-p', 'manual-f', 'manual-c', 'manual-weight'];
    manualIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') addManualEntry();
            });
        }
    });
});
