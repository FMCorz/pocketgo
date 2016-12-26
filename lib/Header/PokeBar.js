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
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Bar from './Bar';
import PokeImage from '../Pokemon/Image';
import * as Utils from '../utils';

class PokeBar extends Component {

  constructor(...args) {
    super(...args);
    this.pokemon = Utils.getPokemon(this.props.pokemon);
  }

  render() {
    return (
      <Bar style={this.props.style}>
          <PokeImage style={styles.image} id={this.props.pokemon} />
          <Text style={styles.title} numberOfLines={1}>
            {this.props.children ? (this.props.children) : this.pokemon.name}
          </Text>
      </Bar>
    )
  }
}

PokeBar.propTypes = {
  pokemon: React.PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  image: {
    width: 44,
    height: 44,
    marginLeft: 5,
    marginRight: 5
  },
  title: {
    fontSize: 20
  },
})

export default PokeBar;
