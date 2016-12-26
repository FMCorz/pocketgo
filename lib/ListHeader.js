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
  StyleSheet,
  ListView,
  Platform,
} from 'react-native';

function ListHeader(props) {
  let additionalStyles = {};
  const noMargin = props.first ? styles.firstHeader : {};
  if (props.backgroundColor) {
    additionalStyles.backgroundColor = Platform.select({
      ios: props.backgroundColor + 'ee', // Adds opacity, this is hacky as hell...
      android: props.backgroundColor
    });
  }
  return (
    <View style={[styles.wrapper, noMargin, additionalStyles]}>
        {props.children}
    </View>
  )
}

ListHeader.propTypes = {
  first: React.PropTypes.bool,
  backgroundColor: React.PropTypes.any
}

ListHeader.defaultProps = {
  first: false,
}

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    ...Platform.select({
      ios: {
        backgroundColor: '#efefefee'
      },
      android: {
        backgroundColor: '#efefef'
      }
    })
  },
  firstHeader: {
    marginTop: 0
  }
});

export default ListHeader;
