import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import flag from '../assets/flag.png';
import boom from '../assets/boom.png';
import {DimensionContext} from '../../App';
import {useEffect, useState} from 'react';

const Box = ({index, open, value, handleClick}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim2 = React.useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(false);
  const {dimension, positionRecentlyClick} = React.useContext(DimensionContext);
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      delay: (index.x * dimension + index.y) * 10,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (open === 1) {
      setTimeout(() => {
        setActive(true);
      }, Math.max(Math.abs(index.x - positionRecentlyClick.x), Math.abs(index.y - positionRecentlyClick.y)) * 50);
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 500,
        delay:
          Math.max(
            Math.abs(index.x - positionRecentlyClick.x),
            Math.abs(index.y - positionRecentlyClick.y),
          ) * 50,
        useNativeDriver: true,
      }).start();
    }
  }, [open, positionRecentlyClick]);

  React.useEffect(() => {
    fadeIn();
    setActive(false);
  }, []);
  return (
    <Animated.View
      style={[
        {flex: 1},
        {
          // Bind opacity to animated value
          opacity: fadeAnim,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (open !== 1) {
            handleClick(index.x, index.y);
          }
        }}
        style={[styles.box, active && styles.active]}>
        {open === 1 ? (
          <Animated.View
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
              {
                // Bind opacity to animated value
                opacity: fadeAnim2,
              },
            ]}>
            {value === -1 ? (
              <Image source={boom} style={[styles.imageFlag]} />
            ) : (
              <Text style={styles.text}>{value !== 0 && value}</Text>
            )}
          </Animated.View>
        ) : open === 2 ? (
          <Image source={flag} style={[styles.imageFlag]} />
        ) : (
          <Text></Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderColor: '#999',
    borderWidth: 2,
    overflow: 'hidden',
  },
  active: {
    borderColor: '#fff',
  },
  imageFlag: {
    flex: 1,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});
export default React.memo(Box);
