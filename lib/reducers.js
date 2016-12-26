/**
 * Copyright 2016 Frédéric Massart
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  SET_NAVIGATOR,
  SET_POKEMON_ORDER,
  POKEMON_ORDERS
} from './actions'

import * as Utils from './utils';

function numericalSort(pok1, pok2) {
  return pok1.id - pok2.id;
}

function alphaSort(pok1, pok2) {
  return pok1.name.toLowerCase() < pok2.name.toLowerCase() ? -1 : 1;
}

function getEggSorting(pokemonList) {
  let sections = {
    2: {
      id: '2km',
      items: []
    },
    5: {
      id: '5km',
      items: []
    },
    10: {
      id: '10km',
      items: []
    },
  };
  let pokemons = [];

  pokemonList
    .filter((pokemon) => pokemon.egg_type > 0)
    .sort(eggSort)
    .forEach((pokemon) => {
      sections[pokemon.egg_type].items.push(pokemon)
    });

  pokemons = Object.values(sections).reduce((carry, section) => {
    section.items.sort(alphaSort); // Ordering in place.
    carry.push(...section.items)
    return carry;
  }, []);

  return {sections, pokemons};
}

function eggSort(pok1, pok2) {
  return pok1.egg_type - pok2.egg_type;
}

function getTypeSorted(pokemonList) {
  let sections = {};
  let pools = {};
  let pokemons = [];

  pokemonList.forEach((pokemon) => {
    let t1 = pokemon.types[0];
    let t2 = pokemon.types[1];
    if (!sections[t1]) {
      sections[t1] = {id: t1, type: Utils.getType(t1), items: []};
    }
    if (t2 && !sections[t2]) {
      sections[t2] = {id: t2, type: Utils.getType(t2), items: []};
    }
    sections[t1].items.push(pokemon);
    if (t2) {
      sections[t2].items.push(pokemon);
    }
  });

  // Re-organise the object alphabetically.
  sections = Object.keys(sections).sort((sectionId1, sectionId2) => {
    return sections[sectionId1].type.name < sections[sectionId2].type.name ? -1 : 1;
  }).reduce((carry, key) => {
      // Re-organise the pokemons in the sections contain.
    carry[key] = {
      ...sections[key],
      items: sections[key].items.sort(alphaSort).map((pokemon) => {
        // Also make the list of pokemons.
        pokemons.push(pokemon);
        return pokemon;
      })
    };
    return carry;
  }, {});

  return {sections, pokemons};
}

function typeSort(pok1, pok2) {
  if (pok1.types[0] === pok2.types[0]) {
    return alphaSort(pok1, pok2);
  }
  return pok1.types[0] < pok2.types[0] ? -1 : 1;
}

let sortEngines = {};
sortEngines[POKEMON_ORDERS.NUMERICAL] = numericalSort;
sortEngines[POKEMON_ORDERS.ALPHA] = alphaSort;

const pokemonList = Object.values(Utils.getPokemons()).sort(sortEngines[POKEMON_ORDERS.NUMERICAL]);
const initialState = {
  order: POKEMON_ORDERS.NUMERICAL,
  pokemons: pokemonList,
  sections: {0: {id: 0, items: pokemonList}}
}

export default function myApp(state = initialState, action) {
  switch (action.type) {

    case SET_NAVIGATOR:
      return Object.assign({}, state, {
        navigator: action.navigator
      });

    case SET_POKEMON_ORDER:

      let sections = {};
      let pokemons = [];

      if (action.order == POKEMON_ORDERS.EGG) {
        ({sections, pokemons} = getEggSorting([...pokemonList]));

      } else if (action.order == POKEMON_ORDERS.TYPE) {
        ({sections, pokemons} = getTypeSorted([...pokemonList]));

      } else {
        pokemons = [...pokemonList].sort(sortEngines[action.order]);
        sections = { 0: {
          id: 0,
          items: pokemons,
        }}

      }

      return Object.assign({}, state, {
        order: action.order,
        pokemons: pokemons,
        sections: sections
      });

    default:
      return state;
  }
}
