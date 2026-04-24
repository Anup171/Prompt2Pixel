import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  padding: 15px;
  border: 2px dashed ${({ theme }) => theme.primary};  
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
  overflow: hidden;   
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  background: ${({ theme }) => theme.black + 20};
`;

const GenerateImageCard=()=>{
    return(
        <Container><Image/></Container>
    )
};
export default GenerateImageCard;