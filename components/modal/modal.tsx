import styled from "styled-components";
import { Button } from "components/button";

interface IModalProps {
  type: "1" | "2";
  title: string;
  content: string;
  onConfirmClick?: () => void;
  onCancleClick?: () => void;
}

export const Modal = ({
  type,
  title,
  content,
  onConfirmClick,
  onCancleClick,
}: IModalProps) => {
  return (
    <>
      <BlurStyle />
      <Wrapper>
        <Container>
          <h4 className="title">{title}</h4>
          <p className="content">{content}</p>
          <BtnContainer>
            {type === "1" && (
              <>
                <Button
                  label="확인"
                  onClick={() => {
                    onConfirmClick && onConfirmClick();
                  }}
                />
              </>
            )}
            {type === "2" && (
              <>
                <Button
                  label="아니요"
                  onClick={() => {
                    onCancleClick && onCancleClick();
                  }}
                />
                <Button
                  label="예"
                  onClick={() => {
                    onConfirmClick && onConfirmClick();
                  }}
                />
              </>
            )}
          </BtnContainer>
        </Container>
      </Wrapper>
    </>
  );
};

const BlurStyle = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  backdrop-filter: blur(10px);
  z-index: 10000;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  ${({ theme }) => theme.mixin.flexCenter}
  z-index: 10000;
`;

const Container = styled.div`
  width: 30%;
  height: 30%;
  background-color: ${({ theme }) => theme.colors.background_color};
  border-radius: 1rem;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  padding: 2% 5%;
  .title {
    font-size: 2.7rem;
    font-weight: bold;
    ${({ theme }) => theme.mixin.flexCenter}
  }
  .content {
    font-size: 1.3rem;
    ${({ theme }) => theme.mixin.flexCenter}
  }
`;

const BtnContainer = styled.div`
  max-height: 50px;
  padding: 0 10%;
  ${({ theme }) => theme.mixin.flexCenter}
  gap: 20px
`;
