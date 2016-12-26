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

import Ambience from '../Ambience';
import Pager from '../Pager';
import PokemonPage from './Page';
import CircularButton from '../Button/Circle';
import Appraise from '../Appraisal/Wizard';
import { Medal } from '../Icons';
import { Sheet } from '../styles';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        pokemons: state.pokemons,
        navigator: state.navigator,
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}

class PokePager extends Component {

    constructor(...args) {
        super(...args)

        this.renderPage = this.renderPage.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.goToAppraisal = this.goToAppraisal.bind(this);

        const ds = new Pager.DataSource({pageHasChanged: (r1, r2) => r1.id !== r2.id});
        const pokemon = this.props.pokemons[this.props.index];

        this.state = {
            pokemon: pokemon,
            dataSource: ds.cloneWithPages(this.props.pokemons)
        }
    }

    onChangePage(pageId) {
      this.setState({
        pokemon: this.state.dataSource.getPageData(pageId)
      });
    }

    goToAppraisal() {
      Appraise.getSavedTeam().then((team) => {
        this.props.navigator.push({
          name: 'appraisal',
          team: team
        });
      });
    }

    renderPage(pokemon) {
        return (
            <View style={styles.page}>
                <PokemonPage pokemon={pokemon} style={styles.flexOne}/>
            </View>
        )
    }

    render() {
        return (
          <View style={Sheet.flexOne} >
            <Ambience.Pokemon pokemon={this.state.pokemon} />
            <Pager
              dataSource={this.state.dataSource}
              renderPage={this.renderPage}
              onChangePage={this.onChangePage}
              initialPage={this.props.index} />

            <View style={styles.appraiseBtn}>
              <CircularButton icon={Medal} onPress={() => this.goToAppraisal()} />
            </View>
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
    appraiseBtn: {
      position: 'absolute',
      bottom: 8,
      right: 8
    },
    flexOne: {
        flex: 1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PokePager);
