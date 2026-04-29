import { CircularProgress } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  min-height: 360px;
  max-height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  border: 2px dashed ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 18px;
  overflow: hidden;
  background: ${({ theme }) => theme.bgDark};
  transition: all 0.3s ease;

  ${({ hasImage }) => hasImage && `
    border: none;
    padding: 0;
  `}
`;

const PlaceholderText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  line-height: 1.7;
  margin: 0;
  max-width: 220px;
  font-weight: 500;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const GenerateImageCard = ({ src, loading }) => {
  return (
    <Container hasImage={!!src && !loading}>
      {loading ? (
        <>
          <CircularProgress style={{ color: "inherit", width: "24px", height: "24px" }} />
          <PlaceholderText>Generating your image…</PlaceholderText>
        </>
      ) : src ? (
        <Image src={src} alt="Generated" />
      ) : (
        <>
          <AutoAwesome style={{ fontSize: "28px", opacity: 0.3 }} />
          <PlaceholderText>Your generated image will appear here</PlaceholderText>
        </>
      )}
    </Container>
  );
};

export default GenerateImageCard;
