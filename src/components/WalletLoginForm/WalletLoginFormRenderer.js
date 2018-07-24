// @flow
import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import {
  Card,
  TextArea,
  Radio,
  RadioGroup,
  Button,
  InputGroup,
  Label,
  Intent,
  FormGroup,
  Icon,
  Checkbox,
} from '@blueprintjs/core';

import { OverlaySpinner, Text, Divider } from '../../components/Common';

type Status = 'incomplete' | 'valid' | 'invalid';

type Props = {
  loading: boolean,
  handleChange: (SyntheticInputEvent<>) => void,
  onDrop: (Array<Object>) => void,
  method: string,
  privateKey: ?string,
  privateKeyStatus: Status,
  json: ?string,
  jsonStatus: Status,
  walletFile: ?string,
  walletFileStatus: Status,
  mnemonic: ?string,
  mnemonicStatus: Status,
  password: ?string,
  storeWallet: boolean,
  storePrivateKey: boolean,
  submit: (SyntheticEvent<>) => Promise<void>,
  saveEncryptedWalletDisabled: boolean,
};

const inputStatuses = {
  privateKey: {
    incomplete: '',
    valid: 'Valid Private Key',
    invalid: 'Private Key Invalid',
  },
  json: {
    incomplete: '',
    valid: 'Valid JSON',
    invalid: 'Invalid JSON',
  },
  walletFile: {
    incomplete: '',
    valid: 'Wallet File Valid',
    invalid: 'Invalid Wallet',
  },
  mnemonic: {
    incomplete: '',
    valid: 'Valid Mnemonic',
    invalid: 'Invalid Mnemonic. Mnemonic must be 12 words long',
  },
};

const intents = {
  invalid: Intent.DANGER,
  valid: Intent.SUCCESS,
  incomplete: Intent.PRIMARY,
};

const WalletLoginFormRenderer = (props: Props) => {
  const {
    loading,
    handleChange,
    method,
    privateKey,
    privateKeyStatus,
    json,
    jsonStatus,
    walletFile,
    walletFileStatus,
    mnemonic,
    mnemonicStatus,
    password,
    onDrop,
    storeWallet,
    storePrivateKey,
    submit,
    saveEncryptedWalletDisabled,
  } = props;

  const inputForms = {
    privateKey: (
      <PrivateKeyInputForm privateKeyStatus={privateKeyStatus} privateKey={privateKey} handleChange={handleChange} />
    ),
    json: <JSONInputForm json={json} jsonStatus={jsonStatus} handleChange={handleChange} password={password} />,
    walletFile: (
      <JSONFileInputForm
        walletFile={walletFile}
        walletFileStatus={walletFileStatus}
        handleChange={handleChange}
        onDrop={onDrop}
        password={password}
      />
    ),
    mnemonic: (
      <MnemonicSentenceInputForm mnemonic={mnemonic} mnemonicStatus={mnemonicStatus} handleChange={handleChange} />
    ),
  };

  return (
    <Card elevation="1" style={{ width: '600px' }}>
      <InputFormBox>
        <RadioGroup
          name="method"
          onChange={handleChange}
          selectedValue={method}
          label="Choose how to access your wallet"
        >
          <Radio label="Private Key" value="privateKey" />
          <Radio label="JSON" value="json" />
          <Radio label="Wallet File" value="walletFile" />
          <Radio label="Mnemonic Sentence" value="mnemonic" />
        </RadioGroup>
        <InputFormsBox>{inputForms[method]}</InputFormsBox>
        <FormGroup helperText="Learn more about different options here">
          <Checkbox
            name="storeWallet"
            disabled={saveEncryptedWalletDisabled}
            checked={storeWallet && !saveEncryptedWalletDisabled}
            onChange={handleChange}
          >
            <strong>Save encrypted wallet in local storage</strong>
          </Checkbox>
          <Checkbox name="storePrivateKey" checked={storePrivateKey} onChange={handleChange}>
            <strong>Save private key in session storage </strong>
          </Checkbox>
        </FormGroup>
        <ButtonBox>
          <Button intent="primary" text="Authenticate" onClick={submit} />
        </ButtonBox>
        <OverlaySpinner visible={loading} transparent />
      </InputFormBox>
    </Card>
  );
};

const PrivateKeyInputForm = ({ handleChange, privateKey, privateKeyStatus }: *) => {
  return (
    <InputPadding>
      <FormGroup
        helperText={inputStatuses['privateKey'][privateKeyStatus]}
        label="Input Private Key"
        intent={intents[privateKeyStatus]}
      >
        <InputGroup
          name="privateKey"
          placeholder="(must start with 0x)"
          intent={intents[privateKeyStatus]}
          onChange={handleChange}
          value={privateKey}
        />
      </FormGroup>
    </InputPadding>
  );
};

const JSONInputForm = ({ handleChange, json, jsonStatus, password }: *) => {
  return (
    <div>
      <Label text="Input JSON File Text">
        <InputPadding>
          <FormGroup helperText={inputStatuses['json'][jsonStatus]} intent={intents[jsonStatus]}>
            <TextArea
              name="json"
              intent={intents[jsonStatus]}
              onChange={handleChange}
              value={json}
              style={{ height: '100px' }}
              fill
            />
          </FormGroup>
        </InputPadding>
      </Label>
      <Label text="Input Password">
        <InputPadding>
          <FormGroup>
            <InputGroup
              name="password"
              type="password"
              label="password"
              disabled={json === null}
              placeholder="(must start with 0x)"
              onChange={handleChange}
              value={password}
            />
          </FormGroup>
        </InputPadding>
      </Label>
    </div>
  );
};

const JSONFileInputForm = ({ onDrop, walletFileStatus }: *) => {
  return (
    <Label text="Drag on Click on Container to load your JSON wallet">
      <DropzoneContainer>
        <Dropzone onDrop={onDrop} style={{ width: '150px', height: '150px' }}>
          <DropzoneMessageContainer>
            <Icon icon="inbox" iconSize={50} intent={Intent.PRIMARY} />
          </DropzoneMessageContainer>
          <Divider />
          <Text intent={intents[walletFileStatus]}>{inputStatuses['walletFile'][walletFileStatus]}</Text>
        </Dropzone>
      </DropzoneContainer>
    </Label>
  );
};

const MnemonicSentenceInputForm = ({ handleChange, mnemonic, mnemonicStatus }: *) => {
  return (
    <Label text="Input Mnemonic Sentence">
      <InputPadding>
        <FormGroup helperText={inputStatuses['mnemonic'][mnemonicStatus]} intent={intents[mnemonicStatus]}>
          <TextArea
            name="mnemonic"
            large
            intent={intents[mnemonicStatus]}
            onChange={handleChange}
            value={mnemonic}
            style={{ height: '100px' }}
            fill
          />
        </FormGroup>
      </InputPadding>
    </Label>
  );
};

const InputPadding = styled.div`
  padding-top: 5px;
`;

const InputFormsBox = styled.div`
  padding-top: 50px;
`;

const ButtonBox = styled.div`
  text-align: right;
  padding-top: 20px;
`;

const InputFormBox = styled.div`
  position: relative;
`;

const DropzoneContainer = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
`;

const DropzoneMessageContainer = styled(Card)`
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

export default WalletLoginFormRenderer;