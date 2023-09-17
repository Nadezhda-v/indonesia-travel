import {timerPlugin} from './modules/timerPlugin.js';
import {accordionControl} from './modules/accordion.js';
import {handleEvent} from './modules/control.js';
import {airplaneControl} from './modules/airplane.js';
import {loadData} from './modules/request.js';
import {renderData} from './modules/renderData.js';
import swiper from './modules/slider.js';
import {validateFooterForm} from './modules/formValidation.js';

const init = () => {
  timerPlugin();
  handleEvent();
  accordionControl();
  airplaneControl();

  const getData = async () => {
    const data = await loadData();
    renderData(data);
  };

  getData();
  swiper();
  validateFooterForm();
};

init();
