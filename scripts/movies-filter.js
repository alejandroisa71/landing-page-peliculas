import movies from '../data/movies.js';
import users from '../data/users.js';

const rate = document.getElementById('rate');
const listMovies = document.querySelector('ul[name="listMovies"]');
const fromDate = document.getElementById('fromDate');
const toDate = document.getElementById('toDate');
const btnMostrar = document.getElementById('btnMostrar');
const $select = document.querySelector('#select');

//---------------LLena Select con los Críticos------------

const fillSelectCritics = () => {
  users.forEach((user) => {
    const option = document.createElement('option');
    const value = user.username;
    option.value = user.id;
    option.text = value;
    $select.appendChild(option);
  });
};
fillSelectCritics();

const mostrar = () => {
  const index = $select.selectedIndex;
  // if (index === -1) return; // Esto es cuando no hay elementos
  const selectOption = $select.options[index];
  return selectOption.value;
};

const FILMS_FUNCTION = {
  showMovies: function (movies, users) {
    const listMoviesFilter = [];

    while (listMovies.firstChild) {
      listMovies.removeChild(listMovies.firstChild);
    }

    if(movies.length === 0){
        console.log('no hay lementos');
        let option = document.getElementsByTagName('li')[0];
      option = document.createElement('li');
      option.class = 'errorSearch';
      // option.id = `${movie.id}`;
      listMovies.appendChild(option);
      const title = document.createElement('h3');
      title.textContent = "No hay Resultados para la busqueda";
      option.appendChild(title);
      const image = document.createElement('img');
      image.src = "./img/errorBusqueda.jpg";
      image.width = 600;
      image.height=400
      option.appendChild(image);

        return
    }

    const movieCritic = class {
      constructor(user, movie) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.fullAddress = `${user.address.street} - ${user.address.city}`;
        this.company = user.company.name;
        this.title = movie.title;
        this.rate = movie.rate;
        this.image = movie.image;
      }
    };

    movies.forEach((movie) => {
      const { userId } = movie;
      users.forEach((user) => {
        const { id } = user;

        if (id === userId) {
          const objMovie = new movieCritic(user, movie);
          listMoviesFilter.push(objMovie);
        }
      });
    });

   

    listMoviesFilter.forEach((movie) => {
      let option = document.getElementsByTagName('li')[0];
      option = document.createElement('li');
      option.class = 'option';
      option.id = `${movie.id}`;
      listMovies.appendChild(option);

      const title = document.createElement('h3');
      title.textContent = `${movie.title}`;
      option.appendChild(title);

      const image = document.createElement('img');
      image.src = `${movie.image}`;
      image.width = 200;
      option.appendChild(image);

      let rate = document.createElement('rate');
      rate.textContent = `Puntuación: ${movie.rate}`;
      rate.class = 'rate';
      option.appendChild(rate);

      const username = document.createElement('h3');
      username.textContent = `${movie.username}`;
      option.appendChild(username);
      const email = document.createElement('p');
      email.textContent = `Email: ${movie.email}`;
      option.appendChild(email);
      const fullAddress = document.createElement('p');
      fullAddress.textContent = `Dirección: ${movie.fullAddress}`;
      option.appendChild(fullAddress);
      const company = document.createElement('p');
      company.textContent = `Compañia: ${movie.company}`;
      option.appendChild(company);
    });
  },

  // Hace los filtrados de peliculas
  filterMovies: function (_users, movies, userId, rate, fromDate, toDate) {
    const moviesCloned = movies.map((movie) => {
      return {
        title: movie.title,
        rate: movie.rate,
        watched: movie.watched,
        userId: movie.userId,
        image: movie.image,
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

const defaultOption = 'showMovies';
const choosenFunction =
  FILMS_FUNCTION[defaultOption] ?? FILMS_FUNCTION.defaultOption;
choosenFunction(movies, users);

//Muestra todo lo filtrado
function otraFuncion() { 
  let option = 'filterMovies';
  const userId = mostrar();// cambiar nombre a funcion

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

  option = 'showMovies';
  choosenFunction = FILMS_FUNCTION[option] ?? FILMS_FUNCTION.defaultOption;

  choosenFunction(filteredMovies, users);
}
///----------------
rate.addEventListener('change',otraFuncion);

fromDate.addEventListener('change', otraFuncion);

toDate.addEventListener('change', 
  otraFuncion);

btnMostrar.addEventListener('click', () => {
  mostrar;
  otraFuncion();
});
