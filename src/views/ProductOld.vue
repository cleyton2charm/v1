<template>
  <v-container class="grey lighten-4" fluid>
    {{ searchProduct() }} 
    <v-row>
      <v-col cols="12" sm="6">
        <v-row
          align="start"
          justify="start"
        >
          <v-col
            cols="12"
          >
            <v-card
            >
              <v-carousel 
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
              >
                <v-carousel-item
                  v-for="(slide, i) in slides"
                  :key="i"
                  :src="imagem"
                >
                  <!--
                  <v-sheet
                    :color="colors[i]"
                    height="100%"
                  >
                    <v-row
                      class="fill-height"
                      align="center"
                      justify="center"
                    >
                      <div class="display-3">{{ slide }} Slide</div>
                    </v-row>
                  </v-sheet>
                  -->
                </v-carousel-item>
              </v-carousel>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="vendedor.url"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{vendedor.nome}}</v-list-item-title>
                    <v-list-item-subtitle>{{vendedor.endereco.bairro}}, {{vendedor.endereco.cidade}}<v-icon small>mdi-map-marker-outline</v-icon></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>  
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <v-row
          justify="start"
          align="start"
        >
          <v-col
            cols="12"
          >
            <v-card
              
            >  
              <!--
              <v-list-item>
                <v-list-item-content>
                  <div class="headline black--text">{{ nome }} {{ descricao }}</div>
                </v-list-item-content>
              </v-list-item>
              -->
              <v-card-text>
                <v-row>
                  <v-col class="display-2 black--text" cols="12">                    
                    <div class="headline black--text">{{ nome }} {{ descricao }}</div>
                    <v-divider class="mx-4"></v-divider>
                    <div v-for="(value, name, index) in valor" :key="index" v-if="index == chip">
                        R$ {{valorQuantidade(value.value)}}<span class="display-1">,00</span>
                    </div>
                    
                  </v-col>
                </v-row>                
              
              <!--
              <v-divider class="mx-4"></v-divider>
              -->
                <div v-for="(value, name, index) in frete" :key="index" v-if="index == chipfrete">
                  <span class="subheading black--text font-weight-black">{{ arraynometaxafrete[name] }}: R$ {{value.value}}</span>
                </div>  
                <v-chip-group
                  v-model="chipfrete"
                  active-class="deep-purple accent-4 white--text"
                  mandatory
                >
                  <v-chip label filter v-for="(value, name, index) in frete" :key="index" :value="index" @click="valorFrete(value.value)" v-if="value.status == true">
                    {{ arraynomefrete[name] }}
                  </v-chip>
                </v-chip-group>

                <span class="subheading black--text">Período de locação:</span>
                <v-chip-group
                  v-model="chip"
                  active-class="deep-purple accent-4 white--text"
                  mandatory
                >
                  <v-chip label filter v-for="(value, name, index) in valor" :key="index" :value="index"  @click="selectValor(objetovalor)" v-if="value.status == true">
                    {{ arraynomedias[name] }}
                  </v-chip>
                </v-chip-group>
              
                <span class="subheading black--text">Formas de pagamento:</span>
                <v-chip-group
                  v-model="chipformapagamento"
                  active-class="deep-purple accent-4 white--text"
                  mandatory
                >
                  <v-chip label filter v-for="(index, objetopagamento) in pagamento" :key="objetopagamento" :value="objetopagamento" v-if="index == true">
                    {{ arraynomepagamento[objetopagamento] }}
                  </v-chip>
                </v-chip-group>
                <span class="subheading black--text">Quantidade ({{ quantidadeestoque }}):</span>
                <v-row justify="start">
                  <!--<v-icon @click="quantidade--">mdi-minus</v-icon>-->
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="quantidade"
                      label="Unidade"
                      append-outer-icon="mdi-plus"
                      prepend-icon="mdi-minus"
                      @click:prepend="quantidade--"
                      @click:append-outer="quantidade++"
                      outlined                     
                    >  
                    </v-text-field>
                  </v-col>  
                  <v-col cols="12" sm="8">
                    <v-btn
                      x-large
                      color="pink"
                      v-on="on"
                      outlined
                      item
                      block
                      @click="verificaStatus"
                    >
                      Reservar agora
                    </v-btn>
                    <v-dialog
                      v-model="dialogLogin"
                      max-width="300"
                    >
                      <v-card>
                        <v-card-title
                          class="headline grey lighten-2"
                          primary-title
                        >
                          Bem-Vindo ao Aluga já
                        </v-card-title>
                        
                        <v-card-text>
                          <br/>
                          <v-btn
                            x-large
                            color="error"
                            block
                            @click="autenticate"
                          >
                          <v-icon left>mdi-google-plus</v-icon>
                          Entrar com Google
                                                        
                          </v-btn>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red"
                            text
                            @click="dialogLogin = false"
                          >
                            Sair
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                      <!--
                      <template v-slot:activator="{ on }">
                        <v-btn
                          x-large
                          color="pink"
                          v-on="on"
                          outlined
                          item
                          block
                          @click="verificaStatus"
                        >
                          Reservar agora
                        </v-btn>
                      </template>
                      -->
                        <v-toolbar dark color="primary">
                          <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                          <v-toolbar-title>Finalizar reserva</v-toolbar-title>
                          <!--
                          <v-spacer></v-spacer>
                          <v-toolbar-items>
                            <v-btn dark text @click="dialog = false">Save</v-btn>
                          </v-toolbar-items>
                          -->
                        </v-toolbar>
                        
                        <v-list three-line subheader>
                          <!--<v-subheader>Selecione a data da entrega e saída {{new Date(picker).toLocaleString()}}</v-subheader>-->
                                                    
                          <v-list-item>
                            <v-list-item-content>
                              
                              <v-stepper v-model="e13" vertical>
                                <v-stepper-step step="0" :complete="e13 > 0">
                                  Carrinho de compras
                                </v-stepper-step>

                                <v-stepper-content step="0">
                                    <v-row>
                                      <v-col cols="12">
                                        <v-list>   
                                          <v-card
                                            class="mx-auto"
                                          >   
                                          <v-list-item>
                                            <v-list-item-avatar>
                                              <v-img :src="imagem"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                              <v-list-item-title>{{nome}}</v-list-item-title>
                                              <v-list-item-subtitle> {{quantidade}} Unidade(s) por {{arraynomedias[Object.keys(valor)[chip]]}} {{ numeroDeDias(arraynomedias[Object.keys(valor)[chip]]) }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-icon>
                                              <div v-for="(value, name, index) in valor" :key="index" v-if="index == chip">
                                                R$ {{valorQuantidade(value.value)}},00
                                              </div>
                                            </v-list-item-icon>
                                          </v-list-item>
                                          <v-divider></v-divider>
                                          <v-list-item>
                                            <v-list-item-avatar>
                                              <v-icon>mdi-truck-fast</v-icon>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                              <div v-for="(value, name, index) in frete" :key="index" v-if="index == chipfrete">
                                                <v-list-item-title v-text="arraynometaxafrete[name]"></v-list-item-title>
                                                <!--<v-list-item-subtitle>Frete</v-list-item-subtitle>-->
                                              </div>
                                            </v-list-item-content>
                                            <v-list-item-icon>
                                              <div v-for="(value, name, index) in frete" :key="index" v-if="index == chipfrete">
                                                R$ {{ valorFrete(value.value) }}
                                              </div>
                                            </v-list-item-icon>
                                          </v-list-item> 
                                          <v-divider></v-divider>
                                          <v-list-item>
                                            <v-list-item-avatar>
                                              <v-icon>mdi-square-inc-cash</v-icon>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                              <v-list-item-title class="subheading black--text font-weight-black">Valor Total</v-list-item-title>
                                              <v-list-item-subtitle>({{arraynomepagamento[chipformapagamento]}})</v-list-item-subtitle>                               
                                            </v-list-item-content>
                                            
                                            <v-list-item-icon>
                                              <span class="subheading black--text font-weight-black">R$ {{valorTotal()}},00</span>
                                            </v-list-item-icon>
                                          </v-list-item>                         
                                          </v-card>
                                        </v-list>
                                      </v-col>                                     
                                    </v-row>
                                  <v-btn color="primary"  @click="e13 = 1">Passo 1 <v-icon dark right>mdi-arrow-right</v-icon></v-btn>
                                  <!--<v-btn text>Cancel</v-btn>-->
                                </v-stepper-content>
                                
                                <v-stepper-step step="1" :complete="e13 > 1">
                                  Período de locação
                                </v-stepper-step>

                                <v-stepper-content step="1">
                                    <v-row>
                                      <v-col cols="12" >
                                        <v-menu
                                          v-model="menu1"
                                          :close-on-content-click="false"
                                          max-width="290"
                                        >
                                          <template v-slot:activator="{ on }">
                                            <v-text-field
                                              :value="computedDateFormattedMomentjs"
                                              outlined
                                              clearable
                                              hint="Data de entrega do material"
                                              label="Defina a data entrega"
                                              
                                              persistent-hint
                                              readonly
                                              v-on="on"
                                            ></v-text-field>
                                          </template>
                                          <v-date-picker
                                            v-model="date"
                                            @change="menu1 = false"
                                            locale="pt-br"
                                            :min="mindate"
                                          ></v-date-picker>
                                        </v-menu>
                                      </v-col>
                                      <div v-show="showdate == true">
                                        <v-col cols="12">
                                          <v-menu
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            max-width="290"
                                          >
                                            <template v-slot:activator="{ on }">
                                              <v-text-field
                                                :value="computedDateFormattedMomentjs2"
                                                outlined
                                                clearable
                                                hint="Data de retirada do material"
                                                label="Defina a data Retirada"
                                                
                                                persistent-hint
                                                readonly
                                                v-on="on"
                                              ></v-text-field>
                                            </template>
                                            <v-date-picker
                                              v-model="date2"
                                              @change="menu2 = false"
                                              locale="pt-br"
                                              :min="mindate2"
                                              :max="maxdate2"
                                            ></v-date-picker>
                                          </v-menu>
                                        </v-col>
                                        
                                        <v-col cols="12">
                                          <v-alert
                                            text
                                            outlined
                                            color="error"
                                          >
                                            <!--<h3 class="headline">Regras de Entrega/retirada</h3>-->
                                            <div><strong>Termos e condições</strong><br /><br />As entregas e retiradas são efetuadas no horário comercial 08h às 17h de seg a sex, não agendamos horário, caso não tenha disponibilidade, não aceite o termo!
                                            <v-checkbox v-model="checkstep1" color="error" label="Estou ciente e aceito!"></v-checkbox></div>                                        
                                          </v-alert>
                                        </v-col> 
                                      </div>   
                                    </v-row>
                                  <v-btn color="primary" :disabled="!checkstep1" @click="e13 = 2">Passo 2 <v-icon dark right>mdi-arrow-right</v-icon></v-btn>
                                  <!--<v-btn text>Cancel</v-btn>-->
                                </v-stepper-content>

                                <v-stepper-step step="2" :complete="e13 > 2">Dados de Entrega</v-stepper-step>

                                <v-stepper-content step="2">
                                  <v-form
                                    ref="form"
                                    v-model="valid"
                                    :lazy-validation="lazy"
                                  >
                                    <v-row>
                                      
                                      <v-col cols="12">
                                        <v-text-field 
                                          outlined
                                          v-model="name"
                                          :rules="nameRules"
                                          clearable
                                          hint="Ex: Josias Ribeiro da Silva "
                                          label="Nome completo"
                                          prepend-icon="mdi-account"
                                          persistent-hint
                                          required>
                                        </v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6">
                                        <v-text-field 
                                          outlined
                                          v-model="cpf"
                                          :rules="nameRules"
                                          clearable
                                          hint="Ex: xxx.xxx.xxx-xx ou xx.xxx.xx/xxxx-xx"
                                          label="CPF/CNPJ"
                                          prepend-icon="mdi-account-card-details"
                                          persistent-hint
                                          v-mask="['###.###.###-##', '##.###.###/####-##']"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6">
                                        <v-text-field
                                          v-model="email"
                                          outlined
                                          clearable
                                          hint="(opcional) Ex: alugaja@alugaja.com.br"
                                          label="E-mail"
                                          prepend-icon="mdi-email"
                                          persistent-hint
                                          :rules="emailRules"
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
                                          prepend-icon="mdi-phone"
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
                                          prepend-icon="mdi-phone"
                                          persistent-hint
                                          v-mask="['(##) ####-####', '(##) #####-####']"
                                          :rules="phoneRules"
                                          required
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>                                  
                                    <v-btn color="primary" :disabled="!valid" @click="e13 = 3">Passo 3 <v-icon dark right>mdi-arrow-right</v-icon></v-btn>
                                  </v-form>
                                </v-stepper-content>

                                <!--
                                  <v-stepper-step :rules="[() => false]" step="3">
                                  Ad templates
                                  <small>Alert message</small>
                                </v-stepper-step>
                                -->
                                <v-stepper-step step="3" :complete="e13 > 3">Endereço de entrega</v-stepper-step>
                                <v-stepper-content step="3">
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
                                            hint="Ex: Avenida Rio Branco"
                                            v-model="logradouro"
                                            :rules="nameRules"
                                            return-masked-value
                                            label="Logradouro"
                                            mask="AAAAAAAAAAAAAAAA"
                                            persistent-hint
                                            readonly
                                            required>
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
                                            hint="Ex: Centro"
                                            v-model="bairro"
                                            :rules="nameRules"
                                            label="Bairro"
                                            return-masked-value
                                                                                      
                                            persistent-hint
                                            readonly
                                            required>
                                          </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="5">
                                          <v-text-field 
                                            outlined
                                            clearable
                                            hint="Ex: Rio de Janeiro"
                                            v-model="cidade"
                                            :rules="nameRules"
                                            label="Cidade"
                                            return-masked-value
                                                                                      
                                            persistent-hint
                                            readonly
                                            required>
                                          </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="2">
                                          <v-text-field 
                                            outlined
                                            clearable
                                            hint="Ex: RJ"
                                            v-model="uf"
                                            :rules="nameRules"
                                            label="Estado"
                                            return-masked-value
                                            mask="AA"
                                            persistent-hint
                                            readonly
                                            required>
                                          </v-text-field>
                                        </v-col>
                                      </v-row>  
                                          
                                      <v-btn color="primary" :disabled="!valid2" @click="insertOrder()">Finalizar <v-icon dark right>mdi-checkbox-marked-circle</v-icon></v-btn>
                                    </div>
                                  </v-form>  
                                  <!--<v-btn text>Cancel</v-btn>-->
                                </v-stepper-content>
                                
                                <v-dialog v-model="dialogEnd" persistent max-width="500px">
                                  <v-card>
                                    <v-card-title
                                      class="headline"
                                      primary-title
                                    >
                                      <v-icon size="75px" color="light-blue darken-3">check_circle_outline</v-icon> Pedido realizado com sucesso! 
                                    </v-card-title>
                                    <v-card-text>
                                      <v-list two-line>
                                        <!--
                                          <v-list-item>
                                            <v-list-item-avatar>
                                              <v-icon>person_pin</v-icon>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                              <v-list-item-title>{{name}} - {{email}}</v-list-item-title>
                                              <v-list-item-sub-title>{{phone}} / {{phone2}}</v-list-item-sub-title>
                                            </v-list-item-content>
                                          </v-list-item>
                                        -->
                                        <v-list-item>
                                          <v-list-item-avatar>
                                            <img :src="imagem">
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title>{{nome}} {{descricao}}</v-list-item-title>
                                            <v-list-item-sub-title>{{quantidade}} unidade(s) por R${{subtotal}},00</v-list-item-sub-title>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-avatar>
                                            <v-icon>mdi-map-marker-radius</v-icon>
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title>{{logradouro}}, {{numero}} {{complemento}} - {{bairro}}, {{cidade}} - {{uf}} </v-list-item-title>
                                            <v-list-item-sub-title>por R${{valorfrete}}</v-list-item-sub-title>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-avatar>
                                            <v-icon>mdi-truck-fast</v-icon>
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title>Entrega: {{computedDateFormattedMomentjs}}</v-list-item-title>
                                            <v-list-item-sub-title>Retirada: {{computedDateFormattedMomentjs2}}</v-list-item-sub-title>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-avatar>
                                            <v-icon>mdi-square-inc-cash</v-icon>
                                          </v-list-item-avatar>
                                          <v-list-item-content>
                                            <v-list-item-title class="black--text font-weight-black">Valor total à pagar R${{valorTotal()}},00 ({{arraynomepagamento[chipformapagamento]}}) </v-list-item-title>
                                            <!--<v-list-item-sub-title></v-list-item-sub-title>-->
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>
                                      <v-divider light></v-divider>
                                      Em breve, vamos te ligar para confirmar!
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                      <v-btn color="primary" flat @click="">Ir para o perfil</v-btn>
                                      <v-spacer></v-spacer>
                                      <v-btn color="primary" flat @click="dialogEnd = false">Retornar para pagina principal</v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                                
                              </v-stepper>
                                
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      
                    </v-dialog>
                  </v-col>
                  <!--<v-icon @click="quantidade++">mdi-plus</v-icon>-->
                </v-row>
              </v-card-text>
              <!--
              <v-card-actions>
                <v-btn
                  block
                  color="error"
                  @click="reserve"
                >
                  Reservar
                </v-btn>
              </v-card-actions>
            -->
            </v-card>
          </v-col>         
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Especificações Técnicas</v-card-title>
          <v-simple-table>
            
              <thead>
                <tr>
                  <th class="text-left">Item</th>
                  <th class="text-left">Quatidade</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, name, index) in acessorio" :key="name" v-if="value.status==true">
                  <td>{{ arraynomeacessorio[name] }}</td>
                  <td>{{value.value}}</td>
                </tr>
              </tbody>
            
          </v-simple-table>
        </v-card>    
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Detalhes Adicionais</v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>    
      </v-col>
    </v-row>  
  </v-container>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';
  import { mask } from 'vue-the-mask';
  moment.locale("pt-br");
  import { db, auth, provider } from '../config/db';
  //console.log();
  const dbproduto = db.ref('produto');
  const dbusuario = db.ref('usuario');
  const dbpedido = db.ref('pedido');
  const valor = {};
  const pagamento = {};
  const frete = {};
  const acessorio = {};
  //const that = this.key;
  export default {
    directives: {
      mask,
    },
    props:['product'],
    texto: 'andaimes',
    data: function () {
      return {
        valorSelect: null,
        valorfrete: null,
        chipfrete: 0,
        chipformapagamento: 'credito',
        chip: 0,//'thirtyDays',
        idproduct: this.product,
        nome: '',
        imagem:'',
        descricao: '',
        //acessorios: '',
        quantidadeestoque: '',
        entrega: '',
        retirada: '',
        subtotal: '',
        extra: '',
        frete: '',
        vendedor:{
          nome:'',
          email:'',
          url:'',
          endereco:{
            logradouro:'',
            numero:'',
            complemento:'',
            bairro:'',
            cidade:'',
            uf:'',
            cep:''
          }
        },
        //valor: [],
        //valor: parseFloat(this.valor) + parseFloat(this.frete) ,
        situacao:'0',
        status:'0',
        arraynomedias: {'thirtyDays': '30 dias', 'fifteenDays': '15 dias', 'sevenDays': '7 dias'},
        arraynomepagamento: {'dinheiro':'Dinheiro', 'credito':'Cartão de Crédito', 'debito':'Cartão de Débito', 'boleto':'Boleto', 'transferencia':'Transferência Bancária', 'deposito':'Depósito Bancário'},
        arraynomefrete: {'entregaretirada':'Frete incluso', 'retiradalocal':'Retirada na loja'},
        arraynometaxafrete: {'entregaretirada':'Taxa de entrega/retirada', 'retiradalocal':'Taxa de retirada na loja'},
        arraynomeacessorio: {'andaimes1x1':'Andaimes 1.00x1.00', 'diagonais':'Diagonais', 'guardacorpo':'Guarda-Corpo', 'plataformaMadeira':'Plataforma de Madeira', 'plataformaMetalica':'Plataforma Metálica', 'rodinhas':'Rodinhas com travas', 'sapatas':'Sapatas Reguláveis', 'tesouras':'Tesouras', 'travessas':'Travessas'},
        
        //
        numeroDias: 1,
        minlimitdate: new Date(Date.now() + ( 3600 * 1000 * 24)).toISOString().substr(0, 10),
        picker: new Date(Date.now() + ( 3600 * 1000 * 24)).toISOString().substr(0, 10),
        pickerExit: null,
        pickerDate: null,
        dialog: false,
        dialogEnd: false,
        dialogLogin: false,
        modalEnterData: false,
        e13:0,
        tooltip: false,
        //
        showdate: false,
        mindate: new Date(Date.now() + ( 3600 * 1000 * 24)).toISOString().substr(0, 10),
        mindate2: null,
        maxdate2: null,
        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        //
        checkstep1: false,
        //
        mask: null,
        tel1: null,
        //
        // About Form -> Contact 
        valid: true,
        valid2: true,
        lazy: false,
        /*
        cepRules: 
          v => (this.logradouro == undefined) || 'cep inválido'
        ,
        */
        name:'',
        nameRules: [
          v => !!v || 'O nome deve ser preenchido!',
          v => (v && v.length <= 80) || 'O nome deve ser preenchido corretamente!'
        ],
        cpf: '',
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
        //
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
        quantidade: 1,
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ]
      }
    },
    created: function () {
      const that = this;
      auth.onAuthStateChanged(function(user) {
        if(user){
          //alert(user.displayName);
          that.name = user.displayName;
          that.email = user.email;
        }  
      })
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('LLLL').slice(0, -9): ''
      },
      computedDateFormattedMomentjs2 () {
        return this.date2 ? moment(this.date2).format('LLLL').slice(0, -9): ''
      }
    },
    watch:{
      date(){
        //alert();
        //let arrayDayOne = new Date(new Date(this.picker).setDate(new Date(this.picker).getDate() + 3)); 
        let maxpicker2 = new Date(new Date(this.date).setDate(new Date(this.date).getDate() + parseInt(this.numeroDias)));
        //this.pickerEnter = this.picker;
        this.mindate2 = this.date;
        this.date2 = new Date(maxpicker2).toISOString().substr(0, 10);
        this.maxdate2 = new Date(maxpicker2).toISOString().substr(0, 10);
        //alert(new Date(maxpicker2).toISOString().substr(0, 10))
        //this.pickerExit = new Date(arrayDayOne).toISOString().substr(0, 10);
        this.showdate = true
      },
      quantidade(){
        if(this.quantidade <= 1){
          this.quantidade = 1;
        }
        if(this.quantidade >= this.quantidadeestoque){
          this.quantidade = this.quantidadeestoque;
        }
      }
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
      searchProduct(){
        const that = this; 
        const query = db.ref('anuncio/-Lk5fT9DzAAMMRkhzlSA');
        const valores = '';
        const pagamentos = '';
        const frete = '';
        const acessorios = '';
        query.once('value', snapshot => {
          if(snapshot.exists()) {
            //console.log(snapshot.val().nome);
            that.nome = snapshot.val().titulo;
            that.descricao = snapshot.val().descricao;
            that.imagem = snapshot.val().urlimg;
            that.valores = snapshot.val().valores;
            that.pagamentos = snapshot.val().pagamentos; 
            that.frete = snapshot.val().frete;
            that.quantidadeestoque = snapshot.val().quantidade;
            that.vendedor.email = snapshot.val().usuario;
            that.acessorios = snapshot.val().acessorios;
            this.searchUser();
            //console.log(that.valores)
          }else{
            console.log('Usuario não existente');
          }
        })
        this.valor = that.valores;
        this.pagamento = that.pagamentos;
        this.frete = that.frete;
        this.acessorio = that.acessorios;
        
        //console.log(this.acessorio);
      },
      searchUser: function(){
        const that = this; 
        const query = dbusuario.orderByChild("email").equalTo(this.vendedor.email).limitToFirst(1);
        query.on('child_added', snapshot => {
          if(snapshot.exists()) {
            that.vendedor.id = snapshot.key;
            that.vendedor.nome = snapshot.val().nome;
            that.vendedor.url = snapshot.val().url;
            let enderecovededores = snapshot.val().endereco;
            that.vendedor.endereco.bairro = enderecovededores['bairro'];
            that.vendedor.endereco.cidade = enderecovededores['cidade'];   
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
      insertOrder(){        
        const objpedido = dbpedido;
        objpedido.push({
          usuario: this.email,  
          produto: {
            id: this.idproduct,
            produto: this.nome,
            descricao: this.descricao,
            acessorios: this.acessorios,
            quantidade: this.quantidade,
            valor: this.subtotal
          },
          usuario: {
            nome: this.name,
            registro: this.cpf,
            email: this.email,
            telefone: this.phone,
            telefone2: this.phone2,
          },
          enderecodentrega:
          { 
            entlogradouro: this.logradouro,
            entnumero: this.numero,
            entcomplemento: this.complemento,
            entbairro: this.bairro,
            entcidade: this.cidade,
            entestado: this.uf,
            //entpais: $("#pais").val(),
            entcep: this.cep
          },
          entrega: this.date,
          retirada: this.date2,
          metodopgto: this.chipformapagamento,
          subtotal: this.subtotal,
          extra: '',
          frete: this.valorfrete,
          valor: parseFloat(this.subtotal) + parseFloat(this.valorfrete),
          situacao: this.situacao,
          status: this.status,
          emissao: new Date().toISOString().substr(0, 10),
          codpagseguro:''
        });
        this.dialogEnd = true
        //this.redirectAccount();
        //user = objetoid;
        //console.log("Revelado o ID do Pedido do "+objpedido.key);
      },
      redirectAccount(){
        this.$router.push({ name: 'account', params: { search: this.userkey } })
      },
      numeroDeDias(obj){
        //console.log(obj.replace(/ dias/g, ""));
        this.numeroDias = obj.replace(/ dias/g, "");
      },
      valorQuantidade(obj){
        let result = this.quantidade * obj;
        this.subtotal = result;
        //console.log(result);
        //console.log(result+" - "+this.valorfrete);
        return result
      },
      valorFrete(obj){
        //alert(obj)
        let result = obj;
        this.valorfrete = result;
        return result
      },
      selectValor(obj){
        //alert("estoy aki"+obj);
        this.valorSelect = obj 
      },
      valorTotal(){
        let result = parseInt(this.subtotal) + parseInt(this.valorfrete);
        return result
      },
      verificaStatus(){
        if(this.email != ''){
          //alert('Logado como: ' + this.name + '(' + this.email +')');
          this.dialog = true
          //alert(this.chipformapagamento);  
        }else{
          //alert('Não está logado!!! Logar com o Gmail');
          this.dialogLogin = true;
          //this.dialog = false
        } 
      },
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
              that.name = user.displayName;
              that.email = user.email;
              //that.login.url = user.photoURL;
              that.verificaStatus()
            }  
          })  
        }).catch(function(error) {
          //that.login.status = false;
          //that.iconperson.status = true;
          alert(error.message)
          // ...
        });
      },    
    } 
  }
</script>