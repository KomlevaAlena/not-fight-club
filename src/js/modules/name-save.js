// characterName.js
export function initCharacterName() {
    const input = document.getElementById('character-name'); // поле ввода
    const span = document.getElementById('player-name'); // span для отображения

    // достаём сохранённое имя или ставим дефолт
    const savedName = localStorage.getItem('selectedName') || 'Player';

    // вставляем в поле и в span
    if (input) input.value = savedName;
    if (span) span.textContent = savedName;

    // слушаем изменения
    if (input) {
        input.addEventListener('input', () => {
            const newName = input.value.trim() || 'Player';
            localStorage.setItem('selectedName', newName);

            if (span) span.textContent = newName;
        });
    }
}
