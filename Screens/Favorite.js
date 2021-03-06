import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from './Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = ({navigation}) => {
  const [data, dataSet] = useState([]);
  const [index, setIndex] = useState(0);

  // const cartItems = useSelector((state) => state.favorite);

  let favArray = [];
  // const jsonValue = await AsyncStorage.getItem('favData');
  // jsonValue != null ? JSON.parse(jsonValue) : null;
  // console.log('getData-------', jsonValue);
  // favArray.push(jsonValue);
  // console.log('favArray---', favArray);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getDataArray);

    return unsubscribe;
  }, [navigation]);

  const getDataArray = async () => {
    console.log('UseEffect--------');
    let jsonArray = await AsyncStorage.getItem('favData');
    jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
    // favArray.push(JSON.parse(jsonValue));
    // let obj = [];
    console.log('====JSON.parse(jsonValue)==', jsonArray);
    // obj.push(JSON.parse(jsonValue));
    dataSet(jsonArray);
    setIndex(index + 1);
    // console.log('getData-------', data);
  };

  // useEffect(() => {
  //   // let favArray = [];

  //   getDataArray();
  // }, []);

  return (
    <View style={{flex: 1}}>
      {/* {data.length ? ( */}
      <FlatList
        numColumns={2}
        extraData={index}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        ListEmptyComponent={
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            {'No recipe found in favorite'}
          </Text>
        }
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
                <Text
                  numberOfLines={1}
                  style={[styles.title, {textAlign: 'center'}]}>
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
      {/* ) : null} */}
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

export default Favorite;
