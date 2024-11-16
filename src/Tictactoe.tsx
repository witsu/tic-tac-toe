import { useState } from 'react';
import './Tictactoe.css';

const PLAYER_X = 'X';
const PLAYER_O = 'O';
const PLAYER_EMPTY = null;

type Cell = PLAYER_X | PLAYER_O | PLAYER_EMPTY;
type Cells = Array<Cell>;

const RESULT_IN_PROGRESS = 'in progress';
const RESULT_WINNER_X = 'winner X';
const RESULT_WINNER_O = 'winner O';
const RESULT_DRAW = 'draw';

function Tictactoe() {
    const getEmptyCells = (): Cells => {
        return Array(9).fill(PLAYER_EMPTY);
    }
    const [cells, setCells] = useState(getEmptyCells());
    const [player, setPlayer] = useState(PLAYER_X);
    const [result, setResult] = useState(RESULT_IN_PROGRESS);

    
    const onCellClick = (index: number) => {
        if (!canClick(index)) {
            return;
        }
        const newCells = cells.slice();
        newCells[index] = player;
        setCells(newCells);
        checkResult(newCells);
        changePlayer();
    }
    const canClick = (index: number): boolean => {
        return cells[index] === PLAYER_EMPTY && result === RESULT_IN_PROGRESS;
    }
    const checkResult = (cells: Cells) => {
        // Check for winner
        const lines = [
            [0, 1, 2], // horizontal
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // vertical
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // diagonal
            [2, 4, 6],
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                if (cells[a] === PLAYER_X) {
                    setResult(RESULT_WINNER_X);
                } else {
                    setResult(RESULT_WINNER_O);
                }
                return;
            }
        }
        // Check for draw
        if (!cells.includes(PLAYER_EMPTY)) {
            setResult(RESULT_DRAW);
        }
    }
    const changePlayer = () => {
        setPlayer(player === PLAYER_X ? PLAYER_O : PLAYER_X);
    }
    const restart = () => {
        setPlayer(PLAYER_X);
        setCells(getEmptyCells());
        setResult(RESULT_IN_PROGRESS);
    }

    return (
        <>
            <div class="cells">
                {cells.map((value: Cell, index) => {
                    const nextPlayerClass = canClick(index) ? `next-${player}` : '';
                    return <div key={index} className={`cell ${nextPlayerClass}`} onClick={() => onCellClick(index)}>
                        {value}
                    </div>
                })}
            </div>
            {result !== RESULT_IN_PROGRESS && (
                <div>
                    <div class="result">{result}</div>
                    <button onClick={restart}>Reset</button>
                </div>
            )}
        </>
    )
}
export default Tictactoe;