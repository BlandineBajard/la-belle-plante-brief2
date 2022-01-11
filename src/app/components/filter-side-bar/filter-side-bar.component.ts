import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent implements OnInit {
  @Input() listCategories: string[];
  @Output() clickRateAvis = new EventEmitter();
  @Output() rangePrice = new EventEmitter();

  selectedRateAvis : any;

  constructor() { 
    this.listCategories = [];
    this.selectedRateAvis = 0;
  }

  ngOnInit(): void {
  }

  filterAvis(rateAvis:any){
    //console.log('from side: '+rateAvis);
    this.selectedRateAvis = rateAvis
    //this.clickRateAvis.emit(rateAvis);
  }

  OnClickValider(){
    //console.log('from valider : '+this.selectedRateAvis);
    this.clickRateAvis.emit(this.selectedRateAvis);
  }

  // methode pour valider la rection des input prix min et prix max
  OnClickValiderPrix(prixMin:any, prixMax:any){
  //console.log(prixMin+prixMax);
  // event emiter vers parent 
  this.rangePrice.emit([prixMin,prixMax]);
  }
}
