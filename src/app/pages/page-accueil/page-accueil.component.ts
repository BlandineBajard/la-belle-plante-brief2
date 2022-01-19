import { Component, EventEmitter, OnInit } from '@angular/core';
import { PlantouneService } from 'src/app/services/plantoune.service';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import jwt_token from 'jwt-decode';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss'],
})
export class PageAccueilComponent implements OnInit {
  public listData: any[];
  public listTempo: any[];
  public listFull: any[];
  public listCategoriesFilter: string[];
  public listPriceFilter: string[];
  public category: any[];
  public prixAsc: any;
  public alphaAsc: any;
  public avisAsc: any;
  public keyword: any;
  public categorieSelected: any;
  public prixSelected: any;
  public rating: any;

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listTempo = [];
    this.listFull = [];
    this.listCategoriesFilter = [];
    this.listPriceFilter = [];
    this.listFull = [];
    this.category = [];
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
    const token = localStorage.getItem(environment.tokenKey);

    if (token) {
      const decodedToken = jwt_token<any>(token);
      const userId = decodedToken.sub;
      this.plantouneService
        .getPlantFav(userId)
        .subscribe((data: any) => console.log(data));

      // faire un call api pour récupérer nos plantes
      // toutes les plantes mises en favorites par l'utilsateur connecté => leur ajouter une propriété => plantlikée
    } else {
      this.plantouneService.getData().subscribe((listPlant: any[]) => {
        console.log(listPlant);

        /**
         * Technique avec Underscore JS pour recupérer les catégories uniques de nos plantes
         */
        const listAllCategories = listPlant.map(
          (product) => product.product_breadcrumb_label
        );
        console.log(listAllCategories);

        const listPriceFilter = listPlant.map(
          (product) => product.product_price
        );
        console.log(listAllCategories);

        const listUniqCategories = _.uniq(listAllCategories);
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
      });
    }
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('');
  }

  recupRateAvis(rateAvis: any) {
    this.rating = rateAvis;
    //console.log('from accueil: '+rateAvis);
    // let product = this.listFull.filter(function (currentElement) {
    //   // the current value is an object, so you can check on its properties
    //   return currentElement.product_rating >= rateAvis;
    // });
    // this.listData = product;
    //console.log(product);
    this.grosseMethode();
  }

  onSearchChange(product_name: any): void {
    this.keyword = product_name;
    // if(product_name == '' ){
    //   this.listData = this.listFull;
    // }
    // else{
    //   this.applyFilter(product_name);
    // }
    this.grosseMethode();
  }

  // applyFilter(filter :any ) {
  //   let product = this.listFull.filter((plants) =>
  //   plants.product_name.toLowerCase().includes(filter.toLowerCase())
  //   );
  //   this.listData = product;
  //   this.grosseMethode();
  // }

  // methode de tri
  onClickPrix() {
    this.alphaAsc = true;
    this.avisAsc = true;
    this.prixAsc = !this.prixAsc;
    //console.log('order prix asc:'+this.prixAsc);
    this.sortBy('product_unitprice_ati', this.prixAsc);
  }

  onClickAlpha() {
    this.avisAsc = true;
    this.prixAsc = true;
    this.alphaAsc = !this.alphaAsc;
    //console.log('order nom asc:'+this.alphaAsc);
    this.sortBy('product_name', this.alphaAsc);
  }

  onClickAvis() {
    this.alphaAsc = true;
    this.prixAsc = true;
    this.avisAsc = !this.avisAsc;
    //console.log('order avis asc:'+this.avisAsc);
    this.sortBy('product_rating', this.avisAsc);
  }

  sortBy(sortName: any, sortType: any) {
    if (sortType == true) {
      if (sortName == 'product_unitprice_ati') {
        this.listData = this.listData.sort(
          (x, y) =>
            parseFloat(x.product_unitprice_ati) -
            parseFloat(y.product_unitprice_ati)
        );
      } else {
        this.listData = _.sortBy(this.listData, sortName);
      }
    } else {
      if (sortName == 'product_unitprice_ati') {
        this.listData = this.listData
          .sort(
            (x, y) =>
              parseFloat(x.product_unitprice_ati) -
              parseFloat(y.product_unitprice_ati)
          )
          .reverse();
      } else {
        this.listData = _.sortBy(this.listData, sortName).reverse();
      }
    }
  }

  //filtre pour les prix dans la filter-side-bar
  resultePriceSelect(tableuresultselectPrice: any) {
    this.prixSelected = tableuresultselectPrice;
    // //condition si prix min null
    // if(tableuresultselectPrice[0]==''){
    //   tableuresultselectPrice[0]=0;
    // }
    // //condition si prix max null
    // if(tableuresultselectPrice[1] ==''){
    //   let product = this.listFull.filter((plants) =>
    //   parseFloat(plants.product_unitprice_ati) > tableuresultselectPrice[0]);
    //   console.log(product);
    //   this.listData = product;
    // }
    // //condition si prix min et prix max sont renseignés
    // else{
    //   let product = this.listFull.filter((plants) =>
    //   parseFloat(plants.product_unitprice_ati) > tableuresultselectPrice[0] && parseFloat(plants.product_unitprice_ati) < tableuresultselectPrice[1]);
    //   console.log(product);
    //   this.listData = product;
    // }
    this.grosseMethode();
  }

  categorieFilter(valeur: any) {
    //recupère le tableau de categories créée quand on clique
    console.log(valeur);
    this.categorieSelected = valeur;
    // this.listData=[]; //initialise le tableau qui va stocker à null
    // if (valeur.length==0){ //si le tableau récupéré est à null alors
    //   this.listData=this.listFull; //le tableau qui va stocker est le tableau d'objets en entier
    // }
    // else { //sinon alors on fait une boucle qui va passer sur chaque valeur du tableau categories cliquées
    //   for (let i=0; i<= valeur.length;i++){
    //     let cate = this.listFull.filter((categories) => //cela va permettre de filtrer le tableau d'objet
    //     categories.product_breadcrumb_label.includes(valeur[i])); //en fonction des catégories cliquées
    //     this.listData=this.listData.concat(cate);                //on concatene chaque tableau ainsi créé
    //   }                                                       //et on le stocke dans le tableau qui était à null
    // }
    this.grosseMethode();
  }

  // Une méthode pour les regrouper tous, et dans la recherche les réunir
  grosseMethode() {
    this.listData = [];
    this.listTempo = [];
    let maRecherche = this.keyword;
    let mesCategories = this.categorieSelected;
    let mesPrix = this.prixSelected;
    let rateAvis = this.rating;

    this.listData = this.listFull;

    //premier filtre sur la recherche
    if (maRecherche) {
      let recherche = this.listData.filter((plants) =>
        plants.product_name.toLowerCase().includes(maRecherche.toLowerCase())
      );
      this.listData = recherche;
    }

    //Filter de categorie
    if (mesCategories) {
      if (mesCategories.length == 0) {
        //si le tableau récupéré est à null alors
        //this.listData=this.listFull; //le tableau qui va stocker est le tableau d'objets en entier
      } else {
        //sinon alors on fait une boucle qui va passer sur chaque valeur du tableau categories cliquées
        for (let i = 0; i <= mesCategories.length; i++) {
          let cate = this.listData.filter(
            (
              categories //cela va permettre de filtrer le tableau d'objet
            ) => categories.product_breadcrumb_label.includes(mesCategories[i])
          ); //en fonction des catégories cliquées
          this.listTempo = this.listTempo.concat(cate); //on concatene chaque tableau ainsi créé
        }
        this.listData = this.listTempo;
      }
    }

    //Filtre de prix
    if (mesPrix != null) {
      //condition si prix min null
      this.listTempo = [];
      if (mesPrix[0] == '') {
        mesPrix[0] = 0;
      }
      //condition si prix max null
      if (mesPrix[1] == '') {
        let product = this.listData.filter(
          (plants) => parseFloat(plants.product_unitprice_ati) > mesPrix[0]
        );
        console.log(product);
        this.listTempo = product;
      } else {
        let product = this.listData.filter(
          (plants) =>
            parseFloat(plants.product_unitprice_ati) > mesPrix[0] &&
            parseFloat(plants.product_unitprice_ati) < mesPrix[1]
        );
        console.log(product);
        this.listTempo = product;
      }
      this.listData = this.listTempo;
    }

    // filter par avis
    if (rateAvis) {
      console.log('rate:' + rateAvis);
      let product = this.listData.filter(function (currentElement) {
        return currentElement.product_rating >= rateAvis;
      });
      this.listData = product;
    }
  }
}
