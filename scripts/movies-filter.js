import movies from '../data/movies.js';
import users from '../data/users.js';

const rate = document.getElementById('rate');
const films = document.querySelector('ul[name="films"]');
const resultCode = document.getElementById('result');
const fromDate = document.getElementById('fromDate'); //validar cuando ingrese una año menor
const toDate = document.getElementById('toDate'); //validar cuando ingrese una año menor
const select = document.getElementById('select');

const FILMS_FUNCTION = {
  pintarMovies: function (movies) {
    while (films.firstChild) {
      films.removeChild(films.firstChild);
    }
    movies.forEach((movie) => {
      let option = document.getElementsByTagName('li')[0];
      option = document.createElement('li');
      option.className = 'option';
      option.id = `${movie.id}`;
      option.textContent = `${movie.title} - ${movie.rate}`;
      films.appendChild(option);
    });
  },
  filterMovies: function (movies, rate, fromDate1, toDate1) {
    const moviesCloned = movies.map((movie) => {
      return {
        title: movie.title,
        rate: movie.rate,
        watched: movie.watched,
      };
    });

    return moviesCloned
      .filter((movie) => movie.rate >= Number(rate))
      .filter(
        (movie) =>
          new Date(movie.watched).getFullYear() === Number(fromDate1) &&
          new Date(movie.watched).getFullYear() <= Number(toDate1)
      );
  },
};

const defaultOption = 'pintarMovies';
const choosenFunction =
  FILMS_FUNCTION[defaultOption] ?? FILMS_FUNCTION.defaultOption;
choosenFunction(movies);

rate.addEventListener('change', (event) => {
  let option = 'filterMovies';
  const rate = event.target.value;
  const fromDate1 = fromDate.value;
  const toDate1 = toDate.value;

  let choosenFunction =
    FILMS_FUNCTION[option] ?? FILMS_FUNCTION.defaultOption;
  choosenFunction(movies, rate, fromDate1, toDate1);
  const filteredMovies = choosenFunction(movies, rate, fromDate1, toDate1);
  option='pintarMovies'
  choosenFunction =
    FILMS_FUNCTION[option] ?? FILMS_FUNCTION.defaultOption;
  choosenFunction(filteredMovies);
  
});

fromDate.addEventListener('change', (event) => {
  const option = 'filterMovies'; //event.target.value
  const fromDate1 = event.target.value;
  const toDate1 = event.target.value;

  const choosenFunction =
    FILMS_FUNCTION[option] ?? FILMS_FUNCTION.defaultOption;
  choosenFunction(movies, rate, fromDate1, toDate1);
  const filteredMovies = choosenFunction(movies, rate, fromDate1, toDate1);
  console.log(filteredMovies);
});

toDate.addEventListener('change', (event) => {
  const option = 'filterMovies'; //event.target.value
  const toDate = event.target.value;
  const choosenFunction =
    FILMS_FUNCTION[option] ?? FILMS_FUNCTION.defaultOption;
  choosenFunction(movies, rate, fromDate, toDate);

  // const filteredMovies = choosenFunction(movies, rate, fromDate, toDate);
  // console.log(filteredMovies);
});

// llenar el select
const allUsers = (users) =>
  users.map((item, index) => {
    let option = document.getElementsByTagName('option')[0];
    option = document.createElement('option');
    option.className = 'option';
    option.id = `${index + 1}`;
    option.value = `${item.id}`;
    option.textContent = `${item.username}`;
    select.appendChild(option);

    return item;
  });
allUsers(users);
// console.log(pepe);

// const pintarMovies = (movie) => {
//   let option = document.getElementsByTagName('li')[0];
//   option = document.createElement('li');
//   option.className = 'option';
//   option.id = `${movie.id}`;
//   option.textContent = `${movie.title} - ${movie.rate}`;
//   films.appendChild(option);
// };

// const allMovies = (movies) => {
//   movies.map((movie) => {
//     pintarMovies(movie);
//   });
// };
// allMovies(movies);

// const rateEvent = (movies) =>
//   rate.addEventListener('change', (event) => {
//     const results = movies.filter((movie) => movie.rate >= Number(rate.value));
//     results.forEach((result) => pintarMovies(result));
//   });
// rateEvent(movies);

// const filtersMovies = (movies, rateEvent) => {};

// filtersMovies(movies, rateEvent);
// return movies.filter((movie) => movie.rate >= Number(rate.value))

//----------------------------------------------------------------------
//  console.log(usersCritic)
// usersCritic()

// const userId = (usersCritic) => {
// const x = () =>
//   select.addEventListener('change', (event) => {
//     const option = event.target.value;
//     console.log(option)
//     return users.filter((user) => user.id === Number(option));

//   });
// // };
// // console.log(userId(usersCritic))
// // const x =userId(usersCritic)
// // console.log(usersCritic1)

// //esto traera del input
// let userId = 0;
// const user = users[userId];
// // const user =users

// const { id, username, email, address, company: nameCompany } = user;
// const { city, street } = address;
// const { name: company } = nameCompany;

// const rateEvent = rate.addEventListener('change', (event) => {
//   const result = filtersMovies({
//     users,
//     movies,
//     userId,
//     fromDateEvent,
//     toDateEvent,
//     rateEvent,
//     x,
//   });

//   while (films.firstChild) {
//     films.removeChild(films.firstChild);
//   }

//   result.forEach((item, index) => {
//     const li = document.createElement('li');
//     li.className = `mostrar_div_${index + 1}`;
//     li.id = `mostrar_div_${index + 1}`;
//     li.textContent = `${item.title}1 - ${new Date(
//       item.watched
//     ).getFullYear()} ${item.rate}`;
//     films.appendChild(li);
//   });
// });

// //ver cauando se cambia caundo se escribe directamente un numero
// const fromDateEvent = fromDate.addEventListener('change', (event) => {
//   // const fromDate = event.target.value;
//   // console.log(typeof fromDate);
//   filtersMovies({
//     users,
//     movies,
//     userId,
//     fromDateEvent,
//     toDateEvent,
//     rateEvent,
//     x,
//   });
// });

// const toDateEvent = toDate.addEventListener('change', (event) => {
//   filtersMovies({
//     users,
//     movies,
//     userId,
//     fromDateEvent,
//     toDateEvent,
//     rateEvent,
//     x,
//   });
// });

// function filtersMovies({
//   users,
//   movies,
//   userId,
//   fromDateEvent,
//   toDateEvent,
//   rateEvent,
//   x,
// }) {
//   x();

//   return movies
//     .filter((movie) => movie.rate >= Number(rate.value))
//     .filter(
//       (movie) =>
//         new Date(movie.watched).getFullYear() === Number(fromDate.value) &&
//         new Date(movie.watched).getFullYear() <= Number(toDate.value)
//     );
//   // console.log(filterMovies1)
//   // return filterMovies1;
// }

// const filmCritic = class {
//   constructor(id, username, email, street, city, company) {
//     this.id = id;
//     this.username = username;
//     this.email = email;
//     this.fullAddress = `${street} - ${city}`;
//     this.company = company;
//     //this.movie= movie.title;-------aca iran arreglos de peliculas
//     //this.rate=movie.rate;
//   }
// };

// const critico = new filmCritic(id, username, email, street, city, company); //no pasar tantos parametros

// // console.log(critico);

// // console.log(movies);

// // const anoFiltrado= movies.filter(movie=> new Date(movie.watched).getFullYear() <= ano)
// // console.log(x)
// // filtersMovies({
// //   users,
// //   movies,
// //   userId,
// //   fromDateEvent,
// //   toDateEvent,
// //   rateEvent,
// //   x,
// // })
