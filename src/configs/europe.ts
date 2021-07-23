import { Player } from '../logic/players';
import { Config } from './_config';

export const europeConfig: Config = {
    players: [Player.RED, Player.YELLOW, Player.GREEN, Player.BLUE, Player.BLACK],
    trainPoints: [
        { trains: 1, points: 1 },
        { trains: 2, points: 2 },
        { trains: 3, points: 4 },
        { trains: 4, points: 7 },
        { trains: 5, points: 10 },
        { trains: 6, points: 15 },
        { trains: 8, points: 21 }
    ]
};
