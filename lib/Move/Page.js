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
  Animated,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';

import TouchableFeedback from '../Button/TouchableFeedback';
import Effectiveness from './Effectiveness';
import PokeBar from '../Header/PokeBar';
import Observer from '../Header/Observer';
import PokemonGrid from '../Pokemon/Grid';
import PokemonThumb from '../Pokemon/Thumb';
import Charges from './Charges';
import Energy from './Energy';
import Title from '../Title';
import TypeLabel from '../Type/Label';
import { TypeStyles, Sheet } from '../styles';
import { Strings } from '../Strings';
import * as Utils from '../utils';
import PokeImage from '../Pokemon/Image';

class MovePage extends Component {

  constructor(...args) {
    super(...args)

    this.dps = Utils.getDps(this.props.move, this.props.pokemon.types);
    this.state = {
      scroll: new Animated.Value(0)
    }
    this.scrollObserver = new Observer(this.state.scroll, 30, 50);
  }

  computeEffeciveness(weaknesses, t1, t2) {
    let multiplier = weaknesses[t1] ? weaknesses[t1].multiplier : 1;
    let multiplier2 = weaknesses[t2] ? weaknesses[t2].multiplier : 1;
    return multiplier * multiplier2;
  }

  getEffectivePokemons() {
    const move = this.props.move;
    const type = Utils.getType(move.type);
    const map = {
      double_to: 1.25,
      half_to: 0.8,
      no_to: 0.8
    }
    let weaknesses = {};
    Object.keys(map).map((key) => {
      const multiplier = map[key];
      type[key].map((code) => {
        weaknesses[code] = weaknesses[code] || { multiplier: 1 }
        weaknesses[code].multiplier *= multiplier;
      });
    });

    const pokemons = Object.values(Utils.getPokemons())
    .map((pokemon) => {
      return {
        multiplier: this.computeEffeciveness(weaknesses, pokemon.types[0], pokemon.types[1]),
        pokemon
      }
    })
    .filter(data => data.multiplier > 1)
    .sort((set1, set2) => {
      return set2.multiplier - set1.multiplier;
    });

    return pokemons;
  }

  goToType(type) {
    this.props.navigator.push({
      name: 'type',
      type: type
    });
  }

  renderItem(data) {
    return (
      <View style={Sheet.flexZero} key={data.pokemon.id}>
        <PokemonThumb id={data.pokemon.id} />
        <View style={styles.dpsTag}>
          <Text style={styles.dpsTagText}>{Utils.round(this.dps * data.multiplier)}</Text>
        </View>
      </View>
    )
    // <Effectiveness multiplier={data.multiplier} style={styles.effectiveness}/>
  }

  render() {
    const move = this.props.move;
    const pokemon = this.props.pokemon;
    const fgColor = TypeStyles[move.type].foreground;
    const dps = Utils.round(this.dps);
    const duration = Utils.round(move.duration / 1000);
    const critical = move.charges ? Math.round(move.critical * 100) : null;
    const energy = !move.charges ? Math.round(move.energy) : null;

    const chargesOrEnergy = move.charges ? (
      <Charges count={move.charges} style={styles.charges} />
    ) : (
      <View style={styles.flexRowAllCenter}>
        <Energy amount={energy} style={styles.energyBar}/>
      </View>
    );
    const chargesOrEnergyStr = move.charges ? Strings.charges : Strings.energeyincrease;
    const effectiveAgainst = this.getEffectivePokemons();

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
          <View style={Sheet.flexZero}>
            <PokeImage style={styles.image} id={pokemon.id} />
          </View>
          <View style={Sheet.flexOne}>
            <Text style={[styles.title, {color: fgColor}]} numberOfLines={2}>
              {move.name}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.wrapper}>

          <View style={styles.body}>

            <View style={styles.infoWrapper}>

              <View style={Sheet.flexOne}>
                <View style={[styles.flexColumnJustifyCenter]}>
                  <Text>{move.power}</Text>
                </View>
                <View style={styles.zeroSelfCenter}>
                  <Text style={styles.smallText}>{Strings.damage}</Text>
                </View>
              </View>
              <View style={Sheet.flexOne}>
                <View style={[styles.flexColumnJustifyCenter]}>
                  <Text style={styles.dps}>{dps}</Text>
                </View>
                <View style={styles.zeroSelfCenter}>
                  <Text style={styles.smallText}>{Strings.dps}</Text>
                </View>
              </View>
              <View style={[Sheet.flexOne]}>
                <View style={[styles.flexColumnJustifyCenter]}>
                  <Text>{duration}s</Text>
                </View>
                <View style={styles.zeroSelfCenter}>
                  <Text style={styles.smallText}>{Strings.duration}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoWrapper}>
              <View style={Sheet.flexOne}>
                <View style={[styles.flexColumnJustifyCenter]}>
                  <TypeLabel type={move.type} onPress={() => this.goToType(move.type)} />
                </View>
                <View style={styles.zeroSelfCenter}>
                  <Text style={styles.smallText}>{Strings.type}</Text>
                </View>
              </View>
              <View style={[Sheet.flexOne]}>
                <View style={[styles.flexColumnJustifyCenter, {alignSelf: 'stretch'}]}>
                  {chargesOrEnergy}
                </View>
                <View style={styles.zeroSelfCenter}>
                  <Text style={styles.smallText}>{chargesOrEnergyStr}</Text>
                </View>
              </View>
              {critical ? (
                <View style={Sheet.flexOne}>
                  <View style={[styles.flexColumnJustifyCenter]}>
                    <Text>{critical}%</Text>
                  </View>
                  <View style={styles.zeroSelfCenter}>
                    <Text style={styles.smallText}>{Strings.criticalchance}</Text>
                  </View>
                </View>
              ) : <View style={Sheet.flexOne}></View>}
            </View>

            <View>
                <Title>{Strings.supereffective}</Title>
            </View>

            <View style={styles.flexOne}>
              {effectiveAgainst.length > 0 ? (
                <PokemonGrid
                  items={effectiveAgainst}
                  removeClippedSubviews={false} // See react-native#1831.
                  renderItem={this.renderItem.bind(this)} />
                ) : (
                <Text style={styles.none}>{Strings.nonemale}</Text>
                )
              }
            </View>

          </View>

        </View>
        </ScrollView>

        <PokeBar pokemon={pokemon.id} style={{
          opacity: this.state.scroll.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })}}>
          {move.name}
        </PokeBar>
      </View>
    )
  }
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
    backgroundColor: '#fff'
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10
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
  infoWrapper: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 20
  },
  flexColumnJustifyCenter: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  flexRowJustifyCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  flexRowAllCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zeroSelfCenter: {
    flex: 0,
    alignSelf: 'center'
  },
  smallText: {
    fontSize: 11
  },
  dps: {
    fontSize: 30
  },
  charges: {
    flex: -1,
    height: 20
  },
  energyBar: {
    height: 20
  },
  effectiveness: {
    position: 'absolute',
    top: 6,
    left: 6,
  },
  dpsTag: {
    position: 'absolute',
    right: 6,
    bottom: 26,
    backgroundColor: '#efefef',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  dpsTagText: {
    // color: '#fff'
  },
  none: {
    fontStyle: 'italic',
    textAlign: 'center'
  }
});

export default connect((state) => {
  return {
    navigator: state.navigator
  }
}, null)(MovePage);
