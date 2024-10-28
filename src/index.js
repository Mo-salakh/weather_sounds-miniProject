import './style.sass';
import sunIcon from './assets/icons/sun.svg'
import rainIcon from './assets/icons/cloud-rain.svg'
import snowIcon from './assets/icons/cloud-snow.svg'
import sunBg from './assets/summer-bg.jpg'
import rainBg from './assets/rainy-bg.jpg'
import winterBg from './assets/winter-bg.jpg'
import summerSound from './assets/sounds/summer.mp3'
import rainSound from './assets/sounds/rain.mp3'
import winterSound from './assets/sounds/winter.mp3'

const weatherType = document.getElementsByClassName('weather_item');
const sunEl = document.querySelector('.sun');
const rainEl = document.querySelector('.rain');
const snowEl = document.querySelector('.snow');
const body =  document.body;
const title = document.querySelector('.title')

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


sunEl.style.backgroundImage = `url(${sunBg})`
rainEl.style.backgroundImage = `url(${rainBg})`
snowEl.style.backgroundImage = `url(${winterBg})`


body.classList.add('sun')

function changeBg() {
    if (body.classList.contains('sun')) {
        body.style.backgroundImage = `url(${sunBg})`;
        title.style.color = 'orange';
    } else if (body.classList.contains('rain')) {
        body.style.backgroundImage = `url(${rainBg})`;
        title.style.color = '#ce02ce';
    } else if (body.classList.contains('snow')) {
        body.style.backgroundImage = `url(${winterBg})`;
        title.style.color = '#707070';
    } else {
        body.style.backgroundImage = '';
        
    }
}

sunEl.addEventListener('click', () => {
    body.classList.remove('rain', 'snow');
    body.classList.add('sun');
    changeBg();
})
rainEl.addEventListener('click', () => {
    body.classList.remove('sun', 'snow');
    body.classList.add('rain')
    changeBg();
})
snowEl.addEventListener('click', () => {
    body.classList.remove('sun', 'rain');
    body.classList.add('snow');
    changeBg();
})

