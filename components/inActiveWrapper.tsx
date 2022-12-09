import styled from "styled-components";

export const InActiveWrapper = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(158, 158, 158, 0.737);
`;
