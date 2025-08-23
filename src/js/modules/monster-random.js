export function monsterRandom () {
    const monsters = [
        { 
            avatar: '/img/monst-1.png', 
            name: 'Demon',
            health: 50,
            damage: 10
        },
        { 
            avatar: '/img/monst-2.png', 
            name: 'Lich',
            health: 100,
            damage: 20
        },
        { 
            avatar: '/img/monst-3.png', 
            name: 'Medoosa',
            health: 75,
            damage: 15
        },
        { 
            avatar: '/img/monst-4.png', 
            name: 'Briliant golem',
            health: 150,
            damage: 15
        },
    ];

    const randomIndex = Math.floor(Math.random() * monsters.length);
    return monsters[randomIndex];
}

export function displayRandomMonster() {
    const monsterElement = document.getElementById('current-monster');
    const monsterNameElement = document.querySelector('.monster-info span');
    
    if (!monsterElement) {
        console.error('Элемент с id="current-monster" не найден!');
        return;
    }

    const monster = monsterRandom();
    
    // Устанавливаем аватар
    monsterElement.src = monster.avatar;
    monsterElement.alt = monster.name;
    
    // Устанавливаем имя монстра
    if (monsterNameElement) {
        monsterNameElement.textContent = monster.name;
    }
    
    // Сохраняем данные монстра для использования в битве
    localStorage.setItem('currentMonster', JSON.stringify(monster));
    
    console.log('Появился монстр:', monster.name);
    return monster;
}