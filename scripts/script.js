const dadJokeRandomURL = "https://icanhazdadjoke.com/";
const header = {
    headers:{
        "Accept": "application/json"
    }
}

const form = document.querySelector(".main__form");
// const mainContainerEl = document.querySelector(".main__container");
const mainContainer = document.querySelector(".main__container");
const footer = document.querySelector(".footer");

//create the yellow div to hold the joke
function createYellowBox () {
        const mainOutputEl = document.createElement('div');
        mainOutputEl.classList.add("main__output");
        mainContainer.appendChild(mainOutputEl);
        return mainOutputEl;
}

// generate Gif from unsplash
function generateGif () {
    const gifURL = `https://api.giphy.com/v1/gifs/search?api_key=8lpGzaM8X0s0HnuCZaQrQJ9z0qJeAU8t&q=laughing&limit=25&offset=0&rating=g&lang=en`;
    axios
        .get(gifURL)
        .then((response)=>{
            const gifsArray = response.data.data;
            const randomGif = gifsArray[Math.floor(Math.random() * gifsArray.length)]
            // footer.innerHTML = "";
            let gif = document.createElement("img");
            gif.classList.add("footer__image");
            gif.setAttribute("src", randomGif.images.original.url);
            footer.appendChild(gif);
        }
        )
        .catch( ()=>{
            footer.innerHTML = "";
            gif = document.createElement("img");
            gif.classList.add("footer__image");
            footer.appendChild(gif);
            gif.setAttribute("src", "https://media.giphy.com/media/xTka00DAwqd8DXKorS/giphy.gif")
        }
        )
}

form.addEventListener("submit", (event) => {
    // Handle form submission
    event.preventDefault();
    // Remove previous joke
    mainContainer.innerHTML = "";
    // URL for search input
    let input = event.target.main__input.value;
    const dadJokeSearchURL = `https://icanhazdadjoke.com//search?term=${input}`;
    const mainOutputEl = createYellowBox();

        
    // Invalid input
    if (input.length === 0) {
        const mainTextEl = document.createElement('p');
        mainTextEl.classList.add("main__text--error");
        mainOutputEl.appendChild(mainTextEl);
        mainOutputEl.classList.add("main__output--error")
        mainTextEl.innerText = "What don't you understand about the sentence above?";
        footer.innerHTML = "";
        let gif = document.createElement("img");
            gif.classList.add("footer__image");
            footer.appendChild(gif);
        gif.setAttribute("src", "https://media.giphy.com/media/z5WtAAaFpnIgU/giphy.gif")
        return
    }

    // Get joke with search term
    axios
    .get(dadJokeSearchURL, header)
    .then((response) => {
        // // Remove previous joke(s)
        // const mainOutputEl = document.querySelector(".main__output");
        // mainOutputEl.innerHTML = "";
        
        // Display jokes 
        const jokes = response.data.results;
        const randomSearchedJoke = jokes[Math.floor(Math.random() * jokes.length)];
        footer.innerHTML = "";
        // Play ba dum tss
        audio(randomSearchedJoke.joke);
        
        // Append joke to main section
        const mainTextEl = document.createElement('p');
        mainTextEl.classList.add("main__text");
        mainOutputEl.appendChild(mainTextEl);
        mainTextEl.innerText = randomSearchedJoke.joke;

    })
    .catch((error) => {
        const mainTextEl = document.createElement('p');
        mainTextEl.classList.add("main__text");
        mainOutputEl.appendChild(mainTextEl);
        mainTextEl.innerText = "Is this a joke? We don't get it...";
        footer.innerHTML = "";
        let gif = document.createElement("img");
            gif.classList.add("footer__image");
            footer.appendChild(gif);
        gif.setAttribute("src", "https://media.giphy.com/media/z5WtAAaFpnIgU/giphy.gif")
    })
    // Reset form fields
    form.reset();
})

// Create array to store ID's of generated jokes so they don't repeat
const usedJokes = [];

// Add laugh track/drums after joke
function audio(jokeText) {
    if(jokeText.length < 50) {
        setTimeout(function(){
        const audio = new Audio("./assets/Ba-Bum-Tss-Joke-Drum-A4-www.fesliyanstudios.com.mp3");
        audio.play();
        generateGif();
        }, 2500);
    } else if (jokeText.length < 75) {
        setTimeout(function(){
        const audio = new Audio("./assets/Ba-Bum-Tss-Joke-Drum-A4-www.fesliyanstudios.com.mp3");
        audio.play();
        generateGif();
        }, 3000);
    } else if (jokeText.length < 100) {
        setTimeout(function(){
        const audio = new Audio("./assets/Ba-Bum-Tss-Joke-Drum-A4-www.fesliyanstudios.com.mp3");
        audio.play();
        generateGif();
        }, 3500);
    } else {
        setTimeout(function(){
            const audio = new Audio("./assets/Ba-Bum-Tss-Joke-Drum-A4-www.fesliyanstudios.com.mp3");
            audio.play();
            generateGif();
            }, 8000);
    }
}
// get random joke function
function randomJokeFunc() {
    axios
    .get(dadJokeRandomURL, header)
    .then((response) => {
        // Remove previous joke
        mainContainer.innerHTML = "";
        let mainOutputEl = createYellowBox ();
        // Fetch random joke
        const randomJoke = response.data.joke;

        // Store joke ID in array to prevent repeated joke
        // console.log(response.data.id);
        const randomJokeID = response.data.id; //"TKZD592LZob"
        if(!usedJokes.includes(randomJokeID)) {
            usedJokes.push(randomJokeID);
            const mainTextEl = document.createElement('p');
            mainTextEl.classList.add("main__text");
            mainOutputEl.appendChild(mainTextEl);
            mainTextEl.innerText = randomJoke;
            // laugh track
            footer.innerHTML = "";
            audio(randomJoke);            
        } else {
            randomJokeFunc();
        }
    })
        .catch((error) => {
            // console.log(error);
            // Remove previous joke
            const extraBox = document.querySelector(".main__output");
            mainContainer.removeChild(extraBox);
            mainOutputEl = createYellowBox ();

            const mainTextEl = document.createElement('p');
            mainTextEl.classList.add("main__text");
            mainOutputEl.appendChild(mainTextEl);
            mainTextEl.innerText = "Oh no you ran through all the jokes :(";
            footer.innerHTML = "";
            let gif = document.createElement("img");
            gif.classList.add("footer__image");
            footer.appendChild(gif);
            gif.setAttribute("src", "https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif")

        
    })
};

const random = document.querySelector('.main__random');
random.addEventListener('click', (event) => {
    // Handle form submission
    event.preventDefault();
    
    // Get random joke
    randomJokeFunc()
});




