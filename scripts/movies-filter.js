import movies from "../data/movies.js";
import users from "../data/users.js";

const rate = document.getElementById("rate");
const listMovies = document.querySelector('ul[name="listMovies"]');
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const btnShowAllMovies = document.querySelector("button");
const select = document.querySelector("#select");

const FILMS_FUNCTION = {
  filterMovies: function ({ userId, users, movies, fromDate, toDate, rate }) {
    //Combina los arreglos users y movies
    const combinedMoviesUsers = (movies, users) => {
      const usersMovies = [];
      movies.forEach((movie) => {
        const userMovie = users.filter((user) => user.id === movie.userId);
        const filterUserMovie = { ...movie, userMovie };
        usersMovies.push(filterUserMovie);
      });
      return usersMovies;
    };

    const resultcombinedMoviesUsers = combinedMoviesUsers(movies, users);

    const movieFilter = (resultcombinedMoviesUsers) => {
      const filterCombined = resultcombinedMoviesUsers;

      const filterRateDate = filterCombined
        .filter((movie) => movie.rate >= rate)
        .filter((movie) => new Date(movie.watched).getFullYear() >= fromDate)
        .filter((movie) => new Date(movie.watched).getFullYear() <= toDate);

      if (!userId) {
        return filterRateDate;
      } else {
        const filterRateDateUser = filterRateDate.filter(
          (movie) => movie.userId === userId
        );
        return filterRateDateUser;
      }
    };

    const resultFilter = movieFilter(resultcombinedMoviesUsers);
    return resultFilter;
  },

  //Crea los objetos en base al array filtrado
  createObjMovies: function (resultFilterMovies) {
    const resultMovies = [];

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

    resultFilterMovies.forEach((movie) => {
      const { userMovie } = movie;
      const user = userMovie[0];
      const objMovie = new movieCritic(user, movie);
      resultMovies.push(objMovie);
    });

    return resultMovies;
  },

  //Muestra por pantalla los movies filtradas
  showMovies: function (resultFilterMoviesCloned) {
    while (listMovies.firstChild) {
      listMovies.removeChild(listMovies.firstChild);
    }

    if (resultFilterMoviesCloned.length === 0) {
      let option = document.getElementsByTagName("li")[0];
      option = document.createElement("li");
      option.class = "errorSearch";
      listMovies.appendChild(option);
      const title = document.createElement("h3");
      title.textContent = "No hay Resultados para la busqueda";
      option.appendChild(title);
      const image = document.createElement("img");
      image.src = "./img/errorBusqueda.jpg";
      image.width = 600;
      image.height = 400;
      option.appendChild(image);
      return;
    }

    resultFilterMoviesCloned.forEach((movie) => {
      let option = document.getElementsByTagName("li")[0];
      option = document.createElement("li");
      option.class = "option";
      option.id = `${movie.id}`;
      listMovies.appendChild(option);

      const title = document.createElement("h3");
      title.textContent = `${movie.title}`;
      option.appendChild(title);

      const image = document.createElement("img");
      image.src = `${movie.image}`;
      image.width = 200;
      option.appendChild(image);

      let rate = document.createElement("rate");
      rate.textContent = `Puntuación: ${movie.rate}`;
      rate.class = "rate";
      option.appendChild(rate);

      const username = document.createElement("h3");
      username.textContent = `${movie.username}`;
      option.appendChild(username);
      const email = document.createElement("p");
      email.textContent = `Email: ${movie.email}`;
      option.appendChild(email);
      const fullAddress = document.createElement("p");
      fullAddress.textContent = `Dirección: ${movie.fullAddress}`;
      option.appendChild(fullAddress);
      const company = document.createElement("p");
      company.textContent = `Compañia: ${movie.company}`;
      option.appendChild(company);
    });
  },
  //Cuando no se ingresan valores en los inputs mmuestra el error por pantalla
  errorValidateInputs: function () {
    while (listMovies.firstChild) {
      listMovies.removeChild(listMovies.firstChild);
    }
    let option = document.getElementsByTagName("li")[0];
    option = document.createElement("li");
    option.class = "errorSearch";
    listMovies.appendChild(option);
    const title = document.createElement("h3");
    title.textContent =
      "Los campos Puntuación, Año de Estreno y Año Final son Obligatorios!";
    option.appendChild(title);
    const image = document.createElement("img");
    image.src = "./img/errorInputs.jpg";
    image.width = 600;
    image.height = 400;
    option.appendChild(image);
    return;
  },
  defaultOption: function () {
    const inputsValues = {
      rate: 0.1,
      fromDate: 2020,
      toDate: 2022,
      users,
      movies,
      userId: 0,
    };
    return inputsValues;
  },
};

//Llena los Select con usuarios
const fillSelectCritics = () => {
  users.forEach((user) => {
    const option = document.createElement("option");
    const value = user.username;
    option.value = user.id;
    option.text = value;
    select.appendChild(option);
  });
};
fillSelectCritics();

//Parametros para eu muestre todas las peliculas al ingresar a la pagina
const defaultOption = () => {
  const inputsValues = {
    rate: 0.1,
    fromDate: 2020,
    toDate: 2022,
    users,
    movies,
    userId: 0,
  };
  return inputsValues;
};

FILMS_FUNCTION[defaultOption] ?? FILMS_FUNCTION.defaultOption;

let option = "defaultOption";
let choosenFunction = FILMS_FUNCTION[option];
const inputsValuesdefault = choosenFunction();

option = "filterMovies";
choosenFunction = FILMS_FUNCTION[option];

const resultFilterMovies = choosenFunction(inputsValuesdefault);
option = "createObjMovies";
choosenFunction = FILMS_FUNCTION[option];

const resultFilterMoviesCloned = structuredClone(
  choosenFunction(resultFilterMovies)
);

option = "showMovies";
choosenFunction = FILMS_FUNCTION[option];
choosenFunction(resultFilterMoviesCloned);

btnShowAllMovies.addEventListener("click", () => {
  const inputsValues = {
    rate: Number(rate.value),
    fromDate: Number(fromDate.value),
    toDate: Number(toDate.value),
    users,
    movies,
    userId: Number(select.value),
  };

  FILMS_FUNCTION[defaultOption] ?? FILMS_FUNCTION.defaultOption;

  if (!rate.value || !fromDate.value || !toDate.value) {
    let option = "errorValidateInputs";
    let choosenFunction = FILMS_FUNCTION[option];
    choosenFunction();
    return;
  }

  let option = "filterMovies";
  let choosenFunction = FILMS_FUNCTION[option];

  const resultFilterMovies = choosenFunction(inputsValues);
  option = "createObjMovies";
  choosenFunction = FILMS_FUNCTION[option];

  //Clona el array resultFilterMovies
  const resultFilterMoviesCloned = structuredClone(
    choosenFunction(resultFilterMovies)
  );

  option = "showMovies";
  choosenFunction = FILMS_FUNCTION[option];
  choosenFunction(resultFilterMoviesCloned);
});
