import React from 'react';
import styled from 'styled-components';
import Button from './buttons';
import TextInput from './TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';

const Form = styled.div`
  flex: 1;
  height: 100%;
  max-width: 600px;
  width: 100%;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;

const Body = styled.div`
  flex: 1;   /* IMPORTANT */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const GenerateImageForm = () => {
  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>
          Write your prompt according to the image you want.
        </Desc>
      </Top>
      <Body>
        <TextInput label ='Author' placeholder="Enter your name..." name="name"/>
        <TextInput label="Image prompt" placeholder="Write a detailed prompt about the image you want to generate..." name="prompt" rows={11} textArea/>
      </Body>
      <Actions>
        <Button text='Generate Image' flex leftIcon={<AutoAwesome/>}/>
        <Button text='Post Image' flex leftIcon={<CreateRounded/>}/>
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
