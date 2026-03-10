import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from "./game/components/grid/grid";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GridComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('snake-game');
}
