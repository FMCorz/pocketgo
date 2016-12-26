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
  Image,
  ListView,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

import PokeImage from './Image';
import PokeBar from '../Header/PokeBar';
import Observer from '../Header/Observer';
import TouchableFeedback from '../Button/TouchableFeedback';
import TypeLabel from '../Type/Label';
import TypeColumn from '../Type/Column';
import Title from '../Title';
import MoveRow from '../Move/Row';
import { Sheet } from '../styles';
import { Strings } from '../Strings';
import * as Utils from '../utils';

import assets from '../../assets';

class Pokemon extends Component {

  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const moves = this.props.pokemon.moves.map((move) => {
      return Utils.getMove(move);
    });

    const quickMoves = Utils.sortMovesByDps(moves.filter((move) => {
      return !move.charges;
    }), this.props.pokemon.types);

    const chargedMoves = Utils.sortMovesByDps(moves.filter((move) => {
      return move.charges > 0;
    }), this.props.pokemon.types);

    this.sortedMoves = [...quickMoves, ...chargedMoves];

    this.state = {
      scroll: new Animated.Value(0),
      movesDataSource: ds.cloneWithRows(this.sortedMoves),
    };

    this.scrollObserver = new Observer(this.state.scroll, 90, 130);
  }

  goToMove(move) {
    this.props.navigator.push({
      name: 'move',
      move: move,
      moves: this.sortedMoves,
      pokemon: this.props.pokemon,
    });
  }

  goToType(type) {
    this.props.navigator.push({
      name: 'type',
      type: type
    });
  }

  weakAgainst() {
    const type1 = Utils.getType(this.props.pokemon.types[0]);
    const type2 = this.props.pokemon.types[1] ? Utils.getType(this.props.pokemon.types[1]) : null;
    const map = {
      double_from: 1.25,
      half_from: .8,
      no_from: .8
    }
    let weaknesses = {};
    const ascSorter = (type1, type2) => { return type1.multiplier - type2.multiplier };
    const descSorter = (type1, type2) => { return type2.multiplier - type1.multiplier };

    Object.keys(map).map((key) => {
      const multiplier = map[key];
      const types = type2 ? [...type1[key], ...type2[key]] : type1[key]; 
      types.map((code) => {
        weaknesses[code] = weaknesses[code] || {
          code: code,
          multiplier: 1
        };
        weaknesses[code].multiplier *= multiplier;
      });
    });

    const superEffectiveFrom = Object.values(weaknesses).filter((item) => {
      return item.multiplier >= 1.25;
    }).sort(descSorter);

    const notVeryEffectiveFrom = Object.values(weaknesses).filter((item) => {
      return item.multiplier < 1;
    }).sort(ascSorter);

    return (
      <View style={styles.weaknessColumns}>
          <TypeColumn title={Strings.resistant}
            types={notVeryEffectiveFrom.map((item) => item.code)}
            none={Strings.noneresistant}
            onTypePress={(type) => this.goToType(type)} />
          <TypeColumn title={Strings.weak}
            types={superEffectiveFrom.map((item) => item.code)}
            none={Strings.noneweak}
            onTypePress={(type) => this.goToType(type)} />
      </View>
    );
  }

  renderMoveSeparator(sectionId, rowId, adjacentRowHighlighted) {
    if (1 + parseInt(rowId, 10) == this.state.movesDataSource.getRowCount()) {
      return null;
    }
    return (
      <View style={styles.separator} key={rowId}/>
    )
  }

  renderMove(move) {
    return (
      <TouchableFeedback onPress={() => {this.goToMove(move)}} key={move.id}>
        <View style={styles.moveItem}>
          <MoveRow move={move} attackerTypes={this.props.pokemon.types} />
        </View>
      </TouchableFeedback>
    )
  }

  render() {
    const pokemon = this.props.pokemon;
    const name = pokemon.name;
    const types = pokemon.types.reduce((carry, type, index) => {
      carry.push(
        <View style={[styles.flexColumnCenter, {marginTop: index ? 5 : 0}]} key={type.id}>
          <TypeLabel type={type} onPress={() => this.goToType(type)} />
        </View>
      );
      return carry;
    }, []);
    const moves = pokemon.moves;

    const evolution = (
      <View style={styles.zeroSelfCenter}>
        <Image source={assets.candy} />
        <View style={styles.flexRowJustifyCenter}>
          <Text>{pokemon.evolution_cost || '--'}</Text>
        </View>
      </View>
    );

    const egg = (
      <View style={styles.zeroSelfCenter}>
        <Image source={assets.egg} />
        <View style={styles.flexRowJustifyCenter}>
          <Text>{pokemon.egg_type || '--'}</Text>
          <Text style={styles.unit}>{pokemon.egg_type ? Strings.km : ''}</Text>
        </View>
      </View>
    );

    const weaknesses = this.weakAgainst();

    const headerBarDynStyles = {
      opacity: this.state.scroll.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };
    const headerDynStyles = {
      opacity: this.state.scroll.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      })
    };

    return (
      <View style={styles.wrapper}>
        <ScrollView
          style={StyleSheet.absoluteFill}
          showsVerticalScrollIndicator={false}
          endFillColor='#fff'
          scrollEventThrottle={32}
          onScroll={this.scrollObserver.onScroll}>

        <View style={styles.roundedTop}></View>

        <View style={styles.pokemonIdWrapper}>
          <Text style={styles.pokemonId}>#{pokemon.id}</Text>
        </View>

        <View style={styles.mainWrapper}>
          <Animated.View style={[styles.zeroSelfCenter, headerDynStyles]}>
            <Text style={styles.title}>
                {name}
            </Text>
          </Animated.View>
          <View style={styles.infoWrapper}>
            <View style={styles.flexColumnJustifyCenter}>
              <View style={styles.types} key="types">
                {types}
              </View>
              <View style={styles.zeroSelfCenter} key="legend">
                <Text style={styles.smallText}>{Strings.type}</Text>
              </View>
            </View>
            <View style={Sheet.flexOne}>
              <View style={[styles.flexColumnJustifyCenter]} key="egg">
                {egg}
              </View>
              <View style={styles.zeroSelfCenter} key="legend">
                <Text style={styles.smallText}>{Strings.eggType}</Text>
              </View>
            </View>
            <View style={[Sheet.flexOne]}>
              <View style={[styles.flexColumnJustifyCenter]} key="evolution">
                {evolution}
              </View>
              <View style={styles.zeroSelfCenter} key="legend">
                <Text style={styles.smallText}>{Strings.evolutioncost}</Text>
              </View>
            </View>
          </View>
          <View style={Sheet.flexZero}>
            <Title>{Strings.moves}</Title>
            {
              this.state.movesDataSource.getRowCount() > 0 ? (
              <ListView
                style={styles.movesList}
                removeClippedSubviews={false} // See react-native#1831.
                dataSource={this.state.movesDataSource}
                renderRow={this.renderMove.bind(this)}
                renderSeparator={this.renderMoveSeparator.bind(this)} />
              ) : (
                <Text style={[styles.smallText, {
                  textAlign: 'center',
                  }]}>{string.whoopsinfomissing}</Text>
              )
            }
          </View>

          <View>
            <Title>{Strings.defense}</Title>
            <View>
              {weaknesses}
            </View>
          </View>

        </View>

        <Animated.View style={[styles.imageWrapper, headerDynStyles]}>
          <View style={styles.flexRowJustifyCenter}>
            <PokeImage style={styles.image} id={pokemon.id} />
          </View>
        </Animated.View>

        </ScrollView>

        <PokeBar pokemon={pokemon.id} style={headerBarDynStyles} />
      </View>
    );
  }
}

const HORIZONTALPADDING = 10;

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
    bottom: 0,
  },
  pokemonIdWrapper: {
    position: 'absolute',
    right: 0
  },
  pokemonId: {
    fontSize: 100,
    color: 'rgba(255, 255, 255, .075)'
  },
  imageWrapper: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0
  },
  image: {
    height: 140,
    width: 140
  },
  mainWrapper: {
    flex: 1,
    marginTop: 126,
    paddingTop: 180 - 126,
    paddingLeft: HORIZONTALPADDING,
    paddingRight: HORIZONTALPADDING,
    paddingBottom: 90,
    backgroundColor: '#fff'
  },
  infoWrapper: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 20
  },
  types: {
    flex: 1,
    marginBottom: 10,
  },
  flexColumnJustifyCenter: {
    flex: 1,
    justifyContent: 'center'
  },
  flexColumnCenter: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  flexRowJustifyCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    color: '#777',
    fontWeight: '300'
  },
  zeroSelfCenter: {
    flex: 0,
    alignSelf: 'center'
  },
  smallText: {
    fontSize: 11
  },
  unit: {
    fontSize: 9
  },
  moveItem: {
    paddingLeft: HORIZONTALPADDING,
    paddingRight: HORIZONTALPADDING,
    height: 48
  },
  moveItemText: {
    fontSize: 16
  },
  movesList: {
    marginLeft: -HORIZONTALPADDING,
    marginRight: -HORIZONTALPADDING
  },
  separator: {
    backgroundColor: '#ccc',
    height: StyleSheet.hairlineWidth
  },

  weaknessColumns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default connect((state) => {
  return {
    navigator: state.navigator
  }
}, null)(Pokemon);
