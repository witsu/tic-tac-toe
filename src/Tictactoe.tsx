import { useState } from 'react';
import './Tictactoe.css';

const PLAYER_X = 'X';
const PLAYER_O = 'O';

function Tictactoe() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');

    const onCellClick = (index) => {
        if (cells[index] !== null) {
            return
        }
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
            {cells.map((value, index) => {
                const nextPlayerClass = value === null ? `next-${player}` : '';
                return <div key={index} className={`cell ${nextPlayerClass}`} onClick={() => onCellClick(index)}>
                    {value}
                </div>
            })}
        </div>
    )
}
export default Tictactoe;