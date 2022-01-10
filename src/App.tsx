import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';
import Bugsnag from '@bugsnag/react-native';
import BugsnagPluginReactNavigation from '@bugsnag/plugin-react-navigation';
import GameScreen from './screens/Game';
import {RecoilRoot} from 'recoil';
import HoleScreen from './screens/Hole';
import SummaryScreen from './screens/Summary';
import ErrorView from './components/ErrorView';

Bugsnag.start({
  plugins: [new BugsnagPluginReactNavigation()],
});
const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const {createNavigationContainer} = Bugsnag.getPlugin('reactNavigation')!;
const BugsnagNavigationContainer =
  createNavigationContainer(NavigationContainer);
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RecoilRoot>
        <BugsnagNavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Games" component={GameScreen} />
            <Stack.Screen name="Hole" component={HoleScreen} />
            <Stack.Screen name="Summary" component={SummaryScreen} />
          </Stack.Navigator>
        </BugsnagNavigationContainer>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
};

export default () => (
  <ErrorBoundary FallbackComponent={ErrorView}>
    <App />
  </ErrorBoundary>
);
