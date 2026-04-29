import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import FileSaver from "file-saver";
import { DownloadRounded } from "@mui/icons-material";

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 14px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.card};
  aspect-ratio: 1 / 1;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.65);
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  justify-content: flex-end;
  padding: 14px;
  background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 55%, transparent 100%);
  opacity: 0;
  transition: opacity 0.25s ease;
  border-radius: 12px;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.95);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  margin: 0;
`;

const AuthorRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const Author = styled.div`
  font-size: 13px;
  font-weight: 600;
  display: flex;
  gap: 8px;
  align-items: center;
  color: rgba(255,255,255,0.95);
`;

const DownloadBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(6px);
  cursor: pointer;
  color: white;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.28);
  }
`;

const Image = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ImageCard = ({ item }) => {
  const handleDownload = (e) => {
    e.stopPropagation();
    try {
      FileSaver.saveAs(item?.photo, `prompt2pixel-${Date.now()}.jpg`);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Card role="article" aria-label={`Image by ${item?.author}`}>
      <Image src={item?.photo} alt={item?.prompt} loading="lazy" />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>
        <AuthorRow>
          <Author>
            <Avatar sx={{ width: "24px", height: "24px", fontSize: "11px", bgcolor: "primary.main" }}>
              {item?.author?.[0]?.toUpperCase()}
            </Avatar>
            {item?.author}
          </Author>
          <DownloadBtn
            onClick={handleDownload}
            title="Download image"
            aria-label="Download image"
          >
            <DownloadRounded style={{ fontSize: "16px" }} />
          </DownloadBtn>
        </AuthorRow>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
