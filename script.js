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