import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import { connectMetamask } from "utils/metamask";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MetaMask = () => {
  const {
    appStore: { metamaskInfo, isMetamaskInfoInit, setMetamaskStatus },
  } = useStore();

  // Connect Btn 클릭 시, metamask 연결 및 상태 update
  const handleConnectBtnClick = async () => {
    if (metamaskInfo.status !== "Not Connected") return;
    await connectMetamask((status) => {
      setMetamaskStatus(status);
    });
  };

  return (
    <Wrapper>
      {isMetamaskInfoInit ? (
        <>
          <ConnectBtn
            isDisable={metamaskInfo.status === "Not Installed"}
            isActive={metamaskInfo.status === "Not Connected"}
            isConnected={metamaskInfo.status === "Connected"}
            onClick={handleConnectBtnClick}
          >
            {metamaskInfo.status === "Connected"
              ? "Connected!"
              : metamaskInfo.status === "Not Connected"
              ? "Click to Connect Metamask"
              : metamaskInfo.status === "Not Installed"
              ? "Metamask not Installed"
              : ""}
          </ConnectBtn>
          {metamaskInfo.status === "Connected" && (
            <MetamaskInfoBox>
              <dl>
                <dt>Address</dt>
                <dd>{metamaskInfo.address}</dd>
                <dt>Balance</dt>
                <dd>{metamaskInfo.balance}</dd>
              </dl>
            </MetamaskInfoBox>
          )}
        </>
      ) : (
        <SkeletonTheme baseColor="#f2f2f2" highlightColor="#dddddd">
          <Skeleton height={"100%"} />
          <MetamaskInfoBox>
            <dl>
              <Skeleton height={"100%"} />
              <Skeleton height={"100%"} />
              <Skeleton height={"100%"} />
              <Skeleton height={"100%"} />
            </dl>
          </MetamaskInfoBox>
        </SkeletonTheme>
      )}
    </Wrapper>
  );
};

export default observer(MetaMask);

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 10%;
  display: grid;
  grid-template-rows: 3fr 7fr;
  grid-gap: 20px;
`;

const ConnectBtn = styled.button<{
  isDisable: boolean;
  isActive: boolean;
  isConnected: boolean;
}>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_color};
  cursor: ${(props) => (props.isActive ? "pointer" : "auto")};
  background-color: ${(props) =>
    props.isConnected
      ? ({ theme }) => theme.colors.primary_color
      : ({ theme }) => theme.colors.secondary_color};
  color: ${(props) =>
    props.isConnected
      ? ({ theme }) => theme.colors.background_color
      : ({ theme }) => theme.colors.main_text_color};
  &:hover {
    background-color: ${(props) =>
      props.isDisable
        ? ({ theme }) => theme.colors.secondary_color
        : ({ theme }) => theme.colors.primary_color};
    color: ${(props) =>
      props.isDisable
        ? ({ theme }) => theme.colors.main_text_color
        : ({ theme }) => theme.colors.background_color};
  }
`;

const MetamaskInfoBox = styled.div`
  width: 100%;
  dt {
    font-weight: bold;
  }
  dd {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.sub_text_color};
  }
`;
