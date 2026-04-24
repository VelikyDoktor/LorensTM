document.addEventListener('DOMContentLoaded', () => {
    // Список всех ID полей
    const ids = ['manual-p', 'manual-f', 'manual-c', 'manual-weight', 'user-input'];
    
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (id === 'user-input') {
                        // ПРОВЕРЬ ТУТ: если у тебя кнопка "Спросить" вызывает другую функцию, 
                        // замени sendMessage() на её имя (например, askAI() или sendRequest())
                        if (typeof sendMessage === "function") sendMessage();
                        else if (typeof askAI === "function") askAI();
                        else console.error("Функция отправки сообщения не найдена!");
                    } else {
                        addManualEntry() 
                        {
    const p = parseFloat(document.getElementById('manual-p').value) || 0;
    const f = parseFloat(document.getElementById('manual-f').value) || 0;
    const c = parseFloat(document.getElementById('manual-c').value) || 0;
    const w = parseFloat(document.getElementById('manual-weight').value) || 0;

    if (w === 0) return; // Чтобы не считать пустые поля

    const calories = ((p * 4) + (f * 9) + (c * 4)) * (w / 100);

    // Пишем результат на страницу вместо alert
    const display = document.getElementById('manual-result');
    if (display) {
        display.innerText = `Итог: ${calories.toFixed(1)} ккал`;
    }

    // Очищаем поля (кроме веса, его часто оставляют прежним)
    ['manual-p', 'manual-f', 'manual-c'].forEach(id => document.getElementById(id).value = '');
}
                    }
                }
            });
        }
    });
})
