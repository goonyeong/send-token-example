// interface
interface IToInfo {
  id: string;
  toAddress: string;
  value: string;
}

type TMetamaskStatusOption = "Not Installed" | "Not Connected" | "Connected";

interface IMetamaskInfo {
  status: TMetamaskStatusOption;
  address: string;
  balance: number;
}

type TTheme = "light" | "dark";
