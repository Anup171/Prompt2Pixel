import React from 'react';
import styled from 'styled-components';
import Button from './buttons';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { ExploreRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  padding: 0 48px;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);

  @media only screen and (max-width: 600px) {
    padding: 0 18px;
    height: 64px;
  }
`;

const Logo = styled.div`
  font-family: "Syne", sans-serif;
  font-weight: 900;
  font-size: 24px;
  letter-spacing: -0.8px;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostPage = location.pathname === "/post";

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>Prompt2Pixel</Logo>
      {isPostPage ? (
        <Button
          onClick={() => navigate("/")}
          text="Explore"
          leftIcon={<ExploreRounded style={{ fontSize: "18px" }} />}
        />
      ) : (
        <Button
          onClick={() => navigate("/post")}
          text="Generate"
          leftIcon={<AddPhotoAlternateRoundedIcon style={{ fontSize: "18px" }} />}
        />
      )}
    </Container>
  );
};

export default NavBar;
