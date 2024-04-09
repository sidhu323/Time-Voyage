import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() event: any;

  constructor(private dialog: MatDialog) {}

  openEventDetails() {
    this.dialog.open(EventDetailsComponent, {
      data: this.event,
    });
  }
}
