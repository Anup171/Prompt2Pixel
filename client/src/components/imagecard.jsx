import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import FileSaver from 'file-saver';
import { DownloadRounded } from "@mui/icons-material";

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + "60"};

  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + "80"};
    transform: scale(1.05);
  }

`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  justify-content: flex-end;
  padding: 12px;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  color: ${({ theme }) => theme.white};

  opacity: 0; /* IMPORTANT */
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }

  border-radius: 6px;
`;

const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
`;

const Author = styled.div`
  font-weight: 400;
  font-size: 14px;
  display:flex;
  gap:8px;
  align-items:center;
  color: ${({ theme }) => theme.white};
`;

const Image = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const ImageCard = ({item}) => {
  return (
    <Card>
      <Image src={item?.photo} />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>
        <div 
        style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        }}>
        <Author>
        <Avatar sx={{width:"32px",height:"32px"}}>{item?.author?.[0]}</Avatar>
        {item?.author}</Author>
        <DownloadRounded onClick={() =>FileSaver.saveAs(item?.photo,"download.jpg")}/>
        </div>
      </HoverOverlay>
    </Card>
  );
};
export default ImageCard;