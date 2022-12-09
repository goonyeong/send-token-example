import React from "react";
import styled from "styled-components";
import {
  numToKorean,
  isNumberString,
  isIntDecLengthProper,
} from "utils/common";
import { ADDRESS_LENGTH } from "types/constants";

interface IInputContainerProps {
  label: string;
  value: string;
  type: "address" | "value";
  onChange: (newValue: string) => void;
}

export const InputContainer = ({
  label,
  value,
  type,
  onChange,
}: IInputContainerProps) => {
  let placeHolder = "";
  if (type === "address") placeHolder = "address";
  if (type === "value") placeHolder = "0";

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    inputValue.length <= ADDRESS_LENGTH && onChange(inputValue);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // 예외처리 : 숫자 & '.' 이외의 문자가 들어올 경우 or '.' 이 두개 이상 들어올 경우
    if (!isNumberString(inputValue)) return false;

    // 예외처리 : decimal 길이, integer 길이가 MAX_DECIMAL_LENGTH 이상일 경우
    if (!isIntDecLengthProper(inputValue)) return false;

    // 문제 없을 시, update state
    onChange(inputValue);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <>
        <InputTag
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (type === "address") {
              handleAddressChange(e);
            }
            if (type === "value") {
              handleValueChange(e);
            }
          }}
          placeholder={placeHolder}
        />
        {type === "address" && (
          <CharCount>
            {value.length}/{ADDRESS_LENGTH}
          </CharCount>
        )}
        {type === "value" && (
          <KoreanNum>= {value === "" ? "0" : numToKorean(value)}</KoreanNum>
        )}
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  padding: 5px;
  position: relative;
`;

const Label = styled.label`
  width: 70px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-weight: bold;
`;

const InputTag = styled.input`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.sub_text_color};
  color: ${({ theme }) => theme.colors.primary_color};
  padding: 0 10px;
`;

const KoreanNum = styled.span`
  position: absolute;
  bottom: -20px;
  left: 85px;
  color: ${({ theme }) => theme.colors.error_color};
`;

const CharCount = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.secondary_color};
`;
