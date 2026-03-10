import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Direction, Position } from '../../../models/game.models';
import { getNextHead } from '../../../utils/game-helpers';

interface Cell {
  x: number;
  y: number;
}

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
  host: {
    '(window:keydown)': 'handleKeyDown($event)',
  }
})
export class GridComponent implements OnInit, OnDestroy {
  readonly rows = 20;
  readonly cols = 20;
  readonly initialSnakePosition: Position = {
    x: 0,
    y: 0,
  }
  private intervalId?: ReturnType<typeof setInterval>;
  snake = signal<Position[]>([this.initialSnakePosition]);
  direction = signal<Direction>('RIGHT');
  cells: Cell[] = this.createGrid();

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.moveSnake();
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private createGrid(): Cell[] {
    const cells: Cell[] = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        cells.push({ x, y });
      }
    }

    return cells;
  }

  isSnakeCell(cell: Cell): boolean {
    return this.snake().some(
      snakeCell => snakeCell.x === cell.x && snakeCell.y === cell.y
    );
  }

  moveSnake(): void {
    const head = this.snake()[0];
    const direction = this.direction();

    let newHead: Position = getNextHead(head, direction, this.cols, this.rows);

    const newSnake = [newHead, ...this.snake()];
    newSnake.pop();

    this.snake.set(newSnake);
  }

  private getDirectionFromKey(key: string): Direction | null {
    switch (key) {
      case 'ArrowUp':
        return 'UP';
      case 'ArrowDown':
        return 'DOWN';
      case 'ArrowLeft':
        return 'LEFT';
      case 'ArrowRight':
        return 'RIGHT';
      default:
        return null;
    }
  }
  private isOppositeDirection(
    current: Direction,
    next: Direction
  ): boolean {
    return (
      (current === 'UP' && next === 'DOWN') ||
      (current === 'DOWN' && next === 'UP') ||
      (current === 'LEFT' && next === 'RIGHT') ||
      (current === 'RIGHT' && next === 'LEFT')
    );
  }
  handleKeyDown(event: KeyboardEvent): void {
    const nextDirection = this.getDirectionFromKey(event.key);

    if (!nextDirection) {
      return;
    }

    const currentDirection = this.direction();

    if (this.isOppositeDirection(currentDirection, nextDirection)) {
      return;
    }

    this.direction.set(nextDirection);
  }
}
