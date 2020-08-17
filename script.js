const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {
    VoiceRSS.speech({
        key: '',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJoke() {
    let joke = '';
    try {
        const response = await fetch('https://sv443.net/jokeapi/v2/joke/Dark?blacklistFlags=religious,racist&type=single');
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.log('There was an error: ', error);
    }
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);