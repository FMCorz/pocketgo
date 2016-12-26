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
} from 'react-native';

import { connect } from 'react-redux';

import TypePage from './Page';
import Ambience from '../Ambience';
import Pager from '../Pager';
import { Sheet } from '../styles';
import * as Utils from '../utils';

const TYPES = Object.values(Utils.getTypes()).sort((t1, t2) => {
  return t1.name < t2.name ? -1 : 1;
});

class TypePager extends Component {

  constructor(...args) {
    super(...args)

    // const ds = new Pager.DataSource({pageHasChanged: (r1, r2) => r1.id !== r2.id});
    const type = typeof this.props.type === 'string' ? Utils.getType(this.props.type) : this.props.type;

    this.renderPage = this.renderPage.bind(this);
    // this.onChangePage = this.onChangePage.bind(this);
    this.onTypePress = this.onTypePress.bind(this);
    // this.initialPage = TYPES.indexOf(type);

    this.state = {
      type: type,
      // dataSource: ds.cloneWithPages(TYPES)
    }
  }

  // onChangePage(pageId) {
  //   this.setState({
  //     type: this.state.dataSource.getPageData(pageId)
  //   });
  // }

  onTypePress(type) {
    this.props.navigator.push({name: 'type', type: type});
    // if (!this.pager) {
    //   return;
    // }
    // this.pager.goToPage(TYPES.indexOf(type));
  }

  renderPage(type) {
    return (
      <View style={styles.page}>
        <TypePage type={type} style={Sheet.flexOne} onTypePress={this.onTypePress} />
      </View>
    )
  }

  render() {
    return (
      <View style={Sheet.flexOne} >
        <Ambience.Type type={this.state.type.id} />
        {this.renderPage(this.state.type)}
      </View>
    );
  }
}
/*
  <Pager
    ref={(pager) => {
      if (pager != null) {
        this.pager = pager;
      }
    }}
    dataSource={this.state.dataSource}
    renderPage={this.renderPage}
    onChangePage={this.onChangePage}
    initialPage={this.initialPage} />
*/

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'transparent',
    marginLeft: 6,
    marginRight: 6
  },
});

export default connect((state) => {
  return {
    navigator: state.navigator
  }
}, null)(TypePager);
