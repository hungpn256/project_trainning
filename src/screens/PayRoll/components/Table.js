import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Table = ({direction, data, column}) => {
  return (
    <View style={[styles.container, {flexDirection: direction}]}>
      {column.map((item, index) => {
        return (
          <View
            key={index}
            style={direction === 'column' && styles.directionColumn}>
            <Text style={[styles.title]}>{item.name}</Text>
            {data.map((itemData, indexSub) => {
              return (
                <Text
                  key={indexSub}
                  style={[
                    styles.textData,
                    direction === 'column' && {minWidth: 100},
                  ]}>
                  {itemData[item.dataIndex]}
                </Text>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  title: {
    paddingVertical: 3,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
  },
  textData: {
    paddingVertical: 3,
    textAlign: 'right',
  },
  directionColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
export default Table;
