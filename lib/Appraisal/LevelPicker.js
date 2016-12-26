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

import { Sheet } from '../styles';
import { Strings } from '../Strings';
import Title from '../Title';
import Bubble from './Bubble';

const LevelPicker = function(props) {

  const heading = Strings['appraisal_level_' + props.team + '_heading'];
  const l0 = Strings['appraisal_level_' + props.team + '_l0'];
  const l1 = Strings['appraisal_level_' + props.team + '_l1'];
  const l2 = Strings['appraisal_level_' + props.team + '_l2'];
  const l3 = Strings['appraisal_level_' + props.team + '_l3'];

  return (
    <View style={Sheet.flexOne}>
      <Title>{heading}</Title>
      <View style={styles.levelWrapper}>
        <Bubble.Button text={l0} onPress={() => props.onChoose(0)}/>
        <Bubble.Button text={l1} onPress={() => props.onChoose(1)} />
        <Bubble.Button text={l2} onPress={() => props.onChoose(2)} />
        <Bubble.Button text={l3} onPress={() => props.onChoose(3)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  levelWrapper: {
    flex: 1,
  }
});

export default LevelPicker;
