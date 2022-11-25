import React, { FC, useCallback, useState } from 'react';
import { Icon, Text, Button, Modal, Fab, Column } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export const NotificationModal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<'morning' | 'evening' | 'night'>(
    'morning'
  );

  const setNotification = useCallback(() => {}, [timeframe]);

  return (
    <>
      <Fab
        renderInPortal={false}
        size="lg"
        shadow="4"
        icon={
          <Icon
            color="white"
            as={MaterialIcons}
            name="notifications"
            size="md"
          />
        }
        onPress={() => setIsOpen(!isOpen)}
        placement="bottom-left"
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
          <Modal.Header>Set notification</Modal.Header>
          <Modal.Body m="2" justifyContent="center" alignItems="center">
            <Column my="2">
              <Text mb="2">Select in-game time:</Text>
              <Column space={4}>
                <Button
                  colorScheme="orange"
                  opacity={timeframe === 'morning' ? 1 : 0.3}
                  onPress={() => setTimeframe('morning')}
                  width="full"
                >
                  Morning
                </Button>
                <Button
                  colorScheme="orange"
                  opacity={timeframe === 'evening' ? 1 : 0.3}
                  onPress={() => setTimeframe('evening')}
                  width="full"
                >
                  Evening
                </Button>
                <Button
                  colorScheme="violet"
                  opacity={timeframe === 'night' ? 1 : 0.3}
                  onPress={() => setTimeframe('night')}
                  width="full"
                >
                  Night
                </Button>
              </Column>
            </Column>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              mr="2"
              onPress={async () => {
                setIsOpen(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
