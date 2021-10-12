import {Grid} from "./Grid";

export interface Game {
    id: string;
    grid: Grid;
    createdAt: Date;
    uid: string;
    timeInSeconds: number;
}