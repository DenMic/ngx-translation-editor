import { Component, computed, input, model } from '@angular/core';
import { tabItem } from './class/tabItem';

@Component({
  selector: 'edt-tap',
  standalone: true,
  imports: [],
  templateUrl: './edt-tap.component.html',
  styleUrl: './edt-tap.component.css',
})
export class EdtTapComponent {
  selectedValue = model<number>();
  dataSource = input.required<tabItem[]>();

  itemClick(id: number): void {
    this.selectedValue.set(id);
  }
}
