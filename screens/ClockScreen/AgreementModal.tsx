import React, { useState } from 'react';
import { Link, Text, Button, Modal, Column } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { setIsFirstTimeUser } from '../../lib/redux/reducers/appConfigReducer';
import i18n, { langs } from '../../lib/i18n';

export const AgreementModal: React.FC = () => {
  const { isFirstTimeUser } = useSelector(
    (state: RootState) => state.appConfig
  );
  const [isOpen, setIsOpen] = useState<boolean>(isFirstTimeUser);
  const dispatch = useDispatch();

  return (
    <>
      <Modal isOpen={isOpen} overlayVisible={true}>
        <Modal.Content>
          <Modal.Header>Welcome!</Modal.Header>
          <Modal.Body>
            <Column>
              <Text mb="2">{i18n.t(langs.beforeUsing)}</Text>
              <Link href="https://cymagix.net/static/docs/Privacy_Policy.html">
                {i18n.t(langs.privacyPolicy)}
              </Link>
            </Column>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                setIsOpen(false);
                dispatch(setIsFirstTimeUser(false));
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
