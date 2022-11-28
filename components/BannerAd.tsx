import React, { useEffect } from 'react';
import { View } from 'native-base';
import { AdMobBanner, requestPermissionsAsync } from 'expo-ads-admob';
import { Platform } from 'react-native';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bottom_ad_view: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,
    alignSelf: 'center',
  },
});

export const BannerAd: React.FC = () => {
  useEffect(() => {
    Platform.OS !== 'web' && requestPermissionsAsync();
  }, []);

  return (
    <>
      {Platform.OS !== 'web' ? (
        <View style={styles.bottom_ad_view}>
          <AdMobBanner
            adUnitID={Platform.select({
              ios: __DEV__
                ? 'ca-app-pub-3940256099942544/2934735716'
                : 'ca-app-pub-3620076875763745/8486035736',
              android: __DEV__
                ? 'ca-app-pub-3940256099942544/6300978111'
                : 'ca-app-pub-3620076875763745/1167864633',
            })}
            onDidFailToReceiveAdWithError={(e) => {
              console.log(e);
            }}
          />
        </View>
      ) : null}
    </>
  );
};
