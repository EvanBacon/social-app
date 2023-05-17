import 'platform/polyfills'

import {LogBox} from 'react-native'
LogBox.ignoreLogs(['Require cycle:']) // suppress require-cycle warnings, it's fine

import 'expo-router/entry'
