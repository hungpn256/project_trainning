/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as _ from 'lodash';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Box from '../components/box';
import cuoc from '../assets/cuoc.png';
import flagImage from '../assets/flag.png';
import {DimensionContext} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import * as minesweeperActions from '../actions/minesweeper';
import AsyncStorage from '@react-native-community/async-storage';

const MainGame = () => {
  const [loading, setLoading] = useState(false);
  const {dimension, setPositionRecentlyClick} = useContext(DimensionContext);
  const AmountBoom = useMemo(() => dimension * 2 - 5, [dimension]);
  const matrixInit = useMemo(() => {
    let mt = [];
    for (let i = 0; i < dimension; i++) {
      let row = [];
      for (let j = 0; j < dimension; j++) {
        row.push(0);
      }
      mt.push(row);
    }
    return mt;
  }, [dimension]);

  const [matrix, setMatrix] = useState(JSON.parse(JSON.stringify(matrixInit)));
  const [open, setOpen] = useState(JSON.parse(JSON.stringify(matrixInit)));
  const [boxOpenedNumber, setBoxOpenedNumber] = useState(0);
  const [flag, setFlag] = useState(false);
  const [isWin, setIsWin] = useState(0);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  console.log(auth, 'auth');
  const score = useSelector(state => state.minesweeper.score);
  console.log(score, 'sc');
  let boom = [];

  function openBox(arrayOpen, x, y, dimensionsMatrix, arrayValue) {
    if (arrayOpen[x][y] === 0) {
      arrayOpen[x][y] = 1;
      setBoxOpenedNumber(num => num + 1);
      if (arrayValue[x][y] === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (
              (i !== 0 || j !== 0) &&
              x + i >= 0 &&
              y + j >= 0 &&
              x + i < dimensionsMatrix &&
              y + j < dimensionsMatrix
            ) {
              openBox(arrayOpen, x + i, y + j, dimensionsMatrix, arrayValue);
            }
          }
        }
      }
    }
  }

  const randomBoom = useCallback(
    (array, dimension) => {
      const x = Math.floor(Math.random() * dimension);
      const y = Math.floor(Math.random() * dimension);
      const index = _.findIndex(array, function (o) {
        return o.x === x && o.y === y;
      });
      if (index === -1) {
        array.push({x, y});
        return [...array];
      } else {
        return randomBoom(array, dimension);
      }
    },
    [dimension, AmountBoom],
  );

  useEffect(() => {
    playAgain();
  }, [dimension]);

  useEffect(() => {
    return async () => {
      await AsyncStorage.setItem('score', score);
    };
  }, []);

  useEffect(() => {
    console.log(boxOpenedNumber, AmountBoom, dimension * dimension);
    if (boxOpenedNumber >= dimension * dimension - AmountBoom) {
      setIsWin(1);
      dispatch(
        minesweeperActions.addPoint({
          username: auth.username,
          score: new Date(),
        }),
      );
    }
  }, [boxOpenedNumber]);

  const handleClick = (x, y) => {
    let tmp = [...open];
    if (!flag) {
      openBox(tmp, x, y, dimension, matrix);
      setPositionRecentlyClick({x, y});
      setOpen(tmp);
      if (matrix[x][y] === -1) {
        tmp.forEach(item => {
          item.fill(1);
        });
        setOpen(tmp);
        setIsWin(-1);
      }
    } else {
      if (tmp[x][y] === 0) {
        tmp[x][y] = 2;
      } else {
        tmp[x][y] = 0;
      }
      setOpen(tmp);
    }
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  const playAgain = () => {
    setLoading(true);
    setIsWin(0);
    setBoxOpenedNumber(0);
    setMatrix(JSON.parse(JSON.stringify(matrixInit)));
    for (let i = 0; i < AmountBoom; i++) {
      randomBoom(boom, dimension);
    }
    setMatrix(mt => {
      let tmp = [...mt];
      boom.forEach((item, index) => {
        tmp[item.x][item.y] = -1;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (
              (j !== 0 || i !== 0) &&
              item.x + i >= 0 &&
              item.y + j >= 0 &&
              item.x + i < dimension &&
              item.y + j < dimension
            ) {
              if (tmp[item.x + i][item.y + j] !== -1) {
                tmp[item.x + i][item.y + j]++;
              }
            }
          }
        }
      });
      return tmp;
    });
    setOpen(JSON.parse(JSON.stringify(matrixInit)));
    setFlag(false);
  };

  return (
    <View style={styles(dimension).background}>
      {loading ? (
        <View>
          <Text>loading...</Text>
        </View>
      ) : (
        <View>
          <View style={styles(dimension).mainGame}>
            {matrix.map((item, index) => {
              return item.map((subItem, subIndex) => {
                return (
                  <View
                    style={styles(dimension).box}
                    key={index * 100 + subIndex}>
                    <Box
                      key={index * 10 + subIndex}
                      open={open[index][subIndex]}
                      setOpen={setOpen}
                      index={{x: index, y: subIndex}}
                      value={subItem}
                      handleClick={handleClick}
                      isWin={isWin}
                    />
                  </View>
                );
              });
            })}
          </View>
          <View style={[styles(dimension).wrapperOption]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setFlag(false);
              }}>
              <Image
                source={cuoc}
                style={[
                  styles(dimension).imageOption,
                  !flag && styles(dimension).imageSelect,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setFlag(true);
              }}>
              <Image
                source={flagImage}
                style={[
                  styles(dimension).imageOption,
                  flag && styles(dimension).imageSelect,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                dispatch(
                  minesweeperActions.addPoint({
                    username: auth.username,
                    score: 123,
                  }),
                );
              }}>
              <Image
                source={flagImage}
                style={[
                  styles(dimension).imageOption,
                  flag && styles(dimension).imageSelect,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isWin === 1}
        onRequestClose={() => {
          setIsWin(0);
        }}>
        <View
          style={[
            styles(dimension).background,
            {backgroundColor: 'transparent'},
          ]}>
          <View style={styles(dimension).modalView}>
            <Text style={styles(dimension).modalText}>Thắng cuộc</Text>
            <Pressable
              style={[styles(dimension).button, styles(dimension).buttonClose]}
              onPress={playAgain}>
              <Text style={styles(dimension).textStyle}>Play again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        backdropTransitionOutTiming={1000}
        animationType="slide"
        transparent={true}
        visible={isWin === -1}
        onRequestClose={() => {
          setIsWin(0);
        }}>
        <View
          style={[
            styles(dimension).background,
            {backgroundColor: 'transparent'},
          ]}>
          <View style={styles(dimension).modalView}>
            <Text style={styles(dimension).modalText}>Thua cuộc</Text>
            <Pressable
              style={[styles(dimension).button, styles(dimension).buttonClose]}
              onPress={playAgain}>
              <Text style={styles(dimension).textStyle}>Play again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const w = Math.min(windowWidth, windowHeight);
const styles = dimension =>
  StyleSheet.create({
    background: {
      height: windowHeight,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    mainGame: {
      width: Math.floor(w / dimension) * dimension,
      height: Math.floor(w / dimension) * dimension,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    box: {
      width: Math.floor(w / dimension),
      height: Math.floor(w / dimension),
    },
    modalView: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: 50,
      paddingTop: 20,
      borderRadius: 20,
    },
    modalText: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    textStyle: {
      fontSize: 20,
      backgroundColor: 'pink',
      textAlign: 'center',
      padding: 15,
      borderRadius: 20,
    },
    wrapperOption: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
    imageOption: {
      height: 40,
      width: 40,
      margin: 10,
      resizeMode: 'cover',
      borderRadius: 5,
      borderWidth: 3,
    },
    imageSelect: {
      borderColor: '#ccc',
    },
  });

export default MainGame;
