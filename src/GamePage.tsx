import { useEffect, useState } from 'react'
import { useParams } from "react-router";
import Tictactoe from './Tictactoe'
import pb from './pocketbaseClient';

function GamePage() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        if (!gameId) {
            return;
        }
        async function getGame() {
            const game = await pb.collection('games').getOne(gameId);
            setGame(game);
        }
        getGame();
    }, [gameId]);

    return (
        <>
            {game && <Tictactoe key={game.id} game={game} />}
        </>
    )
}

export default GamePage;
