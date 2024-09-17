import { Component, OnInit, inject, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, ActivatedRoute, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

import { SwatchService } from '../../services/swatch.service';
import { Swatch } from '../swatch/Swatch';
import { SwatchDetailComponent } from '../swatch-detail/swatch-detail.component';
import { MessageDialogComponent } from '../../dialogs/message-dialog.component';

@Component({
  selector: 'app-swatch',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, SwatchDetailComponent, MatDialogModule],
  templateUrl: './swatch.component.html',
  styleUrl: './swatch.component.css'
})

export class SwatchComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  @Input() swatchInfo!: Swatch // = new Swatch();
  @Output() swatchInfoChange = new EventEmitter<Swatch>();

  constructor(private swatchService: SwatchService, private route?: ActivatedRoute) {}

  ngOnInit() {
    /*
    if(this.swatchInfo)
    {
      console.log("SwatchComponent ngOnInit -- id = " + this.swatchInfo.app_id);
      console.log("SwatchComponent ngOnInit -- image = " + this.swatchInfo.imageUrl);
	  }
    */
    if(this.route)
	  {
	    const idFromRoute = this.route.snapshot.paramMap.get('id');
	    if(idFromRoute)
	    {
  	    this.swatchInfo = new Swatch(idFromRoute);
        console.log("ID from Route: " + this.swatchInfo.app_id);
  		  this.loadSwatch();
		
  	    const editableFromRoute = this.route.snapshot.paramMap.get('editable');
  	    if(editableFromRoute)
    		  this.swatchInfo.editable = JSON.parse(editableFromRoute);
		  
		    return;
  	  }
    }	

    console.log("Non-route Id: " + this.swatchInfo.app_id);
  }

  onSwatchUpdate(updatedDetails: any) {
    this.swatchService.updateSwatch(Swatch.getDaoFromSwatch(updatedDetails)).subscribe({
      next: (updatedSwatch) => {
        this.openDialog("Updated. Editable = " + updatedDetails.editable);
	    this.swatchInfo.editable = updatedDetails.editable;
      },
      error: (err) => {
        this.openDialog("Your changes were not saved.\n" + err);
       }
    });
  }
  
  loadSwatch() {
    this.swatchService.getSwatch(this.swatchInfo.app_id).subscribe({
      next: (updatedSwatch) => {
        this.swatchInfo.imageUrl = updatedSwatch[0].image;
        this.swatchInfo.description = updatedSwatch[0].description;
        this.swatchInfo.quantityType = updatedSwatch[0].quantityType;
        this.swatchInfo.quantity = updatedSwatch[0].quantityUnits;
	    //this.swatchInfo.editable = updatedSwatch[0].editable;
    },
      error: (err) => {
        console.error('Error loading swatch', err);
      }
    });  
  }
  
  openDialog(msg: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: msg },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  sendMessage() {
    // Logic to send a message to the swatch owner
    console.log('Message sent to owner');
  }
  
  makeEditable() {
    console.log('Editable');
	  this.swatchInfo.editable = true;
  }
}
