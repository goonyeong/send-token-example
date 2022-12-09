import styled from "styled-components";

interface IButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

interface IButtonForLabelProps extends IButtonProps {
  htmlFor: string;
}

export const Button = ({ label, onClick, isActive = true }: IButtonProps) => {
  return (
    <Btn
      onClick={() => {
        isActive && onClick();
      }}
      isActive={isActive}
    >
      {label}
    </Btn>
  );
};

export const ButtonForLabel = ({
  label,
  onClick,
  isActive = true,
  htmlFor,
}: IButtonForLabelProps) => {
  return (
    <BtnForLabel
      onClick={() => {
        isActive && onClick();
      }}
      isActive={isActive}
      htmlFor={htmlFor}
    >
      {label}
    </BtnForLabel>
  );
};

const Btn = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 0;
  background-color: ${(props) =>
    props.isActive
      ? ({ theme }) => theme.colors.primary_color
      : ({ theme }) => theme.colors.secondary_color};
  color: ${(props) =>
    props.isActive
      ? ({ theme }) => theme.colors.background_color
      : ({ theme }) => theme.colors.sub_text_color};
  cursor: ${(props) => (props.isActive ? "pointer" : "auto")};
  &:hover {
    opacity: ${(props) => (props.isActive ? 0.7 : 1)};
  }
`;

const BtnForLabel = styled.label<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.mixin.flexCenter}
  border-radius: 10px;
  border: 0;
  padding-top: 2px;
  background-color: ${(props) =>
    props.isActive
      ? ({ theme }) => theme.colors.primary_color
      : ({ theme }) => theme.colors.secondary_color};
  color: ${(props) =>
    props.isActive
      ? ({ theme }) => theme.colors.background_color
      : ({ theme }) => theme.colors.sub_text_color};
  cursor: ${(props) => (props.isActive ? "pointer" : "auto")};
  pointer-events: ${(props) => (props.isActive ? "auto" : "none")};
  &:hover {
    opacity: ${(props) => (props.isActive ? 0.7 : 1)};
  }
`;
