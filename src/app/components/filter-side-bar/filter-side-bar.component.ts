import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent implements OnInit {
  @Input() listCategories: string[];
  @Output() clickRateAvis = new EventEmitter();

    this.listCategories = [];
    this.selectedRateAvis = 0;
    this.tabSelected=[];
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

  catFilter(value: any){ //on récupère l'event

  if (value.target.checked == true){ //on vérifie si l'event est coché
  this.tabSelected.push(value.target.value);//si oui, on pousse sa valeur dans un tableau
  }
  else {        // si decoché, on supprime la valeur du tableau en ayant d'abord trouvé son index
    this.tabSelected.splice(this.tabSelected.indexOf(value.target.value),1);
  }

  this.onSelectedCategory.emit(this.tabSelected); //on envoie le tableau vers la page d'accueil
  }
}
