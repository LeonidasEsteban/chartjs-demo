import data from './data.js';
import makeChart from './make-chart.js';
// var -> cuando quieres una variable global
// let -> cuando si cambia
// const -> cuando no cambia


const $form = document.querySelector('#form');
const datasetList = [];
const types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fight', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];
const colors = ['#a8b820', '#715b4a', '#6f37f9', '#f9d02f', '#ffa3b1', '#c03028', '#f07f2f', '#a890f0', '#705798', '#78c74f', '#e0c069', '#98d8d8', '#a9a878', '#a040a1', '#f85888', '#b7a038', '#b8b8d0', '#6890f0']
let chart = makeChart('radar', [], types);

$form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData($form);
  const id = form.get('id') - 1;
  const pokemon = await getPokemon(id);
  console.log(pokemon);
  const pokemonSprite = pokemon.sprites.front_default;
  const image = new Image();
  image.src = pokemonSprite;
  const type = form.get('type');
  const pokemonData = data[id];
  console.log(pokemonData.type1)
  const color = colors[types.indexOf(pokemonData.type1)];
  const againstData = types.map((type) => pokemonData[`against_${type}`])

  image.onload = () => {
    const context = document.querySelector('#chart').getContext('2d')
    const fillPattern = context.createPattern(image, 'repeat');

    const dataset = {
      label: pokemonData.name,
      data: againstData,
      borderColor: color,
      borderWidth: 3,
      backgroundColor: fillPattern,
    }

    datasetList.push(dataset)
    console.log(chart);
  
    // console.log(chart.data.datasets.find((dataset) => dataset.label === pokemonData.name))
    if (!chart.data.datasets.find((dataset) => dataset.label === pokemonData.name)) {
      chart.data.datasets.push(dataset);
    }
  
  
    if (chart.config.type !== type) {
      const datasetList = chart.data.datasets;
      chart.destroy(); 
      chart = makeChart(type, datasetList, types)
    } else {
      // chart.config.type = type;
      chart.update();
    }
  }

})


async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const pokemon = await response.json();
  return pokemon;
}

