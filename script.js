//------------ Variaveis ------------------
const ghibliAPIUrl = "https://ghibliapi.vercel.app/films/"

const btnInput = document.querySelector("#button")
const input = document.querySelector("#films");
const ImageUrl = document.querySelector(".film-banner");
const filmTitle = document.querySelector(".film-title");
const filmOriginalTitle = document.querySelector(".film-original-title");
const filmDescription = document.querySelector(".film-description");
const filmDirector = document.querySelector(".film-director");
const filmProducer = document.querySelector(".film-producer");
const filmRelease = document.querySelector(".film-release");
const filmTime = document.querySelector(".film-time");
const hidden = document.querySelector("#hidden");
const hiddenFooter = document.querySelector("#hidden-footer");

//--------- Requisição dos dados da API --------------------
async function dataAPI () {
    const res = await fetch(ghibliAPIUrl);
    const data = await res.json();

    data.filter((film) => {
        if (input.value.toLowerCase() == film.title.toLowerCase()) {
            ImageUrl.setAttribute("src", film.image);
            filmTitle.innerText = film.title;
            filmDescription.innerText = film.description;
            filmDirector.innerText = film.director;
            filmProducer.innerText = film.producer;
            filmOriginalTitle.innerText = film.original_title;
            filmRelease.innerText = film.release_date;
            filmTime.innerText = `${film.running_time} min`;
        };

        hidden.classList.remove("hidden");
        hiddenFooter.classList.remove("hidden")
    });


    console.log(data);
}

//----------- Eventos de click ----------------
input.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const film = input.value;



        dataAPI(film);
    };
});

btnInput.addEventListener("click", () => {
    const film = input.value;

    dataAPI(film);
});