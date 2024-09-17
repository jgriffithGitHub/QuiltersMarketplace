import { Component, Input, Output, EventEmitter,  SimpleChanges  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-swatch-detail',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './swatch-detail.component.html',
  styleUrl: './swatch-detail.component.css'
})

export class SwatchDetailComponent{
  @Input() app_id: string;
  @Input() imageUrl: string;
  @Input() description: string;
  @Input() quantityType: string;
  @Input() quantity: number;
  @Input() editable: boolean;
  @Output() swatchUpdate = new EventEmitter<any>(); 
  
  constructor() {
    console.log("SwatchDetail constructor called" );
    this.app_id = '';
    this.imageUrl = '';
    this.description = '';
    this.quantityType = 'odd size';
    this.quantity = 0;
    this.editable = false;
 }

  updateDetails()
  {
	console.log("Emitting update for id: " + this.app_id);
    this.swatchUpdate.emit(this); 
  }

  doneEditing() {
    console.log('Done Editing');
	this.editable = false;
    this.swatchUpdate.emit(this); 
  }

  ngOnInit() {
    console.log("ngOnInit called -- id: " + (this.app_id || ''));
    console.log("ngOnInit called -- imageUrl: " + (this.imageUrl || ''));
    //const swatchId = this.route.snapshot.paramMap.get('id');
    // Fetch swatch details by ID (here mocked)
    //this.id = swatchId;
    //this.imageUrl = 'https://via.placeholder.com/150';
    //this.description = 'Sample Fabric';
    //this.quantityType = 'Yard';
    //this.quantity = 3;
  }
 
/* 
  ngOnChanges(changes: SimpleChanges) {
    for (const inputName in changes) {
      const inputValues = changes[inputName];
      console.log(`Previous ${inputName} == ${inputValues.previousValue}`);
      console.log(`Current ${inputName} == ${inputValues.currentValue}`);
      console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);
    }
  }
*/  
/*
  sendMessage() {
    // Logic to send a message to the swatch owner
    console.log('Message sent to owner');
  }
  */
}
