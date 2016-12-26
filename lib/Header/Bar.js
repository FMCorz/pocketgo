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
  StyleSheet,
} from 'react-native';

function Header(props) {
  return (
    <Animated.View style={[styles.headerBar, props.style]}>
      {props.children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    // Drop shadow.
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    shadowOpacity: .3,
  },
})

export default Header;
