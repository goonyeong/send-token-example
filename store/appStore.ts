import { observable, action, makeObservable } from "mobx";

export class AppStore {
  constructor() {
    makeObservable(this, {
      isMetamaskInfoInit: observable,
      setIsMetamaskInfoInit: action,
      metamaskInfo: observable,
      setMetamaskStatus: action,
      setMetamaskAddress: action,
      toList: observable,
      addToList: action,
      deleteToList: action,
      clearToList: action,
      isConfirmed: observable,
      toggleIsConfirmed: action,
    });
  }

  // Metamask 초기 init 여부
  isMetamaskInfoInit = false;

  // isMetamaskInfoInit 업데이트
  setIsMetamaskInfoInit = (bool: boolean) => {
    this.isMetamaskInfoInit = bool;
  };

  // 연결된 메타마스크 정보 및 상태
  metamaskInfo: IMetamaskInfo = {
    status: "Not Installed",
    address: "",
    balance: 0,
  };

  // 메타마스크 status 업데이트
  setMetamaskStatus = (status: TMetamaskStatusOption) => {
    this.metamaskInfo = {
      ...this.metamaskInfo,
      status: status,
    };
  };

  // 메타마스크 Address 업데이트
  setMetamaskAddress = (address: string) => {
    this.metamaskInfo = {
      ...this.metamaskInfo,
      address: address,
    };
  };

  // 메타마스크 Balance 업데이트
  setMetamaskBalance = (num: number) => {
    this.metamaskInfo = {
      ...this.metamaskInfo,
      balance: num,
    };
  };

  // 입력한 To address 정보들을 담은 리스트
  toList: IToInfo[] = [];

  // ToList에 추가
  addToList = (newValue: IToInfo) => {
    this.toList.push(newValue);
  };

  // ToList에서 선택된 열 삭제
  deleteToList = (id: string) => {
    this.toList = this.toList.filter((cont) => cont.id !== id);
  };

  // ToList 모두 지우기 (초기화)
  clearToList = () => {
    this.toList = [];
  };

  // Confirm 상태 여부
  isConfirmed = false;

  // Confirm 여부 업데이트
  toggleIsConfirmed = () => {
    this.isConfirmed = !this.isConfirmed;
  };
}
