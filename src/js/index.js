// import mobileNav from './modules/mobile-nav.js';
import { openHome } from './modules/open-home.js';
import { openCharacter } from './modules/character-open.js';
import { openBattle } from './modules/battle-open.js';
import { setingOpen } from './modules/seting-open.js';

window.addEventListener('DOMContentLoaded', () => {
  setingOpen();
  if (document.getElementById('start-game-btn')) {
    openHome();
  }

  if (document.getElementById('fight-btn')) {
    openCharacter();
  }

  if (document.getElementById('to-attack-btn')) {
    openBattle();
  }
});
