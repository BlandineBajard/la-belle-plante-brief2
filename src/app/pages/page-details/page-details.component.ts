import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantouneService } from 'src/app/services/plantoune.service';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {
plantData:any;

  constructor(private plantouneService: PlantouneService, private route:ActivatedRoute) {
  }

  ngOnInit(): void {

    const product_id = this.route.snapshot.paramMap.get('id');
    console.log(product_id);

    this.plantouneService.getDataId(product_id).subscribe(
      (OnePlant: any[]) => {
        console.log(OnePlant);
        this.plantData=OnePlant[0];
      }
      )

  }

  }

