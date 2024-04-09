import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();

  search(queryEvent: any) {
    let query = queryEvent.target.value;
    this.searchEvent.emit(query);
  }
}
