export function loadSelectedAvatar() {
    const avatarDisplay = document.getElementById('current-avatar');
    const savedAvatar = localStorage.getItem('selectedAvatar');
    
    if (savedAvatar) {
        avatarDisplay.innerHTML = `<img src="${savedAvatar}" alt="target avatar" class="character-avatar">`;
    } else {
        avatarDisplay.innerHTML = '<img src="/img/war-1.jpg" alt="avatar">';
    }
}
