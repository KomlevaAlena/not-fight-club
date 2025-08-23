// import mobileNav from './modules/mobile-nav.js';
import { openHome } from './modules/open-home.js';
import { openCharacter } from './modules/character-open.js';
import { openBattle } from './modules/battle-open.js';
import { setingOpen } from './modules/seting-open.js';
import { initAvatarModal } from './modules/avatar-choose.js';
import { loadSelectedAvatar } from './modules/avatar-choose.js';
// import { displayRandomMonster } from './modules/monsters.js';

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
  // displayRandomMonster();
  // document.getElementById('battle-btn').addEventListener('click', function() {
  //         const monster = displayRandomMonster();
  //         startBattle(monster);
  //     });

  setingOpen();
});
