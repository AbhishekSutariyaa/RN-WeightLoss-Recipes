import React from 'react';
import {Image, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecipeCategory from './RecipeCategory';
import Favorite from './Favorite';
import { COLORS } from './Theme';
import Filter from "./Filter"

const Tab = createBottomTabNavigator();

const Home = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.categorycolor,
        inactiveTintColor: '#000000',
        labelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={RecipeCategory}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/home.png')}
              style={{height: focused ? 30 : 20, width: focused ? 30 : 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/star.png')}
              style={{height: focused ? 30 : 20, width: focused ? 30 : 20}}
            />
          ),
        }}
      />
        <Tab.Screen
        name="Filter"
        component={Filter}
        options={{
          tabBarLabel: 'Filter',
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/filter.png')}
              style={{height: focused ? 30 : 20, width: focused ? 30 : 20}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
