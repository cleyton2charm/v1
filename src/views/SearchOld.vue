<template>
  <v-container class="grey lighten-4" fluid align-start justify-start>  
    <!--<v-layout align-start justify-start row fill-height/>-->
    <v-toolbar elevation="0">
      <v-dialog v-model="menufiltro" scrollable max-width="300px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" small tile outlined v-on="on"><v-icon left>mdi-ballot</v-icon> Filtro</v-btn>
        </template>
        <v-card>
          <v-card-title>Filtrar resultado {{objetoFiltro()}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-col>
              <v-flex
                v-for="seller in objmenu"
                :key="seller">
                <div>
                  <v-checkbox
                    v-model="filtroVendedores"
                    :value="seller"
                    :label="seller"
                    hide-details
                  ></v-checkbox>
                </div>  
              </v-flex>
            </v-col>
            <!--<v-subheader>Produtos</v-subheader>-->
            <v-col>
              <v-flex
                v-for="product in objproduct"
                :key="product">
                <div>
                  <v-checkbox
                    v-model="filtroProdutos"
                    :value="product"
                    :label="product"
                    hide-details
                  ></v-checkbox>
                </div>  
              </v-flex>
            </v-col>
            <!--<v-subheader>Frete</v-subheader>-->
            <v-col>
              <v-flex
                v-for="shipping in objshipping"
                :key="shipping">
                <div>
                  <v-checkbox
                    v-model="filtroFrete"
                    :value="shipping"
                    :label="shipping"
                    hide-details
                  ></v-checkbox>
                </div>  
              </v-flex>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="minimenufilter = false">Fechar</v-btn>
            <v-btn color="blue darken-1" text @click="minimenufilter = false">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="viewgrid = false" small text icon><v-icon>mdi-view-agenda</v-icon></v-btn>
      <v-btn color="primary" @click="viewgrid = true" small text icon><v-icon>mdi-view-grid</v-icon></v-btn>
    </v-toolbar>
    <div v-if="viewgrid === true">
      <v-layout row wrap align-start justify-start>
        <v-col
          v-for="produto in objcategory"
          :key="produto['.key']"
          v-if="filter(produto.nome) === true"
          cols="12"
          sm="6"
          md="3"
        >
          <div v-if="filterSearchVendedor(produto.vendedor) === true">
            <div v-if="filterSearchProduto(produto.nome) === true">
              <div v-if="filterSearchFrete(produto.frete) === true">
                <v-hover>
                  <template v-slot="{ hover }">
                    <v-card
                      :elevation="hover ? 12 : 1"
                      class="mx-auto"
                    > 
                      <v-carousel
                        :cycle="false"
                        height="200"
                        hide-delimiter-background
                        delimiter-icon="mdi-minus"
                        show-arrows-on-hover
                      >       
                        <v-carousel-item
                          
                        >
                          <v-img
                            :src="produto.imagem"
                            height="200"
                          >
                          </v-img>
                        </v-carousel-item>
                      </v-carousel>
                      
                      <v-list-item @click="redirectProduct(produto['.key'])">
                        <v-list-item-content>
                          <v-list-item-title class="headline">R$ {{produto.valor}}</v-list-item-title>
                          <v-list-item-subtitle class="text--primary" >{{produto.nome}} </v-list-item-subtitle>
                          <v-list-item-subtitle >{{produto.descricao}}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-list-item-action-text >1 dias</v-list-item-action-text>
                          <v-icon color="success">mdi-truck</v-icon>
                        </v-list-item-action>
                      </v-list-item>
                    </v-card>
                  </template>    
                </v-hover>    
              </div>  
            </div>  
          </div>      
        </v-col>
      </v-layout>  
    </div>                
    <div v-else>            
      <v-layout row wrap align-start justify-start>
        <!--<v-subheader>Busca por: "{{ search }}"</v-subheader>-->
        <v-flex xs12 align-start justify-start
          v-for="produto in objcategory"
          :key="produto['.key']">
          <div v-if="filter(produto.nome) === true">
            <div v-if="filterSearchVendedor(produto.vendedor) === true">
              <div v-if="filterSearchProduto(produto.nome) === true">
                <div v-if="filterSearchFrete(produto.frete) === true">
                  <v-col cols="12">
                    <v-hover>
                      <template v-slot="{ hover }">
                        <v-card
                          @click="redirectProduct(produto['.key'])"
                          :elevation="hover ? 12 : 1"
                        >
                          <v-list-item three-line>
                            <v-list-item-avatar
                              size="125"
                              tile
                            >
                              <v-img :src="produto.imagem"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content class="align-self-start">
                              <v-list-item-title
                                class="headline mb-2"
                                v-text="produto.nome"
                              ></v-list-item-title>

                              <v-list-item-subtitle v-text="produto.descricao"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                              <v-list-item-action-text >{{produto.frete}}</v-list-item-action-text>
                              <v-icon color="success">mdi-truck</v-icon>
                            </v-list-item-action>
                          </v-list-item>
                        </v-card>
                      </template>    
                    </v-hover>
                  </v-col>            
                  
                </div>  
              </div>  
            </div>  
          </div>  
        </v-flex>  
      </v-layout>
    </div>        
  </v-container>
</template>

<script>

import { db } from '../config/db';
  //console.log();
  const dbcategoria = db.ref('produto').orderByChild('categoria');
  var objetna = [];
  var objmenu = [];
  var objproduct = [];
  var objshipping = [];
  //const that = this.key;
  export default {
    props:['search'],
    texto: 'andaimes',
    data: function () {
      return {
        objcategory: [],
        objFiltro: [],
        filtroVendedores: [],
        filtroProdutos: [],
        filtroFrete: [],
        cont: 0,
        // init firebase product object
        user: this.search,
        // menu filter
        menufiltro: null,
        minimenufilter: false,
        viewgrid: true
      }
    },
    methods:{
      redirectProduct: function(obj){
        this.$router.push({ name: 'product', params: { product: obj} })
      },
      filter(obj){        
        if(obj.includes(this.search)===true){
          return true;    
        }
      },
      filterSearchVendedor(obj){
        if(this.filtroVendedores.includes(obj)===true || this.filtroVendedores.length === 0){
          return true;    
        }
      },
      filterSearchProduto(obj){  
        if(this.filtroProdutos.includes(obj)===true || this.filtroProdutos.length === 0){
          return true;    
        }
      },
      filterSearchFrete(obj){  
        if(this.filtroFrete.includes(obj)===true || this.filtroFrete.length === 0){
          return true;    
        }
      },
      objetoFiltro(){
        db.ref('produto').orderByChild('categoria').once('value', snapshot => {
          var that = this;
          var arraySnap = [];
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var childDataNome = childData.nome;
            var childDataVendedor = childData.vendedor;
            if(childDataNome.includes(that.search)===true){
              arraySnap.push(childSnapshot.val()) 
              //console.log(childKey+" - "+childDataNome+" - "+childData.vendedor)
            }
            // ...
          });
          //console.log(Object.entries(arraySnap));
          //console.log(arraySnap);
          //this.objmenu = arraySnap;
          const arrayArmazenaEmpresa = [];
          const arrayArmazenaProduto = [];
          const arrayArmazenaFrete = [];
          const obje = arraySnap;
          for (var key in obje) {
            // skip loop if the property is from prototype
            if (!obje.hasOwnProperty(key)) continue;
              var obj = obje[key];
              for (var prop in obj) {
                // skip loop if the property is from prototype
                if (!obj.hasOwnProperty(prop)) continue;
                // your code
                  if(prop == "vendedor"){
                    arrayArmazenaEmpresa.push(obj[prop]);
                    //console.log(prop + " = " + obj[prop]);
                  }
                  if(prop == "nome"){
                    arrayArmazenaProduto.push(obj[prop]);
                    //console.log(prop + " = " + obj[prop]);
                  }
                  if(prop == "frete"){
                    arrayArmazenaFrete.push(obj[prop]);
                    //console.log(prop + " = " + obj[prop]);
                  }
                            
              }
          }
          //console.log([...new Set(arrayArmazenaEmpresa)]);
          this.objmenu = [...new Set(arrayArmazenaEmpresa)]; 
          //console.log([...new Set(arrayArmazenaProduto)]);
          this.objproduct = [...new Set(arrayArmazenaProduto)];
          //console.log([...new Set(arrayArmazenaFrete)]);
          this.objshipping = [...new Set(arrayArmazenaFrete)]; 
        });
      }
    },
    firebase:{
      objcategory: dbcategoria,
      //objcategoria: dbcategoria
    }    
  }
</script>