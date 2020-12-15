import React from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {RECIPE_CATEGORY} from '../Data';
import {COLORS} from './Theme';

const RecipeCategory = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', fontStyle: 'italic'}}>
        {'Please Choose Your Weight Loss Recipes Collection'}
      </Text>

      <FlatList
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        data={RECIPE_CATEGORY}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('CategoryDetails', {itemId: item.id})
              }
              style={styles.categoryContainer}>
              <Image
                style={{height: 250, width: '100%'}}
                source={{uri: item.image}}
              />
              <View
                style={{
                  position: 'absolute',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 9,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 12.35,

                  elevation: 19,
                  bottom: 0,
                  right: 0,
                }}>
                <Text
                  style={[
                    styles.title,
                    {
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 24,
                      fontWeight: 'bold',
                      textShadowOffset: {width: 2, height: 2},
                      textShadowRadius: 10,
                      textShadowColor: 'black',
                    },
                  ]}>
                  {item.title}
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

export default RecipeCategory;
