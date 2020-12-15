import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {COLORS} from './Theme';

const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Home');
    }, 1000);
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.background,
      }}>
      <Image
        style={{width: 200, height: 200}}
        source={require('../assets/diet.png')}></Image>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 20,
        }}>
        Weight Loss Recipe
      </Text>
    </View>
  );
};

export default Splash;
