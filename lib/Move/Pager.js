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

import MovePage from './Page';
import Ambience from '../Ambience';
import Pager from '../Pager';
import { Sheet } from '../styles';

class MovePager extends Component {

  constructor(...args) {
    super(...args)

    this.renderPage = this.renderPage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);

    const ds = new Pager.DataSource({pageHasChanged: (r1, r2) => r1.id !== r2.id});
    const move = this.props.moves[this.props.index];

    this.state = {
      move: move,
      dataSource: ds.cloneWithPages(this.props.moves)
    }
  }

  onChangePage(pageId) {
    this.setState({
      move: this.state.dataSource.getPageData(pageId)
    });
  }

  renderPage(move) {
    return (
      <View style={styles.page}>
        <MovePage move={move} style={Sheet.flexOne} pokemon={this.props.pokemon} />
      </View>
    )
  }

  render() {
    return (
      <View style={Sheet.flexOne} >
        <Ambience.Move move={this.state.move} />
        <Pager
          dataSource={this.state.dataSource}
          renderPage={this.renderPage}
          onChangePage={this.onChangePage}
          initialPage={this.props.index} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'transparent',
    marginLeft: 6,
    marginRight: 6
  },
});

export default MovePager;
