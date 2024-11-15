import { useState } from 'react';
import './Tictactoe.css';

const PLAYER_X = 'X';
const PLAYER_O = 'O';

function Tictactoe() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');

    const onCellClick = (index) => {
        const newCells = cells.slice();
        newCells[index] = player;
        setCells(newCells);
        changePlayer();
    }
    const changePlayer = () => {
        setPlayer(player === PLAYER_X ? PLAYER_O : PLAYER_X);
    }

    return (
        <div class="cells">
            {cells.map((cell, index) => (
                <div key={index} class="cell" onClick={() => onCellClick(index)}>
                    {cell}
                </div>
            ))}
        </div>
    )
}
export default Tictactoe;