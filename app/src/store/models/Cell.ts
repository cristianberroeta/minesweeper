export interface Cell {
    row: number;
    col: number;
    hasMine: boolean;
    isRevealed: boolean;
    numberOfMinesAround: number;
    isFlagged: boolean;
}

export type Grid = Cell[][];