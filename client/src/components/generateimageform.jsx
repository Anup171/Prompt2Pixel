import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Button from './buttons';
import TextInput from './TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { GenerateImage } from '../api';
import { CreatePost } from '../api';

const Form = styled.div`
  flex: 1;
  max-width: 560px;
  width: 100%;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: ${({ theme }) => theme.card};
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 18px;

  @media (max-width: 600px) {
    padding: 24px 18px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h2`
  font-family: "Syne", sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  letter-spacing: -0.3px;
`;

const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.border};
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setGenerateImageLoading,
  generateImageLoading,
  setCreatePostLoading,
}) => {
  const navigate = useNavigate();
  const [error,setError]=useState("");
  const generateImageFun = async () => {
  setGenerateImageLoading(true);

  await GenerateImage({ prompt: post.prompt })
    .then((res) => {
      setPost({
        ...post,
        photo: res?.data?.photo,
      });
      setGenerateImageLoading(false);
    })
    .catch((error) => {
      setError(error?.response?.data?.message);
      setGenerateImageLoading(false);
    });
};
  const createPostFun = async () => {
  setCreatePostLoading(true);

  await CreatePost(post)
    .then((res) => {
      setCreatePostLoading(false);
      navigate("/");
    })
    .catch((error) => {
      setError(error?.response?.data?.message);
      setCreatePostLoading(false);
    });
};
  const isGenerateDisabled = post.prompt.trim() === "";
  const isPostDisabled = post.name.trim() === "" || post.prompt.trim() === "" || post.photo === "";

  return (
    <Form>
      <Header>
        <Title>Generate an Image</Title>
        <Desc>Describe the image you want to create. Be as detailed as possible for best results.</Desc>
      </Header>
      <Divider />
      <Body>
        <TextInput
          label="Your Name"
          placeholder="Enter your name…"
          name="name"
          value={post.name}
          handleChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Prompt"
          placeholder="A cinematic photograph of a neon-lit Tokyo alley at night, rain reflections, 35mm film…"
          name="prompt"
          rows={8}
          textArea
          value={post.prompt}
          handleChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Body>
      <Actions>
        <Button
          text="Generate"
          flex
          leftIcon={<AutoAwesome style={{ fontSize: "15px" }} />}
          isLoading={generateImageLoading}
          isDisabled={isGenerateDisabled}
          onClick={generateImageFun}
        />
        <Button
          text="Post"
          flex
          type="secondary"
          leftIcon={<CreateRounded style={{ fontSize: "15px" }} />}
          isLoading={createPostLoading}
          isDisabled={isPostDisabled}
          onClick={createPostFun}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
