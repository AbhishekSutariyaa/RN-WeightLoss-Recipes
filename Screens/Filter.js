import React, {useState} from 'react';
import {Text, View, Switch, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SET_FILTER} from '../redux/FavReducer';

const Filter = ({params}) => {
  const {isVegEnabled, isNonVegEnabled} = useSelector((state) => state);

  const [isVeg, setIsVegEnabled] = useState(isVegEnabled);
  const [isNonVeg, setIsNonVegEnabled] = useState(isNonVegEnabled);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 30,
        }}>
        Filter
      </Text>
      <View style={styles.switchContainer}>
        <Text style={{fontSize: 16}}>{'Vegetarian'}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isVeg ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(newValue) => {
            setIsVegEnabled(newValue);
          }}
          value={isVeg}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={{fontSize: 16}}>{'Non-Vegetarian'}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isNonVeg ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(newValue) => {
            setIsNonVegEnabled(newValue);
          }}
          value={isNonVeg}
        />
      </View>

      <Button
        onPress={() => {
          dispatch({
            type: SET_FILTER,
            payload: {isVegEnabled: isVeg, isNonVegEnabled: isNonVeg},
          });
        }}
        title={'SAVE'}></Button>
    </View>
  );
};

const styles = {
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    alignSelf: 'center',
    margin: 20,
  },
};

export default Filter;
