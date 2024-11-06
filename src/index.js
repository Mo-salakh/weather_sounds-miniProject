import './style.sass';
import sunIcon from './assets/icons/sun.svg';
import rainIcon from './assets/icons/cloud-rain.svg';
import snowIcon from './assets/icons/cloud-snow.svg';
import sunBg from './assets/summer-bg.jpg';
import rainBg from './assets/rainy-bg.jpg';
import winterBg from './assets/winter-bg.jpg';
import summerSound from './assets/sounds/summer.mp3';
import rainSound from './assets/sounds/rain.mp3';
import winterSound from './assets/sounds/winter.mp3';
import pauseI from './assets/icons/pause.svg';

// eslint-disable-next-line consistent-return

const sunEl = document.querySelector('.sun');
const rainEl = document.querySelector('.rain');
const snowEl = document.querySelector('.snow');
const { body } = document;
const title = document.querySelector('.title');
const audioEl = document.querySelector('#audioEl');
const volumeControl = document.querySelector('#volumeControl');

volumeControl.addEventListener('input', (event) => {
  audioEl.volume = event.target.value;
});

const sunImage = document.createElement('img');
sunImage.src = sunIcon;
sunImage.alt = 'sun_icon';
sunEl.appendChild(sunImage);

const rainImage = document.createElement('img');
rainImage.src = rainIcon;
rainImage.alt = 'rain_icon';
rainEl.appendChild(rainImage);

const snowImage = document.createElement('img');
snowImage.src = snowIcon;
snowImage.alt = 'snow_icon';
snowEl.appendChild(snowImage);

sunEl.style.backgroundImage = `url(${sunBg})`;
rainEl.style.backgroundImage = `url(${rainBg})`;
snowEl.style.backgroundImage = `url(${winterBg})`;

let currentAtmosphere = null;

function setAtmosphere(atmosphere) {
  const elements = {
    sun: { icon: sunImage, bg: sunBg, sound: summerSound },
    rain: { icon: rainImage, bg: rainBg, sound: rainSound },
    snow: { icon: snowImage, bg: winterBg, sound: winterSound },
  };

  /* eslint-disable no-param-reassign */
  Object.values(elements).forEach((item) => {
    switch (item.icon.alt) {
      case 'sun_icon':
        item.icon.src = sunIcon;
        break;
      case 'rain_icon':
        item.icon.src = rainIcon;
        break;
      case 'snow_icon':
        item.icon.src = snowIcon;
        break;
      default:
        return null;
    }
  });
  /* eslint-disable no-param-reassign */

  if (currentAtmosphere === atmosphere) {
    if (audioEl.paused) {
      audioEl.play();
    } else {
      audioEl.pause();
      elements[atmosphere].icon.src = pauseI;
    }
  } else {
    currentAtmosphere = atmosphere;
    body.style.backgroundImage = `url(${elements[atmosphere].bg})`;
    audioEl.src = elements[atmosphere].sound;
    audioEl.play();

    if (atmosphere === 'sun') {
      title.style.color = 'orange';
    } else if (atmosphere === 'rain') {
      title.style.color = '#ce02ce';
    } else if (atmosphere === 'snow') {
      title.style.color = '#707070';
    }
  }

  body.className = atmosphere;

  return elements;
}

sunEl.addEventListener('click', () => {
  setAtmosphere('sun');
});

rainEl.addEventListener('click', () => {
  setAtmosphere('rain');
});

snowEl.addEventListener('click', () => {
  setAtmosphere('snow');
});
