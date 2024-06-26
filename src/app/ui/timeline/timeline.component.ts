import {
  animate,
  query,
  stagger,
  state,
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
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MaterialModule } from '../../shared/material/material.component';
import { SearchComponent } from '../../shared/search/search/search.component';
import { EventService } from '../../shared/services/event.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { title } from '../../constants/sample-data';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [EventCardComponent, SearchComponent, MaterialModule, CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '0.3s ease-out',
          style({ opacity: 0.8, transform: 'scale(0.9)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s ease-out',
          style({ opacity: 0, transform: 'scale(0.8)' })
        ),
      ]),
      transition('* => active', [
        animate(
          '0.3s ease-out',
          style({
            transform: 'scale(1.1)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          })
        ),
      ]),
      transition('active => *', [
        animate(
          '0.3s ease-out',
          style({ transform: 'scale(0.9)', boxShadow: 'none' })
        ),
      ]),
    ]),
  ],
})
export default class TimelineComponent implements OnInit {
  events!: any[];
  filteredEvents!: any[];
  activeIndex = 0;
  isGreen: string = 'true';
  title: string = title;
  searchSubject = new Subject<string>();
  searchQuery = '';

  @ViewChild('timelineWrapper', { static: true }) timelineWrapper!: ElementRef;
  @ViewChildren(EventCardComponent, { read: ElementRef })
  eventCards!: QueryList<ElementRef>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      this.filteredEvents = events;
    });
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.searchQuery = query;
        this.filterEvents();
      });
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filterEvents();
  }

  filterEvents() {
    if (this.searchQuery.trim() === '') {
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events.filter(
        (event) =>
          event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.date.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    }
    this.activeIndex = 0;
  }

  scrollToEvent(index: number) {
    this.activeIndex = index;
    const eventCard = this.timelineWrapper.nativeElement.querySelector(
      `app-event-card:nth-child(${index + 1})`
    );
    if (eventCard) {
      eventCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onEventCardClick(index: number) {
    this.scrollToEvent(index);
  }

  scrollToPrevious() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  scrollToNext() {
    if (this.activeIndex < this.filteredEvents.length - 1) {
      this.activeIndex++;
    }
  }

  toggleIsCorrect() {
    this.isGreen = this.isGreen === 'true' ? 'false' : 'true';
  }
}

bootstrapApplication(TimelineComponent, {
  providers: [provideAnimations()],
});
