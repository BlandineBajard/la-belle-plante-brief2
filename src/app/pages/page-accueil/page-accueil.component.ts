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
  public listPriceFilter: string[];
  public category: any[];




  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listFull = [];
    this.listCategoriesFilter = [];
    this.listPriceFilter = [];
    this.listFull =[];
    this.category=[];
    this.prixAsc = true;
    this.alphaAsc = true;
    this.avisAsc = true;



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

        const listPriceFilter = listPlant.map(product => product.product_price);
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

    // methode de tri
  onClickPrix(){
    this.alphaAsc = true;
    this.avisAsc = true;
    this.prixAsc = !this.prixAsc;
    //console.log('order prix asc:'+this.prixAsc);
    this.sortBy('product_unitprice_ati', this.prixAsc)
  }

  onClickAlpha(){
    this.avisAsc = true;
    this.prixAsc = true;
    this.alphaAsc = !this.alphaAsc;
    //console.log('order nom asc:'+this.alphaAsc);
    this.sortBy('product_name', this.alphaAsc)
  }

  onClickAvis(){
    this.alphaAsc = true;
    this.prixAsc = true;
    this.avisAsc = !this.avisAsc;
    //console.log('order avis asc:'+this.avisAsc);
    this.sortBy('product_rating', this.avisAsc)
  }

  sortBy(sortName:any, sortType:any){
    if(sortType == true){

        this.listData = _.sortBy(this.listData, sortName);

    }else{
      if(sortName == 'product_unitprice_ati'){
        this.listData = this.listData.sort((x, y) => parseFloat(x.product_unitprice_ati) - parseFloat(y.product_unitprice_ati)).reverse();
      }else{
        this.listData = _.sortBy(this.listData, sortName).reverse();
      }

    }
  }

  //filtre pour les prix dans la filter-side-bar
  resultePriceSelect(tableuresultselectPrice: any){
    //condition si prix min null
    if(tableuresultselectPrice[0]==''){
      tableuresultselectPrice[0]=0;
    }
    //condition si prix max null
    if(tableuresultselectPrice[1] ==''){
      let product = this.listFull.filter((plants) =>
      parseFloat(plants.product_unitprice_ati) > tableuresultselectPrice[0]);
      console.log(product);
      this.listData = product;
    }
    //condition si prix min et prix max sont renseignés
    else{
      let product = this.listFull.filter((plants) =>
      parseFloat(plants.product_unitprice_ati) > tableuresultselectPrice[0] && parseFloat(plants.product_unitprice_ati) < tableuresultselectPrice[1]);
      console.log(product);
      this.listData = product;
    }
    }

categorieFilter(valeur:any){ //recupère le tableau de categories créée quand on clique
console.log(valeur);
this.listData=[]; //initialise le tableau qui va stocker à null
if (valeur.length==0){ //si le tableau récupéré est à null alors
  this.listData=this.listFull; //le tableau qui va stocker est le tableau d'objets en entier
}
else { //sinon alors on fait une boucle qui va passer sur chaque valeur du tableau categories cliquées
for (let i=0; i<= valeur.length;i++){
  let cate = this.listFull.filter((categories) => //cela va permettre de filtrer le tableau d'objet
categories.product_breadcrumb_label.includes(valeur[i])); //en fonction des catégories cliquées
this.listData=this.listData.concat(cate);                //on concatene chaque tableau ainsi créé
}                                                       //et on le stocke dans le tableau qui était à null
}
}
}
