import styled from "styled-components";
import { useStore } from "store";
import { sliceAddress, numToKorean } from "utils/common";

export const RowColumn = ({ columnLabel }: { columnLabel: string[] }) => {
  return (
    <ColumnStyled>
      {columnLabel.map((label) => (
        <span className="value" key={Math.random()}>
          {label}
        </span>
      ))}
    </ColumnStyled>
  );
};

export const RowTo = ({ id, toAddress, value }: IToInfo) => {
  const {
    appStore: { deleteToList },
  } = useStore();

  // Delete 클릭 시, 선택된 열 삭제
  const handleDeleteClick = () => {
    deleteToList(id);
  };

  return (
    <RowToStyle>
      <span className="value">{sliceAddress(toAddress)}</span>
      <span className="value">{numToKorean(value)}</span>
      <button className="deleteBtn" onClick={handleDeleteClick}>
        ❌
      </button>
    </RowToStyle>
  );
};

const ColumnStyled = styled.div`
  width: 100%;
  height: 35px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_color};
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 35% repeat(auto-fit, minmax(60%, auto));
  background-color: ${({ theme }) => theme.colors.secondary_color};
  .value {
    ${({ theme }) => theme.mixin.flexCenter}
    width: 100%;
    height: 100%;
  }
`;

const RowStyled = styled.li`
  width: 100%;
  height: 35px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_color};
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 35% repeat(auto-fit, minmax(60%, auto));
  .value {
    ${({ theme }) => theme.mixin.flexCenter}
    width: 100%;
    height: 100%;
  }
`;

const RowToStyle = styled(RowStyled)`
  position: relative;
  .deleteBtn {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: 0;
  }
`;
