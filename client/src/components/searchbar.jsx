import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  max-width: 520px;
  width: 90%;
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 12px;
  padding: 14px 18px;
  gap: 12px;
  align-items: center;
  background: ${({ theme }) => theme.bgLight};
  transition: all 0.25s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
  background: transparent;
  font-family: "DM Sans", sans-serif;
  font-size: 15px;
  font-weight: 500;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchBar = ({ value, onChange, disabled }) => {
  return (
    <SearchBarContainer>
      <SearchOutlined style={{ color: "inherit", flexShrink: 0, fontSize: "18px" }} aria-hidden="true" />
      <SearchInput
        type="text"
        placeholder="Search by prompt or author…"
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label="Search images by prompt or author"
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
