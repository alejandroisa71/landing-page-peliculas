import movies from '../data/movies.js';
import users from '../data/users.js';

const rate = document.getElementById('rate');
const films = document.querySelector('ul[name="films"]');
const resultCode = document.getElementById('result');
const fromDate = document.getElementById('fromDate'); //validar cuando ingrese una año menor
const toDate = document.getElementById('toDate'); //validar cuando ingrese una año menor
const btnMostrar = document.getElementById('btnMostrar');

//---------------------------------------------------------
const $select = document.querySelector('#select');

const agregar = () => {
  users.forEach((user) => {
    const option = document.createElement('option');
    const valor = user.username;
    option.value = user.id;
    option.text = valor;
    $select.appendChild(option);
    // console.log(option.value);
  });
};
agregar();

const mostrar = () => {
  const indice = $select.selectedIndex;
  if (indice === -1) return; // Esto es cuando no hay elementos
  const opcionSeleccionada = $select.options[indice];
  // console.log(opcionSeleccionada.value);
  return opcionSeleccionada.value;
};

// document.addEventListener('DOMContentLoaded', () => {
// });
// const userId=mostrar(users)
// console.log(userId);

// const userId= mostrar()
// console.log(userId);

//----------------------------------------------

// console.log(option1);

const FILMS_FUNCTION = {
  pintarMovies: function (movies ,users) {
    while (films.firstChild) {
      films.removeChild(films.firstChild);
    }
    
    return users.filter((_, index)) => movies[index] = movies.userId///continuara

    const filmCritic = class {
      constructor(id, username, email, street, city, company,  title , rate) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullAddress = `${street} - ${city}`;
        this.company = company;
        this.title = title;
        this.rate = rate
      }
    };


    movies.forEach((movie) => {
      let option = document.getElementsByTagName('li')[0];
      option = document.createElement('li');
      option.className = 'option';
      option.id = `${movie.id}`;
      option.textContent = `${movie.title} - ${movie.rate} - ${movie.userId}`;
      films.appendChild(option);
    });
  },

  // Hace los filtrados de peliculas
  filterMovies: function (users, movies, userId, rate, fromDate, toDate) {
    console.log(typeof userId);

    const moviesCloned = movies.map((movie) => {
      return {
        title: movie.title,
        rate: movie.rate,
        watched: movie.watched,
        userId: movie.userId,
      };
    });

    if (userId > 0) {
      return moviesCloned
        .filter((movie) => movie.rate >= Number(rate))
        .filter(
          (movie) =>
            new Date(movie.watched).getFullYear() === Number(fromDate) &&
            new Date(movie.watched).getFullYear() <= Number(toDate)
        )
        .filter((movie) => movie.userId == Number(userId));
    } else {
      return moviesCloned
        .filter((movie) => movie.rate >= Number(rate))
        .filter(
          (movie) =>
            new Date(movie.watched).getFullYear() === Number(fromDate) &&
            new Date(movie.watched).getFullYear() <= Number(toDate)
        );
    }
  },
};

const defaultOption = 'pintarMovies';
const choosenFunction =
  FILMS_FUNCTION[defaultOption] ?? FILMS_FUNCTION.defaultOption;
choosenFunction(movies);


//Muestra todo lo filtrado
function otraFuncion() {
  let option = 'filterMovies';
  const userId = mostrar();

  let choosenFunction = FILMS_FUNCTION[option] ?? FILMS_FUNCTION.defaultOption;
  choosenFunction(
    users,
    movies,
    userId,
    rate.value,
    fromDate.value,
    toDate.value
  );
  const filteredMovies = choosenFunction(
    users,
    movies,
    userId,
    rate.value,
    fromDate.value,
    toDate.value
  );
  option = 'pintarMovies';
  choosenFunction = FILMS_FUNCTION[option] ?? FILMS_FUNCTION.defaultOption;
  choosenFunction(filteredMovies);
}

rate.addEventListener('change', () => {
  otraFuncion();
});

fromDate.addEventListener('change', () => {
  otraFuncion();
});

toDate.addEventListener('change', () => {
  otraFuncion();
});

btnMostrar.addEventListener('click', () => {
  mostrar;
  otraFuncion();
});



// const pepito = new filmCritic(1, 'ale', 'dsjfkl@gamil.com', 'san martin 999', 'tucuman', 'serra')


// console.log(pepito);

// filmCritic.prototype.rate =null
// pepito.rate= 7.5
// console.log(pepito);

//no pasar tantos parametros
