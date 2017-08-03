Pockét GO
=========

The essential Pokémon GO companion app.

Introduction
------------

My goal for this app was to have the information I need available in an app rather than a website, and to present it a in more readable way than tabular data. This app will not contain a CP calculator, there are already hundreds of apps which do it, and probably do it very well.

This project served for me as a mean to learn more about React Native. It is open sourced so that hopefully others can learn from it. I'd also be very happy to see this project growing with the help of others.

Installation
------------

To install from the source, I guess that you won't need much apart from adding your signing keys. I haven't tried so more documentation later, hopefully.

[![Play Store](https://play.google.com/intl/en_us/badges/images/badge_new.png)](https://play.google.com/store/apps/details?id=net.fmcorz.pocketgo)
[![Apple Store](https://devimages.apple.com.edgekey.net/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg)](https://itunes.apple.com/us/app/pocket-go/id1143900642)

Android keys
------------

Set-up the following in the file `~/.grade/grade.properties`:

    POCKETGO_RELEASE_STORE_FILE=<path-to-keystore-file>.keystore
    POCKETGO_RELEASE_KEY_ALIAS=<key-alias>
    POCKETGO_RELEASE_STORE_PASSWORD=<store-password>
    POCKETGO_RELEASE_KEY_PASSWORD=<key-password>

Running
-------

    react-native run-android --variant devDebug

License
-------

The source code is licensed under the [Apache 2 license](http://www.apache.org/licenses/LICENSE-2.0).

The Pockét GO assets are licensed under [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

The Pokémon GO assets are copyright and/or trademarks of Niantic Inc.

The Pokémon brand, character names and designs are copyright and/or trademarks of Nintendo / Creatures Inc. / GAME FREAK inc.
