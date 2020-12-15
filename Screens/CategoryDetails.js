import React, {useState} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RECIPE_DATA} from '../Data';
import {COLORS} from './Theme';

const CategoryDetails = ({route, navigation}) => {
  const {itemId} = route.params;

  let meal = useSelector((state) => state.filteredMeals);
  // console.log('=====data====', meal);

  const data = meal.filter((item) => item.id == itemId);
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        ListEmptyComponent={
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            {'No recipe found.'}
          </Text>
        }
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('FullDetails', {itemId: item})}
              style={styles.categoryContainer}>
              <Image
                style={{height: 250, width: '100%'}}
                source={{uri: item.image}}
              />
              <View
                style={{
                  backgroundColor:
                    item.type == 'veg' ? COLORS.categorycolor : 'red',
                  width: '100%',
                  padding: 5,
                }}>
                <Text style={[styles.title, {textAlign: 'center'}]}>
                  {item.name}
                </Text>
                <Text style={[styles.title, {textAlign: 'center'}]}>
                  {`Calorie: ${item.calories}`}
                </Text>
                <Text style={[styles.title, {textAlign: 'center'}]}>
                  {item.type == 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    padding: 10,
  },
  categoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.background,
  },
};

export default CategoryDetails;
