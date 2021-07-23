export enum Player {
    RED,
    YELLOW,
    GREEN,
    BLUE,
    BLACK,
    WHITE
}

export const PlayerColor: Record<Player, string> = {
    [Player.RED]: '#ff0000',
    [Player.YELLOW]: '#e2e200',
    [Player.GREEN]: '#00c200',
    [Player.BLUE]: '#7070ff',
    [Player.BLACK]: '#666666',
    [Player.WHITE]: '#dddddd'
};
