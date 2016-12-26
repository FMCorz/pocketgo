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

function Gauge(props) {

  const wrapperStyles = [(props.horizontal) ? styles.wrapperHorizontal : styles.wrapper, props.style];
  const backgroundWrapperStyles = [
    styles.backgroundWrapper,
    (props.horizontal) ? {flexDirection: 'row'} : null
  ];

  const best = props.best ? props.best : 15;
  const min = props.range[0];
  const max = props.range[1];
  const diff = max - min;

  const hasWidth = !min ? 0 : Math.max(1, min);
  const mayHaveWidth = !diff ? 0 : diff;
  const hasNotWidth = best - max;

  let fill = [
    [hasNotWidth, '#fff', 0],
    [mayHaveWidth, '#f9e23a', 1],
    [hasWidth, '#5CB85C', 2]
  ];
  props.horizontal && fill.reverse();

  return (
    <View style={wrapperStyles}>
      <View style={backgroundWrapperStyles}>
        {fill.map((data) => {
          return <View style={{flex: data[0], backgroundColor: data[1]}} key={data[2]}></View>
        })}
      </View>
      <View style={styles.innerBorder}></View>
      <View style={styles.outerBorder}></View>
    </View>
  );
}

Gauge.Horizontal = function(props) {
  const attrs = {...props};
  attrs.horizontal = true;
  return Gauge(attrs);
}

const BORDERWIDTH = 1;
const BORDERWIDTH2 = 1;
const BORDERRADIUS = 5;

const styles = StyleSheet.create({
  wrapper: {
    flex: -1,
    width: 30,
    minHeight: 100
  },
  wrapperHorizontal: {
    flex: -1,
    height: 30,
    minWidth: 100
  },
  backgroundWrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: BORDERWIDTH + BORDERWIDTH2,
    overflow: 'hidden'
  },
  outerBorder: {
    position: 'absolute',
    flex: -1,
    ...StyleSheet.absoluteFillObject,
    borderRadius: BORDERRADIUS,
    borderWidth: BORDERWIDTH,
    borderColor: '#ccc',
  },
  innerBorder: {
    position: 'absolute',
    flex: -1,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    borderRadius: BORDERRADIUS,
    borderWidth: BORDERWIDTH2 + BORDERWIDTH,
    borderColor: '#fff',
  },

  row: {
    flex: 1,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, .15)'
  },
  rowText: {
    flex: 1,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, .6)',
    fontSize: 10
  }
});

// const GRID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
//   .reverse().map((a) => {
//   return (
//     <View key={a} style={[styles.row, a == 15 ? {
//       borderTopWidth: 0
//     } : null]}>
//       <Text style={styles.rowText}>{a}</Text>
//     </View>
//   )
// });

export default Gauge;
