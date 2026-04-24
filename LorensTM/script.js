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
                        addManualEntry();
                    }
                }
            });
        }
    });
})
