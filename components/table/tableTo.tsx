import React, { useRef } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import { RowColumn, RowTo } from "components/table/rows";
import { Button, ButtonForLabel } from "components/button";
import { InActiveWrapper } from "components/inActiveWrapper";
import { readCsv } from "utils/csv";

interface ITableToProps {
  label: string;
}

const TableTo = ({ label }: ITableToProps) => {
  // 테이블에 표시할 데이터(in Mobx)에 useStore로 접근한다
  const {
    appStore: { toList, addToList, clearToList, isConfirmed },
  } = useStore();

  // File Input Tag Ref
  const inputRef = useRef<HTMLInputElement>(null);

  // input을 통해 파일이 업로드 됐을 때, toList update & input tag value 삭제
  const handleFileInputChagne = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const csvFile = e.target.files[0];
      readCsv(csvFile).then((res) => {
        res.map((data) => {
          if (data.toAddress && data.value) {
            addToList(data);
          }
        });
      });
    }

    if (inputRef.current !== null) {
      inputRef.current.value = "";
    }
  };

  return (
    <Wrapper>
      <TableTitle>{label}</TableTitle>
      <Table>
        <RowColumn columnLabel={["To Address", "value"]} />
        <ul className="tableRows">
          {toList.map((cont) => (
            <RowTo
              key={Math.random()}
              id={cont.id}
              toAddress={cont.toAddress}
              value={cont.value}
            />
          ))}
        </ul>
        {isConfirmed && <InActiveWrapper />}
      </Table>
      <BtnContainer isActive={!isConfirmed}>
        <input
          type="file"
          id={"csvFileInput"}
          className={"fileInput"}
          accept={".csv"}
          onChange={handleFileInputChagne}
          ref={inputRef}
        />
        <ButtonForLabel
          label="CSV"
          isActive={!isConfirmed}
          onClick={() => {}}
          htmlFor={"csvFileInput"}
        />
        <Button
          label="Clear"
          isActive={!isConfirmed}
          onClick={() => {
            clearToList();
          }}
        />
      </BtnContainer>
    </Wrapper>
  );
};

export default observer(TableTo);

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 15fr;
  grid-gap: 5px;
  position: relative;
`;

const TableTitle = styled.h4`
  display: flex;
  align-items: flex-end;
`;

const Table = styled.div`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_color};
  height: 400px;
  overflow: hidden;
  font-size: 1rem;
  position: relative;
  .tableRows {
    overflow: auto;
    height: 365px;
  }
`;

const BtnContainer = styled.div<{ isActive: boolean }>`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 150px;
  height: 25px;
  grid-gap: 10px;
  right: 0;
  top: 0;
  .fileInput {
    display: none;
  }
`;
