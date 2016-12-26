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
  Text,
  StyleSheet,
  View,
} from 'react-native';

import Gauge from './Gauge';
import { Sheet } from '../styles';
import { Heart, Sword, Shield } from '../Icons';
import { Strings } from '../Strings';

function Attr(props) {

  const indices = false;
  const best = props.best ? props.best : 15;
  let txt = props.range[0];
  if (props.range[0] != props.range[1]) {
    txt = props.range[0] + ' - ' + props.range[1];
  }

  return (
    <View style={[styles.wrapper, props.style]}>
      <View style={[styles.headingWrapper]}>
        {props.icon ? (<props.icon size={32} />) : null}
        <Text style={styles.heading} numberOfLines={1}>{props.name}</Text>
      </View>
      <View style={styles.gaugeWrapper}>
        {indices ? (<Text style={styles.best}>{best}</Text>) : null}
        <Gauge style={styles.gauge} range={props.range} best={best} />
        {indices ? (<Text style={styles.worst}>0</Text>) : null}
      </View>
      <View style={styles.valueWrapper}>
        <Text style={styles.value}>{txt}</Text>
      </View>
    </View>
  );
}

Attr.Attack = (props) => {
  return <Attr name={Strings.attack} range={props.range} style={props.style} icon={Sword} />
}

Attr.Defense = (props) => {
  return <Attr name={Strings.defense} range={props.range} style={props.style} icon={Shield} />
}

Attr.HP = (props) => {
  return <Attr name={Strings.hp} range={props.range} style={props.style} icon={Heart} />
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
  },
  headingWrapper: {
    flexBasis: 1,
    alignItems: 'center',
    marginBottom: 10
  },
  heading: {
    marginTop: 5,
    flex: 1,
    textAlign: 'center',
    fontSize: 12
  },

  gaugeWrapper: {
    marginTop: 5,
    alignItems: 'center',
    flex: 1,
  },
  gauge: {
    marginBottom: 3,
    marginTop: 3,
    flex: 1
  },
  best: {
    fontSize: 8,
  },
  worst: {
    fontSize: 8,
  },

  valueWrapper: {
    marginTop: 10,
  },
  value: {
    fontSize: 16
  }
});

export default Attr;
