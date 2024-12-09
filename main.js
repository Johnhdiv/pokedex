const pokemonList = document.getElementById("pokemonList")
async function fetchPokemonData(pokemonID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
    const pokemon = await response.json()
    console.log(pokemon)
    return pokemon
}

function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemonCard")
    pokemonCard.innerHTML =`
    <h3>${pokemon.name}</h3>
    <img src=${pokemon.sprites.front_default} alt="${pokemon.name}">
    `
    pokemonList.appendChild(pokemonCard)
}
async function loadPokedex() {
    dato = await fetchPokemonData(120)
    console.log(dato)
    displayPokemon(dato)




    }
    async function loadPokedex(params) {
        dato = await fetchPokemonData(33)
        console.log(dato)
        displayPokemon(dato)

        
    }
    async function loadPokedex() {
        for (let i=1; i<=5; i++){
            const pokemon = await fetchPokemonData(i);
            displayPokemon(pokemon);
        }
        
        
    }


    loadPokedex()



    


//console.log(fetchPokemonData(150))