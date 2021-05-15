import "./css/App.css";
import styled from "styled-components";
import { SudokuController } from "./components/SudokuController.js";
import { PaletteStrip } from "./components/PaletteStrip.js";
import { colors } from "./params.js";

function App() {
  return (
    <ColContainer>
      {/* <RowContainer style={{ backgroundColor: colors.neutral2 }}>
        <h1>patreon pls</h1>
      </RowContainer> */}
      <RowContainer>
        <PaletteStrip />
      </RowContainer>

      <RowContainer style={{ flexGrow: 1, margin: "auto" }}>
        <SudokuController />
      </RowContainer>
    </ColContainer>
  );
}

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;

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
