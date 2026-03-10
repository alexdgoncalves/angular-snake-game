import { Direction, Position } from '../models/game.models';

export function getNextHead(head: Position, direction: Direction, cols: number, rows: number): Position {
  switch (direction) {
    case 'UP':
      return { x: head.x, y: (head.y - 1 + rows) % rows };
    case 'DOWN':
      return { x: head.x, y: (head.y + 1) % rows };
    case 'LEFT':
      return { x: (head.x - 1 + cols) % cols, y: head.y };
    case 'RIGHT':
      return { x: (head.x + 1) % cols, y: head.y };
  }
}
