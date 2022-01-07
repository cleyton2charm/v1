<template>
  <v-container class="grey lighten-4 fill-height" fluid>
    <v-row v-for="ads in objfirebase" :key="ads">
      {{valorInit(ads.periodos, ads.frete)}}
      {{objInit(ads)}}
      <v-col cols="12" sm="6">
        <v-row
          align="start"
          justify="start"
        >
          <v-col
            cols="12"
          >
            <v-card elevation="0">
              <v-carousel 
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
              >
                <v-carousel-item
                  v-for="(url, n) in ads.imagem"
                  :key="n"
                >
                  <v-img
                    :src="url"
                    :lazy-src="url"
                    height="100%"
                    class="white--text align-start"
                    gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.0)"
                  >
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-avatar size="24" v-if="vendedor.url">
                          <img
                            :src="vendedor.url"
                            :alt="vendedor.nome"
                            contain
                          >
                        </v-avatar>
                        <v-icon v-else left>mdi-account-circle</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <!--
                        <v-list-item-subtitle>
                        Fornecido e entregue por:
                        </v-list-item-subtitle>
                        -->
                        <v-list-item-subtitle class="white--text">
                        <span class="caption font-weight-light">Fornecido e entregue por:<br></span> {{vendedor.nome}}
                        </v-list-item-subtitle>                                 
                      </v-list-item-content>
                    </v-list-item>
                  </v-img>  
                </v-carousel-item>
              </v-carousel>
              <!--<v-card-text><span class="body-2 font-weight-light">entregue por: </span> <v-icon small left>mdi-store</v-icon><span class="body-2 font-weight-bold">{{vendedor.nome}}</span></v-card-text>-->
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
            <v-card elevation="0">
              <v-card-title>
                <h2 class="headline font-weight-bold">{{ titulo }}</h2>
                <span class="body-2 font-weight-light"><v-icon x-small left>mdi-map-marker</v-icon>{{vendedor.endereco.bairro}}, {{vendedor.endereco.cidade}}</span>
                <!--{{vendedor.endereco.bairro}}, {{vendedor.endereco.cidade}}-->
              </v-card-title>
              <v-card-text>
                <span class="display-1 black--text text--darken-4 font-weight-bold">{{multiplicaValor(quantidade, ads.periodos[valorPeriodo]['value'], precoadd1)}}</span>  
                <!--<span class="body-2 font-weight-light">{{ descricao }}</span>
                <v-divider class="mx-4"></v-divider>
                -->
                <div v-if="filtroItemCondicional(ads.opcionais).length != 0"><span class="subheading">Selecione o item (obrigatório): <strong>{{distModalCond(modeltagsconditional)}}</strong></span></div>
                <v-chip-group
                  v-if="ads.opcionais"
                  v-model="modeltagsconditional"
                  mandatory
                  active-class="indigo white--text"
                >
                  <v-chip filter  label v-for="tag in filtroItemCondicional(ads.opcionais)" :value="tag.nome" :key="tag.nome">
                  {{ tag.nome }}
                  </v-chip>
                </v-chip-group>
                
                <!--
                <div><span class="subheading">Itens opcionais: <strong>{{modeltags.length}}</strong></span></div>
                <v-chip-group
                  v-model="modeltags"
                  multiple
                  column
                  active-class="indigo white--text"
                >
                  <v-chip filter  label v-for="tag in tags" :key="tag">
                  {{ tag.nome }} + {{ tag.valor }}
                  </v-chip>
                </v-chip-group>
                -->
                <div><span class="subheading">Período de locação: <strong>{{valorPeriodo}} dias</strong></span></div>
                <v-chip-group
                  v-model="valorPeriodo"
                  active-class="indigo white--text"
                  mandatory
                >
                  <v-chip filter label v-for="v in filtroValorPeriodo(ads.periodos)" :key="v.dia" :value="v.dia">
                    {{v.dia}} dias
                  </v-chip>
                </v-chip-group>
                                               
                <div><span class="subheading">{{arraynomefrete[valorPeriodoFrete]}}: <strong>R$ {{ads.frete[valorPeriodoFrete]['value']}}</strong></span></div>
                <v-chip-group
                  v-model="valorPeriodoFrete"
                  active-class="indigo white--text"
                  mandatory
                >
                  <v-chip filter label v-for="v in filtroFrete(ads.frete)" :key="v.tipo" :value="v.tipo">
                    {{arraynomefrete[v.tipo]}}
                  </v-chip>
                </v-chip-group>
              
                <div><span class="subheading">Forma de Pagamento: <strong>{{arraypagamentos[valorFormaPagamento]}}</strong></span></div>
                <v-chip-group
                  v-model="valorFormaPagamento"
                  active-class="indigo white--text"
                  mandatory
                >
                  <v-chip filter label v-for="v in ads.pagamentos" :key="v" :value="v">
                    {{arraypagamentos[v]}}
                  </v-chip>
                </v-chip-group>
                <div v-if="ads.adicionais[0]['status']!=false"><span class="subheading">Itens opcionais:</span> <strong>{{distModal(modeltags)}}</strong></div>
                <v-list dense>
                  <v-list-item-group
                    v-model="modeltags"
                    multiple
                  >
                    <template v-for="(tag, i) in ads.adicionais">
                      <v-divider
                        :key="`divider-${i}`"
                      ></v-divider>
                      <v-list-item
                        v-if="tag.status==true"
                        :key="`item-${i}`"
                        :value="tag"
                        active-class="indigo--text text--accent-4"
                      >
                        <template v-slot:default="{ active, toggle }">
                          <v-list-item-action>
                           
                          <v-checkbox
                            :input-value="active"
                            :true-value="tag"
                            color="indigo"
                            @check="toggle"
                          ></v-checkbox>
                        
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>+ {{tag.nome}}</v-list-item-title>
                          </v-list-item-content>
                          
                          <v-list-item-action>
                            + R${{tag.valor}}
                          </v-list-item-action>
                          
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
                <div><span class="subheading">Quantidade ({{ quantidadeestoque=consultaEstoque(ads['.key'], ads.quantidade)}}):</span></div>
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
                  <!--
                  <v-col cols="6" sm="4">
                    <v-spacer></v-spacer>
                    <v-btn
                      x-large
                      color="indigo lighten-1 white--text"
                      v-on="on"
                      item
                      block
                      @click="verificaStatus"
                    >
                      <v-icon left>mdi-calendar-month</v-icon>
                       Reservar
                    </v-btn>
                  </v-col>  
                  -->
                  <v-col cols="12" sm="8">  
                    <v-btn v-if="consultaEstoque(ads['.key'], ads.quantidade)<=0"
                      x-large
                      color="red lighten-1 white--text"
                      text
                      block
                    >
                      <v-icon left>mdi-close-circle</v-icon>
                      Produto Esgotado 
                    </v-btn>
                    <v-btn
                      v-else
                      x-large
                      color="green lighten-1 white--text"
                      item
                      block
                      :href="`https://api.whatsapp.com/send?phone=5521981352741&text=Solicito: ${quantidade} unidade(s) ${titulo} ${distModalCond(modeltagsconditional)} ${distModal(modeltags)} por ${valorPeriodo} dias com ${arraynomefrete[valorPeriodoFrete]} por ${somaValorTotal(quantidade, ads.periodos[valorPeriodo]['value'], ads.frete[valorPeriodoFrete]['value'], precoadd1)} (${arraypagamentos[metodopgto]})`" 
                      target="_blank"
                    >
                      <v-icon left>mdi-whatsapp</v-icon>
                      Reservar pelo whatsapp
                    </v-btn>
                    <!-- Começo do Diálogo -->

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
                            <v-icon left>mdi-google</v-icon>
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
                        
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-if="email == 'tom.soarez@gmail.com'"
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
                        
                          <v-toolbar dark color="#4267B2">
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
                                                <v-list-item-title>{{titulo}} {{distModalCond(modeltagsconditional)}} {{distModal(modeltags)}}</v-list-item-title>
                                                <v-list-item-subtitle> {{quantidade}} Unidade(s) por {{valorPeriodo}} dias corridos</v-list-item-subtitle>
                                              </v-list-item-content>
                                              <v-list-item-icon>
                                                {{multiplicaValor(quantidade, ads.periodos[valorPeriodo]['value'], precoadd1)}}
                                              </v-list-item-icon>
                                            </v-list-item>
                                            <v-divider></v-divider>
                                            <v-list-item>
                                              <v-list-item-avatar>
                                                <v-icon>mdi-truck-fast</v-icon>
                                              </v-list-item-avatar>
                                              <v-list-item-content>
                                                <v-list-item-title>com {{arraynomefrete[valorPeriodoFrete]}}</v-list-item-title>
                                              </v-list-item-content>
                                              <v-list-item-icon>
                                                R$ {{ads.frete[valorPeriodoFrete]['value']}}
                                              </v-list-item-icon>
                                            </v-list-item> 
                                            <v-divider></v-divider>
                                            <v-list-item>
                                              <v-list-item-avatar>
                                                <v-icon>mdi-square-inc-cash</v-icon>
                                              </v-list-item-avatar>
                                              <v-list-item-content>
                                                <v-list-item-title class="subheading black--text font-weight-black">Valor Total</v-list-item-title>
                                                <v-list-item-subtitle>({{arraypagamentos[metodopgto]}})</v-list-item-subtitle>                               
                                              </v-list-item-content>
                                              <v-list-item-icon>
                                                <span class="subheading black--text font-weight-black">{{somaValorTotal(quantidade, ads.periodos[valorPeriodo]['value'], ads.frete[valorPeriodoFrete]['value'], precoadd1)}}</span>
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
                                              <v-icon left>mdi-store</v-icon>
                                              <v-img :src="vendedor.url"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                              <v-list-item-title>{{vendedor.nome}}</v-list-item-title>
                                              <v-list-item-subtitle>{{vendedor.endereco.logradouro}}, {{vendedor.endereco.numero}} {{vendedor.endereco.complemento}} - {{vendedor.endereco.bairro}}, {{vendedor.endereco.cidade}} - {{vendedor.endereco.uf}}</v-list-item-subtitle>
                                              <v-list-item-subtitle>{{vendedor.telefone}} | {{vendedor.telefone2}}</v-list-item-subtitle>
                                            </v-list-item-content>
                                          </v-list-item>
                                          -->                                         
                                          <v-list-item>
                                            <v-list-item-avatar>
                                              <img :src="imagem">
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                              <v-list-item-title>{{titulo}} {{distModalCond(modeltagsconditional)}} {{distModal(modeltags)}}</v-list-item-title>
                                              <v-list-item-sub-title>{{quantidade}} unidade(s) por {{subtotal}}</v-list-item-sub-title>
                                            </v-list-item-content>
                                          </v-list-item>
                                          <v-list-item>
                                            <v-list-item-avatar>
                                              <v-icon>mdi-map-marker-radius</v-icon>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                              <v-list-item-title>{{logradouro}}, {{numero}} {{complemento}} - {{bairro}}, {{cidade}} - {{uf}} </v-list-item-title>
                                              <v-list-item-sub-title>por R${{ads.frete[valorPeriodoFrete]['value']}}</v-list-item-sub-title>
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
                                              <v-list-item-title class="black--text font-weight-black">Valor total à pagar R${{vTotal}} ({{arraypagamentos[metodopgto]}}) </v-list-item-title>
                                              <!--<v-list-item-sub-title></v-list-item-sub-title>-->
                                            </v-list-item-content>
                                          </v-list-item>
                                        </v-list>
                                        <v-divider light></v-divider>
                                        Em breve, entraremos em contato via SMS para confirmação do seu pedido!
                                      </v-card-text>
                                      <v-divider></v-divider>
                                      <v-card-actions>
                                        <v-btn color="primary" block flat @click="redirectOrder()">Acompanhar Pedido</v-btn>
                                        <!--
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" flat @click="dialogEnd = false">Retornar para pagina principal</v-btn>
                                        -->
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                  
                                </v-stepper>
                                  
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
    
                      </v-dialog>
                    <!-- Fim do Diálogo -->
                  </v-col>
                </v-row>      
              </v-card-text>
            </v-card>
            <!--
            <v-card
              v-for="(url, n) in ads.imagem"
              :key="n"
            >
              <v-img
                :src="url"
                :lazy-src="url"
                height="100%"
              >
              </v-img>
              <v-divider></v-divider>  
            </v-card>  
            -->
            <v-card elevation="0">
              <v-list dense>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="green lighten-1">mdi-check</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Pague somente no ato da entrega</v-list-item-title>
                    <v-list-item-subtitle>Sem taxa de reserva ou cartão de crédito no site</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="green lighten-1">mdi-check</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Confirmação Imediata</v-list-item-title>
                    <v-list-item-subtitle>Não é necessário criar conta no site</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="green lighten-1">mdi-check</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Cancelamento Gratuito</v-list-item-title>
                    <v-list-item-subtitle>Cancele em até 24h antes do dia da entrega sem taxas</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="green lighten-1">mdi-check</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Frete <span style="color:red">(Não agenda horário ou turno)</span></v-list-item-title>
                    <v-list-item-subtitle>Dias úteis de segunda a sexta-feira de 8h às 17h</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>      
              <v-divider></v-divider>  
              
              <v-simple-table v-if="filtroTamanhoAcessorio(ads.acessorios)==true">
                <thead>
                  <tr>
                    <th class="text-left">Item</th>
                    <th class="text-left">Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="acessorio in filtroAcessorio(ads.acessorios)" :key="acessorio.tipo">
                    <td>{{arraynomeacessorio[acessorio.tipo]}}</td>
                    <td>{{acessorio.valor}}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <v-divider></v-divider>
              <v-card-text dense class="black--text">
                {{ titulo }} - <span class="body-2 font-weight-light">{{ descricao }}</span>
              </v-card-text>
              <v-divider></v-divider>
              <div v-if="ads.perguntas">
                <v-list
                  subheader
                  dense
                  three-line
                  v-for="(pergunta, i) in filtroPerguntas(ads.perguntas)" :key="pergunta.pergunta"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{i+1}}) {{pergunta.pergunta}}</v-list-item-title>
                      <v-list-item-subtitle>R: {{pergunta.resposta}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>             
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12">
            
      </v-col>
      <!--
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
      -->
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
  const dbanuncio = db.ref('anuncio');
  const dbusuario = db.ref('usuario');
  const dbpedido = db.ref('pedido');
  //const that = this.key;
  export default {
    name: 'Product',
    directives: {
      mask,
    },
    props: 
    [
      'product',
      'usuarionome',
      'usuarioregistro',
      'usuarioemail',
      'usuariotelefone',
      'usuariotelefone2',
      'usuarionumero',
      'usuariocomplemento',
      'usuariocep',
    ],
    texto: 'andaimes',
    data: function () {
      return {
        precoadd0: 0,
        precoadd1: 0,
        precoadd2: 0,
        modeltags:[],
        modeltagsconditional:0,
        tagsconditional: {
          0:{
            status: true,
            nome:'Sapatas Reguláveis',
            valor:'0,00'
          },
          1:{
            status: true,
            nome:'Rodinhas com travas',
            valor:'30,00'
          },                  
        },
        tags: {
          0:{
            status: true,
            nome:'2 Plataformas Metálicas',
            valor:'40,00'
          },
          1:{
            status: true,
            nome:'1 Cinto de Segurança',
            valor:'30,00'
          },
          2:{
            status: true,
            nome:'1 Escada de Acesso de 3.00 metros',
            valor:'50,00'
          }                  
        },
        objanuncio: [],
        objpedido: [],
        valorPeriodo: null,
        valorPeriodoFrete: null,
        valorFormaPagamento: null,
        valorSelect: null,
        valorfrete: null,
        periodos: null,
        chipfrete: 0,
        chipformapagamento: 'credito',
        chip: 0,//'thirtyDays',
        idpedido: '',
        idproduct: this.product,
        nome: '',
        imagem:'',
        titulo: '',
        descricao: '',
        //acessorios: '',
        quantidadeestoque: '',
        entrega: '',
        retirada: '',
        metodopgto: '',
        subtotal: '',
        extra: '',
        frete: '',
        vTotal: '',
        vendedor:{
          nome: '',
          email: '',
          registro: '',
          telefone: '',
          telefone2: '',
          endereco:{
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
          }
        },
        //valor: [],
        //valor: parseFloat(this.valor) + parseFloat(this.frete) ,
        situacao:'0',
        status:'0',
        arraynomedias: {'thirtyDays': '30 dias', 'fifteenDays': '15 dias', 'sevenDays': '7 dias'},
        arraynomepagamento: {'dinheiro':'Dinheiro', 'credito':'Cartão de Crédito', 'debito':'Cartão de Débito', 'boleto':'Boleto', 'transferencia':'Transferência Bancária', 'deposito':'Depósito Bancário'},
        arraypagamentos: {
          0: 'Crédito',
          1: 'Débito',
          2: 'Dinheiro à vista',
          3: 'Boleto',
          4: 'Transferência Bancária'
        },
        arraynomefrete: {'entregaretirada':'Frete', 'retiradalocal':'Retirada na loja'},
        arraynometaxafrete: {'entregaretirada':'Taxa de entrega/retirada', 'retiradalocal':'Taxa de retirada na loja'},
        arraynomeacessorio: {'andaimes1x1':'Andaimes 1.00x1.00', 'andaimes150x100':'Andaimes 1.50x1.00', 'andaimes150x150':'Andaimes 1.50x1.50', 'escadas':'Escada de Acesso', 'diagonais':'Diagonais', 'guardacorpo':'Guarda-Corpo', 'plataformaMadeira':'Plataforma de Madeira', 'plataformaMetalica':'Plataforma Metálica', 'rodinhas':'Rodinhas com travas', 'sapatas':'Sapatas Reguláveis', 'tesouras':'Tesouras', 'travessas':'Travessas'},
        
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
        quantidade: 1
      }
    },
    metaInfo(){
      return{
        title: this.titulo,
        meta: [
          {vmid: 'Product', name: 'description', content: 'Descrição: ' + this.descricao + ' - Aluga Já'},
          {vmid: 'Product', property: 'og:title', content: this.titulo + ' - Aluga Já'},
          {vmid: 'Product', property: 'og:site_name', content: 'Aluga Já'},
          {vmid: 'Product', property: 'og:description', content: 'Descrição: ' + this.descricao + ' - Aluga Já'},
          {vmid: 'Product', property: 'og:type', content: 'profile'},
          {vmid: 'Product', property: 'og:url', content: 'https://alugaja.app/product/'+this.product},
          {vmid: 'Product', property: 'og:image', content: this.imagem},
          {vmid: 'Product', property: 'og:image:type', content: 'image/jpeg'},
          {vmid: 'Product', property: 'og:image:width', content: '250'},
          {vmid: 'Product', property: 'og:image:height', content: '250'},
          {vmid: 'Product', property: 'og:updated_time', content: new Date()},
          {vmid: 'Product', property: 'og:locale', content: 'pt_BR'}  
        ]
      }
    },
    firebase:{
      objanuncio: dbanuncio,
      objpedido: dbpedido,
      //objcategoria: dbcategoria
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
      objfirebase(){
        return this.objanuncio.filter(f => 
          {
            let itemUpper = f['.key'].toUpperCase();
            let searchUpper = this.product.toUpperCase();
            return itemUpper.includes(searchUpper)===true;
          }
        );
      },
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('LLLL').slice(0, -9): ''
      },
      computedDateFormattedMomentjs2 () {
        return this.date2 ? moment(this.date2).format('LLLL').slice(0, -9): ''
      },
    },
    watch:{
      date(){
        //alert();
        //let arrayDayOne = new Date(new Date(this.picker).setDate(new Date(this.picker).getDate() + 3)); 
        let maxpicker2 = new Date(new Date(this.date).setDate(new Date(this.date).getDate() + parseInt(this.valorPeriodo)));
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
      },
      modeltags(){
        let objeto = []
        Object.entries(this.modeltags).forEach(([key, value]) =>{
          objeto.push(parseFloat(value.valor.replace(",", ".")))
          //alert(value.nome+value.valor)
        });
        //return objeto
        let soma = parseFloat(objeto.reduce((a, b) => a + b, 0))+parseFloat(this.periodos[this.valorPeriodo]['value'])
        this.precoadd1 = parseFloat(objeto.reduce((a, b) => a + b, 0)).toLocaleString("pt-BR", {minimumFractionDigits: 2});
        this.precoadd0 = soma.toLocaleString("pt-BR", {minimumFractionDigits: 2});
        //alert(soma.toLocaleString("pt-BR", {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'}))
      },
      name(){
        if(this.usuarionome){
          this.name = this.usuarionome;
          this.cpf = this.usuarioregistro;
          this.phone = this.usuariotelefone;
          this.phone2 = this.usuariotelefone2;
          this.email = this.usuarioemail;
          this.cep = this.usuariocep;
          this.numero = this.usuarionumero;
          this.complemento = this.usuariocomplemento;
        }
      }
    },
    methods:{
      distModalCond(obj){
        if(obj!=0){
          return " + "+obj
        }else{
          return ''
        }
      },
      distModal(obj){
        let objeto = '';
        Object.entries(obj).forEach(([key, value]) =>{
          objeto += " + "+value.nome 
        });
        return objeto
      },
      filtroItemCondicional(obj){
        let objeto = []
        Object.entries(obj).forEach(([key, value]) =>{
          if(value.status==true){
            objeto.push({status: value.status, nome: value.nome, valor: value.valor})
          }
        });
        return objeto
      },
      filtroItemAdicional(obj){
        let objeto = []
        Object.entries(obj).forEach(([key, value]) =>{
          if(value.status==true){
            objeto.push({status: value.status, nome: value.nome, valor: value.valor})
          }
        });
        return objeto
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
      filtroFrete(obj){
        let objeto = []
        Object.entries(obj).forEach(([key, value]) =>{
          if(value.status==true){
            objeto.push({tipo: key, valor: value.value})
          }
        });
        return objeto
      },
      filtroTamanhoAcessorio(obj){
        let objeto = false
        Object.entries(obj).forEach(([key, value]) =>{
          if(value.status==true){
            objeto = true
          }
        });
        return objeto
      },
      filtroAcessorio(obj){
        let objeto = []
        Object.entries(obj).forEach(([key, value]) =>{
          if(value.status==true){
            objeto.push({tipo: key, valor: value.value})
          }
        });
        return objeto
      },
      filtroPerguntas(obj){
        let objeto = []
        Object.entries(obj).forEach(([key, value]) =>{
          if(value.status==true){
            objeto.push({pergunta: value.pergunta, resposta: value.resposta})
          }
        });
        return objeto
      },
      objInit(obj){
        this.titulo =  obj.titulo;
        this.descricao = obj.descricao;
        this.acessorios = obj.acessorios;
        this.metodopgto = this.valorFormaPagamento;
        this.periodos = obj.periodos;
        this.imagem = obj.imagem[0];
        this.vendedor.url = obj.vendedor.url;
        this.vendedor.nome = obj.vendedor.nome;
        this.vendedor.email = obj.vendedor.email;
        this.vendedor.registro = obj.vendedor.registro;
        this.vendedor.telefone = obj.vendedor.telefone;
        this.vendedor.telefone2 = obj.vendedor.telefone2;
        this.vendedor.endereco.cep = obj.vendedor.endereco.cep;
        this.vendedor.endereco.logradouro = obj.vendedor.endereco.logradouro;
        this.vendedor.endereco.numero = obj.vendedor.endereco.numero;
        this.vendedor.endereco.complemento = obj.vendedor.endereco.complemento;
        this.vendedor.endereco.bairro = obj.vendedor.endereco.bairro;
        this.vendedor.endereco.cidade = obj.vendedor.endereco.cidade;
        this.vendedor.endereco.uf = obj.vendedor.endereco.uf;
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
      somaValorTotal(qtd, vlr1, vlr2, vlr3){
        this.frete = vlr2;
        let prodoption = parseFloat(vlr1) + parseFloat(vlr3);
        let multiplica = qtd * parseFloat(prodoption);
        let total = multiplica + parseFloat(vlr2);
        this.vTotal = total.toLocaleString("pt-BR", {minimumFractionDigits: 2}); 
        return total.toLocaleString("pt-BR", {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'})
      },
      multiplicaValor(qtd, vlr1, vlr2){
        let prodoption = parseFloat(vlr1) + parseFloat(vlr2);
        let multiplica = qtd * parseFloat(prodoption);
        this.subtotal = multiplica.toLocaleString("pt-BR", {minimumFractionDigits: 2});
        return multiplica.toLocaleString("pt-BR", {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'});
      },
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
      insertOrder(){        
        const objpedido = dbpedido.push({
          produto: {
            id: this.idproduct,
            produto: this.titulo+this.distModalCond(this.modeltagsconditional)+this.distModal(this.modeltags),
            imagem: this.imagem,
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
          vendedor:{
            nome: this.vendedor.nome,
            email: this.vendedor.email,
            registro: this.vendedor.registro,
            telefone: this.vendedor.telefone,
            telefone2: this.vendedor.telefone2,
            endereco:{
              cep: this.vendedor.endereco.cep,
              logradouro: this.vendedor.endereco.logradouro,
              numero: this.vendedor.endereco.numero,
              complemento: this.vendedor.endereco.complemento,
              bairro: this.vendedor.endereco.bairro,
              cidade: this.vendedor.endereco.cidade,
              uf: this.vendedor.endereco.uf
            }
          },
          entrega: this.date,
          retirada: this.date2,
          metodopgto: this.metodopgto,
          subtotal: this.subtotal,
          extra: '',
          frete: this.frete,
          valor: this.vTotal,
          situacao: this.situacao,
          status: this.status,
          emissao: new Date().toISOString().substr(0, 10),
          codpagseguro:''
        });
        this.idpedido = objpedido.key;
        this.dialogEnd = true;
        this.smsConfirmMessage()
        //this.redirectAccount();
        //user = objetoid;
        //console.log("Revelado o ID do Pedido do "+objpedido.key);
      },
      smsConfirmMessage(){
        let telephone = this.vendedor.telefone;
        let a = telephone.replace('(', '');
        let b = a.replace(')', '');
        let c = b.replace('-', '');
        let d = c.replace(' ', '');
        if(d.length==11){
          const sms = axios({
            url: 'https://api2.totalvoice.com.br/sms',
            method: 'post',
            headers: {
              'Access-Token': '64bb9f4791c644451fcc4c1dceb26231' //process.env.TOTALVOICE_API_KEY
            },
            data: {
              'numero_destino': d, //process.env.RODRIGOBRANAS_TELEPHONE
              'mensagem': 'Aluga Já! R$'+this.vTotal+' Você recebeu uma proposta em '+this.titulo+'. Acesse: https://alugaja.app/dashboard e confirme a sua entrega!!!'  
            }
          });
          console.log(sms.data);
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
      redirectAccount(){
        this.$router.push({ name: 'account', params: { search: this.userkey } })
      },
      redirectOrder(){
        this.$router.push({ name: 'request', params: { request: this.idpedido } })
      },
      numeroDeDias(obj){
        //console.log(obj.replace(/ dias/g, ""));
        this.numeroDias = obj.replace(/ dias/g, "");
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
      }   
    } 
  }
</script>