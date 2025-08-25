const BASE_PATH = (() => {
  const host = window.location.hostname;
  return (['localhost', '127.0.0.1', '::1'].includes(host)) ? '/img/' : '/pages/img/';
})();

function setAvatar(target, src) {
    if (!target || !src) return;

    if (target.tagName === 'IMG') {
        target.src = src;
    } else {
        target.innerHTML = `<img src="${src}" alt="avatar" class="character-avatar">`;
    }
}

export function initAvatarModal() {
    const avatars = [
        `${BASE_PATH}war-1.jpg`,
        `${BASE_PATH}war-2.jpg`,
        `${BASE_PATH}war-3.jpg`,
        `${BASE_PATH}war-4.jpg`,
        `${BASE_PATH}war-5.jpg`,
        `${BASE_PATH}war-6.jpg`,
        `${BASE_PATH}war-7.jpg`,
        `${BASE_PATH}war-8.jpg`,
        `${BASE_PATH}war-9.jpg`,
        `${BASE_PATH}war-10.jpg`
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

    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) setAvatar(currentAvatar, savedAvatar);

    avatars.forEach((avatar) => {
        const avatarItem = document.createElement('div');
        avatarItem.className = 'avatar-item';
        avatarItem.innerHTML = `<img src="${avatar}" alt="Аватар" data-src="${avatar}">`;
        avatarGrid.appendChild(avatarItem);
    });

    if (changeBtn) {
        changeBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    avatarGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const src = e.target.dataset.src;
            setAvatar(currentAvatar, src);
            localStorage.setItem('selectedAvatar', src);
            modal.style.display = 'none';
        }
    });

    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

export function loadSelectedAvatar() {
    const avatarDisplay = document.getElementById('current-avatar');
    const savedAvatar = localStorage.getItem('selectedAvatar');
    const defaultAvatar = `${BASE_PATH}war-1.jpg`;
    setAvatar(avatarDisplay, savedAvatar || defaultAvatar);
}
