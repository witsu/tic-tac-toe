import { describe, expect, test } from 'vitest'
import {
    GAME_STATE_IN_PROGRESS,
    GAME_STATE_DRAW,
    GAME_STATE_WINNER_X,
    GAME_STATE_WINNER_O,
    getEmptyCells,
    getGameState
} from './Game.tsx'

describe('getGameState', () => {
    test('state should be in progress on init', () => {
        const cells = getEmptyCells()
        expect(getGameState(cells)).toBe(GAME_STATE_IN_PROGRESS)
    })
    test('state should be draw', () => {
        const cells = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
        expect(getGameState(cells)).toBe(GAME_STATE_DRAW)
    })
    test('state should be winner X', () => {
        const cells = ['X', 'O', 'X', 'X', 'O', 'O', 'X', 'X', 'X']
        expect(getGameState(cells)).toBe(GAME_STATE_WINNER_X)
    })
    test('state should be winner Y', () => {
        const cells = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'X']
        expect(getGameState(cells)).toBe(GAME_STATE_WINNER_O)
    })
})