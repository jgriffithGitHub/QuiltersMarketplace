import { Component, OnInit, Inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { SwatchService } from '../../services/swatch.service';
import { SwatchComponent } from '../swatch/swatch.component';
import { Swatch } from '../swatch/Swatch';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [FormsModule, RouterModule, SwatchComponent],
  templateUrl: './collection.component.html',
})

export class CollectionComponent implements OnInit {
  swatches: Swatch[] = [];
  
  constructor(private swatchService: SwatchService, private router: Router) {}

  ngOnInit(): void {
    this.getSwatches();
  }

  addSwatch(): void {
   const newSwatch = new Swatch();
   this.swatches.push(newSwatch);
   this.router.navigate(['/swatch', newSwatch.app_id]);
 }
  
  // Get all swatches for the logged-in user
  getSwatches(): void {
    console.log("Getting swatches");
    this.swatchService.getSwatches().subscribe({
      next: (swatchList) => {
	    for(const swatch of swatchList)
		{
		  console.log("Found swatch: " + swatch.app_id);
		  let newSwatch = Swatch.getSwatchFromDao(swatch);
		  console.log("Pushing swatch: " + newSwatch.app_id);
		  this.swatches.push(newSwatch);
		}
      },
      error: (err) => {
        console.error('Error fetching swatches', err);
      }
    });
    console.log("Done getting swatches");
  }

  // Create a new swatch
  createSwatch(): void {
    console.log("construct tempSwatch");
    let tempSwatch = new Swatch()
    //console.log("get Dao");
	  let dao = Swatch.getDaoFromSwatch(tempSwatch);
	
	  console.log("Creating new swatch from dao: " + JSON.stringify(dao));
    this.swatchService.createSwatch(dao).subscribe({
        next: (newDao) => {
	      //dao = newDao;
	      tempSwatch = Swatch.getSwatchFromDao(newDao);
        this.swatches.push(tempSwatch);
      },
      error: (err) => {
        console.error('Error creating swatch', err);
      }
    });
    this.router.navigate(['/swatch', tempSwatch.app_id, true]);
 }

  // Update a swatch
  // Not sure how to use two-binding since HTML wants to bind on an array element
  updateSwatch(swatch: any): void {
    //this.swatchService.updateSwatch(swatch._id, swatch).subscribe({
    this.swatchService.updateSwatch(swatch).subscribe({
      next: (updatedSwatch) => {
        const index = this.swatches.findIndex(s => s.app_id === swatch.app_id);
        this.swatches[index] = updatedSwatch;
      },
      error: (err) => {
        console.error('Error updating swatch', err);
      }
    });
  }

  // Delete a swatch
  deleteSwatch(id: string): void {
    this.swatchService.deleteSwatch(id).subscribe({
      next: () => {
        this.swatches = this.swatches.filter(s => s.app_id !== id);
      },
      error: (err) => {
        console.error('Error deleting swatch', err);
      }
    });
  }
}
