<template>
  <v-flex>
    <div v-show="modeltemplate==false">
      <v-progress-linear
        color="primary accent-4"
        indeterminate
        absolute
        top
        height="6"
      ></v-progress-linear>
    </div>
    <div v-show="modeltemplate==true">
      <v-row
        dense
        align="start"
        justify="start"
      > 
        <v-subheader>Destaques<v-icon small left>mdi-chevron-right</v-icon></v-subheader>
      </v-row>
                  
      <v-row
        dense
        align="start"
        justify="start"
      >
        
        <v-col v-for="(anuncio, cont) in filtroDestaque(arraydestaque)" :key="cont" cols="12" :sm="cont === 0 ? '6' : '3'">
          <v-card
            elevation="1"
            class="mx-auto white fill-height"
          > 
            <!--
            <v-list two-line @click="redirectProduct(anuncio['.key'])">
              <v-list-item>
                <v-list-item-avatar size="24">
                  <img 
                    v-if="anuncio.vendedor.url"
                    :src="anuncio.vendedor.url"
                    :alt="anuncio.vendedor.nome"
                  >
                  <v-icon v-else x-small left>mdi-account-circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="caption"><strong>{{anuncio.vendedor.nome}}</strong></v-list-item-title>
                  <v-list-item-subtitle class="caption">Realengo, Rio de Janeiro{{consultaEstoque(anuncio['.key'], anuncio.quantidade)}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            -->
            <v-carousel
              :cycle="false"
              height="200"
              hide-delimiter-background
              delimiter-icon="mdi-circle-small"
              show-arrows-on-hover
            >       
              <v-carousel-item @click="redirectProduct(anuncio['.key'])"
                v-for="(image, n) in anuncio.imagem"
                :key="n"
              >
                <v-img
                  :src="image"
                  :lazy-src="image"
                  class="white--text align-start"
                  gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.0)"
                  height="200"
                >
                  <v-list two-line class="transparent ">
                    <v-list-item>
                      <v-list-item-avatar size="24">
                        <img 
                          v-if="anuncio.vendedor.url"
                          :src="anuncio.vendedor.url"
                          :alt="anuncio.vendedor.nome"
                          class="instagram"
                        >
                        <v-icon v-else x-small left>mdi-account-circle</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="caption"><strong>{{anuncio.vendedor.nome}}</strong></v-list-item-title>
                        <v-list-item-subtitle class="caption">{{anuncio.vendedor.endereco.bairro}}, {{anuncio.vendedor.endereco.cidade}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>                  
                </v-img>
              </v-carousel-item>
            </v-carousel>
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
                <v-list-item-subtitle class="green--text caption">
                  <v-icon x-small color="green">mdi-check</v-icon>
                  Entregas para todo Rio de Janeiro
                </v-list-item-subtitle>
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
                </v-list-item-title>
                <v-list-item-subtitle class="green--text caption">
                  <v-icon x-small color="green">mdi-check</v-icon>
                  <strong> Sem taxas no site</strong> - Pague na entrega
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="consultaEstoque(anuncio['.key'], anuncio.quantidade)<=5" class="red--text caption">
                  <v-icon x-small color="red">mdi-clock-outline</v-icon>
                  Restam apenas {{consultaEstoque(anuncio['.key'], anuncio.quantidade)}} disponíveis no site
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else class="green--text caption">
                  <!--<v-icon x-small color="black">mdi-circle-slice-5</v-icon>-->
                  <v-icon x-small color="green">mdi-check</v-icon>
                  Pague na entrega em até 3x s/juros
                </v-list-item-subtitle>
              </v-list-item-content>              
            </v-list-item>
            <v-divider></v-divider>
            <v-card-actions @click="redirectProduct(anuncio['.key'])" class="caption">
              <v-spacer></v-spacer>
              Saiba mais
              <v-icon small>mdi-chevron-right</v-icon>
            </v-card-actions>
          </v-card>  
        </v-col>  
      </v-row>      
      <div v-for="(categoria, i) in arraycategoria" :key="i">
        <v-subheader @click="redirectSearch(arraynomecategoria[categoria])">{{arraynomecategoria[categoria]}}<v-icon small left>mdi-chevron-right</v-icon></v-subheader>  
        <v-row
          dense
          align="start"
          justify="start"
        >
        
          
          <v-col v-for="(anuncio, cont) in filtroCategoria(categoria)" :key="cont" cols="12" sm="3">
            {{valorInit(anuncio.periodos, anuncio.frete)}}
            <v-card
              elevation="1"
              class="mx-auto white fill-height"
            > 
                   

              <v-carousel
                :cycle="false"
                height="200"
                hide-delimiter-background
                delimiter-icon="mdi-circle-small"
                show-arrows-on-hover
              >       
                <v-carousel-item @click="redirectProduct(anuncio['.key'])"
                  v-for="(image, n) in anuncio.imagem"
                  :key="n"
                >
                  <v-img
                    :src="image"
                    :lazy-src="image"
                    class="white--text align-start"
                    gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.0)"
                    height="200"
                  >
                    <v-list two-line class="transparent ">
                      <v-list-item>
                        <v-list-item-avatar size="24">
                          <img 
                            v-if="anuncio.vendedor.url"
                            :src="anuncio.vendedor.url"
                            :alt="anuncio.vendedor.nome"
                            class="instagram"
                          >
                          <v-icon v-else x-small left>mdi-account-circle</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="caption"><strong>{{anuncio.vendedor.nome}}</strong></v-list-item-title>
                          <v-list-item-subtitle class="caption">{{anuncio.vendedor.endereco.bairro}}, {{anuncio.vendedor.endereco.cidade}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
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
                  <v-list-item-subtitle class="green--text caption">
                    <v-icon x-small color="green">mdi-check</v-icon>
                    Entregas para todo Rio de Janeiro
                  </v-list-item-subtitle>
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
                  <v-list-item-subtitle class="green--text caption">
                    <v-icon x-small color="green">mdi-check</v-icon>
                    <strong> Sem taxas no site</strong> - Pague na entrega
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="consultaEstoque(anuncio['.key'], anuncio.quantidade)>1 && consultaEstoque(anuncio['.key'], anuncio.quantidade)<=5" class="red--text caption">
                    <v-icon x-small color="red">mdi-clock-outline</v-icon>
                    Restam apenas {{consultaEstoque(anuncio['.key'], anuncio.quantidade)}} disponíveis no site
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else-if="consultaEstoque(anuncio['.key'], anuncio.quantidade)==1" class="red--text caption">
                    <v-icon x-small color="red">mdi-clock-outline</v-icon>
                    Resta apenas {{consultaEstoque(anuncio['.key'], anuncio.quantidade)}} disponível no site
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else class="green--text caption">
                    <!--<v-icon x-small color="black">mdi-circle-slice-5</v-icon>-->
                    <v-icon x-small color="green">mdi-check</v-icon>
                    Pague na entrega em até 3x s/juros
                  </v-list-item-subtitle>
                  <!--
                  <v-list-item-subtitle class="caption">
                  <v-icon x-small left>mdi-store</v-icon>{{anuncio.vendedor.nome}}
                  </v-list-item-subtitle>
                  
                  
                  
                  <v-list-item-subtitle class="caption">
                    <v-icon x-small left>mdi-map-marker</v-icon>{{anuncio.vendedor.endereco.bairro}}, {{anuncio.vendedor.endereco.cidade}}
                  </v-list-item-subtitle>
                  -->
                </v-list-item-content>
                <!--
                <v-list-item-action>
                  <v-list-item-action-text >
                    
                  </v-list-item-action-text>
                  <v-icon color="success">mdi-truck</v-icon>
                </v-list-item-action>
                -->
              </v-list-item>
              <v-divider></v-divider>
              <v-card-actions @click="redirectProduct(anuncio['.key'])" class="caption">
                <v-spacer></v-spacer>
                Saiba mais
                <v-icon small>mdi-chevron-right</v-icon>
              </v-card-actions>
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
      </div>  
    </div>
  </v-flex>    
</template>

<script>
//import Toolbar from '../components/Toolbar';
import { db, auth, provider } from '../config/db';
const dbcategoria = db.ref('anuncio').orderByChild('titulo');
const dbpedido = db.ref('pedido');
export default {
  inject: ['theme'],
  data () {
    return {
      modeltemplate: false,
      objcategory: [],
      objpedido: [],
      valorPeriodo: 0,
      valorPeriodoFrete: null,
      /*
      redirectProduct: function(obj){
        this.$router.push({ name: obj, params: { search: this.login.id } })
      },
      */
      arraynomecategoria: {
        'andaimes1x1':'Andaimes 1.00x1.00',
        'andaimes150x100':'Andaimes 1.50x1.00',
        'andaimes150x150':'Andaimes 1.50x1.50',
        'escada-extensiva':'Escada Extensível',
        'escoras-metalicas':'Escoras Metálicas',
        'balancim':'Balancim',
        'cacamba':'Caçamba',
        'diagonais':'Diagonais',
        'guardacorpo':'Guarda-Corpo',
        'plataformaMadeira':'Plataforma de Madeira',
        'plataformaMetalica':'Plataforma Metálica',
        'rodinhas':'Rodinhas com travas',
        'sapatas':'Sapatas Reguláveis',
        'tesouras':'Tesouras',
        'travessas':'Travessas',
      },
      arraydestaque: [
        '-MBFpUCpgSbalBKHFiE3', // Escora metálica
        '-MBAxcvNGds2MMkj-F5k', // 2 metros andaimes 1x1
        '-MBKR7OoXS6T-e_IaBMX', // 3 metros andaimes 150x150
        //'-MBFx_ad8oKiLhAetxOf', // Escada extensível
        //'-MBG1-n-leHm_Wkvwnqb'
      ],
      arraycategoria: [
        'andaimes1x1',
        'andaimes150x100',
        'andaimes150x150',
        'escada-extensiva',
        'escoras-metalicas',
        'balancim',
        'cacamba'
      ],
      arraynomefrete: {'entregaretirada':'Frete', 'retiradalocal':'Retirada na loja'},
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'https://cdn.searchenginejournal.com/wp-content/uploads/2016/06/man-on-smartphone.jpg',
        'https://firebasestorage.googleapis.com/v0/b/sherrer-b43e8.appspot.com/o/photos%2Fb7.png?alt=media&token=5c9155ce-7c52-44a5-8baa-1ae80bc51b7d',
        'https://firebasestorage.googleapis.com/v0/b/sherrer-b43e8.appspot.com/o/photos%2Fbanner-004.png?alt=media&token=06f655d4-8f10-419b-9424-a0d7d5cdd896',
      ],
    }
  },
  metaInfo(){
    return{
      title: `Reserve, receba, utilize e devolva`,
      meta: [
        {name: 'description', content: 'Escolha, reserve, receba, utilize e devolva.'},
        {property: 'og:title', content: 'Aluga Já - Escolha, reserve, receba, utilize e devolva.'},
        {property: 'og:site_name', content: 'Aluga Já'},
        {property: 'og:description', content: 'Escolha, reserve, receba, utilize e devolva.'},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: 'https://alugaja.app/'},
        {property: 'og:image', content: this.slides}    
      ]
    }
  },
  created(){
    if (this.modeltemplate==false){
      setTimeout(() => (this.modeltemplate = true), 2000)
    }
  },
  methods:{
    redirectProduct: function(obj){
      this.$router.push({ name: 'product', params: { product: obj} })
    },
    redirectSearch: function(obj){
      this.$router.push({ name: 'search', params: { search: obj } })
    },
    valorInit(obj, obj2){
      /*
      if(this.valorPeriodo==null){
        let e = [];
        Object.entries(obj).forEach(([key, value]) =>{
          if(value.status==true){
            e.push([key, value.value])
          }
        });
        this.valorPeriodo = e[0][0]
      }
      */
    },
    filtroDestaque(obj){
      Array.prototype.sample = function(){
        return this[Math.floor(Math.random()*this.length)];
      };
      return this.objcategory.filter(f => 
        {
          return obj.includes(f['.key'])===true;
        }
      );
    },
    filtroCategoria(obj){
      return this.objcategory.filter(f => 
        {
          let itemUpper = f.categoria.toUpperCase();
          let searchUpper = obj.toUpperCase();
          return itemUpper.includes(searchUpper)===true;
        }
      ).slice(0,4)
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
    },
    consultaEstoque(obj, obj2){
      let reservado = 0;
      let total = 0;
      let produto = null;
      let produtoid = null;
      let vendedor = null;
      let quantidade = null;
      let situacao = null;
      Object.entries(this.objpedido).forEach(([key, value]) =>{
        produto = value.produto;
        produtoid = produto.id;
        vendedor = value.vendedor;
        quantidade = produto.quantidade;
        situacao = value.situacao;
        //contador = parseInt(obj2) - parseInt(quantidade);
        if(obj==produtoid && situacao!=3 && situacao!=4){
          reservado += parseInt(quantidade);        
        }
      });       
      total = parseInt(obj2) - parseInt(reservado);
      //console.log("ID:"+obj+" - Anunciado:"+obj2+" - Disponivel:"+total);
      return total;
    },
  },
  firebase:{
    objcategory: dbcategoria,
    objpedido: dbpedido,
    //objcategoria: dbcategoria
  }
  
  
};
</script>
<style scoped>
.instagram{
  border: 0px solid black;
}
</style>
