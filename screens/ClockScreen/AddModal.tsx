import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Icon,
  Text,
  Button,
  Modal,
  Box,
  Pressable,
  Fab,
  Column,
  Image,
  Row,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addClock } from '../../lib/redux/reducers/clockReducer';
import { addMinutes } from 'date-fns';
import { RootState } from '../../lib/redux/store';
import i18n, { langs } from '../../lib/i18n';

const MAX_PAGE_INDEX = 1;

export const AddModal: FC = () => {
  const { clocks } = useSelector((state: RootState) => state.clock);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTimeframe, setCurrenTimeframe] = useState<'day' | 'night'>(
    'day'
  );
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();

  const addNewClock = useCallback(() => {
    let date = new Date();
    if (currentTimeframe === 'night') {
      // Adjust to 06:00:00 AM
      date = addMinutes(date, 45);
    }
    if (currentTimeframe === 'day') {
      // Adjust to 06:00:00 PM
      date = addMinutes(date, 9);
    }
    dispatch(addClock(date.toUTCString()));
    setIsOpen(false);
  }, [dispatch, currentTimeframe]);

  useEffect(() => {
    if (clocks.length === 0) {
      setIsOpen(true);
    }
  }, [clocks]);

  return (
    <>
      {clocks.length === 0 ? (
        <Pressable
          onPress={() => {
            setPage(0);
            setIsOpen(!isOpen);
          }}
        >
          <Box
            px="6"
            py="3"
            borderRadius="md"
            shadow="4"
            _light={{
              bg: {
                linearGradient: {
                  colors: ['primary.900', 'primary.800'],
                  start: [1, 0],
                  end: [0, 1],
                },
              },
              color: 'primary.50',
            }}
            _dark={{
              bg: {
                linearGradient: {
                  colors: ['primary.200', 'primary.300'],
                  start: [1, 0],
                  end: [0, 1],
                },
              },
              color: 'primary.900',
            }}
          >
            <Text
              bold
              fontSize="lg"
              _light={{
                color: 'primary.50',
              }}
              _dark={{
                color: 'primary.900',
              }}
            >
              {i18n.t(langs.createFirstClock)}
            </Text>
          </Box>
        </Pressable>
      ) : null}
      <Fab
        renderInPortal={false}
        size="lg"
        shadow="4"
        icon={<Icon color="white" as={Feather} name="plus" size="md" />}
        onPress={() => {
          setPage(0);
          setIsOpen(!isOpen);
        }}
        placement="bottom-right"
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
        overlayVisible={true}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{i18n.t(langs.createInGameClock)}</Modal.Header>
          <Modal.Body m="2" justifyContent="center" alignItems="center">
            <Column my="2">
              <Row>
                <Text mb="2">{i18n.t(langs.openMapView)}</Text>
              </Row>
              <Row justifyContent="center" alignItems="center">
                <Image
                  alt="day"
                  size="xs"
                  source={{
                    uri: 'data:image/png;base64,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',
                  }}
                />
                <Image
                  alt="evening"
                  size="xs"
                  source={{
                    uri: 'data:image/png;base64,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',
                  }}
                />
                <Image
                  alt="night"
                  size="xs"
                  source={{
                    uri: 'data:image/png;base64,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',
                  }}
                />
              </Row>
            </Column>
            {page === 0 ? (
              <Column my="2">
                <Text mb="2">{i18n.t(langs.selectCurrentInGameTime)}</Text>
                <Column space={3}>
                  <Button
                    colorScheme="orange"
                    opacity={currentTimeframe === 'day' ? 1 : 0.3}
                    onPress={() => setCurrenTimeframe('day')}
                    width="full"
                  >
                    {i18n.t(langs.day)}
                  </Button>
                  <Button
                    colorScheme="violet"
                    opacity={currentTimeframe === 'night' ? 1 : 0.3}
                    onPress={() => setCurrenTimeframe('night')}
                    width="full"
                  >
                    {i18n.t(langs.evening) + ' / ' + i18n.t(langs.night)}
                  </Button>
                </Column>
              </Column>
            ) : null}
            {page === 1 ? (
              <Column my="2">
                <Text mb="2" fontWeight="medium">
                  {i18n.t(langs.pressSubmitWhenTimeChanged)}{' '}
                  <Text fontWeight="bold">
                    {currentTimeframe === 'day'
                      ? i18n.t(langs.evening)
                      : i18n.t(langs.morning)}
                  </Text>
                </Text>
                <Button colorScheme="primary" onPress={() => addNewClock()}>
                  SUBMIT
                </Button>
              </Column>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            {page !== 0 ? (
              <Button
                variant="ghost"
                colorScheme="blueGray"
                mr="2"
                onPress={() => {
                  setPage(page - 1);
                }}
              >
                {i18n.t(langs.back)}
              </Button>
            ) : (
              <Button
                variant="ghost"
                colorScheme="blueGray"
                mr="2"
                onPress={async () => {
                  setIsOpen(false);
                }}
              >
                {i18n.t(langs.close)}
              </Button>
            )}
            {page === MAX_PAGE_INDEX ? null : (
              <Button
                onPress={async () => {
                  setPage(page + 1);
                }}
              >
                {i18n.t(langs.next)}
              </Button>
            )}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
