import { Component, signal } from '@angular/core';
import { GridComponent } from "./game/components/grid/grid";

@Component({
  selector: 'app-root',
  imports: [GridComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('snake-game');
}
