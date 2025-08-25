function getBasePath() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    if (hostname === 'localhost') {
        return pathname.includes('/pages/') ? '../img/' : './img/';
    } else {
        return '/pages/img/';
    }
}

const BASE_PATH = getBasePath();

export function monsterRandom() {
    const monsters = [
        { avatar: `${BASE_PATH}monst-1.png`, name: 'Demon', health: 50, damage: 10 },
        { avatar: `${BASE_PATH}monst-2.png`, name: 'Lich', health: 100, damage: 20 },
        { avatar: `${BASE_PATH}monst-3.png`, name: 'Medoosa', health: 75, damage: 15 },
        { avatar: `${BASE_PATH}monst-4.png`, name: 'Briliant golem', health: 150, damage: 15 },
    ];

    const randomIndex = Math.floor(Math.random() * monsters.length);
    return monsters[randomIndex];
}

export function displayRandomMonster() {
    const monsterElement = document.getElementById('current-monster');
    const monsterNameElement = document.querySelector('.monster-info span');

    if (!monsterElement) return null; // защита от страниц без блока монстра

    const monster = monsterRandom();

    monsterElement.src = monster.avatar;
    monsterElement.alt = monster.name;
    if (monsterNameElement) monsterNameElement.textContent = monster.name;

    localStorage.setItem('currentMonster', JSON.stringify(monster));
    console.log('Появился монстр:', monster.name);

    return monster;
}
