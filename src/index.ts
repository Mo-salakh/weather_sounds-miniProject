import './style.sass';
//@ts-ignore
import sunIcon from './assets/icons/sun.svg';
//@ts-ignore
import rainIcon from './assets/icons/cloud-rain.svg';
//@ts-ignore
import snowIcon from './assets/icons/cloud-snow.svg';
//@ts-ignore
import sunBg from './assets/summer-bg.jpg';
//@ts-ignore
import rainBg from './assets/rainy-bg.jpg';
//@ts-ignore
import winterBg from './assets/winter-bg.jpg';
//@ts-ignore
import summerSound from './assets/sounds/summer.mp3';
//@ts-ignore
import rainSound from './assets/sounds/rain.mp3';
//@ts-ignore
import winterSound from './assets/sounds/winter.mp3';
//@ts-ignore
import pauseI from './assets/icons/pause.svg';
//@ts-ignore

// eslint-disable-next-line consistent-return

const sunEl = document.querySelector('.sun') as HTMLElement;
const rainEl = document.querySelector('.rain') as HTMLElement;
const snowEl = document.querySelector('.snow') as HTMLElement;
const { body } = document;
const title = document.querySelector('.title') as HTMLElement;
const audioEl = document.querySelector('#audioEl') as HTMLAudioElement;
const volumeControl = document.querySelector('#volumeControl') as HTMLInputElement;

if(audioEl && volumeControl) {
    volumeControl.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement
        audioEl.volume = parseInt(target.value)
    });
}


const sunImage = document.createElement('img');
sunImage.src = sunIcon;
sunImage.alt = 'sun_icon';
sunEl?.appendChild(sunImage);

const rainImage = document.createElement('img');
rainImage.src = rainIcon;
rainImage.alt = 'rain_icon';
rainEl?.appendChild(rainImage);

const snowImage = document.createElement('img');
snowImage.src = snowIcon;
snowImage.alt = 'snow_icon';
snowEl?.appendChild(snowImage);

sunEl.style.backgroundImage = `url(${sunBg})`;
rainEl.style.backgroundImage = `url(${rainBg})`;
snowEl.style.backgroundImage = `url(${winterBg})`;

let currentAtmosphere: string | null = null;

interface AtmosphereElement {
    icon: HTMLImageElement;
    bg: string;
    sound: string;
  }
  
interface Elements {
    sun: AtmosphereElement;
    rain: AtmosphereElement;
    snow: AtmosphereElement;
}

type AtmosphereType = keyof Elements;

function setAtmosphere(atmosphere:AtmosphereType): object |null {
  const elements: Elements = {
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

sunEl?.addEventListener('click', () => {
  setAtmosphere('sun');
});

rainEl?.addEventListener('click', () => {
  setAtmosphere('rain');
});

snowEl?.addEventListener('click', () => {
  setAtmosphere('snow');
});
