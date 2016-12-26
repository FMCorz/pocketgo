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
  AsyncStorage,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import LocalizedStrings from 'react-native-localization';
import ViewPager from 'react-native-viewpager';

import Assets from '../../assets';
import { Sheet } from '../styles';
import { appraise } from './lib';
import TouchableFeedback from '../Button/TouchableFeedback';
import AttrsPicker from './AttrsPicker';
import TeamPicker from './TeamPicker';
import LevelPicker from './LevelPicker';
import Result from './Result';
import Title from '../Title';
import * as Icons from '../Icons';

const SAVEDTEAM_KEY = '@Appraisal:team';
const PAGES = [
  {id: 0},
  {id: 1},
  {id: 2},
  {id: 3},
];

class Wizard extends Component {

  constructor(...args) {
    super(...args)

    const ds = new ViewPager.DataSource({pageHasChanged: (r1, r2) => {
      r1.id != r2.id || r1.team != r2.team
    }});

    let team = this.props.team;
    let firstPage = 0;
    let initPages;

    if (team) {
      firstPage = 1;
      initPages = this.getPages(1, team);
    } else {
      firstPage = 0;
      initPages = this.getPages(0, team);
    }

    this.state = {
      team: team,
      level: null,
      attrs: [],
      strength: null,
      page: firstPage,
      dataSource: ds.cloneWithPages(initPages)
    }

    this.goBack = this.goBack.bind(this);
    this.goToStart = this.goToStart.bind(this);
    this.pickLevel = this.pickLevel.bind(this);
    this.pickStrength = this.pickStrength.bind(this);
    this.pickTeam = this.pickTeam.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.toggleAttr = this.toggleAttr.bind(this);
    this.movePending = false;
  }

  animation(animate, toValue, gs) {
      return Animated.spring(animate, {
          toValue: toValue,
          friction: 12,
          tension: 100,
          restDisplacementThreshold: 0.02,
          restSpeedThreshold: 0.03
      });
  }

  getPages(last, team) {
    let pages = [];
    for (let i = 0; i <= last; i++) {
      pages.push({
        ...PAGES[i],
        team: i > 0 ? team : null
      });
    }
    return pages;
  }

  goBack() {
    if (!this.pager || !this.state.page) {
      return;
    }
    this.pager.goToPage(Math.max(0, this.state.page - 1));
  }

  goToStart() {
    if (!this.pager || !this.state.page) {
      return;
    }
    this.pager.goToPage(1);
  }

  pickLevel(level) {
    this.movePending = true;
    this.setState({
      level: level,
      page: 2,
      dataSource: this.state.dataSource.cloneWithPages(this.getPages(2, this.state.team))
    });
  }

  pickStrength(strength) {
    if (!this.state.attrs.length) {
      // We can't move if we only have one attribute.
      return;
    }

    this.movePending = true;
    this.setState({
      strength: strength,
      page: 3,
      dataSource: this.state.dataSource.cloneWithPages(this.getPages(3, this.state.team))
    });
  }

  pickTeam(team) {
    try {
      AsyncStorage.setItem(SAVEDTEAM_KEY, team);
    } catch(e) {}
    this.movePending = true;
    this.setState({
      team: team,
      page: 1,
      dataSource: this.state.dataSource.cloneWithPages(this.getPages(1, team))
    });
  }

  toggleAttr(attr) {
    let index = this.state.attrs.indexOf(attr);
    let stateObj = {};

    if (index > -1) {
      stateObj.attrs = [...this.state.attrs.slice(0, index), ...this.state.attrs.slice(index + 1)];
    } else {
      stateObj.attrs = [...this.state.attrs, attr];
    }

    // Remove last page.
    if (!stateObj.attrs.length) {
      stateObj.dataSource = this.state.dataSource.cloneWithPages(this.getPages(2, this.state.team));
    }

    this.setState(stateObj);
  }

  renderPage(page) {
    let content;
    let background;
    let canGoBack = false;
    let canReset = false;

    switch(page.id) {
      case 0:
        content = (
          <TeamPicker onChoose={this.pickTeam} />
        );
        break;

      case 1:
        canGoBack = true;
        background = (<TeamAvatar team={this.state.team} />);
        content = (
          <LevelPicker team={this.state.team} onChoose={this.pickLevel} />
        );
        break;

      case 2:
        canGoBack = true;
        background = (<TeamAvatar team={this.state.team} flavour={1} />);
        content = (
          <AttrsPicker attrs={this.state.attrs} team={this.state.team} level={this.state.level}
            onChooseAttr={this.toggleAttr} onChooseStrength={this.pickStrength} />
        );
        break;

      case 3:
        canGoBack = true;
        canReset = true;
        content  = (
          <Result level={this.state.level} attrs={this.state.attrs} strength={this.state.strength} />
        );
        break;

      default:
        content = (
          <Text>You were not supposed to see this...</Text>
        );
    }

    return (
      <View style={styles.wrapper}>
        {background}
        <ScrollView style={StyleSheet.absoluteFill}>
          <View style={styles.page}>{content}</View>
        </ScrollView>
        {canGoBack ? (
          <View style={styles.buttonWrapper}>
            <TouchableWithoutFeedback onPress={this.goBack}>
              <View style={styles.button}>
                <Icons.Back size={32} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : null}
        {canReset ? (
          <View style={styles.buttonRightWrapper}>
            <TouchableWithoutFeedback onPress={this.goToStart}>
              <View style={styles.button}>
                <Icons.Reset size={32} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : null}
      </View>
    );
  }

  render() {
    return (
      <View style={Sheet.flexOne}>
        <ViewPager
          ref={(r) => {
            this.pager = r;

            // Super hack alert!
            if (this.movePending && r != null && r.getCurrentPage() != this.state.page) {
              r.goToPage(this.state.page);
              this.movePending = false;
            }
          }}
          dataSource={this.state.dataSource}
          renderPage={this.renderPage}
          autoPlay={false}
          isLoop={false}
          locked={true}
          renderPageIndicator={false}
          initialPage={this.state.page}
          onChangePage={(page) => {
            const backwards = page < this.state.page;
            let state = {
              page: page
            };
            if (backwards) {
              // Reset the states as we move back.
              if (page < 3) {
                state.strength = null;
              }
              if (page < 2) {
                state.attrs = [];
              }
              if (page < 1) {
                state.level = null;
              }
              state.dataSource = this.state.dataSource.cloneWithPages(this.getPages(page, this.state.team));
            }
            this.setState(state);
          }}
          distanceThreshold={0.33}
          velocityThreshold={5e-7} />
      </View>
    );
  }
}

Wizard.getSavedTeam = async function() {
  let savedTeam = null;
  try {
    savedTeam = await AsyncStorage.getItem(SAVEDTEAM_KEY);
  } catch(e) {}
  return savedTeam;
}

const TeamAvatar = function(props) {
  const styleIndex = props.flavour ? Math.min(1, props.flavour) : 0;
  return (
    <Image source={TeamAvatar.images[props.team]}
      key={props.team + styleIndex}
      style={[styles.teamAvatar, {...TeamAvatar.style[props.team][styleIndex]}]} />
  );
}
TeamAvatar.images = {
  instinct: Assets.spark,
  mystic: Assets.blanche,
  valor: Assets.candela,
}
TeamAvatar.style = {
  instinct: {
    0: {
      bottom: -200,
      right: -20
    },
    1: {
      bottom: -200,
      right: 20
    }
  },
  mystic: {
    0: {
      bottom: -200,
      left: -20
    },
    1: {
      bottom: -200,
      right: -20
    }
  },
  valor: {
    0: {
      bottom: -200,
      left: 10
    },
    1: {
      bottom: -200,
      left: 30
    }
  },

}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1
  },

  page: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 100,
  },

  teamAvatar: {
    width: 250,
    height: 500,
    position: 'absolute',
    opacity: .6
  },

  buttonWrapper: {
    bottom: 19,
    left: 19,
    position: 'absolute'
  },
  buttonRightWrapper: {
    bottom: 19,
    right: 19,
    position: 'absolute'
  },
  button: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffb',
    borderRadius: 50
  }
});

export default Wizard;
