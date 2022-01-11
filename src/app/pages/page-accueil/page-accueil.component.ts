import { Component, EventEmitter, OnInit } from '@angular/core';
import { PlantouneService } from 'src/app/services/plantoune.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  public listData: any[];
  public listFull: any[];
  public listCategoriesFilter: string[];
  public category: any[];




  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listFull = [];
    this.listCategoriesFilter = [];
    this.category=[];



  }

   /**
    * equivalent de la ligne du dessus
    *
    * plantouneService;
    *
    * constructor(plantouneService: PlantouneService) {
    *   this.plantouneService = plantouneService;
    * }
    */



  ngOnInit(): void {

    this.plantouneService.getData().subscribe(
      (listPlant: any[]) => {
        console.log(listPlant);

        /**
         * Technique avec Underscore JS pour recupérer les catégories uniques de nos plantes
         */
        const listAllCategories = listPlant.map(product => product.product_breadcrumb_label);
        console.log(listAllCategories);

        const listUniqCategories = _.uniq(listAllCategories)
        console.log(listUniqCategories);


        /**
         * Technique native JS pour recupérer les catégories uniques de nos plantes
         */

        const listUniqJsCategories = [...new Set(listAllCategories)];
        console.log(listUniqJsCategories);

        this.listCategoriesFilter = listUniqJsCategories;
        this.listData = listPlant;
        this.listFull = listPlant;
        //this.listData.length = 9;
      }
    )
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('')
  }

  recupRateAvis(rateAvis:any){
    //console.log('from accueil: '+rateAvis);
    let product = this.listFull.filter(function (currentElement) {
      // the current value is an object, so you can check on its properties
      return currentElement.product_rating >= rateAvis;
    });
    this.listData = product;
    //console.log(product);
  }

  onSearchChange(product_name: any): void {
    if(product_name == '' ){
      this.listData = this.listFull;
    }
    else{
      this.applyFilter(product_name);
    }
  }

  applyFilter(filter :any ) {
    let product = this.listFull.filter((plants) =>
    plants.product_name.toLowerCase().includes(filter.toLowerCase())
    );
    this.listData = product;
  }

categorieFilter(valeur:any){
  console.log(valeur);
let cate = this.listFull.filter((categories) =>
categories.product_breadcrumb_label.includes(valeur));
this.listData=cate;


}

}

