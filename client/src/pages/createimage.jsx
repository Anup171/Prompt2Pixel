import React, { useState } from 'react';
import styled from 'styled-components';
import GenerateImageForm from '../components/generateimageform';
import GenerateImageCard from '../components/generateimagecard';

const Container = styled.div`
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => theme.bg};
  padding: 48px 40px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;

  @media (max-width: 768px) {
    padding: 28px 16px 52px;
  }
`;

const Wrapper = styled.div`
  height: fit-content;
  width: 100%;
  max-width: 1100px;
  gap: 32px;
  display: flex;
  justify-content: center;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CreateImage = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  return (
    <Container>
      <Wrapper>
        <GenerateImageForm
          post={post}
          setPost={setPost}
          createPostLoading={createPostLoading}
          setGenerateImageLoading={setGenerateImageLoading}
          generateImageLoading={generateImageLoading}
          setCreatePostLoading={setCreatePostLoading}
        />
        <GenerateImageCard src={post?.photo} loading={generateImageLoading} />
      </Wrapper>
    </Container>
  );
};

export default CreateImage;
