export function openBattle() {
  const btn = document.getElementById('to-attack-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.open('./battle.html', '_self');
    });
  }
};