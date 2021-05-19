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
import boom from '../../assets/boom.png';
const GameStart = ({navigation}) => {
  const {dimension, setDimension} = useContext(DimensionContext);
  return (
    <View style={styles.background}>
      {/* <Image source={boom} style={{display: 'none'}} /> */}
      <Text style={styles.title}>Select dimension:</Text>
      <Picker
        selectedValue={dimension}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          setDimension(itemValue);
        }}>
        <Picker.Item label="5x5" value={5} />
        <Picker.Item label="9x9" value={9} />
        <Picker.Item label="16x16" value={16} />
      </Picker>
      <Pressable
        style={styles.btnStartGame}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('Game');
        }}>
        <Text style={styles.btnText}>Start Game</Text>
      </Pressable>
    </View>
  );
};
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  background: {
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: 150,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  title: {
    minWidth: 150,
    fontSize: 20,
    color: '#633121',
  },
  btnStartGame: {
    backgroundColor: 'pink',
    minWidth: 150,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 100,
  },
  btnText: {
    color: '#fff',
    padding: 10,
    textAlign: 'center',
  },
});
export default GameStart;
