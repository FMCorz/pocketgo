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

function Effectiveness(props) {
  const m = props.multiplier;
  let key = 'x100';
  if (m > 1.25) {
    key = 'x400';
  } else if (m > 1) {
    key = 'x200';
  } else if (m < 0.8) {
    key = 'x25'
  } else if (m < 1) {
    key = 'x50'
  }
  const bg = colours[key] ? colours[key].background : colours['x100'].background;
  const fg = colours[key] ? colours[key].foreground : colours['x100'].foreground;
  return (
    <View style={[styles.root, props.style]}>
      <View style={[styles.wrapper, {backgroundColor: bg}]}>
      </View>
    </View>
  );
}

Effectiveness.PropTypes = {
  multiplier: React.PropTypes.number.isRequired
}

const colours = {
  x400: {
    background: 'lawngreen',
    foreground: '#333'
  },
  x200: {
    background: 'green',
    foreground: '#fff',
  },
  x100: {
    background: '#ccc',
    foreground: '#333'
  },
  x50: {
    background: 'red',
    foreground: '#fff'
  },
  x25: {
    background: 'darkred',
    foreground: '#fff'
  },
  x0: {
    background: '#333',
    foreground: '#fff'
  },
}

const styles = StyleSheet.create({
  root: {
    flex: 0,
  },
  wrapper: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 11
  }
});

export default Effectiveness;
