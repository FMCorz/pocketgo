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

import LocalizedStrings from 'react-native-localization';

import { Sheet } from '../styles';
import Title from '../Title';
import Bubble from './Bubble';
import { appraise } from './lib';
import { Shield, Sword, Heart } from '../Icons';
import { Strings } from '../Strings';

const AttrsPicker = function(props) {

  const disabled = [0, 1, 2, 3].map((i) => {
    return props.attrs.length <= 0 ||
      false === appraise(props.level, props.attrs, i)
  });

  const title = Strings['appraisal_attrs_' + props.team + '_title'];
  const s0 = Strings['appraisal_attrs_' + props.team + '_s0'];
  const s1 = Strings['appraisal_attrs_' + props.team + '_s1'];
  const s2 = Strings['appraisal_attrs_' + props.team + '_s2'];
  const s3 = Strings['appraisal_attrs_' + props.team + '_s3'];

  return (
    <View style={Sheet.flexOne}>
      <Title>{title}</Title>
      <View style={styles.attrsWrapper}>
        <AttrButton text={Strings.attack} onPress={() => props.onChooseAttr('attack')}
          selected={props.attrs.indexOf('attack') > -1} icon={Sword} />
        <AttrButton text={Strings.defense} onPress={() => props.onChooseAttr('defense')}
          selected={props.attrs.indexOf('defense') > -1} icon={Shield} />
        <AttrButton text={Strings.hp} onPress={() => props.onChooseAttr('hp')}
          selected={props.attrs.indexOf('hp') > -1} icon={Heart} />
      </View>
      <View style={{paddingTop: 25, flex: 1, justifyContent: 'space-between'}}>
        <Bubble.Button disabled={disabled[0]} text={s0} onPress={() => props.onChooseStrength(0)} />
        <Bubble.Button disabled={disabled[1]} text={s1} onPress={() => props.onChooseStrength(1)} />
        <Bubble.Button disabled={disabled[2]} text={s2} onPress={() => props.onChooseStrength(2)} />
        <Bubble.Button disabled={disabled[3]} text={s3} onPress={() => props.onChooseStrength(3)} />
      </View>
    </View>
  );
}

const AttrBadge = function(props) {
  const color = props.highlight ? '#5bc0de' : '#ccc';
  return (
    <View style={styles.badgeWrapper}>
      <View style={[styles.badgeCircle, {borderColor: color}]}>
        <props.icon size={30} color={color} />
      </View>
      <Text style={styles.badgeText}>{props.text}</Text>
    </View>
  );
}

const AttrButton = function(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={Sheet.flexZero}>
        <AttrBadge text={props.text} highlight={props.selected} icon={props.icon} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  attrsWrapper: {
    flex: 0,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },

  badgeWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  badgeText: {
    fontSize: 12
  },
  badgeCircle: {
    borderWidth: 2,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  }
});

export default AttrsPicker;
