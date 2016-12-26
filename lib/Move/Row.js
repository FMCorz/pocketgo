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

import Icon from 'react-native-vector-icons/Ionicons';

import Charges from './Charges';
import TypeBadge from '../Type/Badge';
import * as Utils from '../utils';

function Row(props) {
  const move = props.move;
  const dps = Utils.getDps(move, props.attackerTypes);
  return (
    <View style={styles.root} key={move.id}>

      <View style={styles.type}>
        <TypeBadge type={move.type} />
      </View>

      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{move.name}</Text>
      </View>

      <Charges count={move.charges} style={styles.charges}/>

      <Text style={styles.power}>{Utils.round(dps)}</Text>

      <View style={styles.iconWrapper}>
        <Icon name="ios-arrow-forward" style={styles.icon} />
      </View>
    </View>
  )
}

Row.propTypes = {
  attackerTypes: React.PropTypes.array,
  move: React.PropTypes.object.isRequired
}

Row.defaultProps = {
  attackerTypes: []
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center'
  },
  charges: {
    flex: 2,
    height: 12,
    alignSelf: 'center'
  },
  type: {
    flex: 0,
    paddingRight: 6
  },
  nameWrapper: {
    flex: 2
  },
  name: {
    fontSize: 16
  },
  power: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center'
  },
  iconWrapper: {
    flex: 0,
  },
  icon: {
  }
});

export default Row;
