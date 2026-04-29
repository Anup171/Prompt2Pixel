import React, { useState } from 'react';
import styled from 'styled-components';
import GenerateImageForm from '../components/generateimageform';
import GenerateImageCard from '../components/generateimagecard';

const Container=styled.div`
min-height: 100vh;
overflow-y: auto;
background:${({theme})=>theme.bg};
padding:40px 40px 60px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
gap:28px;
@media (max-width:768px){
padding:24px 16px 50px;
}
`;

const Headline = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Wrapper = styled.div`
  height: fit-content;
  width: 100%;
  max-width: 1200px;
  gap: 8%;
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    padding: 20px 16px;
  }
`;

const CreateImage = () => {
    const [generateImageLoading,setGenerateImageLoading]=useState(false);
    const [createPostLoading,setCreatePostLoading]=useState(false);
    const [post,setPost]=useState({
        name:"",
        prompt:"",
        photo:"",
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