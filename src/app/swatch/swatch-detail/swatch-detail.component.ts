import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-swatch-detail',
  templateUrl: './swatch-detail.component.html',
})
export class SwatchDetailComponent implements OnInit {
  swatch: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const swatchId = this.route.snapshot.paramMap.get('id');
    // Fetch swatch details by ID (here mocked)
    this.swatch = {
      id: swatchId,
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Sample Fabric',
      quantityType: 'Yard',
      quantity: 3
    };
  }

  sendMessage() {
    // Logic to send a message to the swatch owner
    console.log('Message sent to owner');
  }
}
