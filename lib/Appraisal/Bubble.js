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
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Sheet } from '../styles';

const Bubble = function(props) {
  return (
      <View style={Sheet.flexZero}>
        <View style={styles.bubble}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
        <Caret size={8} color='#ccc' style={{ bottom: -8, left: 18 }}/>
        <Caret size={8} color='#fcfcfc' style={{ bottom: -5, left: 18 }}/>
      </View>
  )
}

Bubble.Button = function(props) {
  return (
    <View style={[styles.buttonWrapper, {opacity: props.disabled ? .3 : 1}]}>
      <TouchableWithoutFeedback onPress={props.disabled ? null : props.onPress}>
        <View style={[Sheet.flexZero, styles.button]}>
          <Bubble text={props.text} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const Caret = function(props) {
  return (<View style={[styles.caret, {
      borderRightWidth: props.size,
      borderLeftWidth: props.size,
      borderTopWidth: props.size,
      borderTopColor: props.color,
    }, props.style]}></View>)
}

const styles = StyleSheet.create({
  bubble: {
    flex: 0,
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    overflow: 'visible'
  },
  text: {
    lineHeight: 30,
    fontSize: 20
  },

  button: {
    paddingBottom: 7
  },
  buttonWrapper: {
    flex: 0,
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },

  caret: {
    position: 'absolute',
    flex: -1,
    width: 0,
    height: 0,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});

export default Bubble;
