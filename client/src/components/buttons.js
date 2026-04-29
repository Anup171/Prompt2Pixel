import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  border-radius: 10px;
  font-family: "DM Sans", sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 28px;
  white-space: nowrap;
  border: none;

  @media (max-width: 600px) {
    padding: 11px 22px;
    font-size: 14px;
  }

  ${({ type, theme }) =>
    type === "secondary"
      ? `background: ${theme.secondary}18; color: ${theme.secondary}; border: 1.5px solid ${theme.secondary}44;`
      : `background: ${theme.primary}; color: #fff; box-shadow: 0 4px 12px ${({ theme }) => theme.primary}40;`}

  ${({ isDisabled }) =>
    isDisabled && `opacity: 0.4; cursor: not-allowed; pointer-events: none;`}

  ${({ isLoading }) =>
    isLoading && `opacity: 0.65; cursor: not-allowed;`}

  ${({ flex }) => flex && `flex: 1;`}

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    ${({ type, theme }) =>
      type === "secondary"
        ? `box-shadow: 0 8px 20px ${({ theme }) => theme.secondary}22;`
        : `box-shadow: 0 8px 24px ${({ theme }) => theme.primary}50;`}
  }

  &:active:not(:disabled) {
    transform: translateY(0px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
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
        <CircularProgress style={{ width: "14px", height: "14px", color: "inherit" }} />
      ) : leftIcon}
      {text}
      {!isLoading && rightIcon}
    </StyledButton>
  );
};

export default ButtonComponent;
