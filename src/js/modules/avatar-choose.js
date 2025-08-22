export function initAvatarModal () {
    const avatars = [
        '/img/war-1.jpg',
        '/img/war-2.jpg',
        '/img/war-3.jpg',
        '/img/war-4.jpg',
        '/img/war-5.jpg',
        '/img/war-6.jpg',
        '/img/war-7.jpg',
        '/img/war-8.jpg',
        '/img/war-9.jpg',
        '/img/war-10.jpg'
    ];

    const modal = document.createElement('div');
    modal.className = 'avatar-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Выберите аватар</h3>
            <div class="avatar-grid"></div>
            <button class="close-modal">close</button>
        </div>
    `;

    document.body.appendChild(modal);

    const avatarGrid = modal.querySelector('.avatar-grid');
    const currentAvatar = document.getElementById('current-avatar');
    const changeBtn = document.getElementById('avatar-btn');

    avatars.forEach((avatar, index) => {
        const avatarItem = document.createElement('div');
        avatarItem.innerHTML = `<img src="${avatar}" alt="Аватар" data-src="${avatar}">`;
        avatarGrid.appendChild(avatarItem);
    });
    changeBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    avatarGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            currentAvatar.src = e.target.dataset.src;
            localStorage.setItem('selectedAvatar', e.target.dataset.src);
            modal.style.display = 'none';
        }
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}