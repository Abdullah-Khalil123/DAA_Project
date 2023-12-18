import { useEffect, useState } from "react";
import "../Styles/Cell.css";

const Grid = (props: { column: number; rowcount: number }) => {
  const initialRowCount = props.rowcount / 14;
  const [gridarr, setGridarr] = useState(() => {
    const initialGrid: number[][] = [];
    for (let i = 0; i < initialRowCount; i++) {
      initialGrid[i] = new Array(props.column).fill(0);
    }
    initializeGrid(initialGrid, initialRowCount, props.column);
    return initialGrid;
  });

  const [autoUpdateActive, setAutoUpdateActive] = useState(false);

  function handleClick() {
    updateGrid(gridarr, gridarr.length, props.column);
    setGridarr((grid) => [...grid]);

    setAutoUpdateActive(true);
  }

  const autoClickButton = () => {
    handleClick();
  };

  useEffect(() => {
    let intervalId: any;

    intervalId = setInterval(autoClickButton, 150);
    return () => clearInterval(intervalId);
  }, [autoUpdateActive]);

  return (
    <>
      <table>
        {gridarr.map((item, rowIndex) => (
          <tr key={item[0]}>
            <Row cols={props.column} row={rowIndex} gridarr={gridarr} />
          </tr>
        ))}
      </table>
      <div className="center">
        <button onClick={handleClick}>Update Grid</button>
      </div>
    </>
  );
};

const Row = (props: { cols: number; row: number; gridarr: number[][] }) => {
  let col: number[] = [];

  for (let i = 0; i < props.cols / 13; i++) {
    col[i] = i;
  }
  return (
    <div>
      {col.map((e) => {
        var classname = "cell";
        if (props.gridarr[props.row][e]) {
          classname = "aliveCell";
        }

        let variable = props.row.toString() + e.toString();
        return (
          <td key={variable} id={"cell" + variable} className={classname}></td>
        );
      })}
    </div>
  );
};

function updateGrid(grid: number[][], rows: number, cols: number) {
  const newGrid: number[][] = [];

  for (let i = 0; i < rows; ++i) {
    newGrid[i] = [];
    for (let j = 0; j < cols; ++j) {
      let neighbors = 0;

      for (let x = -1; x <= 1; ++x) {
        for (let y = -1; y <= 1; ++y) {
          if (x === 0 && y === 0) continue;

          const ni = (i + x + rows) % rows;
          const nj = (j + y + cols) % cols;

          if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
            neighbors += grid[ni][nj];
          }
        }
      }

      if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
        newGrid[i][j] = 0;
      } else if (grid[i][j] === 0 && neighbors === 3) {
        newGrid[i][j] = 1;
      } else {
        newGrid[i][j] = grid[i][j];
      }
    }
  }

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      grid[i][j] = newGrid[i][j];
    }
  }
}

function initializeGrid(grid: number[][], rows: number, cols: number) {
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
}

export default Grid;
