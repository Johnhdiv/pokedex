const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const backBTN = document.getElementById("backBTN")
const pokemonInfo = document.getElementById("pokemonInfo")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
let query = ""
async function fetchPokemonData(pokemonID) {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
    const pokemon= await response.json()
    return pokemon  
}

function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemonCard")
    pokemonCard.innerHTML =`
    <h3>${pokemon.name}</h3>
    <img src=${pokemon.sprites.front_shiny} alt="${pokemon.name}">
    `
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
}

function showPokemonDetail (pokemon){
    pokemonList.style.display= "none"
    pokemonDetail.style.display = "block"
    let abilitiess=""
    pokemon.abilities.forEach( abilities => {
        abilitiess= abilitiess + `<li class="abilities"> ${abilities.ability.name}</li>`
    })
    //for(let i=0; i<pokemon.abilities.length; i++){
    //   abilities = abilities+pokemon.abilities[i].ability.name + "<br>"
    //}
    let statsToPrint = ""
    pokemon.stats.forEach(stat => {
        statsToPrint=statsToPrint + `<li class="stats"> ${stat.stat.name}: ${stat.base_stat}</li>`
    })
    let movesToPrint =""
    pokemon.moves.forEach(moves => {
        movesToPrint=movesToPrint + `<li class="moves"> ${moves.move.name}</li>`
    })

    pokemonInfo.innerHTML =`
        <h3>${pokemon.name}</h3>
        <img src=${pokemon.sprites.front_shiny} alt="${pokemon.name}">
        <h3>abilities</h3>
        <ul>
        ${abilitiess}
        </ul>
        <h3>stats</h3>
        <ul>
        ${statsToPrint}
        </ul> 
        <h3>moves</h3>
        <ul>
        ${movesToPrint}
        </ul>
    `
}

backBTN.addEventListener("click",()=>{
    pokemonDetail.style.display="none"
    pokemonList.style.display="block"
})

async function loadPokedex() {
    for(let i=1; i<51; i++){
        dato = await fetchPokemonData(i)
        displayPokemon(dato)
    }
}


loadPokedex()

searchInput.addEventListener("input", (evento)=>{
    query=evento.target.value;
})

async function serchPokemon() {
    
    try {
        const pokemon = await fetchPokemonData(query)
        showPokemonDetail(pokemon)
    } catch (error) {
        alert("Pokemon no encontrado, intenta con otro ID o nombre")
    }
}
searchBtn.addEventListener("click",()=>{
    console.log(query)
    serchPokemon()
})
