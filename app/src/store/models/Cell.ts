export interface Cell {
    row: number;
    col: number;
    hasMine: boolean;
    isVisible: boolean;
    numberOfMinesAround: number;
}

export type Grid = Cell[][];