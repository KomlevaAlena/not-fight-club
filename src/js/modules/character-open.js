export function openCharacter() {
  const btn = document.getElementById('fight-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.open('./character.html', '_self');
    });
  }
};
