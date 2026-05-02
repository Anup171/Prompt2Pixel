import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  max-width: 500px;
  width: 90%;
  display: flex;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 8px;
  padding: 13px 18px;
  gap: 12px;
  align-items: center;
  background: ${({ theme }) => theme.bgLight};
  transition: all 0.2s ease;
  margin-top: 4px;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary}70;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}12;
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
  font-weight: 400;

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchBar = ({ search, setSearch }) => {
  return (
    <SearchBarContainer>
      <SearchOutlined style={{ color: "inherit", flexShrink: 0, fontSize: "19px" }} aria-hidden="true" />
      <SearchInput
        type="text"
        placeholder="Search by prompt or author…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search images by prompt or author"
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
