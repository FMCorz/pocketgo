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

import Energy from './Energy';

function Charges(props) {
  let charges = [];

  for (let i = 0; i < props.count; i++) {
    charges.push((
      <Energy key={i} style={styles.charge}></Energy>
    ));
  }

  return (
    <View style={[styles.root, props.style]}>
      {charges}
    </View>
  )
}

Charges.propTypes = {
  count: React.PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  charge: {
    marginLeft: 5,
  },
});

export default Charges;
