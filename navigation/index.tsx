/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

/**
 * Regarding Themeing, Please check following.
 * https://reactnavigation.org/docs/themes/
 */
// theme
import { ITheme } from 'native-base';
import { navDarkTheme, navLightTheme } from '../theme';

// routing
import { ClockScreen } from '../screens/ClockScreen';

// type
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator({ theme }: { theme: ITheme }) {
  return (
    <NavigationContainer
      linking={linking}
      theme={
        theme.config?.initialColorMode === 'dark' ? navDarkTheme : navLightTheme
      }
    >
      <Stack.Navigator initialRouteName="Clock">
        <Stack.Screen
          name="Clock"
          component={ClockScreen}
          options={() => ({
            title: 'Pokémon SV clock',
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Clock: '',
    },
  },
};
