// core
import React from 'react';
import { StatusBar } from 'expo-status-bar';

// components & theme
import { ITheme, Spinner } from 'native-base';

// hooks
import useCachedResources from './hooks/useCachedResources';

// navigation
import Navigation from './navigation';

export const Root: React.FC<{ theme: ITheme }> = ({ theme }) => {
  const isLoadingComplete = useCachedResources();
  return (
    <>
      {isLoadingComplete ? (
        <>
          <Navigation theme={theme} />
          <StatusBar />
        </>
      ) : (
        <Spinner size="lg" />
      )}
    </>
  );
};
