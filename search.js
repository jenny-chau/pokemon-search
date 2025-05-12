// async function to fetch API data
async function fetchData(callBack) {
    const userInput = document.getElementById("inputValue").value;
    const apiLink = "https://pokeapi.co/api/v2/pokemon/" + userInput;

    try {
        const pokemonData = await fetch(apiLink);
        const useableData = await pokemonData.json();
        callBack(null, useableData);
    } catch(error) {
        callBack(error, null);
    }
}

// callBack function to display the data/error message on the page
const displayData = function (error, data) {
    const displayElement = document.getElementById("display-pokemon-info");
    
    if(error) {
        displayElement.innerHTML = `
            <p>Pokemon not found. Pleace check spelling/symbols.</p>
            <br>
            Error fetching data: ${error}
        `;
    } else {
        const name = data.name;
        const type = data.types.map(t => t['type']['name']);
        const typeUpper = type.map(t => t.charAt(0).toUpperCase() + t.slice(1))
        
        displayElement.innerHTML = `
            <img src="${data.sprites.front_default}" placeholder="${data.name} image">
            <p><strong>Name:</strong> ${name.charAt(0).toUpperCase() + name.slice(1)}</p>
            <p><strong>Type:</strong> ${typeUpper.join(", ")}</p>
        `; //Capitalizes first letter of name and type
        
        resetPokemonValue();
    }
    displayElement.style.visibility = 'visible';
};

// Called in index.html when search button is clicked
const searchPokemon = function() {
    fetchData(displayData);
};

// Reset button function
const resetPokemonValue = function() {
    const inputElement = document.getElementById("inputValue");
    inputElement.value = "";
};

// Allows input to be submitted via pressing "Enter" key on keyboard
let input = document.getElementById("inputValue");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("submitBtn").click();
    }
});