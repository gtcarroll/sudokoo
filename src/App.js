import "./css/App.css";
import styled from "styled-components";
import { SudokuController } from "./components/SudokuController.js";
import { PaletteStrip } from "./components/PaletteStrip.js";
import { colors } from "./params.js";

function App() {
  return (
    <ColContainer>
      <RowContainer>
        <PaletteStrip />
      </RowContainer>

      <RowContainer style={{ flexGrow: 1, margin: "auto" }}>
        <SudokuController />
      </RowContainer>

      <RowContainer>
        <PaletteStrip />
      </RowContainer>
    </ColContainer>
  );
}

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${colors.neutralLowest};
  color: ${colors.neutralHighest};

  font-size: calc(10px + 2vmin);
  overflow: scroll;

  min-height: 100vh;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default App;
