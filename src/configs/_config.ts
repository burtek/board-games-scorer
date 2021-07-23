import { Player } from '../logic/players';
import { TrainButton } from '../logic/trains';

export interface Config {
    players: Player[];
    trainPoints: TrainButton[];
}
