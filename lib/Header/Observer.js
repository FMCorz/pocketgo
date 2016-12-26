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

import {
  Animated
} from 'react-native';

class Observer {

  constructor(animatedValue, showFrom, hideFrom) {
    this.value = animatedValue;
    this.showFrom = showFrom;
    this.hideFrom = hideFrom;

    this.onScroll = this.onScroll.bind(this);
    this.lastScroll = 0;
    this.animating = false;
    this.shown = false;
  }

  onScroll(e) {
    e = e.nativeEvent;

    if (this.animating) {
      this.lastScroll = e.contentOffset.y
      return;
    }
    const scrollingDown = this.lastScroll < e.contentOffset.y;

    if (e.contentOffset.y >= this.showFrom && scrollingDown && !this.shown) {
      this.show();

    } else if (e.contentOffset.y <= this.hideFrom && !scrollingDown && this.shown) {
      this.hide();
    }

    this.lastScroll = e.contentOffset.y
  }

  animate(toValue) {
    this.animating = true;
    Animated.timing(this.value, {
      duration: 350,
      toValue: toValue
    }).start((data) => {
      if (data.finished) {
        this.animating = false;
        this.shown = Boolean(toValue);
      }
    });
  }

  hide() {
    this.animate(0);
  }

  show() {
    this.animate(1);
  }

}

export default Observer;
