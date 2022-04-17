const pokeName = document.getElementById("poke-name");
const pokeSprite = document.getElementById("poke-sprite");
const pokeTypes = document.getElementById("poke-types");
const pokeAttack = document.getElementById("poke-attackValue");
const pokeHp = document.getElementById("poke-hp");
const pokeDefense = document.getElementById("poke-defenseValue");
const pokeSpeed = document.getElementById("poke-speedValue");
const pokemonID = document.querySelector(".aSelec");
const pokeContainer = document.getElementById("poke-dex1");
const pokeEl = document.querySelector(".test");

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

const createPokeCard = (data) => {
  const { name, sprites, types, stats } = data;
  let type = data.types[0].type.name;
  const pokeEl = document.createElement("div");
  pokeEl.classList.add("poke-card");
  pokeEl.classList.add("test");
  pokeEl.setAttribute("id", "idTest");

  if (types.length > 1) {
    type = `${types[0].type.name}, ${types[1].type.name}`;
  }

  const pokeInnerHtml = `
        
        <div class="container-name">
        
            <a target="blank" class="name" href="https://www.wikidex.net/wiki/${name}" style="color: black; 
            text-decoration: none; text-transform: capitalize;"><h3>${name}</h3></a>
        </div>
        <div class="container-sprite">
            <img class="sprite" src="${sprites.front_default}" >
        </div>
        <div class="container-types">
            <span class="type" href="">${type}</span>
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

fetchPokemons(12);
