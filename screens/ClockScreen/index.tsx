import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  Column,
  Text,
  Fab,
  HamburgerIcon,
  Menu,
  IconButton,
  CloseIcon,
  Pressable,
} from 'native-base';

import {
  format,
  differenceInSeconds,
  addSeconds,
  setHours,
  setMinutes,
  setMilliseconds,
  setSeconds,
} from 'date-fns';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AddModal } from './AddModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { removeClock } from '../../lib/redux/reducers/clockReducer';

type Props = NativeStackScreenProps<RootStackParamList, 'Clock'>;

// https://date-fns.org/v2.29.3/docs/format
const defaultDateFormat = 'pp';

export const ClockScreen: FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateFormat, setDateFormat] = useState<string>(defaultDateFormat);
  const [pokeDate, setPokeDate] = useState<Date>();

  const dispatch = useDispatch();
  const { clocks } = useSelector((state: RootState) => state.clock);

  const computePokemonDate = useCallback((date: Date) => {
    const pokemonTime = new Date(date);
    const unixTime = Math.floor(date.getTime() * (1440 / 72));
    pokemonTime.setTime(unixTime);
    // pokemonTime = addHours(pokemonTime, 3);
    return pokemonTime;
  }, []);

  const getDiffSecsInsideDay = useCallback(() => {
    let d = new Date(selectedDate);
    d = setHours(d, 0);
    d = setMinutes(d, 0);
    d = setSeconds(d, 0);
    d = setMilliseconds(d, 0);
    const diffSecs = differenceInSeconds(selectedDate, d);
    return diffSecs;
  }, [selectedDate]);

  const swtichDateFormat = useCallback(() => {
    if (dateFormat === defaultDateFormat) {
      setDateFormat('HH:mm:ss');
    } else {
      setDateFormat(defaultDateFormat);
    }
  }, [dateFormat]);

  useEffect(() => {
    if (selectedDate) {
      const interval = setInterval(() => {
        const diffSecs = differenceInSeconds(new Date(), selectedDate);
        const d = addSeconds(selectedDate, diffSecs - getDiffSecsInsideDay());
        setPokeDate(computePokemonDate(d));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedDate, computePokemonDate, getDiffSecsInsideDay]);

  useEffect(() => {
    if (clocks.length !== 0) {
      setSelectedDate(new Date(clocks[clocks.length - 1]));
    }
  }, [clocks]);
  return (
    <Column
      safeArea
      width="full"
      height="full"
      justifyContent="center"
      alignItems="center"
      _light={{
        bg: {
          linearGradient: {
            colors: ['primary.200', 'primary.300'],
            start: [1, 0],
            end: [0, 1],
          },
        },
        color: 'primary.900',
      }}
      _dark={{
        bg: {
          linearGradient: {
            colors: ['primary.900', 'primary.800'],
            start: [1, 0],
            end: [0, 1],
          },
        },
        color: 'primary.50',
      }}
    >
      {clocks.length !== 0 ? (
        <Menu
          closeOnSelect={true}
          trigger={(triggerProps) => {
            return (
              <Fab
                {...triggerProps}
                accessibilityLabel="More options menu"
                renderInPortal={false}
                size="lg"
                icon={<HamburgerIcon size="lg" mt="4" mr="4" />}
                placement="top-right"
                variant="link"
                shadow="none"
              >
                <HamburgerIcon size="lg" />
              </Fab>
            );
          }}
        >
          {clocks.map((clock, index) => {
            return (
              <Menu.Item
                key={index}
                onPress={() => setSelectedDate(new Date(clock))}
                zIndex="10"
              >
                <Text>Data {index}</Text>
                <IconButton
                  onPress={() => {
                    dispatch(removeClock(clock));
                  }}
                  icon={
                    <CloseIcon
                      color="white"
                      ml={1}
                      width="full"
                      zIndex="9999"
                      size="sm"
                    />
                  }
                />
              </Menu.Item>
            );
          })}
        </Menu>
      ) : null}
      {clocks.length !== 0 ? (
        <Pressable onPress={() => swtichDateFormat()}>
          <Text fontSize="5xl">
            {pokeDate ? format(pokeDate, dateFormat) : null}
          </Text>
        </Pressable>
      ) : null}
      <AddModal />
    </Column>
  );
};
