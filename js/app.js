const api = axios.create({
	baseURL: "https://pokeapi.co/api/v2/",
  
	Headers: {
	  "Content-Type": "application/json;charset=utf-8"
	}
})

let offset = 252;
let limit = 386;

let pokemonList = []

window.addEventListener('load', function(){
	
})

async function obtener_pokemones(id) {
	const { data } = await api(`pokemon-species/${id}/`);
	const poke = data.results;
	
	createPokeCard(data)
}

const fetchPokemons = async (offset, limit) => {
	for (let i = offset; i <= limit; i++) {
	  await obtener_pokemones(i);
	}
}

async function createPokeCard(pokemons) {
	const { data } = await api('pokemon/');
	const poke = data.results;


	poke.forEach(pokemonList => {
		let pokeCard = document.createElement("article")
		let pokeBG = document.createElement("section")
		let pokeImg = document.createElement("div")
		let pokeText = document.createElement("section")
		let pokeName = document.createElement("h2")
		let pokeDescription = document.createElement("p")

		pokeCard.classList.add("pokeCard")
		pokeBG.classList.add("pokeBG")
		pokeImg.classList.add("pokeImg")
		pokeImg.style.backgroundImage = `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemons.id}.png)`
		pokeText.classList.add("pokeText")

		pokeName.setAttribute("id", "pokeName");
		pokeName.textContent = pokemons.name

		pokeDescription.setAttribute("id", "pokeDescription");
		pokeDescription.textContent = pokemons.flavor_text_entries[28].flavor_text

		pokeContainer.append(pokeCard)
		pokeCard.append(pokeBG)
		pokeCard.append(pokeImg)
		pokeCard.append(pokeText)
		pokeText.append(pokeName)
		pokeText.append(pokeDescription)

		pokemonList.sort()
	});
}

fetchPokemons(offset, limit);