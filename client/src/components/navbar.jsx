import React from 'react';
import styled from 'styled-components';
import Button from './buttons';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { ExploreRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  padding: 0 52px;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  @media only screen and (max-width: 600px) {
    padding: 0 20px;
    height: 62px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.div`
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 2px;
  transition: opacity 0.15s ease;

  span {
    color: ${({ theme }) => theme.primary};
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 18px;
  background: ${({ theme }) => theme.border};

  @media (max-width: 600px) {
    display: none;
  }
`;

const Tagline = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  letter-spacing: 0.01em;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  display: inline-block;
  box-shadow: 0 0 6px #22c55e88;
`;

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostPage = location.pathname === "/post";

  return (
    <Container>
      <Left>
        <Logo onClick={() => navigate("/")}>
          Prompt<span>2</span>Pixel
        </Logo>
        <Divider />
        <Tagline>AI Image Generator</Tagline>
      </Left>

      <Right>
        <NavMeta>
          <Dot />
          Live
        </NavMeta>
        {isPostPage ? (
          <Button
            onClick={() => navigate("/")}
            text="Explore"
            leftIcon={<ExploreRounded style={{ fontSize: "17px" }} />}
          />
        ) : (
          <Button
            onClick={() => navigate("/post")}
            text="Generate"
            leftIcon={<AddPhotoAlternateRoundedIcon style={{ fontSize: "17px" }} />}
          />
        )}
      </Right>
    </Container>
  );
};

export default NavBar;
