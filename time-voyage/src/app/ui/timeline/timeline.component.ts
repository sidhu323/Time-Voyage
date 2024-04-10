import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../shared/material/material.component';
import { SearchComponent } from '../../shared/search/search/search.component';
import { EventService } from '../../shared/services/event.service';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, EventCardComponent, SearchComponent, MaterialModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  // animations: [
  //   trigger('cardAnimation', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateY(100px) rotateY(-60deg)' }),
  //       animate(
  //         '500ms ease',
  //         style({ opacity: 1, transform: 'translateY(0) rotateY(0)' })
  //       ),
  //     ]),
  //   ]),
  //   trigger('pointAnimation', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'scale(0) translateX(-50%)' }),
  //       animate(
  //         '500ms ease',
  //         style({ opacity: 1, transform: 'scale(1) translateX(-50%)' })
  //       ),
  //     ]),
  //   ]),
  // ],
})
export default class TimelineComponent implements OnInit {
  events!: any[];
  filteredEvents!: any[];
  currentIndex = 0;
  visibleEventsCount = 4;
  visibleEvents!: any[];
  activeIndex = 0;

  @ViewChild('timeline', { static: true }) timelineRef!: ElementRef;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.filteredEvents = events;
      this.updateVisibleEvents();
    });
  }

  filterEvents(query: string) {
    this.filteredEvents = this.events.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.date.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())
    );
    this.currentIndex = 0;
    this.updateVisibleEvents();
  }
  scrollLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleEvents();
    }
  }

  scrollRight() {
    if (
      this.currentIndex + this.visibleEventsCount <
      this.filteredEvents.length
    ) {
      this.currentIndex++;
      this.updateVisibleEvents();
    }
  }

  updateVisibleEvents() {
    this.visibleEvents = this.filteredEvents.slice(
      this.currentIndex,
      this.currentIndex + this.visibleEventsCount
    );
    this.activeIndex = this.currentIndex;
  }
}
