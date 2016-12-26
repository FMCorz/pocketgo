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

/**
 * Based on react-native-grid-view.
 *
 * MIT Licenced
 *
 * Copyright (c) 2015 Alexey
 *
 * https://github.com/lucholaf/react-native-grid-view
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  Platform,
  ScrollView
} from 'react-native';

import PokemonThumb from './Thumb';

class PokemonGrid extends Component {

  constructor(...args) {
    super(...args)
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1.id != s2.id,
      getSectionHeaderData: (data, sectionId) => data[sectionId],
      getRowData: (data, sectionId, rowId) => data[sectionId].items[rowId],
    });
    this.renderRow = this.renderRow.bind(this);
  }

  /**
   * Split items into groups.
   *
   * @param {Array} items
   * @param {Number} itemsPerRow
   * @return {Array} Array of arrays.
   */
  groupItems(items, itemsPerRow) {
      let itemsGroups = [];
      let group = [];
      items.forEach(function(item) {
        if (group.length === itemsPerRow) {
          itemsGroups.push(group);
          group = [item];
        } else {
          group.push(item);
        }
      });

      if (group.length > 0) {
        itemsGroups.push(group);
      }

      return itemsGroups;
  }

  /**
   * Takes the sections and organise them.
   *
   * This effectively takes the original sections and splits the items
   * they contain into groups so that they can fix nicely in a grid.
   *
   * /!\ We must not mutate the source!
   *
   * @param {Object} sections
   * @param {Number} itemsPerRow
   * @return {Object}
   */
  groupSections(sections, itemsPerRow) {
    groups = {};
    let i = 0;
    Object.keys(sections).map((sectionId) => {
      groups[sectionId] = {
        ...sections[sectionId],
        items: this.groupItems(sections[sectionId].items, itemsPerRow),
        _isFirst: i++ == 0,
      }
    });
    return groups;
  }

  scrollTo(...args) {
    this.listView.scrollTo(...args)
  }

  /**
   * Render one item.
   *
   * @param {Object} pokemon The pokemon.
   * @param {Number} index The index in the row.
   * @param {String} sectionId The section ID.
   * @param {String} rowId The row ID.
   * @return {PokemonThumb}
   */
  renderItem(pokemon, index, sectionId, rowId) {
    if (this.props.renderItem) {
      return this.props.renderItem(pokemon, index, sectionId, rowId);
    }
    return (
      <PokemonThumb
        key={pokemon.id}
        id={pokemon.id}
        onPress={() => this.props.onPress(pokemon, index, sectionId, rowId)} />
    );
  }

  /**
   * Render a row in the grid.
   *
   * @param {Array} group The items to render.
   * @param {String} sectionId The section ID.
   * @param {String} rowId The row ID.
   * @return {View}
   */
  renderRow(group, sectionId, rowId) {
    const items = group.map((item, index) => {
      return this.renderItem(item, index, sectionId, rowId);
    });
    return (
      <View style={styles.group}>
        {items}
      </View>
    );
  }

  render() {
    let renderSectionHeader;
    let sectionsData;

    // Support both props items, and sections.
    if (this.props.items) {
      sectionsData = {0: {
          id: 0,
          items: this.props.items
        }
      };
    } else {
      sectionsData = this.props.sections;
    }

    const sections = this.groupSections(sectionsData, this.props.perRow);
    const keys = Object.keys(sections);
    const ds = this.ds.cloneWithRowsAndSections(sections, keys, keys.map((sectionId) => {
        // Return the row IDs, effectively the array indexes, indexed by section.
        return sections[sectionId].items.reduce((carry, item, index) => {
          carry.push(index);
          return carry;
        }, [])
      })
    );

    // Only display the headers when there is more than one section.
    if (keys.length > 1 && this.props.renderSectionHeader) {
      renderSectionHeader = this.props.renderSectionHeader;
    }

    return (
      <ListView
        {...this.props}
        initialListSize={151}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        renderSectionHeader={renderSectionHeader}
        ref={(c) => this.listView = c}
        dataSource={ds} />
    );
  }
}

PokemonGrid.propTypes = {
  perRow: React.PropTypes.number,
  onPress: React.PropTypes.func,
  renderSectionHeader: React.PropTypes.func,
  sections: React.PropTypes.object,
  items: React.PropTypes.array
}

PokemonGrid.defaultProps = {
  perRow: 3,
  onPress: () => {},
}

var styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  sectionHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    ...Platform.select({
      ios: {
        backgroundColor: '#efefefee'
      },
      android: {
        backgroundColor: '#efefef'
      }
    })
  },
  firstHeader: {
    marginTop: 0
  }
});

export default PokemonGrid;
