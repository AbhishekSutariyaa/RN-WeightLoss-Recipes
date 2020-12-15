import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RECIPE_DATA} from '../Data';
import {ADD_TO_FAV, REMOVE_FROM_FAV} from '../redux/FavReducer';
import {COLORS} from './Theme';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FullDetails = ({route, navigation}) => {
  const {itemId} = route.params;
  const [favData, setData] = useState([]);
  const data = itemId;
  const dispatch = useDispatch();
  const isMealFavorite = useSelector((state) =>
    state.favorite.some((item) => item == data),
  );
  const [isDataInCart, setFavorite] = useState(isMealFavorite);
  const addItemToCart = (item) => {
    setFavorite(!isDataInCart);
    dispatch({type: ADD_TO_FAV, payload: item});
  };
  const removeItemFromCart = (item) => {
    setFavorite(!isDataInCart);
    dispatch({
      type: REMOVE_FROM_FAV,
      payload: item,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', isDataFav);

    return unsubscribe;
  }, [navigation]);

  const isDataFav = async () => {
    let jsonArray = await AsyncStorage.getItem('favData');
    jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
    let checkItem = jsonArray.filter((item) => item.name == itemId.name);
    console.log('dataArray--', checkItem);
    setData(checkItem);
  };

  const handleDownload = async () => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', data.image)
      .then((res) => {
        CameraRoll.save(res.data, 'photo')
          .then((res) => {
            console.log('res---->>', res);
            alert('Save Image Successfully');
          })
          .catch((err) => console.log('err--->>', err));
      })
      .catch((error) => console.log('error---------', error));
  };

  const addToFav = async (data) => {
    try {
      // AsyncStorage.clear()
      let jsonArray = await AsyncStorage.getItem('favData');
      jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
      console.log('jsonArray--', jsonArray);
      jsonArray.push(data);
      const jsonValue = JSON.stringify(jsonArray);
      await AsyncStorage.setItem('favData', jsonValue).then((i) =>
        console.log('response---->', i),
      );
      isDataFav();
    } catch (e) {
      console.log('e----->>>>', e);
    }
  };

  const removeFromFav = async (data) => {
    try {
      // AsyncStorage.clear()
      let jsonArray = await AsyncStorage.getItem('favData');
      // console.log('RemoveJson---->>>>>>>>', jsonArray);
      jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
      console.log('RemoveJsonArray--', jsonArray);
      let filterArray = jsonArray.filter((i) => i.name !== data.name);
      const jsonValue = JSON.stringify(filterArray);
      await AsyncStorage.setItem('favData', jsonValue);
      isDataFav();
    } catch (e) {
      console.log('e----->>>>', e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('FullImage', {itemId: data.image});
        }}>
        <Image
          style={styles.mobileImage}
          source={{url: data.image}}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            marginVertical: 10,
            alignSelf: 'center',
            padding: 10,
            backgroundColor: COLORS.categorycolor,
            borderRadius: 12,
          }}
          onPress={() => {
            !favData.length ? addToFav(data) : removeFromFav(data);
            // !isDataInCart ? addItemToCart(data) : removeItemFromCart(data)
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.background,
              fontWeight: 'bold',
            }}>
            {/* {!isDataInCart ? 'Add to Favorite' : 'Remove from Favorite'} */}
            {!favData.length ? 'Add To Favorite' : 'Remove From Favorite'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            marginVertical: 10,
            alignSelf: 'center',
            padding: 10,
            backgroundColor: COLORS.categorycolor,
            borderRadius: 12,
            margin: 10,
          }}
          onPress={handleDownload}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.background,
              fontWeight: 'bold',
            }}>
            {'Download Image'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        {itemId.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
          margin: 10,
        }}>
        <Text>
          Recipe Type:
          <Text style={{fontWeight: 'bold'}}>
            {itemId.type == 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
          </Text>
        </Text>
        <Text>
          Calories: <Text style={{fontWeight: 'bold'}}>{itemId.calories}</Text>
        </Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={itemId.des}
        renderItem={({item, index}) => {
          return (
            <View style={styles.detailItemcontainer}>
              <Text style={{fontSize: 16}}>{item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10,
  },
  mobileImage: {width: '100%', height: 260},
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  detailItemcontainer: {
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
};

export default FullDetails;
