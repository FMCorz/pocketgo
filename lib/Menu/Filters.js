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
import PropTypes from 'prop-types';

import CircularButton from '../Button/Circle';
import CloseButton from '../Button/Close';
import { Sheet } from '../styles';
import { Strings } from '../Strings';
import { POKEMON_ORDERS } from '../actions';

class Filters extends Component {
  static propTypes = {
    filter: PropTypes.string,
    onFilterPicker: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      slide: new Animated.Value(0)
    };
  }

  getFilterIcon() {
    let filter = FILTER_OPTIONS.filter(option => option.type === this.props.filter)[0];
    return filter ? filter.icon : '?';
  }

  hide() {
    Animated.timing(this.state.slide, {
      duration: 300,
      toValue: 0
    }).start();
  }

  pickFilter(option) {
    this.props.onFilterPicked && this.props.onFilterPicked(option.type);
    this.hide();
  }

  show() {
    Animated.timing(this.state.slide, {
      duration: 300,
      toValue: 1
    }).start();
  }

  render() {
    const optionMarginBottom = this.state.slide.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [-10000, -20, 0]
    });
    const optionOpacity = this.state.slide.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [0, 0, 1]
    });

    const options = FILTER_OPTIONS.map(option => {
      return (
        <FilterButton
          key={option.type}
          onPress={() => this.pickFilter(option)}
          name={option.name}
          icon={option.icon}
          style={{
            marginTop: 20,
            marginBottom: optionMarginBottom,
            opacity: optionOpacity
          }}
        />
      );
    });
    const filterOptions = (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <View style={styles.filtersWrapper} pointerEvents="box-none">
          {options}
          <Animated.View
            style={[
              styles.fitlerButtonWrapper,
              {
                marginTop: 20,
                marginBottom: optionMarginBottom,
                opacity: optionOpacity
              }
            ]}
          >
            <CloseButton onPress={() => this.hide()} />
          </Animated.View>
        </View>
      </View>
    );

    const top = this.state.slide.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get('window').height, 0]
    });
    const overlay = <Animated.View style={[styles.overlay, { top: top }]} />;

    const filterBtnOpacity = this.state.slide.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <Animated.View style={[styles.filterButtonPosition, { opacity: filterBtnOpacity }]}>
          <CircularButton onPress={() => this.show()} icon={this.getFilterIcon()} />
        </Animated.View>
        {overlay}
        {filterOptions}
      </View>
    );
  }
}

function FilterButton(props) {
  return (
    <Animated.View style={[props.style]}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.filterWrapper}>
          <View>
            <Text style={styles.filterButtonText}>
              {props.name.toUpperCase()}
            </Text>
          </View>
          <View style={styles.fitlerButtonWrapper}>
            <CircularButton onPress={props.onPress} icon={props.icon} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

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
  { name: Strings.number, icon: '#', type: POKEMON_ORDERS.NUMERICAL },
  { name: Strings.name, icon: 'A', type: POKEMON_ORDERS.ALPHA }
];

const styles = StyleSheet.create({
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
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#eeee'
  }
});

export default Filters;
