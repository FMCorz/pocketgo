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
import { createIconSetFromFontello } from 'react-native-vector-icons';

import Ionicon from 'react-native-vector-icons/Ionicons';
import pocketGoConfig from '../assets/fonts/pocket-go.json';
const PocketGoIcon = createIconSetFromFontello(pocketGoConfig);

function Back(props) {
  return (
    <Ionicon name="ios-arrow-back" size={props.size} color={props.color} />
  );
}

function Heart(props) {
  return (
    <PocketGoIcon name="heart" size={props.size} color={props.color} />
  );
}

function Medal(props) {
  return (
    <PocketGoIcon name="medal" size={props.size} color={props.color} />
  );
}

function Reset(props) {
  return (
    <Ionicon name="ios-refresh" size={props.size} color={props.color} />
  );
}

function Shield(props) {
  return (
    <PocketGoIcon name="shield" size={props.size} color={props.color} />
  );
}

function Sword(props) {
  return (
    <PocketGoIcon name="sword" size={props.size} color={props.color} />
  );
}

export {
  Back,
  Heart,
  Medal,
  Reset,
  Shield,
  Sword,
};
