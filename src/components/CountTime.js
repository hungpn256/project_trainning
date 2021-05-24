import React from 'react';
import {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import moment from 'moment';
import * as minesweeperActions from '../actions/minesweeper';
import {useDispatch, useSelector} from 'react-redux';
function CountTime({isWin}) {
  const dispatch = useDispatch();
  const timePlayed = useSelector(state => state.minesweeper.timePlayed);
  useEffect(() => {
    if (isWin === 0) {
      dispatch(
        minesweeperActions.changeState({
          timePlayed: 0,
        }),
      );
    }
  }, [isWin]);
  useEffect(() => {
    const timeCount = setTimeout(() => {
      if (isWin === 0) {
        dispatch(
          minesweeperActions.changeState({
            timePlayed: timePlayed + 1,
          }),
        );
      }
    }, 1000);
    return () => {
      clearTimeout(timeCount);
    };
  }, [timePlayed]);
  return (
    <View style={styles.clock}>
      <Text style={styles.text}>
        {('0' + Math.floor(timePlayed / 60)).slice(-2) +
          ' : ' +
          ('0' + (timePlayed % 60)).slice(-2)}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  clock: {
    width: 100,
    height: 50,
    backgroundColor: '#F5B7B1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
  },
});
export default React.memo(CountTime);
