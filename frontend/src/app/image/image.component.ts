import {
  Component,
  OnInit,
  ElementRef,
  ViewChildren,
  QueryList,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import * as Packery from 'packery';
import * as imagesLoaded from 'imagesloaded';

import { Image } from './../shared/models/image';

@Component({
  selector: 'imageus-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, AfterViewInit {
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @ViewChildren('ele') ele: QueryList<ElementRef>;

  @Input() images: Image[] = [];
  @Output() likedImage = new EventEmitter();

  mas;
  imLoad;
  prevLoadedItems = [];
  liked = false;

  masOpt =  {
    itemSelector: '.box',
    columnWidth: '.box',
    percentPosition: true,
    gutter: '.box-gutter',
    initLayout: true,
    horizontalOrder: false,
    originTop: true,
    originLeft: true
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.ele.changes.subscribe(res => {
      const pckry = new Packery(this.imageContainer.nativeElement, this.masOpt);
      this.ele.toArray().forEach(el => {
        imagesLoaded(el.nativeElement).on('progress', () => {
          pckry.layout();
          el.nativeElement.style.opacity = 1;
        });
      });
    });
  }

  showImage($e) {}

  onLike(index) {
    this.images[index].liked = !this.images[index].liked;
    console.log(this.images[index].photo_id);
    const imageDetails = this.images[index];

    this.likedImage.emit(imageDetails);
  }
}
