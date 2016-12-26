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

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import TouchableFeedback from '../Button/TouchableFeedback';
import { Sheet } from '../styles';
import * as Utils from '../utils';
import PokeImage from './Image';

function Thumb(props) {
  const pokemon = Utils.getPokemon(props.id);
  const name = pokemon.name;
  const thumb = (
    <View style={[styles.root, props.style]}>
      <View style={Sheet.flexZero}>
        <PokeImage id={pokemon.id} />
      </View>
      <View style={Sheet.flexOne}>
          <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );

  if (props.onPress) {
    return (
      <TouchableFeedback onPress={() => props.onPress(pokemon)}>
        <View style={Sheet.flexOne}>
          {thumb}
        </View>
      </TouchableFeedback>
    )
  }

  return thumb;
}

Thumb.propTypes = {
  id: React.PropTypes.number.isRequired,
  onPress: React.PropTypes.func
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    paddingBottom: 10,
  }
});

export default Thumb;
