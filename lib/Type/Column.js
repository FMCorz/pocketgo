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
  ScrollView,
  StyleSheet,
} from 'react-native';

import TypeLabel from './Label';
import { Strings } from '../Strings';

class TypeColumn extends Component {

  getColumnContent() {
    if (!this.props.types.length) {
      return (
        <View>
          <Text style={styles.none}>{this.props.none || Strings.none}</Text>
        </View>
      );
    }

    return this.props.types.map((t) => {
      return (
        <View style={styles.columnType} key={t}>
          <TypeLabel type={t} onPress={this.props.onTypePress} />
        </View>
      );
    });
  }

  render() {
    return (
      <View style={[styles.column, this.props.style]}>
        <View style={styles.columnTitle}>
          <Text style={styles.columnTitleText}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.columnContent}>
          {this.getColumnContent()}
        </View>
      </View>
    );
  }
}

TypeColumn.propTypes = {
  title: React.PropTypes.string.isRequired,
  types: React.PropTypes.array.isRequired,
  currentType: React.PropTypes.string,
  onTypePress: React.PropTypes.func
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  columnTitle: {
    flex: 0,
    alignItems: 'center',
    paddingBottom: 10
  },
  columnTitleText: {
    fontSize: 15
  },
  columnType: {
    paddingBottom: 5
  },
  columnContent: {
    flex: 1,
    alignItems: 'center'
  },
  none: {
    fontStyle: 'italic'
  }
});

export default TypeColumn;
