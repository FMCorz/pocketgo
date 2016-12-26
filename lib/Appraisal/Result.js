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
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { appraise } from './lib';
import { Sheet } from '../styles';
import { Strings } from '../Strings';
import Title from '../Title';
import Attr from './Attr';
import Gauge from './Gauge';

const Result = function(props) {
  let attack = [0, 0],
      defense = [0, 0],
      hp = [0, 0],
      total = 0;

  const result = appraise(props.level, props.attrs, props.strength);
  if (result) {
    ({ attack, defense, hp, total } = result);
  }

  const overall = total[0] != total[1] ? (total[0] + " - " + total[1]) : total[0];

  return (
    <View style={Sheet.flexOne}>
      <Title>{Strings.overall}</Title>
      <View style={styles.overallWrapper}>
        <View style={styles.overallRangeWrapper}>
          <Text style={styles.overallRange}>{overall}</Text>
        </View>
        <View style={Sheet.flexOne}>
          <Gauge.Horizontal range={total} best={45} style={styles.overallGauge} />
        </View>
      </View>

      <Title>{Strings.attributes}</Title>
      <View style={styles.attrWrapper}>
        <Attr.Attack range={attack} />
        <Attr.Defense range={defense} />
        <Attr.HP range={hp} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  overallWrapper: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20
  },
  overallRangeWrapper: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  overallRange: {
    flex: 0,
    fontSize: 16
  },
  overallGauge: {
    alignSelf: 'stretch'
  },
  attrWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    minHeight: 250
  },
});

export default Result;
