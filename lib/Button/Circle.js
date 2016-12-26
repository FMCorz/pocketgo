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
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform
} from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';

function Circle(props) {
  let extraCircleStyles;
  let extraCircleBgStyles;
  let extraInnerCircleStyles;
  let extraIconStyles;
  if (props.small) {
    extraCircleStyles = styles.circleSmall;
    extraCircleBgStyles = styles.circleBgSmall;
    extraInnerCircleStyles = styles.innertCircleSmall;
    extraIconStyles = styles.iconSmall;
  }

  let icon;
  if (typeof props.icon === 'function') {
    icon = (<props.icon size={props.small ? SMALLICONSIZE : ICONSIZE} color={ICONCOLOR} />);

  } else if (typeof Ionicon.glyphMap[props.icon] === 'undefined') {
    icon = (
      <Text style={[styles.icon, extraIconStyles]}>
        {props.icon}
      </Text>
    );

  } else {
    icon = (
      <Ionicon name={props.icon} size={props.small ? SMALLICONSIZE : ICONSIZE} color={ICONCOLOR} />
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}>
      <View style={[styles.circle, extraCircleStyles, props.style]}>
        <View style={[styles.circleBg, extraCircleBgStyles]}>
          <View style={[styles.innerCircle, extraInnerCircleStyles]}>
            {icon}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

Circle.propTypes = {
  icon: React.PropTypes.any.isRequired,
  onPress: React.PropTypes.func.isRequired,
  small: React.PropTypes.bool,
}

const ICONSIZE = 32;
const ICONCOLOR = '#ddd';
const SMALLICONSIZE = 16;

const styles = StyleSheet.create({
  circle: {
    flex: -1,
    width: 64,
    height: 64,
    borderWidth: 4,
    borderRadius: 50,
    borderColor: '#9997',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  circleBg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#018694',
    padding: 6,
  },
  innerCircle: {
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(254, 254, 254, .2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: ICONSIZE,
    color: ICONCOLOR,
    fontWeight: Platform.select({
      ios: '200',
      android: '100'
    })
  },

  circleSmall: {
    width: 44,
    height: 44,
  },
  circleBgSmall: {
    width: 40,
    height: 40,
    padding: 5
  },
  innertCircleSmall: {
    width: 30,
    height: 30,
  },
  iconSmall: {
    fontSize: SMALLICONSIZE
  }
})

export default Circle;
