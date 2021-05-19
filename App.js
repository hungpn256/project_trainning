import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import GameStart from './src/screens/GameStart';
import MainGame from './src/screens/Main';
export const DimensionContext = React.createContext();
const App = () => {
  const [dimension, setDimension] = useState(9);
  const [positionRecentlyClick, setPositionRecentlyClick] = useState({
    x: 0,
    y: 0,
  });
  const Stack = createStackNavigator();
  return (
    <DimensionContext.Provider
      value={{
        dimension,
        setDimension,
        positionRecentlyClick,
        setPositionRecentlyClick,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start Game" component={GameStart} />
          <Stack.Screen name="Game" component={MainGame} />
        </Stack.Navigator>
      </NavigationContainer>
    </DimensionContext.Provider>
  );
};

export default App;
