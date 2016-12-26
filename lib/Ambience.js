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
  StyleSheet,
} from 'react-native';
import ColorPropType from 'ColorPropType';

import { TypeStyles } from './styles';

class Ambience extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
        anim: new Animated.Value(0),
        previous: null,
    }
  }

  getBgColor() {
    if (!this.state.previous) {
      return this.props.color;
    }

    return this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [this.state.previous,  this.props.color]
    });
  }

  componentWillReceiveProps(props) {
    if (props.color == this.props.color) {
      // The color is not changing, nothing to do here ~~\o/.
      return;
    }

    const anim = new Animated.Value(0);
    this.setState({
      anim: anim,
      previous: this.props.color
    });
    Animated.timing(
      anim, {
        toValue: 1,
        duration: 500,
        delay: 0,
      }
    ).start();
  }

  render() {
    return (
      <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: this.getBgColor()}]} />
    );
  }
}

Ambience.propTypes = {
  color: ColorPropType.isRequired
}

const Move = function(props) {
  return (
    <Type type={props.move.type} />
  );
}

const Pokemon = function(props) {
  return (
    <Type type={props.pokemon.types[0]} />
  );
}

const Type = function(props) {
  const color = TypeStyles[props.type] || TypeStyles['normal'];
  return (
    <Ambience color={color.background} />
  );
}

Ambience.Move = Move;
Ambience.Pokemon = Pokemon;
Ambience.Type = Type;

export default Ambience;
