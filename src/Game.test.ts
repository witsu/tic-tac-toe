import { describe, expect, test } from 'vitest'
import {
    GAME_STATE_IN_PROGRESS,
    GAME_STATE_DRAW,
    GAME_STATE_WINNER_AI,
    GAME_STATE_WINNER_USER,
    getEmptyCells,
    getGameState,
    findBestMove
} from './Game.tsx'

describe('getGameState', () => {
    test('state should be in progress on init', () => {
        const cells = getEmptyCells()
        const [state] = getGameState(cells)
        expect(state).toBe(GAME_STATE_IN_PROGRESS)
    })
    test('state should be draw', () => {
        const cells = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
        const [state] = getGameState(cells)
        expect(state).toBe(GAME_STATE_DRAW)
    })
    test('state should be winner X', () => {
        const cells = ['X', 'O', 'X', 'X', 'O', 'O', 'X', 'X', 'X']
        const [state] = getGameState(cells)
        expect(state).toBe(GAME_STATE_WINNER_AI)
    })
    test('state should be winner Y', () => {
        const cells = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'X']
        const [state] = getGameState(cells)
        expect(state).toBe(GAME_STATE_WINNER_USER)
    })
})

describe('findBestMove on difficulty 9', () => {
    test('should put X in the middle', () => {
        const cells = ['O', null, null, null, null, null, null, null, null]
        expect(findBestMove(cells, 9)).toEqual(4)
    })
    test('should put O to block 1st row', () => {
        const cells = ['X', 'X', null, null, 'O', null, null, null, null]
        expect(findBestMove(cells, 9)).toEqual(2)
    })
    test('should put X to block diagonal', () => {
        const cells = ['X', 'X', 'O', null, 'O', null, null, null, null]
        expect(findBestMove(cells, 9)).toEqual(6)
    })
    test('should put O to block 1st column', () => {
        const cells = ['X', 'X', 'O', null, 'O', null, 'X', null, null]
        expect(findBestMove(cells, 9)).toEqual(3)
    })
    test('should put X to block 2nd row', () => {
        const cells = ['X', 'X', 'O', 'O', 'O', null, 'X', null, null]
        expect(findBestMove(cells, 9)).toEqual(5)
    })
})
describe('findBestMove on easy difficulty', () => {
    test('should put O to first empty cell', () => {
        const cells = ['X', 'O', null, 'X', null, null, null, null]
        expect(findBestMove(cells, 0)).toEqual(2)
    })
})