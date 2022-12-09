import styled from "styled-components";
import { useStore } from "store";
import { observer } from "mobx-react-lite";

const Header = () => {
  const {
    themeStore: { appTheme, setAppTheme },
  } = useStore();

  const handleChangeThemeClick = () => {
    if (appTheme === "dark") {
      setAppTheme("light");
    } else {
      setAppTheme("dark");
    }
  };

  return (
    <Wrapper>
      <ChangeThemeBtn onClick={handleChangeThemeClick}>
        Change to {appTheme === "dark" ? "Light Theme" : "Dark Theme"}
      </ChangeThemeBtn>
    </Wrapper>
  );
};

export default observer(Header);

const Wrapper = styled.header`
  width: 100%;
  height: 40px;
  padding: 0 50px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const ChangeThemeBtn = styled.button`
  width: 200px;
  height: 30px;
  border: none;
  text-align: end;
`;
