import { observable, action, makeObservable } from "mobx";

export class ThemeStore {
  constructor() {
    makeObservable(this, {
      appTheme: observable,
      setAppTheme: action,
    });
  }

  // Metamask 초기 init 여부
  appTheme: TTheme = "light";

  // isMetamaskInfoInit 업데이트
  setAppTheme = (theme: TTheme) => {
    this.appTheme = theme;
  };
}
