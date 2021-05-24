import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {createStore} from 'redux';
import GameStart from './src/screens/GameStart';
import MenuGame from './src/screens/MenuGame';
import Login from './src/screens/Login';
import MainGame from './src/screens/Main';
import rootReduer from './src/reducers/index';
import {Provider} from 'react-redux';
import HighScore from './src/screens/HighScore';
export const DimensionContext = React.createContext();
const store = createStore(
  rootReduer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const App = () => {
  const [dimension, setDimension] = useState(9);
  const [positionRecentlyClick, setPositionRecentlyClick] = useState({
    x: 0,
    y: 0,
  });
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <DimensionContext.Provider
        value={{
          dimension,
          setDimension,
          positionRecentlyClick,
          setPositionRecentlyClick,
        }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MenuGame" component={MenuGame} />
            <Stack.Screen name="HighScore" component={HighScore} />
            <Stack.Screen name="StartGame" component={GameStart} />
            <Stack.Screen name="Game" component={MainGame} />
          </Stack.Navigator>
        </NavigationContainer>
      </DimensionContext.Provider>
    </Provider>
  );
};

export default App;
