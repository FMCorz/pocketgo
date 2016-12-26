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

export const SET_NAVIGATOR = 'SET_NAVIGATOR';
export const SET_POKEMON_ORDER = 'SET_POKEMON_ORDER';

export const POKEMON_ORDERS = {
  EGG: 'EGG',
  ALPHA: 'ALPHA',
  NUMERICAL: 'NUMERICAL',
  TYPE: 'TYPE',
}

export function setPokemonOrder(order) {
  return {
    type: SET_POKEMON_ORDER,
    order: order
  }
}

export function setNavigator(navigator) {
  return {
    type: SET_NAVIGATOR,
    navigator: navigator
  }
}