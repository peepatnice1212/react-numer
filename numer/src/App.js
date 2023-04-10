import React from "react";
import NavBar from "./page/NavBar";
import styled from "styled-components";
import Anotherpage from "./page/Anotherpage";

const App = () => {
  return (
    <div>
      <Head>React Numer</Head>
      <NavBar />
      <Anotherpage />
    </div>
  );
};

export default App;

const Head = styled.div`
  font-size: xx-large;
  text-align: center;
  width: 100vw;
  height: 50px;
  background-color: black;
  color: whitesmoke;
  font-weight: bolder;
`;
