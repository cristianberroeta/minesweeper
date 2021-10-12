export interface Cell {
    row: number;
    col: number;
    hasMine: boolean;
    isVisible: boolean;
    numberOfMinesAround: number;
    isFlagged: boolean;
}

export type Grid = Cell[][];