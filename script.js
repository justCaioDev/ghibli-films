//------------ Variaveis ------------------
const ghibliAPIUrl = "https://ghibliapi.vercel.app/films/"

const titles = [
    {
        name: "Castle in the Sky",
    },
    {
        name: "My Neighbor Totoro",
    },
    {
        name: "Grave of the Fireflies",
    },
    {
        name: "Kiki's Delivery Service",
    },
    {
        name: "Only Yesterday",
    },
    {
        name: "Porco Rosso",
    },
    {
        name: "Pom Poko",
    },
    {
        name: "Whisper of the Heart",
    },
    {
        name: "Princess Mononoke",
    },
    {
        name: "My Neighbors the Yamadas",
    },
    {
        name: "Spirited Away",
    },
    {
        name: "The Cat Returns",
    },
    {
        name: "Howl's Moving Castle",
    },
    {
        name: "Tales from Earthsea",
    },
    {
        name: "Ponyo",
    },
    {
        name: "Arrietty",
    },
    {
        name: "From Up on Poppy Hill",
    },
    {
        name: "The Wind Rises",
    },
    {
        name: "The Tale of the Princess Kaguya",
    },
    {
        name: "When Marnie Was There",
    },
    {
        name: "The Red Turtle",
    },
    {
        name: "Earwig and the Witch",
    },
]

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
const filmContainer = document.querySelector(".film-container");

//--------- Requisição dos dados da API --------------------
async function dataAPI () {
    const res = await fetch(ghibliAPIUrl);
    const data = await res.json();

//--------------Percorrendo os dados da API e trazendo apenas o titulo digitado pelo usuário---------------
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
            filmContainer.style.background = `linear-gradient(#000000a5, #000000d1), url(${film.movie_banner}) center center no-repeat`
            filmContainer.style.backgroundSize = "cover"

            hidden.classList.remove("hidden");
            hiddenFooter.classList.remove("hidden");
        }else {

        }

        
    });
};

async function dataRow () {
    const res = await fetch(ghibliAPIUrl);
    const data = await res.json();

    data.filter((film) => {
        const filmRow = document.querySelector(".films-row")
        const filmCard = document.createElement("div");
        const filmLink = document.createElement("a")
        const filmCardImage = document.createElement("img");
        const filmCardTitle = document.createElement("h3");

        filmCard.classList.add("film-card");
        filmCardImage.classList.add("film-card-img");
        filmCardTitle.classList.add("film-card-title");
        filmLink.classList.add("film-card-link");

        filmCardImage.setAttribute("src", film.image);
        filmCardTitle.innerText = film.title;
        filmLink.setAttribute("href", "#hidden");

        filmLink.appendChild(filmCard)
        filmCard.appendChild(filmCardImage);
        filmCard.appendChild(filmCardTitle);

        filmRow.appendChild(filmLink);

        filmCard.addEventListener("click", () => {
            const filmTitleRow = filmCardTitle.innerText
            input.value = filmTitleRow
            dataAPI()
    })
    })

}

function inputFilter () {
    const ul = document.querySelector(".filter-input")
    titles.forEach((films) => {
        const li = document.createElement("li")
        li.innerHTML = `
        <a href="#"">
            <span class="film-name">${films.name}</span>
        </a>
        `
        ul.appendChild(li)
        
    })
}

function filterFilms () {
    var filter,
        i,
        li,
        ul,
        a,
        txtA,
        span,
        count = 0

        ul = document.querySelector(".filter-input")

        filter = input.value.toUpperCase()

        li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0]
        txtA = a.textContent || a.innerText

        if (txtA.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""
            count++
            span = li[i].querySelector(".film-name")
            if (span) {
                span.innerHTML = txtA.replace(new RegExp(filter, "gi"), (match) => {
                    return "<strong>" + match + "</strong>"
                })
            } 
        } else {
            li[i].style.display = "none"
        }

        if (count === 0) {
            ul.style.display = "none"
        } else {
            ul.style.display = "block"
        }

        input.addEventListener("keyup", (e) => {
            if (e.code === "Enter") {
                ul.style.display = "none"
            }
        })
        
        btnInput.addEventListener("click", () => {
            ul.style.display = "none"
        });

        if (input.value === "") {
            ul.style.display = "none"
        }

    }
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

input.addEventListener("keyup", () => {
    filterFilms()
})

inputFilter()

dataRow()