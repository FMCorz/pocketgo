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
import ViewPager from 'react-native-viewpager';

const ANIMATION = function(animate, toValue, gs) {
  return Animated.spring(animate, {
    toValue: toValue,
    friction: 12,
    tension: 100,
    restDisplacementThreshold: 0.02,
    restSpeedThreshold: 0.03
  });
}

class Pager extends Component {

  goToPage(...args) {
    if (!this.pager) {
      return;
    }
    this.pager.goToPage(...args)
  }

  render() {
    return (
      <ViewPager
        autoPlay={false}
        isLoop={false}
        renderPageIndicator={false}
        distanceThreshold={0.15}
        velocityThreshold={5e-7}
        animation={ANIMATION}
        {...this.props}
        ref={(pager) => {
          if (pager != null) {
            this.pager = pager;
          }
        }}/>
    );
  }
}
Pager.DataSource = ViewPager.DataSource;

export default Pager;
