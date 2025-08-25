// import mobileNav from './modules/mobile-nav.js';
import { openHome } from './modules/open-home.js';
import { openCharacter } from './modules/character-open.js';
import { openBattle } from './modules/battle-open.js';
import { setingOpen } from './modules/seting-open.js';
import { initAvatarModal, loadSelectedAvatar } from './modules/avatar-choose.js';
import { displayRandomMonster } from './modules/monster-random.js';
import { initCharacterName } from './modules/name-save.js';

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('start-game-btn')) {
    openHome();
  }

  if (document.getElementById('fight-btn')) {
    openCharacter();
  }

  if (document.getElementById('to-attack-btn')) {
    openBattle();
  }

  if (document.getElementById('avatar-btn')) {
    initAvatarModal();
  }

  loadSelectedAvatar();

  if (document.getElementById('current-monster')) {
    const monster = displayRandomMonster();

    const battleBtn = document.getElementById('battle-btn');
    if (battleBtn && monster) {
      battleBtn.addEventListener('click', () => {
        startBattle(monster);
      });
    }
  }

  initCharacterName();
  setingOpen();
});
