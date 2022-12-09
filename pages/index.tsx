// React & Next
import { NextPage } from "next";
import { useState } from "react";
// Style
import styled from "styled-components";
// Mobx
import { useStore } from "store";
import { observer } from "mobx-react-lite";
// Components
import { InputContainer } from "components/inputContainer";
import { Button } from "components/button";
import TableTo from "components/table/tableTo";
import MetaMask from "components/metaMask";
import { Modal } from "components/modal/modal";
// Utils
import { isAddress, isNumberValid } from "utils/common";
import { sendToken } from "utils/metamask";
import { ADDRESS_LENGTH } from "types/constants";

const Home: NextPage = () => {
  // Mobx Store 사용하기 위한 useStore hook 호출
  const {
    appStore: {
      metamaskInfo,
      toList,
      addToList,
      clearToList,
      isConfirmed,
      toggleIsConfirmed,
    },
  } = useStore();

  // 사용자가 input에 입력하는 값을 담는 local state
  const [inputData, setInputData] = useState({
    id: "",
    toAddress: "",
    value: "",
    addressLength: 0,
  });

  // 입력 유효성 검사 오류 state
  const [inputValidError, setInputValidError] = useState("");

  // Confirm 클릭 시 발생하는 오류
  const [confirmError, setConfirmError] = useState("");

  // ConFirm Modal render 여부 state
  const [isConfirmModalRender, setIsConfirmModalRender] = useState(false);

  // Send Success Modal render 여부 state
  const [isSendSuccessModalRender, setIsSendSuccessModalRender] =
    useState(false);

  // Send Fail Modal render 여부 state
  const [isSendFailModalRender, setIsSendFailModalRender] = useState(false);

  // Address를 입력하면 inputData의 toAddress 업데이트
  const handleToAddressChange = (newAddress: string) => {
    setInputData({
      ...inputData,
      toAddress: newAddress,
      addressLength: newAddress.length,
    });
  };

  // value를 입력하면 inputData의 value 업데이트
  const handleValueChange = (newValue: string) => {
    setInputData({
      ...inputData,
      value: newValue,
    });
  };

  // 추가 버튼을 클릭하면 유효성 검사 후, toList(Mobx observable) 배열에 내용 추가하고 inputData 초기화
  const handleAddButtonClick = () => {
    if (!isAddress(inputData.toAddress)) {
      setInputValidError(
        `올바른 address를 입력해주세요 (0x로 시작 / ${ADDRESS_LENGTH}자리)`
      );
      return;
    } else if (!isNumberValid(inputData.value)) {
      setInputValidError("value를 입력해주세요");
      return;
    }

    setInputValidError("");
    addToList(inputData);
    setInputData({
      ...inputData,
      id: Math.random().toString(),
      toAddress: "",
      value: "",
    });
  };

  // Confirm 버튼 클릭 시, confirm 조건 확인 후, 버튼 활성화 or 비활성화
  const handleConfirmBtnClick = () => {
    if (isConfirmed) {
      toggleIsConfirmed();
      return;
    }

    if (metamaskInfo.address === "") {
      setConfirmError("메타마스크 연결을 해주세요");
    } else if (toList.length <= 0) {
      setConfirmError("To Address와 Value를 추가해주세요");
    } else {
      setConfirmError("");
      toggleIsConfirmed();
    }
  };

  // AirDrop 버튼 클릭 시, 재확인 모달 렌더링
  const handleAirDropBtnClick = () => {
    setIsConfirmModalRender(true);
  };

  // 재확인 모달 "예" 클릭 시, 모달 내리고 송금하고, 결과 모달 렌더링
  const handleConfirmModalYesBtnClick = async () => {
    setIsConfirmModalRender(false);
    const result = await sendToken(
      metamaskInfo.address,
      toList[0].toAddress,
      toList[0].value
    );
    if (result) {
      setIsSendSuccessModalRender(true);
    } else {
      setIsSendFailModalRender(true);
    }
  };

  // 재확인 모달 "아니오" 클릭 시, 모달 내리기
  const handleConfirmModalNoBtnClick = () => {
    setIsConfirmModalRender(false);
  };

  // 송금 성공 모달 "확인" 클릭 시, 모달 내리고 ClearToList &
  const handleSendSuccessModalBtnClick = () => {
    setIsSendSuccessModalRender(false);
    clearToList();
    toggleIsConfirmed();
  };
  // 송금 실패 모달 "확인" 클릭 시, 모달 내리기
  const handleSendFailModalBtnClick = () => {
    setIsSendFailModalRender(false);
  };

  return (
    <Wrapper>
      <Container>
        <InputWrapper>
          <InputContainer
            label="To"
            type="address"
            value={inputData.toAddress}
            onChange={(newValue: string) => {
              handleToAddressChange(newValue);
            }}
          />
          <InputContainer
            label="Value"
            type="value"
            value={inputData.value}
            onChange={(newValue: string) => {
              handleValueChange(newValue);
            }}
          />
        </InputWrapper>
        <AddBtnWrapper>
          <Button
            label="추가"
            isActive={!isConfirmed}
            onClick={handleAddButtonClick}
          />
          <span className="validError">{inputValidError}</span>
        </AddBtnWrapper>
        <TableWrapper>
          <MetaMask />
          <TableTo label="To" />
        </TableWrapper>
        <ConfirmBtnWrapper>
          <Button
            label={isConfirmed ? "Edit" : "Confirm"}
            onClick={handleConfirmBtnClick}
          />
          <Button
            label="Airdrop"
            isActive={isConfirmed}
            onClick={handleAirDropBtnClick}
          />
          <span className="confirmError">{confirmError}</span>
        </ConfirmBtnWrapper>
      </Container>
      {isConfirmModalRender && (
        <Modal
          type="2"
          title="AirDrop"
          content="진짜 하시겠습니까?"
          onConfirmClick={handleConfirmModalYesBtnClick}
          onCancleClick={handleConfirmModalNoBtnClick}
        />
      )}
      {isSendSuccessModalRender && (
        <Modal
          type="1"
          title="송금 성공"
          content="송금을 완료하였습니다."
          onConfirmClick={handleSendSuccessModalBtnClick}
        />
      )}
      {isSendFailModalRender && (
        <Modal
          type="1"
          title="송금 실패"
          content="송금에 실패하였습니다."
          onConfirmClick={handleSendFailModalBtnClick}
        />
      )}
    </Wrapper>
  );
};

export default observer(Home);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0;
  min-width: 1100px;
`;

const Container = styled.div`
  width: 1100px;
  height: 100%;
  display: grid;
  grid-row-gap: 35px;
  grid-template-columns: 1fr 1fr;
`;

const InputWrapper = styled.section``;

const AddBtnWrapper = styled.section`
  padding: 5px;
  width: 150px;
  position: relative;
  .validError {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 100%;
    color: ${({ theme }) => theme.colors.error_color};
    width: 400px;
  }
`;

const TableWrapper = styled.section`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 60px;
`;

const ConfirmBtnWrapper = styled.section`
  grid-column: 2/3;
  width: 50%;
  height: 40px;
  display: flex;
  gap: 10px;
  justify-self: end;
  position: relative;
  .confirmError {
    position: absolute;
    top: 110%;
    right: 0;
    color: ${({ theme }) => theme.colors.error_color};
  }
`;
