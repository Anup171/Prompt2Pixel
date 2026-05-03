import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './buttons';
import TextInput from './TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { GenerateImage, CreatePost } from '../api';

const Form = styled.div`
  flex: 1;
  max-width: 540px;
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;

  @media (max-width: 600px) {
    padding: 26px 20px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  font-family: "Syne", sans-serif;
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  letter-spacing: -0.5px;
`;

const Desc = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.65;
  margin: 0;
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

const ErrorMsg = styled.div`
  font-size: 14px;
  color: #f87171;
  padding: 11px 15px;
  background: #f8717112;
  border: 1px solid #f8717128;
  border-radius: 7px;
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
  const [error, setError] = useState("");

  const generateImageFun = async () => {
    setError("");
    setGenerateImageLoading(true);
    await GenerateImage({ prompt: post.prompt })
      .then((res) => {
        setPost({ ...post, photo: res?.data?.photo });
        setGenerateImageLoading(false);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
          setError("Server is waking up (cold start). Please try again in 10 seconds.");
        } else {
          setError(error?.response?.data?.message || "Failed to generate image.");
        }
        setGenerateImageLoading(false);
      });
  };

  const createPostFun = async () => {
    setError("");
    setCreatePostLoading(true);
    await CreatePost(post)
      .then(() => {
        setCreatePostLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error?.response?.data?.message || "Failed to post.");
        setCreatePostLoading(false);
      });
  };

  const isGenerateDisabled = post.prompt.trim() === "";
  const isPostDisabled =
    post.name.trim() === "" || post.prompt.trim() === "" || post.photo === "";

  return (
    <Form>
      <Header>
        <Title>Generate an Image</Title>
        <Desc>
          Describe what you want to see. The more detail, the better the result.
        </Desc>
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
          rows={7}
          textArea
          value={post.prompt}
          handleChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
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
