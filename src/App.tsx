import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameScreen from './screens/Game';
import {RecoilRoot} from 'recoil';
import HoleScreen from './screens/Hole';
import SummaryScreen from './screens/Summary';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RecoilRoot>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Games" component={GameScreen} />
            <Stack.Screen name="Hole" component={HoleScreen} />
            <Stack.Screen name="Summary" component={SummaryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
};

export default App;
