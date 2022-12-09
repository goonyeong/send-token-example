// csv 파일만 가져오게 하기
// [address, value][] 형식으로 바꾼 후, address가 "0x"로 시작하는 요소만 읽기

import { isNumberValid, isNumberString, isAddress } from "./common";

// csv -> string으로 변환 (Promise 객체 반환)
export const convertCsvToString = (file: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      typeof fileReader.result === "string" && resolve(fileReader.result);
    };

    fileReader.onerror = reject;

    fileReader.readAsText(file);
  });
};

// csv string을 opj[] type 으로 변환 (Row에 들어갈 type)
export const convertCsvStringToArr = (text: string) => {
  const textArr = text.split("\n");

  const objArr: IToInfo[] = textArr.map((cont) => {
    const contArr = cont.split(",").filter((value) => value !== "");
    return {
      id: Math.random().toString(),
      toAddress: contArr[0],
      value: contArr[1] && contArr[1].replace("\r", ""),
    };
  });

  const filteredArr = objArr.filter((obj) => {
    if (
      obj.toAddress &&
      obj.value &&
      isAddress(obj.toAddress) &&
      isNumberString(obj.value) &&
      isNumberValid(obj.value)
    ) {
      return true;
    }
    return false;
  });

  return filteredArr;
};

// (최종) csv 파일을 받아서, row에 들어갈 type으로 변환
export const readCsv = async (file: Blob) => {
  const csvString = await convertCsvToString(file);

  return convertCsvStringToArr(csvString);
};
