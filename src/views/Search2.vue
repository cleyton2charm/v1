<template>
  <v-row
    align="start"
    justify="start"
  >
  <v-subheader>Busca por: "{{search}}"</v-subheader>
    <v-col cols="12" sm="12">
      
      
        <v-row>
          
          <v-col v-for="(anuncio, cont) in objfirebase" :key="cont" cols="12" sm="3">
            {{valorInit(anuncio.periodos, anuncio.frete)}}
            <v-card
              elevation="2"
              max-width="344"
              class="mx-auto white fill-height"
            > 
              <!--
              <v-list-item>
                <v-list-item-avatar><v-icon>mdi-store</v-icon></v-list-item-avatar>
                <v-list-item-content>
                 
                    <v-list-item-title>
                    {{anuncio.vendedor.nome}}
                    </v-list-item-title>
                  
                  <v-list-item-subtitle>
                   <v-icon x-small left>mdi-store</v-icon>{{anuncio.vendedor.nome}}
                  </v-list-item-subtitle>
                  
                 
                </v-list-item-content>
              </v-list-item>
              -->
              <v-carousel
                :cycle="false"
                height="200"
                hide-delimiter-background
                delimiter-icon="mdi-minus"
                show-arrows-on-hover
              >       
                <v-carousel-item @click="redirectProduct(anuncio['.key'])"
                  v-for="(image, n) in anuncio.imagem"
                  :key="n"
                >
                  <v-img
                    :src="image"
                    :lazy-src="image"
                    height="200"
                  >
                    <v-row class="white--text">
                      <v-col>
                        <div>Jon</div>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-carousel-item>
              </v-carousel>
              <!-- @click="redirectProduct(anuncio['.key'])" -->
              <v-list-item @click="redirectProduct(anuncio['.key'])">
                <v-list-item-content>
                  
                  <v-btn
                    v-if="filtroFreteGratis(anuncio.frete) == true"
                    color="success"
                    dark
                    x-small
                    absolute
                    top
                    right
                    fab
                  >
                    <v-icon small>mdi-truck</v-icon>
                  </v-btn>
                  <v-list-item-subtitle class="text--primary font-weight-medium">{{anuncio.titulo}}</v-list-item-subtitle>
                  <v-list-item-subtitle class="text--primary font-weight-light">{{anuncio.descricao}}</v-list-item-subtitle>
                  <v-list-item-subtitle class="caption">A partir de</v-list-item-subtitle>
                  <v-list-item-title class="title font-weight-medium">
                     <span class="black--text text--darken-4">R$ {{filtroValor(anuncio.periodos)}}</span>
                    <v-chip-group
                      v-model="valorPeriodo"
                      active-class="indigo white--text"
                      mandatory
                    >
                      <v-chip x-small label v-for="v in filtroValorPeriodo(anuncio.periodos)" :key="v.dia">
                        {{v.dia}} dias
                      </v-chip>
                    </v-chip-group>
                    <!--
                    <v-chip-group
                      v-model="valorPeriodoFrete"
                      active-class="success accent-4 white--text"
                      mandatory
                    >
                      <v-chip x-small label v-for="v in filtroFrete(anuncio.frete)" :key="v.tipo" :value="v.tipo">
                        {{arraynomefrete[v.tipo]}} {{verificaFrete(v.valor)}}
                      </v-chip>
                    </v-chip-group>
                    
                    <v-chip
                      class="ml-0 mr-2 black--text"
                      label
                      x-small
                    >
                      <v-icon x-small left>mdi-store</v-icon>{{anuncio.vendedor.nome}}
                    </v-chip>
                    <v-chip
                      class="ml-0 mr-2 black--text"
                      label
                      x-small
                    >
                      <v-icon x-small left>mdi-store</v-icon>{{anuncio.vendedor.nome}}
                    </v-chip>
                    <v-chip
                      class="ml-0 mr-2 black--text"
                      label
                      x-small
                    >
                      <v-icon x-small left>mdi-map-marker</v-icon>{{anuncio.vendedor.endereco.bairro}}
                    </v-chip>
                    -->
                  </v-list-item-title>
                  <!--
                  <v-list-item-subtitle class="caption">
                   <v-icon x-small left>mdi-store</v-icon>{{anuncio.vendedor.nome}}
                  </v-list-item-subtitle>
                  -->
                  
                  
                  <v-list-item-subtitle class="caption">
                    <v-icon x-small left>mdi-map-marker</v-icon>{{anuncio.vendedor.endereco.bairro}}, {{anuncio.vendedor.endereco.cidade}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <!--
                <v-list-item-action>
                  <v-list-item-action-text >
                    
                  </v-list-item-action-text>
                  <v-icon color="success">mdi-truck</v-icon>
                </v-list-item-action>
                -->
              </v-list-item>
              <!--
              <div v-for="(objdias, chave, n) in filtroDiasValores(anuncio.periodos)" :key="n">
                <diV v-if="objdias.status===true">
                  {{n}}-{{chave}}-{{objdias.value}}
                </diV>
              </div>
              -->
            </v-card>  
          </v-col>
        </v-row>
      
      <!--
      <v-subheader>June</v-subheader>
      <v-container fluid>
        <v-row>
          <v-col v-for="i in objfirebase" :key="i" cols="2">
            {{i}} {{i.descricao}}
          </v-col>
        </v-row>
      </v-container>
      <v-footer class="mt-12"></v-footer>
      -->
    </v-col>
  </v-row>
</template>

<script>
  import { db, auth, provider } from '../config/db';
  const dbcategoria = db.ref('anuncio').orderByChild('titulo');
  //const that = this.key;
  export default {
    props:['search'],
    texto: 'andaimes',
    data: function () {
      return {
        objcategory: [],
        valorPeriodo: 0,
        valorPeriodoFrete: null,
        arraynomefrete: {'entregaretirada':'Frete', 'retiradalocal':'Retirada na loja'},
        valor: '',
      }
    },
    metaInfo(){
      return{
        title: `Busca por: ${this.search} no Aluga Já!`,
        meta: [
          {name: 'description', content: 'Escolha, reserve, receba, utilize e devolva.'},
          {property: 'og:title', content: `Busca por: ${this.search} no Aluga Já!`},
          {property: 'og:site_name', content: 'Aluga Já'},
          {property: 'og:description', content: 'Escolha, reserve, receba, utilize e devolva.'},
          {property: 'og:type', content: 'website'},
          {property: 'og:url', content: 'https://alugaja.app/'},
          {property: 'og:image', content: ''}    
        ]
      }
    },
    methods:{
      redirectProduct: function(obj){
        this.$router.push({ name: 'product2', params: { product: obj} })
      },
      valorInit(obj, obj2){
        if(this.valorPeriodo==null){
          let e = [];
          Object.entries(obj).forEach(([key, value]) =>{
            if(value.status==true){
              e.push([key, value.value])
            }
          });
          this.valorPeriodo = e[0][0]
        }
        if(this.valorPeriodoFrete==null){
          let o = [];
          Object.entries(obj2).forEach(([key, value]) =>{
            if(value.status==true){
              o.push([key, value.value])
            }
          });
          this.valorPeriodoFrete = o[0][0]
        }
      },  
      filtroValor(obj){
        let objeto = []
        Object.entries(obj).forEach(([key, value]) =>{
          if(value.status==true){
            objeto.push({dia: key, valor: value.value})
          }
        });
        return objeto[0]['valor']
      },
      filtroValorPeriodo(obj){
        let objeto = []
        Object.entries(obj).forEach(([key, value]) =>{
          if(value.status==true){
            objeto.push({dia: key, valor: value.value})
          }
        });
        return objeto
      },
      filtroFreteGratis(obj){
        let frete = false;
        Object.entries(obj).forEach(([key, value]) =>{
          if(key=="entregaretirada" && value.status==true && value.value=="0,00"){
            frete = true
          }
        });
        return frete;
      },
      filtroFrete(obj){
        let objeto = []
        Object.entries(obj).forEach(([key, value]) =>{
          if(key=="entregaretirada" && value.status==true && value.value=="0,00"){
            objeto.push({tipo: key, valor: value.value})
          }
        });
        return objeto
      },
      verificaFrete(obj){
        if(obj=="0,00"){
          return "Grátis"
        }
      }
    },
    firebase:{
      objcategory: dbcategoria,
      //objcategoria: dbcategoria
    },
    computed: {
      objfirebase() {
        return this.objcategory.filter(f => 
          {
            let itemUpper = f.titulo.toUpperCase();
            let searchUpper = this.search.toUpperCase();
            return itemUpper.includes(searchUpper)===true;
          }
        );
        //return this.objcategory.map(f => f.titulo).sort(); 
      }
    },
        
  }
</script>