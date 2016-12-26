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

import LocalizedStrings from 'react-native-localization';

import db from '../assets/database.json';

let moves;
let pokemons;
let types;

export function round(number, decimals = 1) {
    const n = decimals > 0 ? decimals * 10 : 1;
    return Math.round(number * n) / n;
}

export function hasStab(move, pokemonTypes) {
    return pokemonTypes && pokemonTypes.indexOf(move.type) > -1;
}

export function getDps(move, pokemonTypes) {
    const multipler = hasStab(move, pokemonTypes) ? 1.25 : 1;
    return move.dps * multipler;
}

export function sortMovesByDps(moves, pokemonTypes) {
    return moves.sort((move1, move2) => {
        return getDps(move1, pokemonTypes) - getDps(move2, pokemonTypes);
    });
}

export function getMoves() {
    if (!moves) {
        moves = {};
        Object.keys(db.moves).map((moveId) => {
            let translations = {en: {}};
            let move = {...db.moves[moveId]};

            Object.keys(move.i18n).map((lang) => {
                translations[lang] = translations[lang] || {};
                translations[lang][moveId] = move.i18n[lang].name;
            });
            delete move['i18n'];

            let strings = new LocalizedStrings(translations);
            move.name = strings[moveId];

            moves[moveId] = move;
        });
    }
    return moves;
}

export function getMove(moveId) {
    return getMoves()[moveId];
}

export function getPokemons() {
    if (!pokemons) {
        pokemons = {};
        Object.keys(db.pokemons).map((pokemonId) => {
            let translations = {en: {}};
            let pokemon = {...db.pokemons[pokemonId]};

            Object.keys(pokemon.i18n).map((lang) => {
                translations[lang] = translations[lang] || {};
                translations[lang][pokemonId] = pokemon.i18n[lang].name;
            });
            delete pokemon['i18n'];

            let strings = new LocalizedStrings(translations);
            pokemon.name = strings[pokemonId];

            pokemons[pokemonId] = pokemon;
        });
    }
    return pokemons;
}

export function getPokemon(pokemonId) {
    return getPokemons()[pokemonId];
}

export function getTypes() {
    if (!types) {
        types = {};
        Object.keys(db.types).map((typeId) => {
            let translations = {en: {}};
            let type = {...db.types[typeId]};

            Object.keys(type.i18n).map((lang) => {
                translations[lang] = translations[lang] || {};
                translations[lang][typeId] = type.i18n[lang].name;
            });
            delete type['i18n'];

            let strings = new LocalizedStrings(translations);
            type.name = strings[typeId];

            types[typeId] = type;
        });
    }
    return types;
}

export function getType(typeId) {
    return getTypes()[typeId];
}