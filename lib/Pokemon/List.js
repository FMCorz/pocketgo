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
import { Animated, Dimensions, View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import PokemonGrid from './Grid';
import { Sheet, TypeStyles } from '../styles';
import ListHeader from '../ListHeader';
import { Strings } from '../Strings';
import Filters from '../Menu/Filters';

import { POKEMON_ORDERS, setPokemonOrder } from '../actions';
import assets from '../../assets';

function mapStateToProps(state) {
  return {
    navigator: state.navigator,
    pokemons: state.pokemons,
    sections: state.sections,
    order: state.order
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSortChange: order => {
      dispatch(setPokemonOrder(order));
    }
  };
}

class List extends Component {
  constructor(props) {
    super(props);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
  }

  pickFilter(filter) {
    if (filter == this.props.order) {
      return;
    }
    this.props.onSortChange(filter);
    this.pokemonGrid.scrollTo({ x: 0, y: 0, animated: false });
  }

  goToPokemon(pokemon, index, sectionId, rowId) {
    // Compute the index of the pokemon in the flat list.
    let realIndex = 0;
    const sectionKeys = Object.keys(this.props.sections);
    const sectionIndex = sectionKeys.indexOf(sectionId);
    for (let i = 0; i < sectionIndex; i++) {
      realIndex += this.props.sections[sectionKeys[i]].items.length;
    }
    realIndex += rowId * 3 + index;

    this.props.navigator.push({
      name: 'pokemon',
      index: realIndex
    });
  }

  renderSectionHeader(sectionData, sectionId) {
    const isFirst = Object.keys(this.props.sections).indexOf(sectionId) <= 0;

    if (this.props.order == POKEMON_ORDERS.EGG) {
      return (
        <ListHeader first={isFirst}>
          <View style={styles.eggHeaderWrapper}>
            <View style={Sheet.eggHeaderImageWrapper}>
              <Image source={assets.egg} />
            </View>
            <View style={styles.eggHeaderTextWrapper}>
              <Text style={styles.headerText}>
                {sectionId}
              </Text>
              <Text style={styles.eggHeaderUnit}>
                {Strings.km}
              </Text>
            </View>
          </View>
        </ListHeader>
      );
    } else if (this.props.order == POKEMON_ORDERS.TYPE) {
      return (
        <ListHeader backgroundColor={TypeStyles[sectionData.type.id].background} first={isFirst}>
          <Text style={[styles.headerText, { color: TypeStyles[sectionData.type.id].foreground }]}>
            {sectionData.type.name}
          </Text>
        </ListHeader>
      );
    }
    return (
      <Text>
        {sectionId}
      </Text>
    );
  }

  render() {
    return (
      <View style={Sheet.flexOne}>
        <View style={Sheet.flexOne}>
          <PokemonGrid
            ref={c => (this.pokemonGrid = c)}
            sections={this.props.sections}
            renderSectionHeader={this.renderSectionHeader}
            contentContainerStyle={styles.gridContent}
            onPress={(pokemon, index, sectionId, rowId) => this.goToPokemon(pokemon, index, sectionId, rowId)}
          />
        </View>
        <Filters
          onFilterPicked={filter => {
            this.pickFilter(filter);
          }}
          filter={this.props.order}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridContent: {
    paddingBottom: 90
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#eeee'
  },
  headerText: {
    fontSize: 24
  },
  eggHeaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  eggHeaderImageWrapper: {
    flex: 0
  },
  eggHeaderTextWrapper: {
    flex: 0,
    marginLeft: 5,
    flexDirection: 'row'
  },
  eggHeaderUnit: {
    fontSize: 12,
    marginTop: 3
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
