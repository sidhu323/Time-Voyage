import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafePipe } from '../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-event-details',
  standalone: true,
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  imports: [SafePipe],
})
export class EventDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public event: any) {}
}
