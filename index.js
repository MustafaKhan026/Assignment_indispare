/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import store from "./redux/store" 
const AppRedux = () => (
  
  <Provider store={store}>
      <App />
    </Provider>
  );
  messaging().registerDeviceForRemoteMessages()

AppRegistry.registerComponent(appName, () => AppRedux);
