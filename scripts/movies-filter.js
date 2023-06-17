import movies from '../data/movies.js';
import users from '../data/users.js';

///esto traera del input
const user = users[0];
const { id, username, email, address, company:nameCompany} = user;
const { city, street } = address;
const { name:company } = nameCompany;

const filmCritic = class {
  constructor(id, username, email, street, city, company ) { // ojo con nombre company
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullAddress=`${street} - ${city}`;
    this.company = company;
    //this.movie= movie.title;-------aca iran arreglos de peliculas
    //this.rate=movie.rate;
  }
};

const critico = new filmCritic(id, username, email, street, city, company); //no pasar tantos parametros
console.log(critico.company);

