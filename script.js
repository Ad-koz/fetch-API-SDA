// Zadanie 1.
// Korzystając ze strony reqres Pobierz imię z single user i wyświetl w konsoli.
fetch("https://reqres.in/api/users/2")
.then((resp) => resp.json())
.then((dane) => console.log(dane.data.first_name))

//rozwiązanie za pomocą async function

async function getUser() {
    const resp = await fetch("https://reqres.in/api/users/2");
    const dane = await resp.json();
    return(dane.data.first_name)
}
getUser().then((name) => console.log(name));

//Zadanie2. Pobierz listę użytkowników i w konsoli wyswietl listę imion i nazwisk tych uzytkowników.

fetch("https://reqres.in/api/users?page=2")
.then((resp) => resp.json())
.then((dane) => {
    for(let i = 0; i < dane.data.length; i++) {
        const user = dane.data[i];
        console.log(`${user.first_name}${user.last_name}`);
    }
});

// Zadanie. Używając  strony reqres utworzyć uzytkownika.

const addUser = {
    name: "Jan",
    surname: "Nowak",
    job: "Software Engineer"
}

fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(addUser)
})
.then((resp) => resp.json())
.then((resp) => console.log(resp));

//Zadanie. Korzystając ze strony reqres usuń użytkownika

fetch("https://reqres.in/api/users/2", {
    method: "DELETE"
}).then((resp) => {
    if(resp.status === 204) { console.log("User deleted");}
    else {console.log("Error");}
})

//Zadanie. Obsłuż niepoprawne logowanie użytkownika

const loginData = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
};
fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
}).then((resp) => {
    if (resp.ok) {
        console.log("login successful");
    }
    else {console.error("login error")}
}).catch((error) => console.log(error))

//Zadanie. Użytkownik ma się zarejestrować, zalogować, a na samym końcu ma się wyświetlić lista użytkowników. Wykonać to za pomocą klas.

class ApiService {
    constructor() {}
        async get(url) {
            const response = await fetch(url);
            return await this.processResponse(response);
        }
        async post(url, data) {
            return await this.sendData("POST", url, data);
        }
        async put(url, data) {
            return await this.sendData("PUT", url, data);
        }
        async sendData(method, url, data) {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            return await this.processResponse(response);
        }
        async processResponse(response) {
            if(response.ok) {
                const dane = await response.json();
                return dane;
            } else {
                console.error("Request error! Status:" + response.status);
            }
        }
}
  class UsersService {
    constructor() {
      this.baseUrl = "https://reqres.in/api";
      this.apiService = new ApiService();
    }
  
    async getUsers(page) {
      const response = await this.apiService.get(
        `${this.baseUrl}/users?page=${page}`
      );
      return response.data;
    }
  
    async getUser(id) {
      const response = await this.apiService.get(`${this.baseUrl}/users/${id}`);
      return response.data;
    }
  
    async createUser(user) {
      return await this.apiService.post(`${this.baseUrl}/users`, user);
    }
  
    async updateUser(user) {
      return await this.apiService.put(`${this.baseUrl}/users`, user);
    }
  }


const user5 = new UsersService();

console.log(user5.getUser(5))

// c.d. Stworzyć klasę do uwierzytelnienia użytkownika.

class AuthService {
    constructor() {
        this.baseUrl = "https://reqres.in/api";
        this.apiService = new ApiService();
    }
    async login(pass) {
        return await this.apiService.post(`${this.baseUrl}/login`, pass);
    }
    async register(user) {
        return await this.apiService.post(`${this.baseUrl}/register`, user);
    }
}

const authService = new AuthService();

authService
.login({
    email: "eve.holt@reqres.in",
    password: "cityslicka"
})
.then((res) => console.log(res));

//Zadanie. Korzystając z http://api.nbp.pl/ napisać aplikację w której użytkownik może wymienić walutę. Dajemy mozliwosc wyboru jaka to ma byc konwersja: czy PLN na EUR.

const chooseCurrency = prompt("Wpisz odpowiednio 1 lub 2: 1. EUR -> PLN, 2. PLN -> EUR");
const amount = parseFloat(prompt("Wpisz kwotę"));

fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur?format=json")
.then(response => response.json())
.then((dane) => {
    const exchangeRate = dane.rates[0].mid;
    if(chooseCurrency === "1") {
        value = exchangeRate*amount
        console.log(`kwota do wypłaty: ${value} PLN`)
    }
    else if(chooseCurrency === "2") {
        value = amount/exchangeRate
        console.log(`kwota do wypłaty: ${value} EUR`)
    }
})
//  Zadanie. Korzystając z API NBP znaleźć najwyższą cenę złota, która wystąpiła w przeciągu ostatniego miesiąca. Podać tę datę. 

fetch("http://api.nbp.pl/api/cenyzlota/last/30/?format=json")
.then((response) => response.json())
.then((dane) => {
    dane.sort((a, b) => a.cena - b.cena);
    console.log(`Dnia: ${dane[0].data} Cena: ${dane[0].cena}`);
  });
