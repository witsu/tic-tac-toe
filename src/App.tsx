import { useState } from 'react'
import Tictactoe from './Tictactoe'
import PocketBase from 'pocketbase';
import { getEmptyCells, GAME_STATE_IN_PROGRESS } from './Game';
import './App.css'

function App() {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const [game, setGame] = useState(null);
    const [difficulty, setDifficulty] = useState(0);

    // TODO: authenticate user
    const startGame = async () => {
        const game = await pb.collection('games').create({
          user: 'ec9x0hmo73khv87',
          difficulty: difficulty,
          state: GAME_STATE_IN_PROGRESS,
          cells: getEmptyCells()
        });
        setGame(game);
    }
    return (
        <>
            <h1>Tic tac toe</h1>
            <div className='difficulty'>
                Difficulty level:
                <select
                    value={difficulty}
                    onChange={e => setDifficulty(Number(e.target.value))}
                >
                    <option value="1">Novice</option>
                    <option value="3">Advanced</option>
                    <option value="5">Expert</option>
                    <option value="8">Legend</option>
                </select>
            </div>
            {game && <Tictactoe key={game.id} game={game} pb={pb} />}
            <button onClick={startGame}>Start</button>
        </>
    )
}

export default App
