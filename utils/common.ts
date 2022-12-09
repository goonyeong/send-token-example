/** Util 함수 목록
 * sliceAddress : Address의 앞,뒤 5글자씩 보여주는 형식 변환
 * numToKorean : number를 한국어 표기로 변환 120,500 -> "12만 500"
 * ethToWei : eth -> wei
 * weiToEth : wei -> eth
 * decimalToHex : 10진수 -> 16진수
 * hexToDecimal : 16진수 -> 10진수
 * convertEthToWeihex : eth -> 16진수 wei
 * convertWeihexToEth : wei 16진수 -> eth
 * isNumberString : string type의 파라미터가 숫자형식인지의 여부 boolean 반환 (숫자 및 소수점으로 이루어져 있는지)
 * isIntDecLengthProper : number의 정수부분, 소수부분 길이가 정한 범위안에 있는지 여부 boolean 반환
 * isNumberValid : number가 유효한 number인지 여부 boolean 반환 (0.00의 경우 / .0의 경우 / 0.의 경우 / .의 경우 등)
 * isAddress : address가 address 형식이 맞는지 여부 boolean 반환 (42자리 & 0x로 시작)
 *
 * 20220819
 * written by Asher
 */

import {
  ADDRESS_LENGTH,
  SLICED_LENGTH,
  MAX_DECIMAL_LENGTH,
  MAX_INTEGER_LENGTH,
} from "types/constants";
import Web3 from "web3";

export const sliceAddress = (address: string) => {
  const addressLength = address.length;

  return `${address.slice(0, SLICED_LENGTH)}.....${address.slice(
    addressLength - SLICED_LENGTH,
    addressLength
  )}`;
};

export const numToKorean = (numberString: string) => {
  const intNum = parseInt(numberString);
  const koreanUnits = ["", "만", "억", "조"];
  let answer = "";
  let unit = 10000;
  let index = 0;
  let division = Math.pow(unit, index);

  while (Math.floor(intNum / division) > 0) {
    const mod = Math.floor((intNum % (division * unit)) / division);
    if (mod) {
      const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      answer = `${modToString}${koreanUnits[index]} ` + answer;
    }
    division = Math.pow(unit, ++index);
  }

  // 소수점이 있을 경우
  if (numberString.includes(".")) {
    const seperatedNum = numberString.split(".");
    return `${answer} .${seperatedNum[1]}`;
  }
  return answer;
};

export const ethToWei = (eth: string): string => {
  return Web3.utils.toWei(eth, "ether");
};

export const weiToEth = (wei: string): string => {
  return Web3.utils.fromWei(wei, "ether");
};

export const decimalToHex = (decimal: string): string => {
  return Web3.utils.numberToHex(decimal);
};

export const hexToDecimal = (hex: string): string => {
  return Web3.utils.hexToNumberString(hex);
};

export const convertEthToWeihex = (eth: string): string => {
  const wei = ethToWei(eth);
  return decimalToHex(wei);
};

export const convertWeihexToEth = (weihex: string): string => {
  const wei = hexToDecimal(weihex);
  return weiToEth(wei);
};

export const isNumberString = (numString: string): boolean => {
  const numArray = numString.split("");

  const isNumCharacter = (char: string) => {
    for (let i = 0; i < 10; i++) {
      if (char === i.toString()) {
        return true;
      }
    }
    if (char === ".") {
      return true;
    }
    return false;
  };

  if (!numArray.every(isNumCharacter)) return false;
  if (numArray.filter((char: string) => char === ".").length > 1) return false;

  return true;
};

export const isIntDecLengthProper = (numString: string): boolean => {
  if (numString.includes(".")) {
    if (numString.split(".")[1].length > MAX_DECIMAL_LENGTH) return false;
    if (numString.split(".")[0].length > MAX_INTEGER_LENGTH) return false;
  } else {
    if (numString.length > MAX_INTEGER_LENGTH) return false;
  }
  return true;
};

export const isNumberValid = (numString: string): boolean => {
  if (!numString) return false;
  if (!isIntDecLengthProper(numString)) return false;
  if (numString.includes(".")) {
    if (
      numString.split(".")[1].length === 0 ||
      parseInt(numString.split(".")[1]) === 0
    )
      return false;
    if (numString.split(".")[0].length === 0) return false;
  } else {
    console.log(numString);
    console.log(parseInt(numString));
    if (parseInt(numString) <= 0) return false;
  }
  return true;
};

export const isAddress = (address: string): boolean => {
  return address.length === ADDRESS_LENGTH && address.substring(0, 2) === "0x";
};
