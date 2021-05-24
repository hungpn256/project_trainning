import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import {DimensionContext} from '../../../App';
import {useContext} from 'react';
import minesweeper from '../../assets/minesweeper.png';
const GameStart = ({navigation}) => {
  const {dimension, setDimension} = useContext(DimensionContext);
  return (
    <View style={styles.background}>
      <View>
        <View style={styles.menuGame}>
          <TouchableOpacity
            style={styles.btnStartGame}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('StartGame');
            }}>
            <Image source={minesweeper} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStartGame}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('StartGame');
            }}>
            <Image source={minesweeper} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnStartGame}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('StartGame');
            }}>
            <Image source={minesweeper} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  background: {
    height: windowHeight,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  menuGame: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },

  btnStartGame: {
    width: '45%',
    height: 100,
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#222',
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
export default GameStart;
