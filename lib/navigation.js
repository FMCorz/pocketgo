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
  Navigator,
  Text,
  View,
  StyleSheet,
  BackAndroid,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';

import { setNavigator } from './actions';
import { Sheet } from './styles';
import CloseButton from './Button/Close';
import List from './Pokemon/List';
import MovePager from './Move/Pager';
import TypePager from './Type/Pager';
import Pokemon from './Pokemon/Page';
import PokemonPager from './Pokemon/Pager';
import Appraisal from './Appraisal/Wizard';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this._handlers = [];
    this.renderScene = this.renderScene.bind(this)
    this.configureScene = this.configureScene.bind(this)
  }

  componentDidMount() {
    this.props.onMount(this.refs.navigator);
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  }

  configureScene(route, routeStack) {
    // Disable pull down to go back.
    return {
      ...Navigator.SceneConfigs.FloatFromBottom,
      gestures: {}
    };
  }

  renderScene(route, navigator) {
    let scene;
    let showBack = false;

    switch (route.name) {

      case 'appraisal':
        showBack = true;
        scene = (
          <Appraisal team={route.team} />
        )
        break;

      case 'move':
        showBack = true;
        const index = route.moves.indexOf(route.move);
        scene = (
          <MovePager moves={route.moves} pokemon={route.pokemon} index={index} />
        )
        break;

      case 'type':
        showBack = true;
        scene = (
          <TypePager type={route.type} />
        )
        break;

      case 'pokemon':
        showBack = true;
        scene = (
          <PokemonPager index={route.index} key={1} />
        )
        break;

      default:
        scene = (
          <List />
        );
    }

    if (!scene) {
      throw new Error('Unknown scene');
    }

    if (showBack) {
      return (
        <View style={styles.wrapper}>
          {scene}
          <View style={styles.floatingFooter} key="close" pointerEvents="box-none">
            <View style={styles.closeButtonWrapper} pointerEvents="box-none">
              <CloseButton onPress={() => this.refs.navigator.pop() } />
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.wrapper}>
        {scene}
      </View>
    );
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        initialRoute={{name: 'root'}} />
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 20,
      }
    })
  },
  floatingFooter: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0
  },
  closeButtonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
})

export default connect(null, (dispatch) => {
  return {
    onMount: (navigator) => {
      dispatch(setNavigator(navigator));
    }
  }
})(Navigation);
