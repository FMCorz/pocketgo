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
  Text,
  StyleSheet,
} from 'react-native';

import { TypeStyles } from '../styles';
import * as Utils from '../utils';

class Badge extends Component {

  render() {
    const type = Utils.getType(this.props.type);
    const bgColor = TypeStyles[type.id]['background'];
    const fgColor = TypeStyles[type.id]['foreground'];
    const typeName = type.name[0];

    return (
      <View style={[styles.circle, { backgroundColor: bgColor }]}>
        <Text style={[styles.text, { color: fgColor }]}>{typeName}</Text>
      </View>
    );
  }
}

Badge.propTypes = {
  type: React.PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  circle: {
    flex: -1,
    width: 28,
    height: 28,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  },
});

export default Badge;
