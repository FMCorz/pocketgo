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

function Title(props) {
  const text = props.children ? props.children.toUpperCase() : '';
  return (
    <View style={[styles.wrapper, props.style]}>
      <View style={styles.side}>
        <View style={styles.line}></View>
      </View>
      <View style={styles.text}>
        <Text>{text}</Text>
      </View>
      <View style={styles.side}>
        <View style={styles.line}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  side: {
    flex: 1,
    justifyContent: 'center'
  },
  line: {
    height: 1,
    backgroundColor: '#ccc'
  },
  text: {
    flex: 0,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default Title;
