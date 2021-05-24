import React from 'react';
import {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import moment from 'moment';
function CountTime() {
  const [time, setTime] = useState(moment().startOf('hour'));
  useEffect(() => {
    const timeCount = setInterval(() => {
      setTime(time => moment(time).add(1, 's'));
    }, 1000);

    return () => {
      clearInterval(timeCount);
    };
  }, []);
  return (
    <View style={styles.clock}>
      <Text style={styles.text}>{time.format('mm:ss')}</Text>
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
