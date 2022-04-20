const pokeName = document.getElementById("poke-name");
const pokeSprite = document.getElementById("poke-sprite");
const pokeTypes = document.getElementById("poke-types");
const pokeAttack = document.getElementById("poke-attackValue");
const pokeHp = document.getElementById("poke-hp");
const pokeDefense = document.getElementById("poke-defenseValue");
const pokeSpeed = document.getElementById("poke-speedValue");
const pokemonID = document.querySelector(".aSelec");
const pokeContainer = document.getElementById("poke-dex1");
const onePoke = document.getElementById("poke-card1");
const pokeEl = document.querySelector(".test");
const alone = document.querySelector(".poke-search");

const fetchPokemons = async (n) => {
  for (let i = 1; i <= n; i++) {
    await generatePokemon(i);
  }
};

const generatePokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/` + id.toString();
  const res = await fetch(url);
  const data = await res.json();
  if (id !== "0") {
    createPokeCard(data);
  }
};

const refresh = () => {
  document.getElementById("pokemon").value = "";
  onePoke.style.display = "none";
  pokeContainer.style.display = "";
};

const createPokeCard = (data) => {
  const { name, sprites, types, stats } = data;
  let type = data.types[0].type.name;
  const pokeEl = document.createElement("div");
  pokeEl.classList.add("poke-card");
  pokeEl.classList.add("test");
  pokeEl.classList.add("visibility2");

  if (types.length > 1) {
    type = `${types[0].type.name}, ${types[1].type.name}`;
  }

  switch (types[0].type.name) {
    case "normal":
      pokeEl.setAttribute("style", "background-color: #A8A77A;");
      break;
    case "fire":
      pokeEl.setAttribute("style", "background-color: #EE8130;");
      break;
    case "water":
      pokeEl.setAttribute("style", "background-color: #6390F0;");
      break;
    case "electric":
      pokeEl.setAttribute("style", "background-color: #F7D02C;");
      break;
    case "grass":
      pokeEl.setAttribute("style", "background-color: #7AC74C;");
      break;
    case "ice":
      pokeEl.setAttribute("style", "background-color: #96D9D6;");
      break;
    case "fighting":
      pokeEl.setAttribute("style", "background-color: #C22E28;");
      break;
    case "poison":
      pokeEl.setAttribute("style", "background-color: #A33EA1;");
      break;
    case "ground":
      pokeEl.setAttribute("style", "background-color: #E2BF65;");
      break;
    case "flying":
      pokeEl.setAttribute("style", "background-color: #A98FF3;");
      break;
    case "psychic":
      pokeEl.setAttribute("style", "background-color: #F95587;");
      break;
    case "bug":
      pokeEl.setAttribute("style", "background-color: #A6B91A;");
      break;
    case "rock":
      pokeEl.setAttribute("style", "background-color: #B6A136;");
      break;
    case "ghost":
      pokeEl.setAttribute("style", "background-color: #735797;");
      break;
    case "dragon":
      pokeEl.setAttribute("style", "background-color: #6F35FC;");
      break;
    case "dark":
      pokeEl.setAttribute("style", "background-color: #705746;");
      break;
    case "steel":
      pokeEl.setAttribute("style", "background-color: #B7B7CE;");
      break;
    case "fairy":
      pokeEl.setAttribute("style", "background-color: #D685AD;");
      break;
  }

  const pokeInnerHtml = `
        
        <div class="container-name">
            <h3>
            <a target="blank" class="name" href="https://www.wikidex.net/wiki/${name}" style="color: black; 
            text-decoration: none; text-transform: capitalize;">${name}</a>
            </h3>
        </div>
        <div class="container-sprite">
            <img class="sprite" src="${sprites.front_default}" >
        </div>
        <div class="container-types">
            <b>
            <span class="type" href="" style="text-transform: capitalize;">${type}</span>
            </b>
        </div>
        <br>
        <div class="content">
        <div class="container-attack">
        <span>Attack </span>
            <span class="attack" href="">${stats[1].base_stat}</span>
        </div>
        <div class="container-hp">
        <span>HP </span>
        <span class="hp" href="">${stats[0].base_stat}</span>
    </div>
        
        <div class="container-defense">
        <span>Defense </span>
            <span class="defense" href="">${stats[2].base_stat}</span>
        </div>
        
        <div class="container-speed">
        <span>Speed </span>
            <span class="speed" href="">${stats[5].base_stat}</span>
        </div>
        </div>
   
    `;

  pokeEl.innerHTML = pokeInnerHtml;
  pokeContainer.appendChild(pokeEl);

  return;
};

const getPokemonData = async () => {
  const pokemon = document.getElementById("pokemon").value.toLowerCase();
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  let data = await res.json();
  if (pokemon === "" && pokemon.value === undefined) {
    getPokemonDataRandom();
  } else {
    onePoke.style.display = "block";
    pokeContainer.style.display = "none";
    let types = data.types;
    pokeName.innerText = `${data.name}`;
    pokeSprite.src = `${data.sprites.front_default}`;
    if (types.length > 1 && types.length < 3) {
      pokeTypes.innerText = `${data.types[0].type.name}, ${data.types[1].type.name}`;
    } else {
      pokeTypes.innerText = `${data.types[0].type.name}`;
    }

    backgroundTypes(types);

    pokeAttack.innerText = `${data.stats[1].base_stat}`;
    pokeHp.innerText = `${data.stats[0].base_stat}`;
    pokeDefense.innerText = `${data.stats[2].base_stat}`;
    pokeSpeed.innerText = `${data.stats[5].base_stat}`;
    pokemonID.href = `https://www.wikidex.net/wiki/${data.name}`;
  }
};

const getPokemonDataRandom = async () => {
  onePoke.style.display = "block";
  pokeContainer.style.display = "none";
  let id = Math.floor(Math.random() * 898);
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let data = await res.json();
  pokeName.innerText = `${data.name}`;
  pokeSprite.src = `${data.sprites.front_default}`;
  let types = data.types;
  if (types.length > 1 && types.length < 3) {
    pokeTypes.innerText = `${data.types[0].type.name}, ${data.types[1].type.name}`;
  } else {
    pokeTypes.innerText = `${data.types[0].type.name}`;
  }

  backgroundTypes(types);

  pokeAttack.innerText = `${data.stats[1].base_stat}`;
  pokeHp.innerText = `${data.stats[0].base_stat}`;
  pokeDefense.innerText = `${data.stats[2].base_stat}`;
  pokeSpeed.innerText = `${data.stats[5].base_stat}`;
  pokemonID.href = `https://www.wikidex.net/wiki/${data.name}`;
};

function backgroundTypes(types) {
  switch (types[0].type.name) {
    case "normal":
      alone.setAttribute("style", "background-color: #A8A77A;");
      break;
    case "fire":
      alone.setAttribute("style", "background-color: #EE8130;");
      break;
    case "water":
      alone.setAttribute("style", "background-color: #6390F0;");
      break;
    case "electric":
      alone.setAttribute("style", "background-color: #F7D02C;");
      break;
    case "grass":
      alone.setAttribute("style", "background-color: #7AC74C;");
      break;
    case "ice":
      alone.setAttribute("style", "background-color: #96D9D6;");
      break;
    case "fighting":
      alone.setAttribute("style", "background-color: #C22E28;");
      break;
    case "poison":
      alone.setAttribute("style", "background-color: #A33EA1;");
      break;
    case "ground":
      alone.setAttribute("style", "background-color: #E2BF65;");
      break;
    case "flying":
      alone.setAttribute("style", "background-color: #A98FF3;");
      break;
    case "psychic":
      alone.setAttribute("style", "background-color: #F95587;");
      break;
    case "bug":
      alone.setAttribute("style", "background-color: #A6B91A;");
      break;
    case "rock":
      alone.setAttribute("style", "background-color: #B6A136;");
      break;
    case "ghost":
      alone.setAttribute("style", "background-color: #735797;");
      break;
    case "dragon":
      alone.setAttribute("style", "background-color: #6F35FC;");
      break;
    case "dark":
      alone.setAttribute("style", "background-color: #705746;");
      break;
    case "steel":
      alone.setAttribute("style", "background-color: #B7B7CE;");
      break;
    case "fairy":
      alone.setAttribute("style", "background-color: #D685AD;");
      break;
  }
}

fetchPokemons(12);
