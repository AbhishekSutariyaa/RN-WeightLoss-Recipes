import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import store from './redux/Store';
import Splash from './Screens/Splash';
import Home from './Screens/Home';
import CategoryDetails from './Screens/CategoryDetails';
import FullDetails from './Screens/FullDetails';
import FullImage from './Screens/FullImage';

const Stack = createStackNavigator();

const App = ({params}) => {
  console.disableYellowBox = true;
  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator initialRouteName={'Splash'}>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CategoryDetails"
              component={CategoryDetails}
              options={{headerTitle: 'Category List'}}
            />
            <Stack.Screen
              name="FullDetails"
              component={FullDetails}
              options={{headerTitle: 'Details'}}
            />
            <Stack.Screen
              name="FullImage"
              component={FullImage}
              options={{headerTitle: 'Image'}}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
