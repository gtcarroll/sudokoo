import "./css/App.css";
import styled from "styled-components";
import { SudokuController } from "./components/SudokuController.js";
import { Credits } from "./components/Credits.js";
import { colors } from "./params.js";

var dropDownToggle = false;

function App() {
  return (
    <ColContainer>
      <RowContainer className="main-content" style={{ flexGrow: 1 }}>
        <SudokuController />
      </RowContainer>
      <RowContainer></RowContainer>
      <RowContainer style={{ backgroundColor: colors.neutral2 }}>
        <Credits dropToggle={dropDownToggle} />
      </RowContainer>
    </ColContainer>
  );
}

const ColContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  background-color: ${colors.neutral0};
  color: ${colors.neutral4};

  font-size: calc(10px + 2vmin);
  overflow: hidden;

  height: 100vh;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default App;
