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
  Animated,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import LocalizedStrings from 'react-native-localization';

import { Sheet, TypeStyles } from '../styles';
import { Strings } from '../Strings';
import Title from '../Title';
import TypeColumn from './Column';
import TypeBadge from './Badge';
import HeaderBar from '../Header/Bar';
import Observer from '../Header/Observer';
import * as Utils from '../utils';

class TypePage extends Component {

  constructor(...args) {
    super(...args)
    this.state = {
      scroll: new Animated.Value(0)
    }
    this.scrollObserver = new Observer(this.state.scroll, 25, 40);
  }

  render() {
    const type = this.props.type;
    const fgColor = TypeStyles[type.id]['foreground'];
    const superEffectiveTo = type.double_to;
    const notVeryEffectiveTo = [...type.no_to, ...type.half_to];
    const superEffectiveFrom = type.double_from;
    const notVeryEffectiveFrom = [...type.no_from, ...type.half_from];

    return (
      <View style={Sheet.flexOne}>
        <ScrollView
          style={StyleSheet.absoluteFill}
          showsVerticalScrollIndicator={false}
          endFillColor='#fff'
          scrollEventThrottle={32}
          onScroll={this.scrollObserver.onScroll}>

        <View style={styles.roundedTop}></View>

        <Animated.View style={[styles.titleWrapper, {
          opacity: this.state.scroll.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          })}]}>
          <View style={[styles.titleRow]}>
            <Text style={[styles.title, {color: fgColor}]} numberOfLines={2}>
              {type.name}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.wrapper}>

          <View style={styles.body}>

            <View>
              <View>
                <Title>{Strings.attacking}</Title>
              </View>
            </View>

            <View style={styles.columns}>
              <TypeColumn title={Strings.supereffective} types={superEffectiveTo} onTypePress={this.props.onTypePress} />
              <TypeColumn title={Strings.notveryeffective} types={notVeryEffectiveTo} onTypePress={this.props.onTypePress} />
            </View>

            <View>
              <View>
                <Title>{Strings.defending}</Title>
              </View>
            </View>

            <View style={styles.columns}>
              <TypeColumn title={Strings.resistant} types={notVeryEffectiveFrom} onTypePress={this.props.onTypePress} />
              <TypeColumn title={Strings.weak} types={superEffectiveFrom} onTypePress={this.props.onTypePress} />
            </View>

          </View>

        </View>
        </ScrollView>

        <HeaderBar style={{opacity: this.state.scroll.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })}}>
          <View style={styles.headerTag}>
            <TypeBadge type={type.id} />
          </View>
          <View>
            <Text style={styles.headerTitle}>{type.name}</Text>
          </View>
        </HeaderBar>
      </View>
    )
  }
}

TypePage.propTypes = {
  type: React.PropTypes.object.isRequired,
  onTypePress: React.PropTypes.func
}

const styles = StyleSheet.create({
  // The main wrapper cannot use rounded corners or it can cause
  // 'OpenGLRenderer: Path too large to be rendered into a texture'
  // because the drawable exceeds the size of the screen.
  roundedTop: {
    position: 'absolute',
    height: 6,
    top: 120,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  wrapper: {
    flex: 1,
    marginTop: 126,
    paddingBottom: 90,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  titleRow: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: '300',
  },
  body: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  columns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  headerTag: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20
  }
});

export default TypePage;
