import 'react-native-url-polyfill/auto'
import 'react-native-gesture-handler' // must be first
import 'lib/sentry' // must be relatively on top

import {LogBox} from 'react-native'
LogBox.ignoreLogs(['Require cycle:']) // suppress require-cycle warnings, it's fine

import 'platform/polyfills'

import 'expo-router/entry'
