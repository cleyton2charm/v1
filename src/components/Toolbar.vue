<template>
  <v-flex>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <!--<v-subheader>Menu</v-subheader>-->
        <v-autocomplete class="hidden-sm-and-up"
          v-model="autocompletemobile"
          :items="objproduct"
          chips
          clearable
          hide-details
          hide-selected
          item-text="titulo"
          item-value="titulo"
          prepend-inner-icon="mdi-magnify"
          label="O que está buscando?"
          solo-inverted
          flat
        >
        </v-autocomplete>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon>
          <v-list-item-title><router-link :to="'/'" style="text-decoration: none; color: inherit; border: none">Página Inicial</router-link></v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Categorias</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-for="categoria in objcategory"
          :key="categoria['.key']"
          prepend-icon="mdi-menu-right"
          no-action
          color="primary"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="categoria.categoria"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(sub, i) in categoria.subcategoria"
            :key="i"
            @click="redirectSearch(sub.nome)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="sub.nome"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="#4267B2"
        dark
        app
        fixed
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="width: 120px">  
          <span><router-link :to="'/'" style="text-decoration: none; color: inherit; border: none"><!--<v-icon left>mdi-truck-fast</v-icon>-->Aluga Já</router-link></span>
        </v-toolbar-title>
        <v-autocomplete class="hidden-sm-and-down"
          v-model="autocompletepc"
          :items="objproduct"
          chips
          :deletable-chips="true"
          clearable
          hide-details
          hide-selected
          item-text="titulo"
          item-value="titulo"
          prepend-inner-icon="mdi-magnify"
          label="O que está buscando?"
          solo-inverted
          flat
        >
        </v-autocomplete>
        <!-- :item-selected="redirectSearch(model)" -->
        
        <v-spacer class="hidden-xs-and-down"></v-spacer>
        <!--
        <v-btn icon class="hidden-xs-and-down">
          <v-icon>shopping_cart</v-icon>
        </v-btn>
        -->
        <!--
        <v-menu
          v-model="menuuser"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y>
          <template v-slot:activator="{ on }">
            <v-avatar size="32px" v-show="login.status" v-on="on">
              <img
                :src="login.url"
                :alt="login.alt"
              >
            </v-avatar>
            <v-btn v-show="iconperson.status" v-on="on" icon>
              <v-icon>person</v-icon>
            </v-btn>
          </template>
          <v-list v-show="iconperson.status">
            <v-btn @click="autenticate" color="red" dark>
                <v-icon dark left>email</v-icon>
                {{login.name}}
              </v-btn>
          </v-list>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar size="32px" v-show="login.status" v-on="on">
                  <img 
                    :src="login.url"
                    :alt="login.alt"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{login.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{login.email}}</v-list-item-subtitle>
                </v-list-item-content>
                
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="menuuser = !menuuser"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-item-action>

              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item @click="redirectProfile">
                <v-list-item-action>
                  <v-icon color="primary">mdi-account-box</v-icon>
                </v-list-item-action>
                <v-list-item-title>Meu Perfil</v-list-item-title>
              </v-list-item>

              <v-list-item @click="redirectSale">
                <v-list-item-action>
                  <v-icon color="primary">mdi-cart</v-icon>
                </v-list-item-action>
                <v-list-item-title>Pedidos</v-list-item-title>
              </v-list-item>

              <v-list-item @click="redirectOrder">
                <v-list-item-action>
                  <v-icon color="primary">mdi-tag</v-icon>
                </v-list-item-action>
                <v-list-item-title>Anúncios</v-list-item-title>
              </v-list-item>

              <v-list-item @click="searchAddress">
                <v-list-item-action>
                  <v-icon color="primary">mdi-plus-box</v-icon>
                </v-list-item-action>
                <v-list-item-title>Criar Novo Anúncio</v-list-item-title>
              </v-list-item>
              
            </v-list>
            <v-divider></v-divider>
            <v-list>
 
              <v-list-item @click="logout">
                <v-list-item-action>
                  <v-icon color="primary" left>exit_to_app</v-icon>
                </v-list-item-action>
                <v-list-item-title>Sair</v-list-item-title>
              </v-list-item>
              
            </v-list>
          </v-card>
        </v-menu>
        -->
        <v-menu
          v-if="login.status == true"
          v-model="menuuser"
          :close-on-content-click="false"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-avatar size="32px" v-on="on">
              <img
                :src="login.url"
                :alt="login.alt"
              >
            </v-avatar>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar size="32px">
                  <img 
                    :src="login.url"
                    :alt="login.alt"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{login.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{login.email}}</v-list-item-subtitle>
                </v-list-item-content>
                
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="menuuser = !menuuser"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-item-action>

              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item @click="redirectProfile">
                <v-list-item-action>
                  <v-icon color="primary">mdi-account-box</v-icon>
                </v-list-item-action>
                <v-list-item-title>Meu Perfil</v-list-item-title>
              </v-list-item>

              <v-list-item @click="redirectDashboard" v-if="login.email == 'tom.soarez@gmail.com'">
                <v-list-item-action>
                  <v-icon color="primary">mdi-finance</v-icon>
                </v-list-item-action>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item>

              <v-list-item @click="redirectOrder" >
                <v-list-item-action>
                  <v-icon color="primary">mdi-cart</v-icon>
                </v-list-item-action>
                <v-list-item-title>Pedidos</v-list-item-title>
              </v-list-item>

              <v-list-item @click="redirectSale" v-if="login.email == 'tom.soarez@gmail.com'">
                <v-list-item-action>
                  <v-icon color="primary">mdi-tag</v-icon>
                </v-list-item-action>
                <v-list-item-title>Anúncios</v-list-item-title>
              </v-list-item>

              <v-list-item @click="searchAddress" v-if="login.email == 'tom.soarez@gmail.com'">
                <v-list-item-action>
                  <v-icon color="primary">mdi-plus-box</v-icon>
                </v-list-item-action>
                <v-list-item-title>Criar Novo Anúncio</v-list-item-title>
              </v-list-item>
              
            </v-list>
            <v-divider></v-divider>
            <v-list>
 
              <v-list-item @click="logout">
                <v-list-item-action>
                  <v-icon color="primary" left>exit_to_app</v-icon>
                </v-list-item-action>
                <v-list-item-title>Sair</v-list-item-title>
              </v-list-item>
              
            </v-list>
          </v-card>
        </v-menu>
        
        <v-menu
          v-if="login.status == false"
          v-model="menuuser"
          :close-on-content-click="false"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-avatar size="32px" v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-btn @click="autenticate" color="red" dark>
                    <v-icon dark small left>mdi-google</v-icon>
                    Entrar com Google
                  </v-btn>
                </v-list-item-action>
                <!--
                <v-list-item-action>
                  <v-btn @click="autenticate" color="indigo" dark>
                    <v-icon dark small left>mdi-facebook</v-icon>
                    Entrar com facebook
                  </v-btn>
                </v-list-item-action>
                -->
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <v-dialog
          v-model="dialog1"
          max-width="90%"
        >
          <v-card class="mb-12">
            <div>
              <v-alert
                prominent
                type="info"
                outlined
              >
                <v-row align="center">
                  <v-col class="grow">Complete o cadastro do seu perfil para anunciar!</v-col>
                  <v-col class="shrink">
                    <v-btn
                      color="primary"
                      @click="closeDialog()"
                    >
                      Atualizar Perfil
                    </v-btn>
                  </v-col>
                </v-row>
              </v-alert>
            </div>  
          </v-card>
        </v-dialog>  
        <v-dialog
          v-model="dialog"
          max-width="90%"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2">O que vai anunciar?</v-card-title>
          </v-card>  
          <!--
          <v-card>
            <v-card-title class="headline">O que vai anunciar?</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-group
                  v-for="item in items"
                  :key="item.title"
                  v-model="item.active"
                  :prepend-icon="item.action"
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="subItem in item.items"
                    :key="subItem.title"
                    @click=""
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Disagree
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
          -->
          <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1">
              Categoria do Anúncio
              <small>Selecione a categoria do anúncio</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-card class="mb-12">
                <v-list>
                  <v-list-group
                    v-for="item in items"
                    :key="item.title"
                    v-model="item.active"
                    :prepend-icon="item.action"
                    no-action
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item
                      v-for="subItem in item.items"
                      :key="subItem.title"
                      @click="passoapasso(2 ,subItem.component)"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </v-card>
              <!--
              <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
              -->
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">Dados do produto</v-stepper-step>

            <v-stepper-content step="2">
              <component :is="componente"></component>
              <v-btn color="primary" @click="dialog = false">Sair</v-btn>
              <!--<v-btn text>Cancel</v-btn>-->
            </v-stepper-content>

          </v-stepper>
        </v-dialog>

    </v-app-bar>
  </v-flex>
</template>

<script>
  //import eventHub from '../config/eventBus';
  import Andaime from './Andaime.vue'
  import Andaime1 from './Andaime1.vue'
  import { db, auth, provider } from '../config/db';
  const dbcategoria = db.ref('categoria');
  const dbproduto = db.ref('anuncio');
  const dbusuario = db.ref('usuario');
  export default {
    components: {
      Andaime,
      Andaime1
    },
    data: () => ({
      componente: '',
      objcategory: [], // init firebase category object
      objproduct: [],  // init firebase product object
      arraynomecategoria: {
        'andaimes1x1':'Andaimes 1.00x1.00',
        'andaimes150x100':'Andaimes 1.50x1.00',
        'andaimes150x150':'Andaimes 1.50x1.50',
        'escada-extensiva':'Escada Extensível',
        'escoras-metalicas':'Escora Metálica',
        'balancim':'Balancim',
        'diagonais':'Diagonais',
        'guardacorpo':'Guarda-Corpo',
        'plataformaMadeira':'Plataforma de Madeira',
        'plataformaMetalica':'Plataforma Metálica',
        'rodinhas':'Rodinhas com travas',
        'sapatas':'Sapatas Reguláveis',
        'tesouras':'Tesouras',
        'travessas':'Travessas',
      },
      items: [
        {
          action: 'mdi-wrench',
          title: 'Construções',
          items: [
            { title: 'Andaimes 1.00x1.00', component: 'Andaime' },
            { title: 'Andaimes 1.50x1.00', component: 'Andaime1' },
            { title: 'Andaimes 1.50x1.50', component: 'Andaime' },
          ],
        },
      ],
      e6: 1,
      autocompletepc: null,
      autocompletemobile: null,
      //search: null,
      login:{
        status: false,
        name: 'Entrar com Google',
        email: '',
        phone: '',
        url: '',
        alt: '',
        id: ''
      },
      iconperson:{
        status: true,
      },
      perfilAtualizado: false,
      dialog: false,
      dialog1: false,
      menuuser: false,
      drawer: null
    }),
    firebase:{
      objcategory: dbcategoria,
      objproduct: dbproduto
    },
    watch: {
      autocompletepc(newValue, oldValue) {
        if(newValue!=oldValue){
          this.redirectSearch(this.autocompletepc)
        }
      },
      autocompletemobile(newValue, oldValue) {
        if(newValue!=oldValue){
          this.redirectSearch(this.autocompletemobile)
        }
      }
    },
    methods:{  
      autenticate: function(){
        const that = this;
        auth.signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //var token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          const token = result.credential.accessToken;
          //alert(result.user.displayName)
          // ...
          auth.onAuthStateChanged(function(user) {
            if(token){
              //alert(token)
              that.login.name = user.displayName;
              that.login.email = user.email;
              that.login.url = user.photoURL;
              that.login.alt = user.email;
              //this.login.phone = result.user.phoneNumber,
              that.login.status = true;
              that.iconperson.status = false;
              that.searchUser();
            }  
          })  
        }).catch(function(error) {
          //that.login.status = false;
          //that.iconperson.status = true;
          alert(error.message)
          // ...
        });
      },
      searchUser: function(){
        const that = this; 
        const query = dbusuario.orderByChild("email").equalTo(this.login.email).limitToFirst(1);
        query.once('value', snapshot => {
          if(snapshot.exists()) {
            snapshot.forEach(function(childSnapshot) {
              that.login.id = childSnapshot.key
            });
            //console.log(that.userkey);
            //that.updateuser();
            //alert("Existe ");
            //that.userHub();
          }else{
            //alert("Não Existe");
            //console.log('Usuario não existente');
            that.insertUser();
          }
        })
      },
      insertUser(){
        const ithis = this;
        const idCliente = dbusuario.push({
          url: this.login.url,
          nome: this.login.name,
          cpf: '',
          email: this.login.email,
          ddd: '',
          telefone: '',
          endereco:
          {
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            //pais: $("#pais").val(),
            cep: ''
          },
          pedido:'',  
        });
        ithis.login.id = idCliente.key;  
        console.log(idCliente.key+": Inserimos Cliente");
        //ithis.userHub();
        //inserePedidoFB(idCliente.key);
      },
      searchAddress: function(){
        const that = this; 
        const query = dbusuario.orderByChild("email").equalTo(this.login.email).limitToFirst(1);
        query.once('value', snapshot => {
          if(snapshot.exists()) {
            snapshot.forEach(function(childSnapshot) {
              let enderecovededores = childSnapshot.val().endereco;
              if(
                childSnapshot.val().nome != '' &&
                childSnapshot.val().registro != '' &&
                childSnapshot.val().telefone != '' &&
                childSnapshot.val().telefone2 != '' &&
                enderecovededores['logradouro'] != '' &&
                enderecovededores['numero'] != '' &&
                enderecovededores['bairro'] != '' &&
                enderecovededores['cidade'] != '' &&
                enderecovededores['uf'] != ''
              ){
                that.perfilAtualizado = true;
                that.dialog = !that.dialog;
              }else{
                that.perfilAtualizado = false;
                that.dialog1 = !that.dialog1;
              }
              //console.log(childSnapshot.key);
            });
            //console.log(that.userkey);
            //that.updateuser();
            //alert("Existe ");
            //that.userHub();
          }else{
            //alert("Não Existe");
            //console.log('Usuario não existente');
            
          }
        })
      },
      passoapasso: function(step, produto){
        this.e6 = step;
        this.componente = produto
        //alert(step+" - "+produto);
        //this.produto
        
      },
      closeDialog: function(){
        this.dialog1 = false;
        this.$router.push({ name: 'profile', params: { search: this.login.id } })
      },
      redirectHome: function(){
        this.$router.push({ name: '/'})
      },
      redirectSearch: function(obj){
        this.$router.push({ name: 'search', params: { search: obj } })
      },
      redirectProfile: function(){
        this.$router.push({ name: 'profile', params: { search: this.login.id } })
      },
      redirectOrder: function(){
        this.$router.push({ name: 'order', params: { search: this.login.id } })
      },
      redirectSale: function(){
        this.$router.push({ name: 'sale', params: { search: this.login.id } })
      },
      redirectDashboard(){
        this.$router.push({ name: 'dashboard', params: { search: this.login.id } })
      },
      logout: function(){
        const it = this;
        auth.signOut().then(function() {
          it.login.name = "Entrar com Google";
          it.login.status = false;
          it.iconperson.status = true;  
          // Sign-out successful.
        }).catch(function(error) {
          alert(error.message);
          // An error happened.
        });
      }
    },
    created: function () {
      const that = this;
      auth.onAuthStateChanged(function(user) {
        if(user){
          //alert(user.displayName);
          that.login.name = user.displayName;
          that.login.email = user.email;
          that.login.url = user.photoURL;
          that.login.alt = user.email;
          //this.login.phone = result.user.phoneNumber,
          that.login.status = true;
          that.iconperson.status = false;
          that.searchUser();  
        }  
      })
    },
    props: {
      item: Object
    }
  }
</script>
