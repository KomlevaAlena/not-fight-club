export function openHome() {
  const btn = document.getElementById('start-game-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.open('./pages/home.html', '_self');
    });
  }
};
