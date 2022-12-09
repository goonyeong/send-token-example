// React & Next
import { useEffect } from "react";
import type { AppProps } from "next/app";
// Style
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "styles/theme";
import GlobalStyle from "styles/globalStyles";
import GlobalFont from "styles/globalFonts";
// Mobx
import { observer } from "mobx-react-lite";
import {
  rootStore,
  StoreProvider,
  useStore,
  reHydrateLocalStorage,
  reHydrateSessionStorage,
} from "store";
// Components
import Layout from "components/layout";
import Seo from "components/seo";
import Header from "components/header";
// Utils
import {
  initMetamaskInfo,
  onAccountChangedEvents,
  removeAccountChangedEvents,
} from "utils/metamask";
import { convertWeihexToEth, convertEthToWeihex } from "utils/common";
import Web3 from "web3";

function MyApp({ Component, pageProps }: AppProps) {
  const {
    appStore: {
      setMetamaskStatus,
      setMetamaskAddress,
      setMetamaskBalance,
      setIsMetamaskInfoInit,
    },
    themeStore: { appTheme },
  } = useStore();

  useEffect(() => {
    // Mobx Store reHydrate
    reHydrateLocalStorage([rootStore.themeStore]);
    reHydrateSessionStorage([rootStore.appStore]);

    // // convert test
    // const eth = "4387579.3325697";
    // const convertedWei = convertEthToWeihex(eth);
    // console.log("original", eth);
    // console.log("wei", convertedWei);
    // console.log("eth", convertWeihexToEth(convertedWei));
    // console.log(
    //   "2nd wei",
    //   convertEthToWeihex(convertWeihexToEth(convertedWei))
    // );

    // 앱 실행 시, Metamask 상태 init & Metamask event 등록
    const initMetamaskInfoAsync = async () => {
      await initMetamaskInfo(
        (status) => {
          setMetamaskStatus(status);
        },
        (address) => {
          setMetamaskAddress(address);
        },
        (balance) => {
          setMetamaskBalance(balance);
        },
        (bool) => {
          setIsMetamaskInfoInit(bool);
        }
      );
    };
    initMetamaskInfoAsync();

    // 메타마스크 Account Change Event Listener 등록
    onAccountChangedEvents(
      (status) => {
        setMetamaskStatus(status);
      },
      (address) => {
        setMetamaskAddress(address);
      },
      (balance) => {
        setMetamaskBalance(balance);
      }
    );

    // 메타마스크 Account Change Event Listener 삭제
    return () => {
      removeAccountChangedEvents(
        (status) => {
          setMetamaskStatus(status);
        },
        (address) => {
          setMetamaskAddress(address);
        },
        (balance) => {
          setMetamaskBalance(balance);
        }
      );
    };
  }, []);

  return (
    <>
      <StoreProvider value={rootStore}>
        <ThemeProvider theme={appTheme === "light" ? lightTheme : darkTheme}>
          <GlobalFont />
          <GlobalStyle />
          <Layout>
            <Seo title="Blockchain wallet" />
            <Header />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}

export default observer(MyApp);
