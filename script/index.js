import {timerPlugin} from './modules/timerPlugin.js';
import {accordionControl} from './modules/accordion.js';
import {menuControl} from './modules/menu.js';
import {airplaneControl} from './modules/airplane.js';

const init = () => {
  timerPlugin();
  menuControl();
  accordionControl();
  airplaneControl();
};

init();
