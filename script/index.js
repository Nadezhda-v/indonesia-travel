import {timerPlugin} from './modules/timerPlugin.js';
import {accordionControl} from './modules/accordion.js';
import {menuControl} from './modules/menu.js';

const init = () => {
  timerPlugin();
  menuControl();
  accordionControl();
};

init();
