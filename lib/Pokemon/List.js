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
  Animated,
  Dimensions,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

import CircularButton from '../Button/Circle';
import CloseButton from '../Button/Close';
import PokemonGrid from './Grid';
import { Sheet, TypeStyles } from '../styles';
import TouchableFeedback from '../Button/TouchableFeedback';
import ListHeader from '../ListHeader';
import { Strings } from '../Strings';

import { POKEMON_ORDERS, setPokemonOrder } from '../actions';
import assets from '../../assets';

function mapStateToProps(state) {
  return {
    navigator: state.navigator,
    pokemons: state.pokemons,
    sections: state.sections,
    order: state.order
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSortChange: (order) => {
      dispatch(setPokemonOrder(order))
    }
  }
}

class List extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chooseFilter: false,
      slide: new Animated.Value(0)
    }
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
  }

  pickFilter(option) {
    this.showFilters(false);
    if (option.type == this.props.order) {
      return;
    }
    this.props.onSortChange(option.type);
    this.pokemonGrid.scrollTo({x: 0, y: 0, animated: false});
  }

  showFilters(show) {
    show && this.setState({chooseFilter: show});
    Animated.timing(this.state.slide, {
      duration: 300,
      toValue: show ? 1 : 0
    }).start((data) => {
      !show && this.setState({chooseFilter: show})
    });
  }

  getFilterIcon() {
    let filter = FILTER_OPTIONS.filter((option) => option.type === this.props.order)[0];
    return filter ? filter.icon : '?';
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
        <ListHeader
            first={isFirst}>
          <View style={styles.eggHeaderWrapper}>
            <View style={Sheet.eggHeaderImageWrapper}>
              <Image source={assets.egg} />
            </View>
            <View style={styles.eggHeaderTextWrapper}>
              <Text style={styles.headerText}>{sectionId}</Text>
              <Text style={styles.eggHeaderUnit}>{Strings.km}</Text>
            </View>
          </View>
        </ListHeader>
      );

    } else if (this.props.order == POKEMON_ORDERS.TYPE) {
      return (
        <ListHeader
            backgroundColor={TypeStyles[sectionData.type.id].background}
            first={isFirst}>
          <Text style={[styles.headerText, {color: TypeStyles[sectionData.type.id].foreground}]}>
            {sectionData.type.name}
          </Text>
        </ListHeader>
      );
    }
    return (<Text>{sectionId}</Text>);
  }

  render() {
    let filterOptions;
    let overlay;

    // if (this.state.chooseFilter) {
      const optionMarginBottom = this.state.slide.interpolate({
        inputRange: [0, .2, 1],
        outputRange: [-10000, -20, 0]
      });
      const optionOpacity = this.state.slide.interpolate({
        inputRange: [0, .2, 1],
        outputRange: [0, 0, 1]
      });
      const options = FILTER_OPTIONS.map((option) => {
        return (
          <FilterButton
            key={option.type}
            onPress={() => this.pickFilter(option)}
            name={option.name}
            icon={option.icon}
            style={{
              marginTop: 20,
              marginBottom: optionMarginBottom,
              opacity: optionOpacity}}
            />
        )
      });
      filterOptions = (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <View style={styles.filtersWrapper} pointerEvents="box-none">
            {options}
            <Animated.View style={[styles.fitlerButtonWrapper, {
              marginTop: 20,
              marginBottom: optionMarginBottom,
              opacity: optionOpacity}]}>
              <CloseButton onPress={() => this.showFilters(false)} />
            </Animated.View>
          </View>
        </View>
      )
      const top = this.state.slide.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').height, 0]
      });
      overlay = (
        <Animated.View style={[styles.overlay, {top: top}]} />
      );
    // }
    const filterBtnOpacity = this.state.slide.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    return (
      <View style={Sheet.flexOne}>
        <View style={Sheet.flexOne}>
          <PokemonGrid
            ref={(c) => this.pokemonGrid = c}
            sections={this.props.sections}
            renderSectionHeader={this.renderSectionHeader}
            contentContainerStyle={styles.gridContent}
            onPress={(pokemon, index, sectionId, rowId) => this.goToPokemon(pokemon, index, sectionId, rowId)}/>
        </View>
        <Animated.View style={[styles.filterButtonPosition, {opacity: filterBtnOpacity}]}>
          <CircularButton
            onPress={() => this.showFilters(true)}
            icon={this.getFilterIcon()}/>
        </Animated.View>
        {overlay}
        {filterOptions}
      </View>
    );
  }
}

class FilterButton extends Component {
  render() {
    return (
      <Animated.View style={[this.props.style]}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={styles.filterWrapper}>
            <View>
              <Text style={styles.filterButtonText}>
                {this.props.name.toUpperCase()}
              </Text>
            </View>
            <View style={styles.fitlerButtonWrapper}>
              <CircularButton
                onPress={this.props.onPress}
                icon={this.props.icon} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  eggHeaderImageWrapper: {
    flex: 0,
  },
  eggHeaderTextWrapper: {
    flex: 0,
    marginLeft: 5,
    flexDirection: 'row'
  },
  eggHeaderUnit: {
    fontSize: 12,
    marginTop: 3
  },
  filtersWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 24
  },
  filterWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterButtonPosition: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64
  },
  fitlerButtonWrapper: {
    flex: -1,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterButtonText: {
    color: '#333',
    fontSize: 18,
    marginRight: 20
  }
});

const FILTER_OPTIONS = [
  {
    name: Strings.type,
    icon: 'ios-flask-outline',
    type: POKEMON_ORDERS.TYPE
  },
  {
    name: Strings.eggType,
    icon: 'ios-egg-outline',
    type: POKEMON_ORDERS.EGG
  },
  {name: Strings.number, icon: '#', type: POKEMON_ORDERS.NUMERICAL},
  {name: Strings.name, icon: 'A', type: POKEMON_ORDERS.ALPHA},
]

export default connect(mapStateToProps, mapDispatchToProps)(List);
