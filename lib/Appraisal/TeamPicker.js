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

import Assets from '../../assets';
import { Sheet } from '../styles';
import { Strings } from '../Strings';
import Title from '../Title';

const TeamPicker = function(props) {
  return (
    <View style={Sheet.flexOne}>
      <Title>{Strings.pickYourTeam}</Title>
      <View style={Sheet.flexOne}>
        <TeamButton onPress={() => props.onChoose('mystic')}
          text={Strings.mystic} image={Assets.mystic} style={{alignSelf: 'flex-start'}}/>
        <TeamButton onPress={() => props.onChoose('valor')}
          text={Strings.valor} image={Assets.valor} />
        <TeamButton onPress={() => props.onChoose('instinct')}
          text={Strings.instinct} image={Assets.instinct} style={{alignSelf: 'flex-end'}} />
      </View>
    </View>
  );
}

const TeamButton = function(props) {
  let height = 99;
  if (props.team == 'instinct') {
    height = 92;
  }
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[styles.teamWrapper, props.style]}>
        <Text style={styles.teamName}>{props.text}</Text>
        <Image source={props.image} style={[styles.teamEmblem, {height: height}]}/>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  teamWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  teamName: {
    marginBottom: 10,
    fontSize: 16
  },
  teamEmblem: {
    width: 100,
    height: 100
  }
});

export default TeamPicker;
