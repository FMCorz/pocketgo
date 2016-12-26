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

function Energy(props) {
  const amount = Math.min(100, Math.abs(props.amount));
  let width = 1;

  if (amount <= 55 && amount >= 50) {
    width = .55 // It looks better.
  } else if (amount < 25) {
    width = .25 // So the small values have a minimum.
  } else if (amount < 100) {
    width = Math.min(90, Math.abs(amount) / 100);
  }

  return (
    <View style={[styles.root, props.style]}>
      <View style={{flex: 1-width}}></View>
      <View style={[styles.filling, {flex: width}]}>
        {amount !== 100 ? (
          <Text style={styles.amountText}>{amount}</Text>
        ) : null}
      </View>
    </View>
  )
}

Energy.propTypes = {
  amount: React.PropTypes.number
}
Energy.defaultProps = {
  amount: 100
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderColor: '#8FE5FF',
    backgroundColor: '#B2EEFF',
    borderWidth: 3,
    borderRadius: 8,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  filling: {
    backgroundColor: '#29CDFF',
    borderRadius: 6,
    alignItems: 'center'
  },
  amountText: {
    fontSize: 12,
    color: '#fff'
  }
});

export default Energy;
