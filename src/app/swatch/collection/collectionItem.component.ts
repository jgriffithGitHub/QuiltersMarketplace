import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import { Swatch } from '../swatch/Swatch';

@Component({
  selector: 'app-component-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './collectionItem.component.html',
  styleUrl: './collectionItem.component.css'
})

export class CollectionItemComponent implements OnInit {
  @Input() app_id: String;
  @Input() imageUrl: String;
  @Input() description: String;
  @Input() quantityType: String;
  @Input() quantity:number;

  constructor() {
    console.log("CollectionItem constructor");
    this.app_id = '';
    this.imageUrl = '';
    this.description = '';
    this.quantityType  = '';
    this.quantity = 0;
  }

  ngOnInit(): void {
    console.log("Collection Item ngOnInit called");
  }
}
