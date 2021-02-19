import "./css/App.css";
import styled from "styled-components";
import { SudokuController } from "./components/SudokuController.js";
import { PaletteStrip } from "./components/PaletteStrip.js";
import { colors } from "./params.js";

function App() {
  return (
    <StyledDiv>
      <PaletteStrip></PaletteStrip>
      <div className="App-header">
        <SudokuController></SudokuController>
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  text-align: center;

  background-color: ${colors.neutralLowest};

  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .App-header {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default App;
