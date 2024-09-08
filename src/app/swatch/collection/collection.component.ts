import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './collection.component.html',
})
export class CollectionComponent {
  swatches = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Red Cotton Fabric',
      quantityType: 'Fat Quarter',
      quantity: 2
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Blue Denim',
      quantityType: 'Bolt',
      quantity: 1
    }
  ];

  addSwatch() {
    // Logic for adding a new swatch
    console.log('Add Swatch clicked');
  }
}
