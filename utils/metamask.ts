/** Metamask 관련 functions
 *
 * initMetamaskInfo : 앱 시작 시, Metamask info observable init
 * onAccountChangeEvents : 앱 시작 시, 연결된 account의 변화를 감지하여 status account balance 등을 update 해주는 이벤트리스너 등록
 * removeAccountChangeEvents : 앱 시작 시, 연결된 account의 변화를 감지하여 status account balance 등을 update 해주는 이벤트리스너 삭제
 * checkIsMetamaskInstalled : 메타마스크 설치 여부 반환 (boolean)
 * getMetamaskAddress : 연결된 메타마스크 주소 반환 (연결됨 -> 주소 반환 / 연결되지 않음 -> false 반환)
 * getBalance : 특정 계정의 잔액 조회 (성공 -> 잔액 반환 / 실패 -> false 반환 )
 * requestConnect : 메타마스크 연결 요청 (연결 성공 -> 주소 반환 / 연결 실패 -> false 반환)
 * connectMetamask : 메타마스크 연결 하고, 연결 상태 observable update
 * sendToken : 메타마스크로 토큰 송금
 *
 *
 * 20220816
 * written by Asher
 */

import { convertEthToWeihex } from "utils/common";

export const initMetamaskInfo = async (
  setStatus: (value: TMetamaskStatusOption) => void,
  setAddress: (value: string) => void,
  setBalance: (value: number) => void,
  setIsInit: (value: boolean) => void
) => {
  try {
    // 설치되지 않았으면 status: Not Installed
    if (!checkIsMetamaskInstalled()) {
      setStatus("Not Installed");
      return;
    }

    const account = await getMetamaskAddress();

    // 연결되지 않았으면 status: Not Connected
    if (!account) {
      setStatus("Not Connected");
      return;
    }

    // 연결 됐으면, status, account, balance update
    if (typeof account === "string") {
      setStatus("Connected");
      setAddress(account);
      const balance = await getBalance(account);
      if (balance && typeof balance === "string") {
        setBalance(balance);
      }
    }
  } catch (e) {
    console.log("init error", e);
  } finally {
    // 마지막으로 isInit update
    setIsInit(true);
  }
};

export const onAccountChangedEvents = async (
  setStatus: (value: TMetamaskStatusOption) => void,
  setAddress: (value: string) => void,
  setBalance: (value: number) => void
) => {
  const ethereum = window.ethereum;
  ethereum?.on("accountsChanged", async (accountArr) => {
    if (Array.isArray(accountArr)) {
      if (accountArr.length < 1) {
        setStatus("Not Connected");
        setAddress("");
        setBalance(0);
      } else {
        setStatus("Connected");
        setAddress(accountArr[0]);
        const balance = await getBalance(accountArr[0]);
        if (balance && typeof balance === "string") {
          setBalance(balance);
        }
      }
    }
  });
};

export const removeAccountChangedEvents = async (
  setStatus: (value: TMetamaskStatusOption) => void,
  setAddress: (value: string) => void,
  setBalance: (value: number) => void
) => {
  const ethereum = window.ethereum;
  ethereum?.removeListener("accountsChanged", async (accountArr) => {
    if (Array.isArray(accountArr)) {
      if (accountArr.length < 1) {
        setStatus("Not Connected");
        setAddress("");
        setBalance(0);
      } else {
        setStatus("Connected");
        setAddress(accountArr[0]);
        const balance = await getBalance(accountArr[0]);
        if (balance && typeof balance === "string") {
          setBalance(balance);
        }
      }
    }
  });
};

export const checkIsMetamaskInstalled = (): boolean => {
  return typeof window.ethereum !== "undefined";
};

// 메타마스크 getting account -> string
export const getMetamaskAddress = async (): Promise<string | boolean> => {
  try {
    const ethereum = window.ethereum;
    const accountArr = await ethereum?.request({ method: "eth_accounts" });

    if (Array.isArray(accountArr) && accountArr.length > 0)
      return accountArr[0];
  } catch (e) {
    console.log(e);
  }

  return false;
};

export const getBalance = async (
  account: string
): Promise<number | boolean> => {
  try {
    const ethereum = window.ethereum;
    const result = await ethereum?.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });

    if (typeof result === "string") {
      const parsed = parseInt(result, 16);
      const eth = parsed / Math.pow(10, 18);
      return eth;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
};

export const requestConnect = async (): Promise<string | boolean> => {
  try {
    const ethereum = window.ethereum;
    const accountArr = await ethereum?.request({
      method: "eth_requestAccounts",
    });

    if (Array.isArray(accountArr) && accountArr.length > 0)
      return accountArr[0];
  } catch (e) {
    console.log(e);
  }

  return false;
};

export const connectMetamask = async (
  setStatus: (value: TMetamaskStatusOption) => void
) => {
  try {
    // 메타마스크 연결 요청
    const account = await requestConnect();

    // account가 비어있으면 연결 실패 status: Not Connected (유저가 매타마스크 연결 취소했을때 포함)
    if (!account) {
      setStatus("Not Connected");
      return;
    }
  } catch (e) {
    console.log("connect metamask error", e);
  }
};

export const sendToken = async (
  fromAccount: string,
  toAccount: string,
  value: string
) => {
  const hexValue = convertEthToWeihex(value);

  try {
    const ethereum = window.ethereum;
    const result = await ethereum?.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: fromAccount,
          to: toAccount,
          value: hexValue,
        },
      ],
    });
    console.log("send result ", result);

    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
