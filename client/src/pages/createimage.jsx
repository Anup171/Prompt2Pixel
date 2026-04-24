import React from 'react';
import styled from 'styled-components';
import GenerateImageForm from '../components/generateimageform';
import GenerateImageCard from '../components/generateimagecard';

const Container=styled.div`
min-height: 100vh;
overflow-y: auto;
background:${({theme})=>theme.bg};
padding:30px 30px;
padding-bottom: 50px;
display:flex;
flex-direction:column;
align-items:center;
gap:20px;
@media (max-width:768px){
padding:6px 10px;
}
`;

const Headline = styled.div`
    font-size: 28px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    align-items: center;
    flex-direction:column;
    @media (max-width:600px){
    font-size:22px; }
`;

const Wrapper = styled.div`
  flex:1;
  height:fit-content;
  width: 100%;
  max-width: 1200px;
  gap:8%;
  padding: 32px 0px;
  display: flex;
  justify-content:center;
  @media (max-width: 768px) {
  flex-direction: column;
}
`; 

const CreateImage=()=>{
    return(
        <Container>
            <Wrapper>
                <GenerateImageForm/>
                <GenerateImageCard/>
            </Wrapper>
        </Container>
    )
};
export default CreateImage;