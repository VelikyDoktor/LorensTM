// ЭТОТ КОД НЕЛЬЗЯ КЛАСТЬ В API/CHAT.JS! 
// Клади его в свой основной js-файл, который подключен к index.html

function addManualEntry() {
    const p = parseFloat(document.getElementById('manual-p').value) || 0;
    const f = parseFloat(document.getElementById('manual-f').value) || 0;
    const c = parseFloat(document.getElementById('manual-c').value) || 0;
    const w = parseFloat(document.getElementById('manual-weight').value) || 0;

    if (w === 0) {
        alert("Введите вес!");
        return;
    }

    const calories = ((p * 4) + (f * 9) + (c * 4)) * (w / 100);
    alert(`Результат: ${calories.toFixed(1)} ккал`);
}

// Слушатель Enter для полей
document.addEventListener('DOMContentLoaded', () => {
    const ids = ['manual-p', 'manual-f', 'manual-c', 'manual-weight', 'user-input'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (id === 'user-input') sendMessage(); // Отправка в ИИ
                    else addManualEntry(); // Ручной расчет
                }
            });
        }
    });
});