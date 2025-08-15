// import mobileNav from './modules/mobile-nav.js';
import {openHome} from './modules/open-home.js';

window.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {
    openHome();
  });
});