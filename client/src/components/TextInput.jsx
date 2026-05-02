import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Label = styled.label`
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
  padding: 0 1px;
`;

const OutlinedInput = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.bgDark};
  padding: 14px 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary}70;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}12;
  }
`;

const Input = styled.input`
  width: 100%;
  font-family: "DM Sans", sans-serif;
  font-size: 15px;
  line-height: 1.6;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Textarea = styled(Input).attrs({ as: "textarea" })`
  resize: vertical;
  min-height: 130px;
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  handleChange,
  textArea,
  rows,
  columns,
  disabled,
}) => {
  const InputComponent = textArea ? Textarea : Input;

  return (
    <Container>
      {label && <Label htmlFor={name}>{label}</Label>}
      <OutlinedInput>
        <InputComponent
          id={name}
          name={name}
          rows={rows}
          cols={columns}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e)}
          disabled={disabled}
          aria-label={label}
        />
      </OutlinedInput>
    </Container>
  );
};

export default TextInput;
