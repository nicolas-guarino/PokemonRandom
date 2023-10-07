const URL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292';
let datos = [];
let results = [];

async function obtenerDatos() {
    try {
        const response = await fetch(URL);
        datos = await response.json();
        results = datos.results;
    } catch (error) {
        console.error('Error', error);
    }
}

async function obtenerInformacionAdicional(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener información adicional:', error);
    }
}

async function obtenerPokemonAleatorio() {
    const container = document.getElementById('container');

    if (results && results.length > 0) {
        const randomIndex = Math.floor(Math.random() * results.length);
        const randomPokemon = results[randomIndex];
        const pokemonUrl = randomPokemon.url;

        // Obtener información adicional del Pokémon
        const pokemonInfo = await obtenerInformacionAdicional(pokemonUrl);

        // Obtener la URL de formas del Pokémon
        const formsUrl = pokemonInfo.forms[0].url;

        // Obtener información adicional de las formas
        const formsInfo = await obtenerInformacionAdicional(formsUrl);

        // Obtener la imagen front_default
        const imageUrl = formsInfo.sprites.front_default;

        container.innerHTML = `
            <h2 class="fs-1 my-3">${randomPokemon.name}</h2>
            <img class="w-25" src="${imageUrl}" alt="${randomPokemon.name}" />
        `;
    } else {
        container.textContent = 'Cargando datos...';
    }
}

obtenerDatos();

const generatorBtn = document.getElementById('generatorBtn');

generatorBtn.addEventListener('click', obtenerPokemonAleatorio);
