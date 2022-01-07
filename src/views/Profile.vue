<template>
  <v-row>
    <v-col cols="12" sm="12">
      <!--<v-subheader>Bussca por: "{{search}}"</v-subheader>-->
      <v-container fluid>
        
        <v-row class="white">
          <v-subheader>Dados da Conta</v-subheader>
          <v-col cols="12">
              
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
              >
                <v-row>   
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      outlined
                      v-model="user"
                      :rules="nameRules"
                      clearable
                      label="Usuário"
                      persistent-hint
                      required
                      disabled
                      >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="email"
                      outlined
                      clearable
                      label="E-mail"
                      persistent-hint
                      :rules="emailRules"
                      required
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>                                  
              </v-form>
            
          </v-col>
        </v-row>

        <v-row class="white">
          <v-subheader>Dados do Usuário</v-subheader>
          <v-col cols="12">
             
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
              >
                <v-row>   
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      outlined
                      v-model="name"
                      :rules="nameRules"
                      clearable
                      hint="Ex: Josias Ribeiro da Silva "
                      label="Nome completo"
                      persistent-hint
                      required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      outlined
                      v-model="registro"
                      :rules="nameRules"
                      clearable
                      hint="Ex: xxx.xxx.xxx-xx ou xx.xxx.xx/xxxx-xx"
                      label="CPF/CNPJ"
                      persistent-hint
                      v-mask="['###.###.###-##', '##.###.###/####-##']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      outlined
                      v-model="phone"
                      clearable
                      hint="Ex: (xx) xxxxx-xxxx"
                      label="Telefone 1"
                      persistent-hint
                      v-mask="['(##) ####-####', '(##) #####-####']"
                      :rules="phoneRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field 
                      outlined
                      clearable
                      v-model="phone2"
                      hint="(opcional) Ex: (xx) xxxxx-xxxx"
                      label="Telefone 2"
                      persistent-hint
                      v-mask="['(##) ####-####', '(##) #####-####']"
                      :rules="phoneRules"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>                                  
              </v-form>
            
          </v-col>
        </v-row>

        <v-row class="white">
          <v-subheader>Endereço de entrega/recebimento</v-subheader>
          <v-col cols="12">
              <v-form
                ref="form2"
                v-model="valid2"
                :lazy-validation="lazy"
              >
                <v-row>
                  <v-col cols="12" sm="3">
                    <v-text-field 
                      outlined
                      clearable
                      hint="Ex: 20090-908"
                      v-model="cep"
                      label="CEP*"
                      v-mask="['#####-###']"
                      persistent-hint
                      required>
                    </v-text-field>
                    <v-snackbar
                      v-model="tooltip"
                      top
                    >
                      CEP Inválido
                      <v-btn
                        color="pink"
                        text
                        @click="tooltip = false"
                      >
                        Fechar
                      </v-btn>
                    </v-snackbar>  
                  </v-col>
                  <v-col cols="12" sm="2">
                    <v-btn @click="searchAddress" x-large outlined color="indigo">
                      Buscar
                      <v-icon right dark>mdi-map-search</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="2">
                    <v-btn href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank" text x-large>Não sei o CEP</v-btn>
                  </v-col>
                </v-row>
                
                <div v-show="address == true">
                  <v-row>
                    <v-col cols="12" sm="5">
                      <v-text-field 
                        outlined
                        clearable
                        v-model="logradouro"
                        :rules="nameRules"
                        return-masked-value
                        label="Logradouro"
                        mask="AAAAAAAAAAAAAAAA"
                        persistent-hint
                        readonly
                        required
                        disabled
                        >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-text-field 
                        outlined
                        clearable
                        hint="Ex: 45"
                        v-model="numero"
                        :rules="nameRules"
                        label="Numero*"
                        return-masked-value                                          
                        persistent-hint
                        required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field 
                        outlined
                        clearable
                        hint="Ex: Apartamento 201"
                        v-model="complemento" 
                        label="Complemento"
                        return-masked-value
                        persistent-hint>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="5">
                      <v-text-field 
                        outlined
                        clearable
                        v-model="bairro"
                        :rules="nameRules"
                        label="Bairro"
                        return-masked-value                                        
                        persistent-hint
                        readonly
                        required
                        disabled
                        >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field 
                        outlined
                        clearable
                        v-model="cidade"
                        :rules="nameRules"
                        label="Cidade"
                        return-masked-value                                 
                        persistent-hint
                        readonly
                        required
                        disabled
                        >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-text-field 
                        outlined
                        clearable
                        v-model="uf"
                        :rules="nameRules"
                        label="Estado"
                        return-masked-value
                        mask="AA"
                        persistent-hint
                        readonly
                        required
                        disabled
                        >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>    
                    <v-spacer></v-spacer><v-btn color="primary" large :disabled="!valid2" @click="updateUser()">Atualizar Perfil <v-icon dark right>mdi-checkbox-marked-circle</v-icon></v-btn>
                  </v-row>     
                </div>
              </v-form>
          </v-col>
        </v-row>
        <v-snackbar
          v-model="snackbar"
        >
          {{ text }}
          <v-btn
            color="pink"
            text
            @click="snackbar = false"
          >
            Fechar
          </v-btn>
        </v-snackbar>
      </v-container>
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
  import axios from 'axios';
  import { mask } from 'vue-the-mask';
  import { db, auth, provider } from '../config/db';
  const dbusuario = db.ref('usuario');
  const dbcategoria = db.ref('anuncio').orderByChild('titulo');
  //const that = this.key;
  export default {
    props:['search'],
    texto: 'andaimes',
    directives: {
      mask,
    },
    data: function () {
      return {
        objcategory: [],
        tooltip: false,
        snackbar: false,
        text: '',
        address: false,
        valid: true,
        valid2: true,
        lazy: false,
        user:'',
        idusuario:'',
        name:'',
        nameRules: [
          v => !!v || 'O nome deve ser preenchido!',
          v => (v && v.length <= 80) || 'O nome deve ser preenchido corretamente!'
        ],
        registro: '',
        cpfRules: [
          v => !!v || 'O CPF deve ser preenchido',
          v => (v && v.length <= 14) || 'O CPF deve ser preenchido corretamente!'
        ],
        phone: '',
        phone2: '',
        phoneRules: [
          v => !!v || 'O telefone deve ser preenchido',
          v => (v && v.length <= 15) || 'O telefone deve ser preenchido corretamente!'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail deve ser preenchido!',
          v => /.+@.+/.test(v) || 'E-mail deve ser preenchido corretamente!'
        ],
        // End About Form -> Contact
        // About Form -> Address
        address: false,
        cep:'',
        logradouro:'',
        numero:'',
        complemento:'',
        bairro:'',
        cidade:'',
        uf:'',
        // End About Form -> Contact
      }
    },
    created: function () {
      const that = this;
      auth.onAuthStateChanged(function(user) {
        if(user){
          //alert(user.displayName);
          that.user = user.displayName;
          that.email = user.email;
          that.searchUser();
        }  
      })
    },
    methods:{
      searchAddress(){
        axios
          .get('https://viacep.com.br/ws/'+this.cep+'/json/')
          .then(response => (         
            this.logradouro = response.data.logradouro,
            this.bairro = response.data.bairro,
            this.cidade = response.data.localidade,
            this.uf = response.data.uf  
          ))
        if(this.logradouro != undefined){
          this.address = true;
          this.tooltip = false
        }else{
          this.tooltip = true
        }  
      },
      searchUser(){
        const that = this; 
        const query = dbusuario.orderByChild("email").equalTo(this.email).limitToFirst(1);
        query.on('child_added', snapshot => {
          if(snapshot.exists()) {
            that.idusuario = snapshot.key;
            that.name = snapshot.val().nome;
            that.registro = snapshot.val().registro;
            that.phone = snapshot.val().telefone;
            that.phone2 = snapshot.val().telefone2;
            let enderecovededores = snapshot.val().endereco;
            that.cep = enderecovededores['cep'];
            if(enderecovededores['cep'] != ''){
              that.address = true
            }
            that.numero = enderecovededores['numero'];
            that.complemento = enderecovededores['complemento'];   
            that.logradouro = enderecovededores['logradouro'];
            that.bairro = enderecovededores['bairro'];
            that.cidade = enderecovededores['cidade'];
            that.uf = enderecovededores['uf'];   
            //console.log(childSnapshot.key);
            //console.log(that.userkey);
            //that.updateuser();
            //alert("Existe ");
            //that.userHub();
          }else{
            //alert("Não Existe");
            console.log('Usuario não existente');
            //that.insertUser();
          }
        })
      },
      updateUser(){
        const that = this;
        db.ref('usuario/'+this.idusuario).update({
          usuario: this.user,
          email: this.email,
          nome: this.name,
          registro: this.registro,
          telefone: this.phone,
          telefone2: this.phone2,
          endereco:{
            cep: this.cep,
            logradouro: this.logradouro,
            numero: this.numero,
            complemento: this.complemento,
            bairro: this.bairro,
            cidade: this.cidade,
            uf: this.uf,
          }
        }, function(error) {
          if (error) {
            that.text = 'Erro ao Atualizar, tente mais tarde!'
            // The write failed...
          } else {    
            that.text = 'Perfil atualizado com Sucesso!'
            // Data saved successfully!
          }
       });
       //this.valid2 = false;
       this.snackbar = true
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