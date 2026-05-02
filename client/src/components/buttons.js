import { CircularProgress } from "@mui/material";
import React from "react";
import styled, { css } from "styled-components";

const primaryStyles = css`
  background: ${({ theme }) => theme.primary}18;
  color: ${({ theme }) => theme.primary};
  border-color: ${({ theme }) => theme.primary}40;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.primary}28;
    border-color: ${({ theme }) => theme.primary}70;
  }
`;

const secondaryStyles = css`
  background: transparent;
  color: ${({ theme }) => theme.text_secondary};
  border-color: ${({ theme }) => theme.border};

  &:hover {
    background: ${({ theme }) => theme.bgLight};
    color: ${({ theme }) => theme.text_primary};
    border-color: ${({ theme }) => theme.border};
  }
`;

const StyledButton = styled.div`
  border-radius: 10px;
  font-family: "DM Sans", sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 26px;
  white-space: nowrap;
  border: 1px solid transparent;
  user-select: none;

  @media (max-width: 600px) {
    padding: 11px 18px;
    font-size: 14px;
  }

  ${({ type }) => (type === "secondary" ? secondaryStyles : primaryStyles)}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0.55;
      cursor: not-allowed;
    `}

  ${({ flex }) => flex && "flex: 1;"}

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary}60;
    outline-offset: 2px;
  }
`;

const ButtonComponent = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
}) => {
  return (
    <StyledButton
      onClick={() => {
        if (!isDisabled && !isLoading) {
          onClick && onClick();
        }
      }}
      isDisabled={isDisabled}
      type={type}
      isLoading={isLoading}
      flex={flex}
    >
      {isLoading ? (
        <CircularProgress style={{ width: "15px", height: "15px", color: "inherit" }} />
      ) : (
        leftIcon
      )}
      {text}
      {!isLoading && rightIcon}
    </StyledButton>
  );
};

export default ButtonComponent;
