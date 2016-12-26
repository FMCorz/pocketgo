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
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

import TypePage from './Page';
import * as Utils from '../utils';
import { TypeStyles } from '../styles';

class TypeLabel extends Component {

  render() {
    const propStyles = this.props.style ? this.props.style : {};
    const type = Utils.getType(this.props.type);
    const color = TypeStyles[type.id] || TypeStyles['normal'];
    const name = type.name + (typeof this.props.multiplier !== 'undefined' ? ' ' + this.props.multiplier + 'x' : '')

    const dom = (
      <View style={[styles.wrapper, { backgroundColor: color.background }, propStyles]}>
        <View style={styles.flexColCenter}>
          <Text
            style={[styles.text, { color: color.foreground }]}
            numberOfLines={1}>{name}</Text>
        </View>
      </View>
    );

    if (!this.props.onPress) {
      return dom;
    }

    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress(type)}>
        {dom}
      </TouchableWithoutFeedback>
    );
  }
}

TypeLabel.propTypes = {
  touchable: React.PropTypes.bool,
  type: React.PropTypes.string.isRequired
}

TypeLabel.defaultProps = {
  touchable: true
}

const styles = StyleSheet.create({
  flexColCenter: {
    flex: 1, justifyContent: 'center'
  },
  wrapper: {
    flex: -1,
    width: 75,
    height: 28,
    backgroundColor: '#63A091',
    borderRadius: 20,
    paddingLeft: 5,
    paddingRight: 5,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '400',
    fontSize: 13,
  }
});

export default connect((state) => {
  return {
    navigator: state.navigator
  }
}, null)(TypeLabel);
