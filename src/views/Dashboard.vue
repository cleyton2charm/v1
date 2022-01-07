<template>
  <v-flex>
    <v-dialog
      v-model="dialogsituacao"
      max-width="500"
    >
      <v-card>
        <!--
        <v-card-title class="headline grey lighten-2">
          Situação do Pedido
        </v-card-title>
        -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            small
            color="error"
            text
            @click="dialogsituacao = false"
          >
            sair
            <v-icon small right>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-item-group
            v-model="selectsituacao"
            mandatory
          >
            <v-row>
              <v-col
                v-show="selectsituacao==0"
                cols="12"
                md="3"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'yellow' : 'yellow'"
                    class="d-flex align-center"
                    dark
                    height="100"
                    @click="toggle, mudaStatus(dialogidsituacao , 'situacao', 0, dialogsituacaotelefone)"
                  >
                    <v-scroll-y-transition>
                      <div
                        class="caption flex-grow-1 text-center black--text"
                      >
                        Em análise <br><v-icon color="black" dark v-if="active">mdi-checkbox-marked-circle-outline</v-icon>  
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
              <v-col
                cols="12"
                md="3"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'teal' : 'teal'"
                    class="d-flex align-center"
                    dark
                    height="100"
                    @click="toggle, mudaStatus(dialogidsituacao , 'situacao', 1, dialogsituacaotelefone)"
                  >
                    <v-scroll-y-transition>
                      <div
                        class="caption flex-grow-1 text-center white--text"
                      >
                        A entregar <br><v-icon color="white" dark v-if="active">mdi-checkbox-marked-circle-outline</v-icon>  
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
              <v-col
                cols="12"
                md="3"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'primary' : 'primary'"
                    class="d-flex align-center"
                    dark
                    height="100"
                    @click="toggle, mudaStatus(dialogidsituacao , 'situacao', 2, dialogsituacaotelefone)"
                  >
                    <v-scroll-y-transition>
                      <div
                        class="caption flex-grow-1 text-center"
                      >
                        Entregue <br><v-icon color="white" dark v-if="active">mdi-checkbox-marked-circle-outline</v-icon>
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
              <v-col
                v-show="selectsituacao!=0"
                cols="12"
                md="3"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? '#424242' : '#424242'"
                    class="d-flex align-center"
                    dark
                    height="100"
                    @click="toggle, mudaStatus(dialogidsituacao , 'situacao', 3, dialogsituacaotelefone)"
                  >
                    <v-scroll-y-transition>
                      <div
                        class="caption flex-grow-1 text-center white--text"
                      >
                        Finalizado <br><v-icon color="white" dark v-if="active">mdi-checkbox-marked-circle-outline</v-icon>  
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>

              <v-col
                cols="12"
                md="3"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'red' : 'red'"
                    class="d-flex align-center"
                    dark
                    height="100"
                    @click="toggle, mudaStatus(dialogidsituacao , 'situacao', 4, dialogsituacaotelefone)"
                  >
                    <v-scroll-y-transition>
                      <div
                        class="caption flex-grow-1 text-center white--text"
                      >
                        Cancelado <br><v-icon color="white" dark v-if="active">mdi-checkbox-marked-circle-outline</v-icon>  
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogstatus"
      max-width="500"
    >
      <v-card>
        <!--
        <v-card-title class="headline grey lighten-2">
          Situação do Pedido
        </v-card-title>
        -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            small
            color="error"
            text
            @click="dialogstatus = false"
          >
            sair
            <v-icon small right>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-item-group
            v-model="selectstatus"
            mandatory
          >
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'red' : 'red'"
                    class="d-flex align-center"
                    dark
                    height="100"
                    @click="toggle, mudaStatus(dialogidstatus, 'status', 0)"
                  >
                    <v-scroll-y-transition>
                      <div
                        class="caption flex-grow-1 text-center white--text"
                      >
                        À pagar <br><v-icon color="white" dark v-if="active">mdi-checkbox-marked-circle-outline</v-icon>  
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    :color="active ? 'teal' : 'teal'"
                    class="d-flex align-center"
                    dark
                    height="100"
                    @click="toggle, mudaStatus(dialogidstatus, 'status', 1)"
                  >
                    <v-scroll-y-transition>
                      <div
                        class="caption flex-grow-1 text-center white--text"
                      >
                        Pago <br><v-icon color="white" dark v-if="active">mdi-checkbox-marked-circle-outline</v-icon>  
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogdate"
      max-width="90%"
    >
      <v-card>
        <!--
        <v-card-title class="headline grey lighten-2">
          Situação do Pedido
        </v-card-title>
        -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            small
            color="error"
            text
            @click="dialogdate = false"
          >
            sair
            <v-icon small right>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-sheet width="100%" height="">
            <v-toolbar
              flat
            >
              <v-btn
                text
                x-small
                @click="$refs.calendar.prev()"
              >
                <v-icon left small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-toolbar-title>
                {{titlecalendar}}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                text
                x-small
                @click="$refs.calendar.next()"
              >
                <v-icon right small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
            </v-toolbar>
            <v-calendar
              v-model="calend"
              ref="calendar"
              color="primary"
              type="month"
              :events="daterange"
              :event-color="eventcolor"
              locale="pt-BR"
            > 
            </v-calendar>
          </v-sheet>
        </v-card-text>
      </v-card>    
    </v-dialog>
    <v-row> 
      <!--
      <v-col cols="12">
        <v-subheader>Seja bem-vindo,<strong>&nbsp;{{name}}</strong>!</v-subheader>
         
      </v-col>
      <v-col cols="6">
        
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="dateMomentCalendar"
              clearable
              label="Selecione a data desejada"
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @change="menu1 = false"
          ></v-date-picker>
        </v-menu>
        
      </v-col>  
      -->
    </v-row>  
        
    <!--<v-subheader>Seja Bem-vindo, {{name}}!</v-subheader>-->
    <v-row>
      <v-col cols="12" sm="3">
        
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <!--
          <v-card 
            class="teal mt-n5 ml-2"
            elevation="12"
            max-width="80"
            height="60"
          >   
            <v-card class="transparent mx-auto" elevation="0" max-width="40">
              <v-icon large color="white" class="mt-3 mx-auto">mdi-cash</v-icon>
            </v-card>  
          </v-card>
          -->
          <v-list-item three-line>
            <v-list-item-avatar
              tile
              
            >
              <v-icon x-large color="teal">mdi-cash</v-icon>
            </v-list-item-avatar>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-list-item-content>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentDia(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">R$ {{valorPago}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">Últimos 7 dias</v-list-item-subtitle>
              <v-list-item-title class="">R$ {{valorPagoSemana}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentMes(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">R$ {{valorPagoMes}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentAno(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">R$ {{valorPagoAno}}</v-list-item-title>
            </v-list-item-content>           
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions class="caption font-weight-light">
            Pagamento efetuado
          </v-card-actions>          
        </v-card>
      </v-col>

      <v-col cols="12" sm="3">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <!--
          <v-card 
            class="red mt-n5 ml-2"
            elevation="12"
            max-width="80"
            height="60"
          >   
            <v-card class="transparent mx-auto" elevation="0" max-width="40">
              <v-icon large color="white" class="mt-3 mx-auto">mdi-cart</v-icon>
            </v-card>  
          </v-card>
          -->
          <v-list-item three-line>
            <v-list-item-avatar
              tile
              
            >
              <v-icon x-large color="red">mdi-cart</v-icon>
            </v-list-item-avatar>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-list-item-content>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentDia(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">R$ {{valorReceber}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">Últimos 7 dias</v-list-item-subtitle>
              <v-list-item-title class="">R$ {{valorReceberSemana}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentMes(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">R$ {{valorReceberMes}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentAno(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">R$ {{valorReceberAno}}</v-list-item-title>
            </v-list-item-content>           
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions class="caption font-weight-light">
            Pagamento à receber
          </v-card-actions>          
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card>
          <apexchart ref="realtimeChart" type="bar" width="100%" height="198" :options="chartOptions" :series="series"></apexchart>
            <!--
            <v-sparkline
              :labels="indices"
              :value="valores"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
            -->
          
        </v-card>
      </v-col>
      <!--
      <v-col cols="6" sm="3">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-card 
            class="teal mt-n5 ml-2"
            elevation="12"
            max-width="80"
            height="60"
          >   
            <v-card class="transparent mx-auto" elevation="0" max-width="40">
              <v-icon large color="white" class="mt-3 mx-auto">mdi-calendar-check</v-icon>
            </v-card>  
          </v-card>
          <v-list-item three-line>
            <v-list-item-avatar
              tile
              class="hidden-sm-and-down"
            >
              <v-icon large color="white">mdi-calendar-check</v-icon>
            </v-list-item-avatar>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-list-item-content>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentDia(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">{{entregasDia.length}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentMes(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">{{entregasMes.length}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentAno(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">{{entregasAno.length}}</v-list-item-title>
            </v-list-item-content>           
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions class="caption font-weight-light">
            Entregas
          </v-card-actions>          
        </v-card>
      </v-col>

      <v-col cols="6" sm="3">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-card 
            class="red mt-n5 ml-2"
            elevation="12"
            max-width="80"
            height="60"
          >   
            <v-card class="transparent mx-auto" elevation="0" max-width="40">
              <v-icon large color="white" class="mt-3 mx-auto">mdi-calendar-remove</v-icon>
            </v-card>  
          </v-card>
          <v-list-item three-line>
            <v-list-item-avatar
              tile
              class="hidden-sm-and-down"
            >
              <v-icon large color="white">mdi-calendar-remove</v-icon>
            </v-list-item-avatar>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-list-item-content>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentDia(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">{{retiradasDia.length}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentMes(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">{{retiradasMes.length}}</v-list-item-title>
              <v-list-item-subtitle class="caption font-weight-light">{{dateMomentAno(new Date().toISOString().substr(0, 10))}}</v-list-item-subtitle>
              <v-list-item-title class="">{{retiradasAno.length}}</v-list-item-title>
            </v-list-item-content>           
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions class="caption font-weight-light">
            Retiradas
          </v-card-actions>          
        </v-card>
      </v-col>    
      -->
    </v-row>
    
    <v-row>
      -
      <!--
      <v-col cols="6">
        <v-card>
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="indices"
              :value="valores"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            
            <div class="title font-weight-light mb-2">Reservas</div>
            <div class="subheading font-weight-light grey--text">Performance de reservas em 12 meses</div>
            
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">Relatório de reservas de 2020</span>
          </v-card-text>
        </v-card>
      </v-col>
      -->
        
      
    </v-row>

    <v-row v-if="desserts.length>0">
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-title>
            A fazer ({{desserts.length}})
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchEntrega"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            no-data-text="Não há resultados!"
            no-results-text="Busca não encontrada, tente novamente!"
            mobile-breakpoint="0"
            :headers="headers"
            :items="desserts"
            :search="searchEntrega"
            :dense="false"
            :footer-props="{
              'items-per-page-text':'Entregas por página',
            }"  
          >
            <template v-slot:item.pedido="{ item }">
              <v-chip
                label
                @click="exibepedido(item)"
                :style="'border-left:5px solid '+getSituacaoColor(item.situacao)" 
              >
                <v-avatar left>
                  <v-img 
                  :src="item.imagem"
                  :alt="item.pedido"
                  >
                  </v-img>
                </v-avatar>
                <span class="caption font-weight-light text-truncate" style="width: 300px;">{{item.quantidade}}x {{item.pedido}}</span>
              </v-chip>  
            </template>
            <template v-slot:item.local="{ item }">
              <v-chip
                label
                :href="'https://maps.google.com/?q='+item.local"
                target="_blank"
              >
                <v-icon left x-small>mdi-map-marker</v-icon>
                <span class="caption font-weight-light text-truncate" style="width: 170px;">{{item.local}}</span>
              </v-chip>
              
            </template>
            <template v-slot:item.situacao="{ item }">
              <v-chip
                label
                :color="getSituacaoColor(item.situacao)"
                :text-color="getTextColor(item.situacao)"
                @click="getSituacao(item.pedidoid, item.situacao, item.usuariotelefone)"
              >
                <!--<v-icon left x-small>mdi-calendar</v-icon>-->
                <span class="caption font-weight-light">{{item.situacao}}</span>
              </v-chip>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                label
                :color="getColor(item.status)"
                text-color="white"
                @click="getStatus(item.pedidoid, item.status)"
              >
                <!--<v-icon left x-small>mdi-cart</v-icon>-->
                <span class="caption font-weight-light">{{item.status}}</span>
              </v-chip>
              
            </template>
            <template v-slot:item.data="{ item }">
              <div
                style="width: 90px;"
                @click="getRangeDate(item.pedidoentrega, item.pedidoretirada)"
              >
                  <v-progress-linear
                    :value="getStartEnd(item.pedidoentrega, item.pedidoretirada)"
                    background-color="primary"
                    color="#424242"
                    height="28"
                    rounded
                  >
                    <span class="caption font-weight-light white--text">{{ momentjsDiaMes(item.pedidoentrega)+" - "+momentjsDiaMes(item.pedidoretirada)/*Math.ceil(getStartEnd(item.pedidoentrega, item.pedidoretirada))*/ }}</span>
                  </v-progress-linear>
                
              </div>            
            </template>
            <template v-slot:item.valor="{ item }">
              <v-chip
                label
              >
                <!--<v-icon left x-small>mdi-cart</v-icon>-->
                <span class="caption font-weight-light"><strong>{{item.valor}}</strong></span>
              </v-chip>
              
            </template>
            <template v-slot:item.nome="{ item }">
              <v-chip
                label
              >
                <!--<v-icon left x-small>mdi-cart</v-icon>-->
                <span class="caption font-weight-light"><strong>{{item.nome}}</strong></span>
              </v-chip>
              
            </template>
            <!--
            <template v-slot:item.link="{ item }">
              <v-icon
                
                @click="exibepedido(item)"
              >
                mdi-magnify
              </v-icon>
              
              
              <v-speed-dial
                v-model="fab"
                direction="left"
              >
                <template v-slot:activator>
                  <v-btn
                    v-model="fab"
                    color="blue darken-2"
                    dark
                    fab
                    x-small
                  >
                    <v-icon v-if="fab">mdi-close</v-icon>
                    <v-icon v-else>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-btn
                  fab
                  dark
                  x-small
                  color="green"

                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  x-small
                  color="indigo"
                  @click="exibepedido(item)"
                >
                  
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  x-small
                  color="red"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-speed-dial>
              
              <v-icon
                small
                class="mr-2"
                @click="editItem(item.link)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item.link)"
              >
                mdi-delete
              </v-icon>
              
            </template>
            -->
            <!--
            <template v-slot:item.status="{ item }">
              <v-chip
              >
                <span class="caption font-weight-light">{{item.status}}</span>
              </v-chip>
              
            </template>
            
            <template v-slot:item.data="{ item }">
              <v-chip
                pill
              >
                <v-icon left x-small>mdi-calendar</v-icon>
                <span class="caption font-weight-light">{{item.data}}</span>
              </v-chip>
              
            </template>
            
            <template v-slot:item.link="{ item }">
              <v-chip dark></v-chip>
              <v-icon @click="redirectProduct(item.link)">mdi-link</v-icon>
            </template>
            -->
            <template v-slot:footer.page-text="items"> {{ items.pageStart }} - {{ items.pageStop }} de {{ items.itemsLength }} </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="desserts2.length>0">
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-title>
            Em andamento ({{desserts2.length}})
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchRetirada"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            no-data-text="Não há resultados!"
            no-results-text="Busca não encontrada, tente novamente!"
            mobile-breakpoint="0"
            :headers="headers2"
            :items="desserts2"
            :search="searchRetirada"
            :dense="false"
            :footer-props="{
              'items-per-page-text':'Retiradas por página',
            }"  
          >
            <template v-slot:sort-by>
              Organizar por
            </template>
            
            <template v-slot:item.pedido="{ item }">
              <v-chip
                label
                @click="exibepedido(item)"
                :style="'border-left:5px solid '+getSituacaoColor(item.situacao)" 
              >
                <v-avatar left>
                  <v-img 
                  :src="item.imagem"
                  :alt="item.pedido"
                  >
                  </v-img>
                </v-avatar>
                <span class="caption font-weight-light text-truncate" style="width: 300px;">{{item.quantidade}}x {{item.pedido}}</span>
              </v-chip>  
            </template>
            <template v-slot:item.local="{ item }">
              <v-chip
                label
                :href="'https://maps.google.com/?q='+item.local"
                target="_blank"
              >
                <v-icon left x-small>mdi-map-marker</v-icon>
                <span class="caption font-weight-light text-truncate" style="width: 170px;">{{item.local}}</span>
              </v-chip>
              
            </template>
            <template v-slot:item.situacao="{ item }">
              <v-chip
                label
                :color="getSituacaoColor(item.situacao)"
                :text-color="getTextColor(item.situacao)"
                @click="getSituacao(item.pedidoid, item.situacao, item.usuariotelefone)"
              >
                <!--<v-icon left x-small>mdi-calendar</v-icon>-->
                <span class="caption font-weight-light">{{item.situacao}}</span>
              </v-chip>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                label
                :color="getColor(item.status)"
                text-color="white"
                @click="getStatus(item.pedidoid, item.status)"
              >
                <!--<v-icon left x-small>mdi-cart</v-icon>-->
                <span class="caption font-weight-light">{{item.status}}</span>
              </v-chip>
              
            </template>
            <template v-slot:item.data="{ item }">
              <div
                style="width: 90px;"
                @click="getRangeDate(item.pedidoentrega, item.pedidoretirada)"
              >
                  <v-progress-linear
                    :value="getStartEnd(item.pedidoentrega, item.pedidoretirada)"
                    background-color="primary"
                    color="#424242"
                    height="28"
                    rounded
                  >
                    <span class="caption font-weight-light white--text">{{ momentjsDiaMes(item.pedidoentrega)+" - "+momentjsDiaMes(item.pedidoretirada)/*Math.ceil(getStartEnd(item.pedidoentrega, item.pedidoretirada))*/ }}</span>
                  </v-progress-linear>
                
              </div>            
            </template>
            <template v-slot:item.valor="{ item }">
              <v-chip
                label
              >
                <!--<v-icon left x-small>mdi-cart</v-icon>-->
                <span class="caption font-weight-light"><strong>{{item.valor}}</strong></span>
              </v-chip>
              
            </template>
            <template v-slot:item.nome="{ item }">
              <v-chip
                label
              >
                <!--<v-icon left x-small>mdi-cart</v-icon>-->
                <span class="caption font-weight-light"><strong>{{item.nome}}</strong></span>
              </v-chip>
              
            </template>
            <template v-slot:footer.page-text="items"> {{ items.pageStart }} - {{ items.pageStop }} de {{ items.itemsLength }} </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="desserts3.length>0">
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-title>
            Finalizados ({{desserts3.length}})
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchRecolhido"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            no-data-text="Não há resultados!"
            no-results-text="Busca não encontrada, tente novamente!"
            mobile-breakpoint="0"
            :headers="headers3"
            :items="desserts3"
            :search="searchRecolhido"
            :dense="false"
            :footer-props="{
              'items-per-page-text':'Retiradas por página',
            }"  
          >
            <template v-slot:sort-by>
              Organizar por
            </template>
            
            <template v-slot:item.pedido="{ item }">
              <v-chip
                label
                @click="exibepedido(item)"
                :style="'border-left:5px solid '+getSituacaoColor(item.situacao)" 
              >
                <v-avatar left>
                  <v-img 
                  :src="item.imagem"
                  :alt="item.pedido"
                  >
                  </v-img>
                </v-avatar>
                <span class="caption font-weight-light text-truncate" style="width: 300px;">{{item.quantidade}}x {{item.pedido}}</span>
              </v-chip>  
            </template>
            <template v-slot:item.local="{ item }">
              <v-chip
                label
                :href="'https://maps.google.com/?q='+item.local"
                target="_blank"
              >
                <v-icon left x-small>mdi-map-marker</v-icon>
                <span class="caption font-weight-light text-truncate" style="width: 170px;">{{item.local}}</span>
              </v-chip>
              
            </template>
            <template v-slot:item.situacao="{ item }">
              <v-chip
                label
                :color="getSituacaoColor(item.situacao)"
                :text-color="getTextColor(item.situacao)"
                @click="getSituacao(item.pedidoid, item.situacao, item.usuariotelefone)"
              >
                <!--<v-icon left x-small>mdi-calendar</v-icon>-->
                <span class="caption font-weight-light">{{item.situacao}}</span>
              </v-chip>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                label
                :color="getColor(item.status)"
                text-color="white"
                @click="getStatus(item.pedidoid, item.status)"
              >
                <!--<v-icon left x-small>mdi-cart</v-icon>-->
                <span class="caption font-weight-light">{{item.status}}</span>
              </v-chip>
              
            </template>
            <template v-slot:item.data="{ item }">
              <div
                style="width: 90px;"
                @click="getRangeDate(item.pedidoentrega, item.pedidoretirada)"
              >
                  <v-progress-linear
                    :value="getStartEnd(item.pedidoentrega, item.pedidoretirada)"
                    background-color="primary"
                    color="#424242"
                    height="28"
                    rounded
                  >
                    <span class="caption font-weight-light white--text">{{ momentjsDiaMes(item.pedidoentrega)+" - "+momentjsDiaMes(item.pedidoretirada)/*Math.ceil(getStartEnd(item.pedidoentrega, item.pedidoretirada))*/ }}</span>
                  </v-progress-linear>
                
              </div>            
            </template>
            <template v-slot:item.valor="{ item }">
              <v-chip
                label
              >
                <!--<v-icon left x-small>mdi-cart</v-icon>-->
                <span class="caption font-weight-light"><strong>{{item.valor}}</strong></span>
              </v-chip>
              
            </template>
            <template v-slot:item.nome="{ item }">
              <v-chip
                label
              >
                <!--<v-icon left x-small>mdi-cart</v-icon>-->
                <span class="caption font-weight-light"><strong>{{item.nome}}</strong></span>
              </v-chip>
              
            </template>
            <template v-slot:footer.page-text="items"> {{ items.pageStart }} - {{ items.pageStop }} de {{ items.itemsLength }} </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbartext }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card v-if="editdialog==true">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="9">
                <v-text-field v-model="dialogprodutotitulo" outlined dense label="Título do Pedido" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <v-text-field v-model="dialogprodutoquantidade" outlined dense label="Unidades"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dialogusuarionome" outlined dense label="Cliente"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="dialogusuarioregistro" outlined dense label="Registro" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="dialogusuarioemail" outlined dense label="E-mail" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="dialogusuariotelefone" outlined dense label="Telefone" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="dialogusuariotelefone2" outlined dense label="Telefone 2" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="9">
                <v-text-field v-model="dialogentregalogradouro" outlined dense label="Logradouro" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="dialogentreganumero" outlined dense label="Numero"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="7">
                <v-text-field v-model="dialogentregabairro" outlined dense label="Bairro"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <v-text-field v-model="dialogentregacidade" outlined dense label="Cidade"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="2">
                <v-text-field v-model="dialogentregaestado" outlined dense label="UF"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field v-model="dialogentregacep" outlined dense label="CEP"></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="6">
                <v-text-field v-model="dialogentregacomplemento" outlined dense label="Complemento"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="dialogpedidoentrega" v-show="false" outlined dense label="Data de Entrega" required></v-text-field>
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs(dialogpedidoentrega)"
                      outlined
                      dense
                      label="Data de Entrega"
                      required
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dialogpedidoentrega"
                    @change="menu1 = false"
                    locale="pt-br"
                  ></v-date-picker>
                </v-menu>
                
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="dialogpedidoretirada" v-show="false"></v-text-field>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs(dialogpedidoretirada)"
                      outlined
                      dense
                      label="Data de Retirada"
                      required
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dialogpedidoretirada"
                    @change="menu2 = false"
                    locale="pt-br"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field v-model="dialogpedidosubtotal" outlined dense label="Subtotal" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field v-model="dialogpedidofrete" outlined dense label="Frete" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field v-model="dialogpedidototal" outlined dense label="valor total" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <span class="subheading">Método de Pagamento: <strong>({{arraypagamentos[dialogpedidometodopagamento]}})</strong></span>
                <v-chip-group
                  v-model="dialogpedidometodopagamento"
                  active-class="primary white--text"
                  mandatory
                  column
                >
                  <v-chip
                    filter
                    :value="0"
                    label
                  >
                    Crédito
                  </v-chip>
                  <v-chip
                    filter
                    label
                    :value="1"
                  >
                    Débito
                  </v-chip>
                  <v-chip
                    filter
                    label
                    :value="2"
                  >
                    Dinheiro
                  </v-chip>
                  <v-chip
                    filter
                    label
                    :value="3"
                  >
                    Boleto
                  </v-chip>
                  <v-chip
                    filter
                    label
                    :value="4"
                  >
                    Transferência
                  </v-chip>
                </v-chip-group>
              </v-col>
              <v-col cols="12" sm="12">
                <span class="subheading">Situação do Pagamento: <strong>({{arraystatus[dialogpedidostatus]}})</strong></span>
                <v-chip-group
                  v-model="dialogpedidostatus"
                  active-class="primary white--text"
                  mandatory
                  column
                >
                  <v-chip
                    filter
                    :value="0"
                    label
                  >
                    À pagar
                  </v-chip>
                  <v-chip
                    filter
                    label
                    :value="1"
                  >
                    Pago
                  </v-chip>
                  
                </v-chip-group>
              </v-col>  
              <!--
              <v-col cols="12" sm="6">
                <v-radio-group v-model="dialogpedidostatus">
                  <template v-slot:label>
                    <div>Situação do <strong>pagamento</strong></div>
                  </template>
                  <v-radio value="0">
                    <template v-slot:label>
                      <div><strong class="error--text">À pagar</strong></div>
                    </template>
                  </v-radio>
                  <v-radio value="1">
                    <template v-slot:label>
                      <div><strong class="success--text">Pago</strong></div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
              -->
              <v-col cols="12" sm="12">
                <span class="subheading">Situação do Pedido: <strong>({{situacaopedido[dialogpedidosituacao]}})</strong></span>
                <v-chip-group
                  v-model="dialogpedidosituacao"
                  active-class="primary white--text"
                  mandatory
                  column
                >
                  <v-chip
                    filter
                    :value="0"
                    label
                  >
                    Em análise
                  </v-chip>
                  <v-chip
                    filter
                    label
                    :value="1"
                  >
                    À entregar
                  </v-chip>
                  <v-chip
                    filter
                    :value="2"
                    label
                  >
                    Entregue
                  </v-chip>
                  <v-chip
                    filter
                    label
                    :value="3"
                  >
                    Retirado
                  </v-chip>
                  <v-chip
                    filter
                    label
                    :value="4"
                  >
                    Cancelado
                  </v-chip>
                </v-chip-group>
              </v-col>
              <!--
              <v-col cols="12" sm="6">
              
                <v-radio-group v-model="dialogpedidosituacao">
                  <template v-slot:label>
                    <div>Situação do <strong>pedido</strong></div>
                  </template>
                  <v-radio value="0">
                    <template v-slot:label>
                      <div><strong class="warning--text">Em análise</strong></div>
                    </template>
                  </v-radio>
                  <v-radio value="1">
                    <template v-slot:label>
                      <div><strong class="success--text">À entregar</strong></div>
                    </template>
                  </v-radio>
                  <v-radio value="2">
                    <template v-slot:label>
                      <div><strong class="success--text">Entregue</strong></div>
                    </template>
                  </v-radio>
                  <v-radio value="3">
                    <template v-slot:label>
                      <div><strong class="error--text">Retirado</strong></div>
                    </template>
                  </v-radio>
                  <v-radio value="4">
                    <template v-slot:label>
                      <div><strong class="error--text">Cancelado</strong></div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
              -->
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large color="error"  @click="editdialog = false">Fechar</v-btn>
          <v-btn large color="primary"  @click="atualizapedido()">Atualizar</v-btn>
        </v-card-actions>
      </v-card>  
      <v-card v-else>  
        <v-img
          class="white--text align-end"
          height="100px"
          :src="dialogprodutoimagem"
        >
          
          <v-list tree-line subheader color="transparent">
            <!--<v-subheader>Cliente</v-subheader>-->
            <v-list-item>
              <v-list-item-content>
                <!--
                <v-list-item-subtitle>
                  <v-btn x-small color="error" @click="dialog = false"><v-icon x-small>mdi-close</v-icon></v-btn>
                <v-btn x-small color="primary" @click="editdialog = true"><v-icon x-small>mdi-pencil</v-icon></v-btn>
                </v-list-item-subtitle>
                -->
                <v-list-item-title>
                  <v-chip
                    color="primary"
                    text-color="white"
                    label
                    small
                    @click="redirectRequest(dialogpedidoid)"
                  >
                    <v-avatar left>
                      <v-icon small>mdi-tag</v-icon>
                    </v-avatar>
                    {{dialogprodutotitulo}}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                    color="white"
                  >
                    {{dialogprodutoquantidade}} unidade<span v-if="dialogprodutoquantidade!=1">s</span>
                  </v-chip>
                </v-list-item-subtitle>               
              </v-list-item-content>
            </v-list-item>
          </v-list>      
        </v-img>
          <v-list tree-line subheader>
            <!--<v-subheader>Cliente</v-subheader>-->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    color="primary"
                    text-color="white"
                    label
                    small
                  >
                    <v-avatar left>
                      <v-icon small>mdi-account-circle</v-icon>
                    </v-avatar>
                    Cliente
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                  >
                  {{dialogusuarionome}}
                  </v-chip>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                    href="https://www.situacao-cadastral.com/"
                    target="_blank"
                  >
                    <v-icon small>mdi-shield-search</v-icon>
                  </v-chip>
                  <v-chip
                    label
                    small
                  >
                  {{dialogusuarioregistro}}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn x-small color="error" @click="dialog = false"><v-icon x-small>mdi-close</v-icon></v-btn>
                <v-btn x-small color="primary" @click="editdialog = true"><v-icon x-small>mdi-pencil</v-icon></v-btn>
                <v-btn x-small color="primary" @click="redirectProduct(dialogprodutoid)"><v-icon x-small>mdi-content-copy</v-icon></v-btn>
                <v-btn x-small color="primary" @click="editdialog = true"><v-icon x-small>mdi-printer</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    color="primary"
                    text-color="white"
                    label
                    small
                  >
                    <v-avatar left>
                      <v-icon small>mdi-phone</v-icon>
                    </v-avatar>
                    Contato
                  </v-chip>
                </v-list-item-title>
                
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                    :href="'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to='+dialogusuarioemail"
                    target="_blank"
                  >
                    <v-avatar>
                      <v-icon small>mdi-gmail</v-icon>
                    </v-avatar>  
                  </v-chip>
                  <v-chip
                    label
                    small
                    :href="'mailto:'+dialogusuarioemail"
                    target="_blank"
                  >
                  {{dialogusuarioemail}}
                  </v-chip>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                    :href="'https://api.whatsapp.com/send?phone=55'+dialogusuariotelefone"
                    target="_blank"
                  >
                    <v-avatar>
                      <v-icon small>mdi-whatsapp</v-icon>
                    </v-avatar>  
                  </v-chip>
                  <v-chip
                    label
                    small
                    :href="'tel:'+dialogusuariotelefone"
                    target="_blank"
                  >
                  {{dialogusuariotelefone}}
                  </v-chip>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                    :href="'https://api.whatsapp.com/send?phone=55'+dialogusuariotelefone2"
                    target="_blank"
                  >
                    <v-avatar>
                      <v-icon small>mdi-whatsapp</v-icon>
                    </v-avatar>  
                  </v-chip>
                  <v-chip
                    label
                    small
                    :href="'tel:'+dialogusuariotelefone2"
                  >
                  {{dialogusuariotelefone2}}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!--<v-subheader>Endereço</v-subheader>-->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    color="primary"
                    text-color="white"
                    label
                    small
                  >
                    <v-avatar left>
                      <v-icon small>mdi-map-marker</v-icon>
                    </v-avatar>
                    Endereço
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                    :href="'https://waze.com/ul?q='+dialogentregalogradouro+', '+dialogentreganumero+' - '+dialogentregabairro+', '+dialogentregacidade+' - '+dialogentregaestado+', '+dialogentregacep"
                    target="_blank"
                  >
                    <v-avatar>
                      <v-icon small>mdi-waze</v-icon>
                    </v-avatar>  
                  </v-chip>
                  <v-chip
                    label
                    small
                    :href="'https://maps.google.com/?q='+dialogentregalogradouro+', '+dialogentreganumero+' - '+dialogentregabairro+', '+dialogentregacidade+' - '+dialogentregaestado+', '+dialogentregacep"
                    target="_blank"
                  > 
                  {{dialogentregalogradouro}}, {{dialogentreganumero}} - {{dialogentregabairro}}, {{dialogentregacidade}} - {{dialogentregaestado}}
                  </v-chip>
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="dialogentregacomplemento!=''">  
                  <v-chip
                    label
                    small
                  >    
                    {{dialogentregacomplemento}}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!--
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    color="primary"
                    text-color="white"
                    label
                    small
                  >
                    <v-avatar left>
                      <v-icon small>mdi-map-marker</v-icon>
                    </v-avatar>
                    Loja
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                    :href="'https://waze.com/ul?q='+dialogentregalogradouro+', '+dialogentreganumero+' - '+dialogentregabairro+', '+dialogentregacidade+' - '+dialogentregaestado+', '+dialogentregacep"
                    target="_blank"
                  >
                    <v-avatar>
                      <v-icon small>mdi-waze</v-icon>
                    </v-avatar>  
                  </v-chip>
                  <v-chip
                    label
                    small
                    :href="'https://maps.google.com/?q='+dialogentregalogradouro+', '+dialogentreganumero+' - '+dialogentregabairro+', '+dialogentregacidade+' - '+dialogentregaestado+', '+dialogentregacep"
                    target="_blank"
                  > 
                  {{dialogvendedorenderecologradouro}}, {{dialogvendedorendereconumero}} - {{dialogvendedorenderecobairro}}, {{dialogvendedorenderecocidade}} - {{dialogvendedorenderecoestado}}
                  </v-chip>
                </v-list-item-subtitle>
                <v-list-item-subtitle>  
                  <v-chip
                    label
                    small
                  >    
                    {{dialogvendedorenderecocep}}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    color="primary"
                    text-color="white"
                    label
                    small
                  >
                    <v-avatar left>
                      <v-icon small>mdi-calendar</v-icon>
                    </v-avatar>
                    Período
                  </v-chip>
                  
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                  >      
                    Entrega: {{dialogpedidoentregaformatada}}
                  </v-chip>  
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                  >      
                    Retirada: {{dialogpedidoretiradaformatada}}
                  </v-chip>  
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    color="primary"
                    text-color="white"
                    label
                    small
                  >
                    <v-avatar left>
                      <v-icon small>mdi-cart</v-icon>
                    </v-avatar>
                    Valor
                  </v-chip>
                  
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                  >      
                  Subtotal: R${{dialogpedidosubtotal}}
                  </v-chip>
                  <v-chip
                    label
                    small
                  >      
                  Frete: R${{dialogpedidofrete}}
                  </v-chip>  
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-chip
                    label
                    small
                  >      
                    Total: R${{dialogpedidototal}}
                  </v-chip>
                  <v-chip
                    label
                    small
                  >      
                    {{arraypagamentos[dialogpedidometodopagamento]}} ({{arraystatus[dialogpedidostatus]}})
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        <v-divider></v-divider>        
        <v-card-actions>
          
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-title>
            Anúncios ({{anuncio.length}})
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchAnuncio"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            no-data-text="Não há resultados!"
            no-results-text="Busca não encontrada, tente novamente!"
            mobile-breakpoint="0"
            :headers="anuncioheaders"
            :items="anuncio"
            :search="searchAnuncio"
            :dense="false"
            :footer-props="{
              'items-per-page-text':'Anúncios por página',
            }"  
          >
            <template v-slot:sort-by>
              Organizar por
            </template>
            <template v-slot:item.produto="{ item }">
              <v-chip
                label
                @click="redirectProduct(item.link)"
              >
                <v-avatar left>
                  <v-img 
                  :src="item.imagem"
                  :alt="item.produto"
                  >
                  </v-img>
                </v-avatar>
                <span class="caption font-weight-light">{{item.produto}}</span>
              </v-chip>  
            </template>
                        
            <template v-slot:item.quantidade="{ item }">
              <v-chip
                label
              >
                <v-icon left x-small>mdi-package-variant</v-icon>
                <span class="caption font-weight-light">{{item.quantidade}}</span>
              </v-chip>
              
            </template>
            <template v-slot:item.estoque="{ item }">
              <v-chip
                label
              >
                <v-icon left x-small>mdi-package-variant</v-icon>
                <span class="caption font-weight-light">{{consultaEstoque(item.link, item.quantidade)}}</span>
              </v-chip>
              
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip
                label
              >
                <v-icon left x-small>mdi-eye</v-icon>
                <span class="caption font-weight-light">{{item.status}}</span>
              </v-chip>
              
            </template>
            <!--
            <template v-slot:item.emissao="{ item }">
              <v-chip
                pill
              >
                <v-icon left x-small>mdi-calendar</v-icon>
                <span class="caption font-weight-light">{{item.emissao}}</span>
              </v-chip>
              
            </template>
            
            <template v-slot:item.link="{ item }">
              <v-icon @click="redirectProduct(item.link)">mdi-link</v-icon>
            </template>
            -->
            <template v-slot:footer.page-text="items"> {{ items.pageStart }} - {{ items.pageStop }} de {{ items.itemsLength }} </template>
          </v-data-table>
        </v-card>
      </v-col>     
    </v-row>
  </v-flex>    
</template>

<script>
//import Toolbar from '../components/Toolbar';
import { db, auth, provider } from '../config/db';
import moment from 'moment';
import axios from 'axios';
moment.locale("pt-br");
const dbanuncio = db.ref('anuncio');
const dbpedido = db.ref('pedido');
export default {
  data () {
    return {
      //Inicio SnackBar
      snackbar: false,
      snackbartext: '',
      //Inicio Dialog
      dialog: false,
      editdialog: false,
      //Dialog Situação
      dialogsituacao: false,
      selectsituacao: '',
      dialogidsituacao: '',
      dialogsituacaotelefone: '',
      //Dialog Status
      dialogstatus: false,
      selectstatus: '',
      dialogidstatus: '',
      //Dialog Date Range
      dialogdate: false,
      daterange: [],
      calend: '',
      titlecalendar: '',
      eventcolor: '',
      //Dialog Pedido
      dialogImagem:'',
      dialogTitulo:'',
      dialogCliente:'',
      dialogLocal:'',      
      dialogValor:'',
      dialogQuantidade:'',
      dialogRetirada:'',
      dialogStatus:'',
      dialogLink:'',
      //Pedido
      dialogpedidoid: '',
      dialogpedidoemissao: '',
      dialogpedidoentrega: '',
      dialogpedidoretirada: '',
      dialogpedidoentregaformatada: '',
      dialogpedidoretiradaformatada: '',
      dialogpedidosituacao: '',
      dialogpedidostatus: '',
      dialogpedidosubtotal: '',
      dialogpedidofrete: '',
      dialogpedidototal: '',
      dialogpedidometodopagamento: '',
      //Produto
      dialogprodutoid: '',
      dialogprodutoimagem: '',
      dialogprodutotitulo: '',
      dialogprodutodescricao: '',
      dialogprodutoacessorios: '',
      dialogprodutoquantidade: '',
      dialogprodutovalor: '',
      //Usuário
      dialogusuarioemail: '',
      dialogusuarioregistro: '',
      dialogusuarionome: '',
      dialogusuariotelefone: '',
      dialogusuariotelefone2: '',
      //Vendedor
      dialogvendedoremail: '',
      dialogvendedorregistro: '',
      dialogvendedornome: '',
      dialogvendedortelefone: '',
      dialogvendedortelefone2: '',
      //Vendedor Endereço
      dialogvendedorenderecologradouro: '',
      dialogvendedorendereconumero: '',
      dialogvendedorenderecocomplemento: '',
      dialogvendedorenderecobairro: '',
      dialogvendedorenderecocidade: '',
      dialogvendedorenderecoestado: '',
      dialogvendedorenderecocep: '',
      //Entrega
      dialogentregalogradouro: '',
      dialogentreganumero: '',
      dialogentregacomplemento: '',
      dialogentregabairro: '',
      dialogentregacidade: '',
      dialogentregaestado: '',
      dialogentregacep: '',
      //Fim Dialog Pedido
      fab: false,
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        dataLabels: {
          enabled: false,          
        },
        colors:["#1976D2"],
        yaxis: {
          labels: {
            style: {
              colors: "#000"
            }
          },
          axisBorder: {
            show: true,
            color: "#000"
          },
          /*
          title: {
            text: "Reservas",
            style: {
              color: "#FFF"
            }
          }
          */
        },  
        xaxis: {
          labels: {
            style: {
              colors: "#000"
            }
          },
          categories: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez'
          ],//[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        fill:{
          colors:["#1976D2"]
        }
      },
      series: [{
        name: 'Reservas',
        data: [0,0,0,0,0,0,0,0,0,0,0,0],//[30, 40, 35, 50, 49, 60, 70, 91]
      }],
      menu1: false,
      menu2: false,
      date: new Date().toISOString().substr(0, 10),
      grafico: [
        {mes:'Jan', qtd:0},
        {mes:'Fev', qtd:0},
        {mes:'Mar', qtd:0},
        {mes:'Abr', qtd:0},
        {mes:'Mai', qtd:0},
        {mes:'Jun', qtd:0},
        {mes:'Jul', qtd:0},
        {mes:'Ago', qtd:0},
        {mes:'Set', qtd:0},
        {mes:'Out', qtd:0},
        {mes:'Nov', qtd:0},
        {mes:'Dez', qtd:0},
      ],
      indices: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ],
      valores: [],
      //Pago
      valorPago: 0,
      valorPagoSemana:0,
      valorPagoMes:0,
      valorPagoAno:0,
      //A pagar
      valorReceber: 0,
      valorReceberSemana: 0,
      valorReceberMes: 0,
      valorReceberAno: 0,
      //Entregas
      entregasDia: 0,
      entregasMes: 0,
      entregasAno: 0,
      //Retiradas
      retiradasDia: 0,
      retiradasMes: 0,
      retiradasAno: 0,
      name: '',
      email: '',
      objanuncio: [],
      objpedido: [],
      searchEntrega: '',
      searchRetirada: '',
      searchRecolhido: '',
      searchAnuncio: '',
      //Tabela Entrega
      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },

        { text: 'Pedido', value: 'pedido' },
        { text: 'Situação', value: 'situacao' },
        { text: 'Local', value: 'local' },
        { text: 'Período', value: 'data' },
        { text: 'Valor', value: 'valor' },
        { text: 'Status', value: 'status' },
        { text: 'Cliente', value: 'nome' },
      ],
      desserts: [],
      //Tabela Retirada
      headers2: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },

        { text: 'Pedido', value: 'pedido' },
        { text: 'Situação', value: 'situacao' },
        { text: 'Local', value: 'local' },
        { text: 'Período', value: 'data' },
        { text: 'Valor', value: 'valor' },
        { text: 'Status', value: 'status' },
        { text: 'Cliente', value: 'nome' },
      ],
      desserts2: [],
      headers3: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },

        { text: 'Pedido', value: 'pedido' },
        { text: 'Situação', value: 'situacao' },
        { text: 'Local', value: 'local' },
        { text: 'Período', value: 'data' },
        { text: 'Valor', value: 'valor' },
        { text: 'Status', value: 'status' },
        { text: 'Cliente', value: 'nome' },
      ],
      desserts3: [],
      //Tabela Anúncio
      anuncioheaders: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Produto', value: 'produto' },
        { text: 'Quantidade', value: 'quantidade' },
        { text: 'Estoque', value: 'estoque' },
        //{ text: 'Emissão', value: 'emissao' },
        { text: 'Status', value: 'status' },
        //{ text: 'Link', value: 'link' },
      ],
      anuncio: [],
      arraystatusanuncio: {0:'Disponível', 1:'Indisponível'},
      arraystatus: {0:'À pagar', 1:'Pago'},
      situacaostatusreverso: {'À pagar':0, 'Pago':1},
      situacaopedidoreverso: {'Em análise':0, 'À entregar':1 ,'Entregue':2 ,'Finalizado':3 ,'Cancelado':4},
      situacaopedido: {0:'Em análise',1:'À entregar',2:'Entregue',3:'Finalizado',4:'Cancelado'},
      arraypagamentos: {0: 'Crédito', 1: 'Débito', 2: 'Dinheiro à vista', 3: 'Boleto', 4: 'Transferência Bancária'},      
    }  
  },
  firebase:{
    objpedido: dbpedido,
    objanuncio: dbanuncio,
    //objcategoria: dbcategoria
  },
  mounted () {
    //this.$refs.calendar.checkChange()
  },
  computed:{
    dateMomentCalendar (obj) {
      return obj ? moment(obj).format('llll').slice(0, -9) : ''
    },
    /*
    consultaEstoque(obj, obj2){
      Object.entries(this.objpedido).forEach(([key, value]) =>{
        let produto = value.produto;
        let vendedor = value.vendedor;
        let quantidade = produto.quantidade;
        let contador = 0;
        let total = 0;
        console.log("Anunciado:"+obj2+" - Estoque:"+quantidade)
        
      }); 
      
    },
    */
  },
  created: function () {
    const that = this;
    auth.onAuthStateChanged(function(user) {
      if(user){
        //alert(user.displayName);
        that.name = user.displayName;
        that.email = user.email;
        that.filtroAnuncio();
        that.filtroPedido();
      }  
    })
  },  
  watch:{
    objanuncio(){
      /*
      const that = this; 
      const query = dbpedido.orderByChild("produto/id").equalTo(anuncioid);
      query.on('child_added', snapshot => {
        if(snapshot.exists()) {
          produto = v.produto;
          produtoid = produto.id;
          produtoquantidade = produto.quantidade;
          console.log(anuncioid+produtoid)
          if(anuncioid==produtoid){
            reservado += parseInt(produtoquantidade);        
          }

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
      */
      Object.entries(this.objanuncio).forEach(([key, value]) =>{
        let anuncioid = value['.key'];
        let anunciousuario = value.usuario;
        let anunciovendedor = value.vendedor;
        let anunciovendedoremail = anunciovendedor.email;
        let anuncioproduto = value.produto;
        let anuncioenderecoentrega = value.enderecodentrega;
        let anuncioquantidade = value.quantidade;
        let reservado = 0;
        let total = 0;
        let produto = null;
        let produtoid = null;
        let produtoquantidade = null;
        const that = this; 
        const query = dbpedido.orderByChild("produto/"+anuncioid).equalTo(anuncioid);
        query.on('child_added', snapshot => {
          if(snapshot.exists()) {
            that.produto = snapshot.val().produto;
            that.produtoid = produto['id'];
            that.produtoquantidade = produto['quantidade'];
            //console.log(anuncioid+produtoid)
            if(that.anuncioid==that.produtoid){
              that.reservado += parseInt(that.produtoquantidade);        
            }
            that.total = parseInt(that.anuncioquantidade) - parseInt(that.reservado);
          }else{
            console.log('Pedido Inexistente!');
          }
        });
        //total = parseInt(anuncioquantidade) - parseInt(reservado); 
        //console.log(estoque+" "+calc+" "+reservado+" "+total);
        //console.log(anunciousuario+anunciovendedoremail+this.email+" "+anuncioid+produtoid);
        if(anunciovendedoremail === this.email){
          this.anuncio.push(
            {
              imagem: value.imagem[0],
              produto: value.titulo,
              quantidade: value.quantidade,
              emissao: this.computedDateFormattedMomentjs(value.emissao),
              status: this.arraystatusanuncio[value.status],
              //status: parseInt(value.quantidade) - parseInt(this.consultaEstoque(value['.key'])) +" "+ this.arraystatusanuncio[value.status],
              link: value['.key']
            }
          )
        }  
      });
    },
    objpedido(){
      //console.log(this.objpedido.filter(pedido => pedido.vendedor.email === this.email))
      const obj = [];
      const objMes = [];
      const objAno = [];
      //Entrega
      const objEntregaDia = [];
      const objEntregaMes = [];
      const objEntregaAno = [];
      //retirada
      const objRetiradaDia = [];
      const objRetiradaMes = [];
      const objRetiradaAno = [];
      //Pago
      const objpago = [];
      const objpagoSemana = [];
      const objpagoMes = [];
      const objpagoAno = [];
      //A pagar
      const objareceber = [];
      const objareceberSemana = [];
      const objareceberMes = [];
      const objareceberAno = [];
      //Dados da Tabela
      this.desserts = [];
      this.desserts2 = [];
      this.desserts3 = [];
      //Dados do Gráfico
      this.grafico = [
        {mes:'Jan', qtd:0},
        {mes:'Fev', qtd:0},
        {mes:'Mar', qtd:0},
        {mes:'Abr', qtd:0},
        {mes:'Mai', qtd:0},
        {mes:'Jun', qtd:0},
        {mes:'Jul', qtd:0},
        {mes:'Ago', qtd:0},
        {mes:'Set', qtd:0},
        {mes:'Out', qtd:0},
        {mes:'Nov', qtd:0},
        {mes:'Dez', qtd:0},
      ];
      Object.entries(this.objpedido).forEach(([key, value]) =>{
        let usuario = value.usuario;
        let vendedor = value.vendedor;
        let produto = value.produto;
        let enderecoentrega = value.enderecodentrega;
        let vendend = vendedor.endereco;
        //console.log(vendedor.email)
        let entrega = value.entrega;
        let retirada = value.retirada;
        if(vendedor.email === this.email){
          if(value.status==0){
            
            if(entrega==new Date().toISOString().substr(0, 10)){
              objareceber.push(parseFloat(value.valor.replace(",", ".")));  
            }
            
            let dateToday = new Date();
            if(new Date(entrega) >= dateToday.setDate(dateToday.getDate() -7)){
              objareceberSemana.push(parseFloat(value.valor.replace(",", ".")));  
            }
            
            if(new Date(entrega).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objareceberMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objareceberAno.push(parseFloat(value.valor.replace(",", ".")));  
            }

          }else{
            
            if(entrega==new Date().toISOString().substr(0, 10)){
              objpago.push(parseFloat(value.valor.replace(",", ".")));  
            }
                                    
            let dateToday = new Date();
            if(new Date(entrega) >= dateToday.setDate(dateToday.getDate() -7)){
              objpagoSemana.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objpagoMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objpagoAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
            //obj.push(parseFloat(value.valor.replace(",", ".")));
          }

          if(value.situacao==0 || value.situacao==1){
            this.desserts.push(
              {
                imagem: produto.imagem,
                nome: usuario.nome.toUpperCase()+" "+usuario.telefone,
                local: enderecoentrega.entbairro+", "+enderecoentrega.entcidade,
                pedido: produto.produto,
                valor: value.valor,
                quantidade: produto.quantidade,
                data: this.momentjsDiaMes(value.entrega),
                status: this.arraystatus[value.status],
                situacao: this.situacaopedido[value.situacao],
                link: produto.id,
                //Pedido
                pedidoid: value['.key'],
                pedidoemissao: value.emissao,
                pedidoentrega: value.entrega,
                pedidoentregaformatada: this.computedDateFormattedMomentjs(value.entrega),
                pedidoretirada: value.retirada,
                pedidoretiradaformatada: this.computedDateFormattedMomentjs(value.retirada),
                pedidosituacao: value.situacao,
                pedidostatus: value.status,
                pedidosubtotal: value.subtotal,
                pedidofrete: value.frete,
                pedidototal: value.valor,
                pedidometodopagamento: value.metodopgto,
                //Produto
                produtoid: produto.id,
                produtoimagem: produto.imagem,
                produtotitulo: produto.produto,
                produtodescricao: produto.descricao,
                produtoacessorios: produto.acessorios,
                produtoquantidade: produto.quantidade,
                produtovalor: produto.valor,
                //Usuário
                usuarioemail: usuario.email,
                usuarioregistro: usuario.registro,
                usuarionome: usuario.nome,
                usuariotelefone: usuario.telefone,
                usuariotelefone2: usuario.telefone2,
                //Vendedor
                vendedoremail: vendedor.email,
                vendedorregistro: vendedor.registro,
                vendedornome: vendedor.nome,
                vendedortelefone: vendedor.telefone,
                vendedortelefone2: vendedor.telefone2,
                //Vendedor Endereço
                vendedorenderecologradouro: vendend.logradouro,
                vendedorendereconumero: vendend.numero,
                vendedorenderecocomplemento: vendend.complemento,
                vendedorenderecobairro: vendend.bairro,
                vendedorenderecocidade: vendend.cidade,
                vendedorenderecoestado: vendend.uf,
                vendedorenderecocep: vendend.cep,
                //Entrega
                entregalogradouro: enderecoentrega.entlogradouro,
                entreganumero: enderecoentrega.entnumero,
                entregacomplemento: enderecoentrega.entcomplemento,
                entregabairro: enderecoentrega.entbairro,
                entregacidade: enderecoentrega.entcidade,
                entregaestado: enderecoentrega.entestado,
                entregacep: enderecoentrega.entcep,
              }
            );
            if(entrega==new Date().toISOString().substr(0, 10)){
              objEntregaDia.push(parseFloat(value.valor.replace(",", ".")));  
            }
                                    
            if(new Date(entrega).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objEntregaMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objEntregaAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
          }
          if(value.situacao==2){
            this.desserts2.push(
              {
                imagem: produto.imagem,
                nome: usuario.nome.toUpperCase()+" "+usuario.telefone,
                local: enderecoentrega.entbairro+", "+enderecoentrega.entcidade,
                pedido: produto.produto,
                valor: value.valor,
                quantidade: produto.quantidade,
                data: this.momentjsDiaMes(value.entrega),
                status: this.arraystatus[value.status],
                situacao: this.situacaopedido[value.situacao],
                link: produto.id,
                //Pedido
                pedidoid: value['.key'],
                pedidoemissao: value.emissao,
                pedidoentrega: value.entrega,
                pedidoentregaformatada: this.computedDateFormattedMomentjs(value.entrega),
                pedidoretirada: value.retirada,
                pedidoretiradaformatada: this.computedDateFormattedMomentjs(value.retirada),
                pedidosituacao: value.situacao,
                pedidostatus: value.status,
                pedidosubtotal: value.subtotal,
                pedidofrete: value.frete,
                pedidototal: value.valor,
                pedidometodopagamento: value.metodopgto,
                //Produto
                produtoid: produto.id,
                produtoimagem: produto.imagem,
                produtotitulo: produto.produto,
                produtodescricao: produto.descricao,
                produtoacessorios: produto.acessorios,
                produtoquantidade: produto.quantidade,
                produtovalor: produto.valor,
                //Usuário
                usuarioemail: usuario.email,
                usuarioregistro: usuario.registro,
                usuarionome: usuario.nome,
                usuariotelefone: usuario.telefone,
                usuariotelefone2: usuario.telefone2,
                //Vendedor
                vendedoremail: vendedor.email,
                vendedorregistro: vendedor.registro,
                vendedornome: vendedor.nome,
                vendedortelefone: vendedor.telefone,
                vendedortelefone2: vendedor.telefone2,
                //Vendedor Endereço
                vendedorenderecologradouro: vendend.logradouro,
                vendedorendereconumero: vendend.numero,
                vendedorenderecocomplemento: vendend.complemento,
                vendedorenderecobairro: vendend.bairro,
                vendedorenderecocidade: vendend.cidade,
                vendedorenderecoestado: vendend.uf,
                vendedorenderecocep: vendend.cep,
                //Entrega
                entregalogradouro: enderecoentrega.entlogradouro,
                entreganumero: enderecoentrega.entnumero,
                entregacomplemento: enderecoentrega.entcomplemento,
                entregabairro: enderecoentrega.entbairro,
                entregacidade: enderecoentrega.entcidade,
                entregaestado: enderecoentrega.entestado,
                entregacep: enderecoentrega.entcep,
              }
            );
            if(entrega==new Date().toISOString().substr(0, 10)){
              objEntregaDia.push(parseFloat(value.valor.replace(",", ".")));  
            }
                                    
            if(new Date(entrega).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objEntregaMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objEntregaAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
          }
          if(value.situacao==3 || value.situacao==4){
            this.desserts3.push(
              {
                imagem: produto.imagem,
                nome: usuario.nome.toUpperCase()+" "+usuario.telefone,
                local: enderecoentrega.entbairro+", "+enderecoentrega.entcidade,
                pedido: produto.produto,
                valor: value.valor,
                quantidade: produto.quantidade,
                data: this.momentjsDiaMes(value.entrega),
                status: this.arraystatus[value.status],
                situacao: this.situacaopedido[value.situacao],
                link: produto.id,
                //Pedido
                pedidoid: value['.key'],
                pedidoemissao: value.emissao,
                pedidoentrega: value.entrega,
                pedidoentregaformatada: this.computedDateFormattedMomentjs(value.entrega),
                pedidoretirada: value.retirada,
                pedidoretiradaformatada: this.computedDateFormattedMomentjs(value.retirada),
                pedidosituacao: value.situacao,
                pedidostatus: value.status,
                pedidosubtotal: value.subtotal,
                pedidofrete: value.frete,
                pedidototal: value.valor,
                pedidometodopagamento: value.metodopgto,
                //Produto
                produtoid: produto.id,
                produtoimagem: produto.imagem,
                produtotitulo: produto.produto,
                produtodescricao: produto.descricao,
                produtoacessorios: produto.acessorios,
                produtoquantidade: produto.quantidade,
                produtovalor: produto.valor,
                //Usuário
                usuarioemail: usuario.email,
                usuarioregistro: usuario.registro,
                usuarionome: usuario.nome,
                usuariotelefone: usuario.telefone,
                usuariotelefone2: usuario.telefone2,
                //Vendedor
                vendedoremail: vendedor.email,
                vendedorregistro: vendedor.registro,
                vendedornome: vendedor.nome,
                vendedortelefone: vendedor.telefone,
                vendedortelefone2: vendedor.telefone2,
                //Vendedor Endereço
                vendedorenderecologradouro: vendend.logradouro,
                vendedorendereconumero: vendend.numero,
                vendedorenderecocomplemento: vendend.complemento,
                vendedorenderecobairro: vendend.bairro,
                vendedorenderecocidade: vendend.cidade,
                vendedorenderecoestado: vendend.uf,
                vendedorenderecocep: vendend.cep,
                //Entrega
                entregalogradouro: enderecoentrega.entlogradouro,
                entreganumero: enderecoentrega.entnumero,
                entregacomplemento: enderecoentrega.entcomplemento,
                entregabairro: enderecoentrega.entbairro,
                entregacidade: enderecoentrega.entcidade,
                entregaestado: enderecoentrega.entestado,
                entregacep: enderecoentrega.entcep,
              }
            );
            if(retirada==new Date().toISOString().substr(0, 10)){
              objRetiradaDia.push(parseFloat(value.valor.replace(",", ".")));  
            }
                                    
            if(new Date(retirada).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objRetiradaMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(retirada).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objRetiradaAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
          }
          /*
          else{
            this.desserts2.push(
              {
                imagem: produto.imagem,
                nome: usuario.nome+" "+usuario.telefone,
                local: enderecoentrega.entbairro+", "+enderecoentrega.entcidade,
                pedido: produto.produto,
                valor: value.valor,
                quantidade: produto.quantidade,
                data: this.momentjsDiaMes(value.entrega),
                status: this.arraystatus[value.status],
                situacao: this.situacaopedido[value.situacao],
                link: produto.id,
                //Pedido
                pedidoid: value['.key'],
                pedidoemissao: value.emissao,
                pedidoentrega: value.entrega,
                pedidoentregaformatada: this.computedDateFormattedMomentjs(value.entrega),
                pedidoretirada: value.retirada,
                pedidoretiradaformatada: this.computedDateFormattedMomentjs(value.retirada),
                pedidosituacao: value.situacao,
                pedidostatus: value.status,
                pedidosubtotal: value.subtotal,
                pedidofrete: value.frete,
                pedidototal: value.valor,
                pedidometodopagamento: value.metodopgto,
                //Produto
                produtoid: produto.id,
                produtoimagem: produto.imagem,
                produtotitulo: produto.produto,
                produtodescricao: produto.descricao,
                produtoacessorios: produto.acessorios,
                produtoquantidade: produto.quantidade,
                produtovalor: produto.valor,
                //Usuário
                usuarioemail: usuario.email,
                usuarioregistro: usuario.registro,
                usuarionome: usuario.nome,
                usuariotelefone: usuario.telefone,
                usuariotelefone2: usuario.telefone2,
                //Vendedor
                vendedoremail: vendedor.email,
                vendedorregistro: vendedor.registro,
                vendedornome: vendedor.nome,
                vendedortelefone: vendedor.telefone,
                vendedortelefone2: vendedor.telefone2,
                //Vendedor Endereço
                vendedorenderecologradouro: vendend.logradouro,
                vendedorendereconumero: vendend.numero,
                vendedorenderecocomplemento: vendend.complemento,
                vendedorenderecobairro: vendend.bairro,
                vendedorenderecocidade: vendend.cidade,
                vendedorenderecoestado: vendend.uf,
                vendedorenderecocep: vendend.cep,
                //Entrega
                entregalogradouro: enderecoentrega.entlogradouro,
                entreganumero: enderecoentrega.entnumero,
                entregacomplemento: enderecoentrega.entcomplemento,
                entregabairro: enderecoentrega.entbairro,
                entregacidade: enderecoentrega.entcidade,
                entregaestado: enderecoentrega.entestado,
                entregacep: enderecoentrega.entcep,
              }
            );
            if(retirada==new Date().toISOString().substr(0, 10)){
              objRetiradaDia.push(parseFloat(value.valor.replace(",", ".")));  
            }
                                    
            if(new Date(retirada).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objRetiradaMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(retirada).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objRetiradaAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
            //obj.push(parseFloat(value.valor.replace(",", ".")));
          }
          */
          //this.value.map(x => x.mes).indexOf(this.dateMoment(value.entrega));
          //console.log(this.value.map(x => x.mes, x.qtd += 1).indexOf(this.dateMoment(value.entrega)));
          //this.grafico.map(x => x.mes, ()=>{ x.qtd += 1 }).indexOf(this.dateMoment(value.entrega));
          
          //console.log(this.value.map(([k, v]) => v.mes));
          //this.value.map(x => x.mes).indexOf(this.dateMoment(value.entrega));
          //this.grafico.map(x => x.mes, ()=>{ x.qtd += 1 }).indexOf(this.dateMoment(value.entrega));
          Object.entries(this.grafico).forEach(([k, v]) =>{
            //console.log(v.mes+" - "+this.dateMoment(entrega)+" "+this.dateMomentAno(entrega));
            if(v.mes+" "+this.dateMomentAno(new Date().toISOString().substr(0, 10))==this.dateMoment(entrega)+" "+this.dateMomentAno(entrega)){
              v.qtd += 1
            }
          });
          /*
          this.grafico.push(
            {
              mes: this.dateMoment(value.entrega),
              qtd: 1
            }
          );
          */
          //this.value.push(1);
          //objlabel.push(this.computedDateFormattedMomentjs(value.entrega));
          //this.valorPago = parseFloat(this.valorPago) + parseFloat(value.valor);
          
          let contseries = [];
          Object.entries(this.grafico).forEach(([key, value]) =>{
            //this.indices.push(value.mes);
            this.valores.push(value.qtd);
            contseries.push(value.qtd);
          });
          this.updateSeriesLine(this.series[0].data = contseries);
        }  
      });
      //Entregas
      this.entregasDia = objEntregaDia;
      this.entregasMes = objEntregaMes;
      this.entregasAno = objEntregaAno;  
      //Retiradas
      this.retiradasDia = objRetiradaDia;
      this.retiradasMes = objRetiradaMes;
      this.retiradasAno = objRetiradaAno;
      //Valores
      this.valorPago = objpago.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorPagoSemana = objpagoSemana.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorPagoMes = objpagoMes.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorPagoAno = objpagoAno.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorReceber = objareceber.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorReceberSemana = objareceberSemana.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorReceberMes = objareceberMes.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorReceberAno = objareceberAno.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
    }
  },   
  mounted () {
    //this.$refs.calendar.checkChange()
  },
  methods:{
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
    
    atualizapedido(){
      /*
      this.dialog = !this.dialog
      this.dialogImagem = obj.imagem;
      this.dialogTitulo = obj.pedido;
      this.dialogCliente = obj.nome;
      this.dialogLocal = obj.local;      
      this.dialogValor = obj.valor;
      this.dialogQuantidade = obj.quantidade;
      this.dialogRetirada = obj.data;
      this.dialogStatus = obj.status;
      this.dialogLink = obj.link;
      //Pedido
      this.dialogpedidoid = obj.pedidoid;
      this.dialogpedidoemissao = obj.pedidoemissao;
      this.dialogpedidoentrega = obj.pedidoentrega;
      this.dialogpedidoentregaformatada = obj.pedidoentregaformatada;
      this.dialogpedidoretirada = obj.pedidoretirada;
      this.dialogpedidoretiradaformatada = obj.pedidoretiradaformatada;
      this.dialogpedidosituacao = obj.pedidosituacao;
      //Valores
      this.dialogpedidostatus = obj.pedidostatus;
      this.dialogpedidosubtotal = obj.pedidosubtotal;
      this.dialogpedidofrete = obj.pedidofrete;
      this.dialogpedidototal = obj.pedidototal;
      this.dialogpedidometodopagamento = obj.pedidometodopagamento;
      //Produto
      this.dialogprodutoid = obj.produtoid; 
      this.dialogprodutoimagem = obj.produtoimagem;
      this.dialogprodutotitulo = obj.produtotitulo;
      this.dialogprodutodescricao = obj.produtodescricao; 
      this.dialogprodutoquantidade = obj.produtoquantidade;
      this.dialogprodutovalor = obj.produtovalor;
      //Usuário
      this.dialogusuarioemail = obj.usuarioemail;
      this.dialogusuarioregistro = obj.usuarioregistro;
      this.dialogusuarionome = obj.usuarionome;
      this.dialogusuariotelefone = obj.usuariotelefone;
      this.dialogusuariotelefone2 = obj.usuariotelefone2;
      //Vendedor
      this.dialogvendedoremail = obj.vendedoremail;
      this.dialogvendedorregistro = obj.vendedorregistro;
      this.dialogvendedornome = obj.vendedornome;
      this.dialogvendedortelefone = obj.vendedortelefone;
      this.dialogvendedortelefone2 = obj.vendedortelefone2;
      //Vendedor Endereço
      this.dialogvendedorenderecologradouro = obj.vendedorenderecologradouro;
      this.dialogvendedorendereconumero = obj.vendedorendereconumero;
      this.dialogvendedorenderecocomplemento = obj.vendedorenderecocomplemento;
      this.dialogvendedorenderecobairro = obj.vendedorenderecobairro;
      this.dialogvendedorenderecocidade = obj.vendedorenderecocidade;
      this.dialogvendedorenderecoestado =  obj.vendedorenderecoestado;
      this.dialogvendedorenderecocep = obj.vendedorenderecocep;
      //Entrega
      this.dialogentregalogradouro = obj.entregalogradouro;
      this.dialogentreganumero = obj.entreganumero;
      this.dialogentregacomplemento = obj.entregacomplemento;
      this.dialogentregabairro = obj.entregabairro;
      this.dialogentregacidade = obj.entregacidade;
      this.dialogentregaestado = obj.entregaestado;
      this.dialogentregacep = obj.entregacep;
      //Fim Dialog Pedido
      */
      const that = this;
      db.ref('pedido/'+this.dialogpedidoid).update({
        produto: {
          id: this.dialogprodutoid,
          produto: this.dialogprodutotitulo,
          imagem: this.dialogprodutoimagem,
          descricao: this.dialogprodutodescricao,
          acessorios: this.dialogprodutoacessorios,
          quantidade: this.dialogprodutoquantidade,
          valor: this.dialogprodutovalor
        },
        usuario: {
          nome: this.dialogusuarionome,
          registro: this.dialogusuarioregistro,
          email: this.dialogusuarioemail,
          telefone: this.dialogusuariotelefone,
          telefone2: this.dialogusuariotelefone2,
        },
        enderecodentrega:
        { 
          entlogradouro: this.dialogentregalogradouro,
          entnumero: this.dialogentreganumero,
          entcomplemento: this.dialogentregacomplemento,
          entbairro: this.dialogentregabairro,
          entcidade: this.dialogentregacidade,
          entestado: this.dialogentregaestado,
          //entpais: $("#pais").val(),
          entcep: this.dialogentregacep
        },
        vendedor:{
          nome: this.dialogvendedornome,
          email: this.dialogvendedoremail,
          registro: this.dialogvendedorregistro,
          telefone: this.dialogusuariotelefone,
          telefone2: this.dialogvendedortelefone2,
          endereco:{
            logradouro: this.dialogvendedorenderecologradouro,
            numero: this.dialogvendedorendereconumero,
            complemento: this.dialogvendedorenderecocomplemento,
            bairro: this.dialogvendedorenderecobairro,
            cidade: this.dialogvendedorenderecocidade,
            uf: this.dialogvendedorenderecoestado,
            cep: this.dialogvendedorenderecocep,
          }
        },
        entrega: this.dialogpedidoentrega,
        retirada: this.dialogpedidoretirada,
        metodopgto: this.dialogpedidometodopagamento,
        subtotal: this.dialogpedidosubtotal,
        extra: '',
        frete: this.dialogpedidofrete,
        valor: this.dialogpedidototal,
        situacao: this.dialogpedidosituacao,
        status: this.dialogpedidostatus,
        emissao: this.dialogpedidoemissao,
        codpagseguro:''
      },
      function(error) {
        if (error) {
          that.snackbartext = 'Erro ao Atualizar, tente mais tarde!'
          // The write failed...
        } else {    
          that.snackbartext = 'Pedido atualizado com Sucesso!'
          // Data saved successfully!
        }
      });
      //this.valid2 = false;
      //this.snackbartext = obj
      this.editdialog = false
      this.snackbar = true 
    },
    exibepedido(obj){
      this.dialog = !this.dialog
      this.dialogImagem = obj.imagem;
      this.dialogTitulo = obj.pedido;
      this.dialogCliente = obj.nome;
      this.dialogLocal = obj.local;      
      this.dialogValor = obj.valor;
      this.dialogQuantidade = obj.quantidade;
      this.dialogRetirada = obj.data;
      this.dialogStatus = obj.status;
      this.dialogLink = obj.link;
      //alert(obj.imagem+obj.pedido+obj.nome+obj.quantidade);
      //Pedido
      this.dialogpedidoid = obj.pedidoid;
      this.dialogpedidoemissao = obj.pedidoemissao;
      this.dialogpedidoentrega = obj.pedidoentrega;
      this.dialogpedidoentregaformatada = obj.pedidoentregaformatada;
      this.dialogpedidoretirada = obj.pedidoretirada;
      this.dialogpedidoretiradaformatada = obj.pedidoretiradaformatada;
      this.dialogpedidosituacao = obj.pedidosituacao;
      //Pedido Pagamento
      this.dialogpedidostatus = obj.pedidostatus;
      this.dialogpedidosubtotal = obj.pedidosubtotal;
      this.dialogpedidofrete = obj.pedidofrete;
      this.dialogpedidototal = obj.pedidototal;
      this.dialogpedidometodopagamento = obj.pedidometodopagamento;
      //Produto
      this.dialogprodutoid = obj.produtoid; 
      this.dialogprodutoimagem = obj.produtoimagem;
      this.dialogprodutotitulo = obj.produtotitulo;
      this.dialogprodutodescricao = obj.produtodescricao; 
      this.dialogprodutoacessorios = obj.produtoacessorios,
      this.dialogprodutoquantidade = obj.produtoquantidade;
      this.dialogprodutovalor = obj.produtovalor;
      //Usuário
      this.dialogusuarioemail = obj.usuarioemail;
      this.dialogusuarioregistro = obj.usuarioregistro;
      this.dialogusuarionome = obj.usuarionome;
      this.dialogusuariotelefone = obj.usuariotelefone;
      this.dialogusuariotelefone2 = obj.usuariotelefone2
      //Vendedor
      this.dialogvendedoremail = obj.vendedoremail;
      this.dialogvendedorregistro = obj.vendedorregistro;
      this.dialogvendedornome = obj.vendedornome;
      this.dialogvendedortelefone = obj.vendedortelefone;
      this.dialogvendedortelefone2 = obj.vendedortelefone2;
      //Vendedor Endereço
      this.dialogvendedorenderecologradouro = obj.vendedorenderecologradouro,
      this.dialogvendedorendereconumero = obj.vendedorendereconumero,
      this.dialogvendedorenderecocomplemento = obj.vendedorenderecocomplemento,
      this.dialogvendedorenderecobairro = obj.vendedorenderecobairro,
      this.dialogvendedorenderecocidade = obj.vendedorenderecocidade,
      this.dialogvendedorenderecoestado =  obj.vendedorenderecoestado,
      this.dialogvendedorenderecocep = obj.vendedorenderecocep,
      //Entrega
      this.dialogentregalogradouro = obj.entregalogradouro,
      this.dialogentreganumero = obj.entreganumero,
      this.dialogentregacomplemento = obj.entregacomplemento;
      this.dialogentregabairro = obj.entregabairro;
      this.dialogentregacidade = obj.entregacidade;
      this.dialogentregaestado = obj.entregaestado;
      this.dialogentregacep = obj.entregacep
      //Fim Dialog Pedido
    },
    redirectProduct: function(obj){
      this.$router.push({ 
        name: 'product',
        params: { 
                  //Produto 
                  product: obj,
                  //Usuário
                  usuarionome: this.dialogusuarionome,
                  usuarioregistro: this.dialogusuarioregistro,
                  usuarioemail: this.dialogusuarioemail,
                  usuariotelefone: this.dialogusuariotelefone,
                  usuariotelefone2: this.dialogusuariotelefone2,
                  //Endereço
                  usuarionumero: this.dialogentreganumero,
                  usuariocomplemento: this.dialogentregacomplemento,
                  usuariocep: this.dialogentregacep,
                }
      })
    },
    redirectRequest: function(obj){
      this.$router.push({ name: 'request', params: { request: obj} })
    },
    computedDateFormattedMomentjs (objdate) {
      return objdate ? moment(objdate).format('llll').slice(0, -9): ''
    },
    momentjsDiaMes (objdate) {
      return objdate ? moment(objdate).format('D MMM'): ''
    },
    dateMoment (objdate) {
      return objdate ? moment(objdate).format('MMM') : ''
    },
    dateMomentDia (objdate) {
      return objdate ? moment(objdate).calendar().slice(0, -9) : ''
    },
    dateMomentSemana (objdate) {
      return objdate ? moment(objdate).subtract(7, 'days').calendar() : ''
    },
    dateMomentMes (objdate) {
      return objdate ? moment(objdate).format('MMMM') : ''
    },
    dateMomentAno (objdate) {
      return objdate ? moment(objdate).format('L').slice(6) : ''
    },
    filtroPedido(){
      //Dados da Tabela
      this.desserts = [];
      this.desserts2 = [];
      this.desserts3 = [];
      //Dados do Gráfico
      this.grafico = [
        {mes:'Jan', qtd:0},
        {mes:'Fev', qtd:0},
        {mes:'Mar', qtd:0},
        {mes:'Abr', qtd:0},
        {mes:'Mai', qtd:0},
        {mes:'Jun', qtd:0},
        {mes:'Jul', qtd:0},
        {mes:'Ago', qtd:0},
        {mes:'Set', qtd:0},
        {mes:'Out', qtd:0},
        {mes:'Nov', qtd:0},
        {mes:'Dez', qtd:0},
      ];
      //console.log(this.objpedido.filter(pedido => pedido.vendedor.email === this.email))
      const obj = [];
      const objMes = [];
      const objAno = [];
      //Entrega
      const objEntregaDia = [];
      const objEntregaMes = [];
      const objEntregaAno = [];
      //retirada
      const objRetiradaDia = [];
      const objRetiradaMes = [];
      const objRetiradaAno = [];
      //Pago
      const objpago = [];
      const objpagoSemana = [];
      const objpagoMes = [];
      const objpagoAno = [];
      //A pagar
      const objareceber = [];
      const objareceberSemana = [];
      const objareceberMes = [];
      const objareceberAno = [];
      Object.entries(this.objpedido).forEach(([key, value]) =>{
        let usuario = value.usuario;
        let vendedor = value.vendedor;
        let produto = value.produto;
        let enderecoentrega = value.enderecodentrega;
        let vendend = vendedor.endereco;
        //console.log(vendedor.email)
        let entrega = value.entrega;
        let retirada = value.retirada;
        if(vendedor.email === this.email){
          //verifica Status
          if(value.status==0){
            if(entrega==new Date().toISOString().substr(0, 10)){
              objareceber.push(parseFloat(value.valor.replace(",", ".")));  
            }
               
            let dateToday = new Date();
            if(new Date(entrega) >= dateToday.setDate(dateToday.getDate() -7)){
              objareceberSemana.push(parseFloat(value.valor.replace(",", ".")));  
            }
            
            if(new Date(entrega).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objareceberMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objareceberAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
          }else{
            
            if(entrega==new Date().toISOString().substr(0, 10)){
              objpago.push(parseFloat(value.valor.replace(",", ".")));  
            }
            
            let dateToday = new Date();
            if(new Date(entrega) >= dateToday.setDate(dateToday.getDate() -7)){
              objpagoSemana.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objpagoMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objpagoAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
            //obj.push(parseFloat(value.valor.replace(",", ".")));
          }
          //Verifica Situação 0 =Em análise, Situação 1 = À entregar e 2 = entregue
          if(value.situacao==0 || value.situacao==1){
            this.desserts.push(
              {
                imagem: produto.imagem,
                nome: usuario.nome.toUpperCase()+" "+usuario.telefone,
                local: enderecoentrega.entbairro+", "+enderecoentrega.entcidade,
                pedido: produto.produto,
                valor: value.valor,
                quantidade: produto.quantidade,
                data: this.momentjsDiaMes(value.entrega),
                status: this.arraystatus[value.status],
                situacao: this.situacaopedido[value.situacao],
                link: produto.id,
                //Pedido
                pedidoid: value['.key'],
                pedidoemissao: value.emissao,
                pedidoentrega: value.entrega,
                pedidoentregaformatada: this.computedDateFormattedMomentjs(value.entrega),
                pedidoretirada: value.retirada,
                pedidoretiradaformatada: this.computedDateFormattedMomentjs(value.retirada),
                pedidosituacao: value.situacao,
                pedidostatus: value.status,
                pedidosubtotal: value.subtotal,
                pedidofrete: value.frete,
                pedidototal: value.valor,
                pedidometodopagamento: value.metodopgto,
                //Produto
                produtoid: produto.id,
                produtoimagem: produto.imagem,
                produtotitulo: produto.produto,
                produtodescricao: produto.descricao,
                produtoacessorios: produto.acessorios,
                produtoquantidade: produto.quantidade,
                produtovalor: produto.valor,
                //Usuário
                usuarioemail: usuario.email,
                usuarioregistro: usuario.registro,
                usuarionome: usuario.nome,
                usuariotelefone: usuario.telefone,
                usuariotelefone2: usuario.telefone2,
                //Vendedor
                vendedoremail: vendedor.email,
                vendedorregistro: vendedor.registro,
                vendedornome: vendedor.nome,
                vendedortelefone: vendedor.telefone,
                vendedortelefone2: vendedor.telefone2,
                //Vendedor Endereço
                vendedorenderecologradouro: vendend.logradouro,
                vendedorendereconumero: vendend.numero,
                vendedorenderecocomplemento: vendend.complemento,
                vendedorenderecobairro: vendend.bairro,
                vendedorenderecocidade: vendend.cidade,
                vendedorenderecoestado: vendend.uf,
                vendedorenderecocep: vendend.cep,
                //Entrega
                entregalogradouro: enderecoentrega.entlogradouro,
                entreganumero: enderecoentrega.entnumero,
                entregacomplemento: enderecoentrega.entcomplemento,
                entregabairro: enderecoentrega.entbairro,
                entregacidade: enderecoentrega.entcidade,
                entregaestado: enderecoentrega.entestado,
                entregacep: enderecoentrega.entcep,
              }
            );
            if(entrega==new Date().toISOString().substr(0, 10)){
              objEntregaDia.push(parseFloat(value.valor.replace(",", ".")));  
            }
                                    
            if(new Date(entrega).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objEntregaMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objEntregaAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
          }
          if(value.situacao==2){
            this.desserts2.push(
              {
                imagem: produto.imagem,
                nome: usuario.nome.toUpperCase()+" "+usuario.telefone,
                local: enderecoentrega.entbairro+", "+enderecoentrega.entcidade,
                pedido: produto.produto,
                valor: value.valor,
                quantidade: produto.quantidade,
                data: this.momentjsDiaMes(value.entrega),
                status: this.arraystatus[value.status],
                situacao: this.situacaopedido[value.situacao],
                link: produto.id,
                //Pedido
                pedidoid: value['.key'],
                pedidoemissao: value.emissao,
                pedidoentrega: value.entrega,
                pedidoentregaformatada: this.computedDateFormattedMomentjs(value.entrega),
                pedidoretirada: value.retirada,
                pedidoretiradaformatada: this.computedDateFormattedMomentjs(value.retirada),
                pedidosituacao: value.situacao,
                pedidostatus: value.status,
                pedidosubtotal: value.subtotal,
                pedidofrete: value.frete,
                pedidototal: value.valor,
                pedidometodopagamento: value.metodopgto,
                //Produto
                produtoid: produto.id,
                produtoimagem: produto.imagem,
                produtotitulo: produto.produto,
                produtodescricao: produto.descricao,
                produtoacessorios: produto.acessorios,
                produtoquantidade: produto.quantidade,
                produtovalor: produto.valor,
                //Usuário
                usuarioemail: usuario.email,
                usuarioregistro: usuario.registro,
                usuarionome: usuario.nome,
                usuariotelefone: usuario.telefone,
                usuariotelefone2: usuario.telefone2,
                //Vendedor
                vendedoremail: vendedor.email,
                vendedorregistro: vendedor.registro,
                vendedornome: vendedor.nome,
                vendedortelefone: vendedor.telefone,
                vendedortelefone2: vendedor.telefone2,
                //Vendedor Endereço
                vendedorenderecologradouro: vendend.logradouro,
                vendedorendereconumero: vendend.numero,
                vendedorenderecocomplemento: vendend.complemento,
                vendedorenderecobairro: vendend.bairro,
                vendedorenderecocidade: vendend.cidade,
                vendedorenderecoestado: vendend.uf,
                vendedorenderecocep: vendend.cep,
                //Entrega
                entregalogradouro: enderecoentrega.entlogradouro,
                entreganumero: enderecoentrega.entnumero,
                entregacomplemento: enderecoentrega.entcomplemento,
                entregabairro: enderecoentrega.entbairro,
                entregacidade: enderecoentrega.entcidade,
                entregaestado: enderecoentrega.entestado,
                entregacep: enderecoentrega.entcep,
              }
            );
            if(entrega==new Date().toISOString().substr(0, 10)){
              objEntregaDia.push(parseFloat(value.valor.replace(",", ".")));  
            }
                                    
            if(new Date(entrega).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objEntregaMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(entrega).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objEntregaAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
          }
          if(value.situacao==3 || value.situacao==4){
            this.desserts3.push(
              {
                imagem: produto.imagem,
                nome: usuario.nome.toUpperCase()+" "+usuario.telefone,
                local: enderecoentrega.entbairro+", "+enderecoentrega.entcidade,
                pedido: produto.produto,
                valor: value.valor,
                quantidade: produto.quantidade,
                data: this.momentjsDiaMes(value.entrega),
                status: this.arraystatus[value.status],
                situacao: this.situacaopedido[value.situacao],
                link: produto.id,
                //Pedido
                pedidoid: value['.key'],
                pedidoemissao: value.emissao,
                pedidoentrega: value.entrega,
                pedidoentregaformatada: this.computedDateFormattedMomentjs(value.entrega),
                pedidoretirada: value.retirada,
                pedidoretiradaformatada: this.computedDateFormattedMomentjs(value.retirada),
                pedidosituacao: value.situacao,
                pedidostatus: value.status,
                pedidosubtotal: value.subtotal,
                pedidofrete: value.frete,
                pedidototal: value.valor,
                pedidometodopagamento: value.metodopgto,
                //Produto
                produtoid: produto.id,
                produtoimagem: produto.imagem,
                produtotitulo: produto.produto,
                produtodescricao: produto.descricao,
                produtoacessorios: produto.acessorios,
                produtoquantidade: produto.quantidade,
                produtovalor: produto.valor,
                //Usuário
                usuarioemail: usuario.email,
                usuarioregistro: usuario.registro,
                usuarionome: usuario.nome,
                usuariotelefone: usuario.telefone,
                usuariotelefone2: usuario.telefone2,
                //Vendedor
                vendedoremail: vendedor.email,
                vendedorregistro: vendedor.registro,
                vendedornome: vendedor.nome,
                vendedortelefone: vendedor.telefone,
                vendedortelefone2: vendedor.telefone2,
                //Vendedor Endereço
                vendedorenderecologradouro: vendend.logradouro,
                vendedorendereconumero: vendend.numero,
                vendedorenderecocomplemento: vendend.complemento,
                vendedorenderecobairro: vendend.bairro,
                vendedorenderecocidade: vendend.cidade,
                vendedorenderecoestado: vendend.uf,
                vendedorenderecocep: vendend.cep,
                //Entrega
                entregalogradouro: enderecoentrega.entlogradouro,
                entreganumero: enderecoentrega.entnumero,
                entregacomplemento: enderecoentrega.entcomplemento,
                entregabairro: enderecoentrega.entbairro,
                entregacidade: enderecoentrega.entcidade,
                entregaestado: enderecoentrega.entestado,
                entregacep: enderecoentrega.entcep,
              }
            );
            if(retirada==new Date().toISOString().substr(0, 10)){
              objRetiradaDia.push(parseFloat(value.valor.replace(",", ".")));  
            }
                                    
            if(new Date(retirada).toISOString().substr(0, 7)==new Date().toISOString().substr(0, 7)){
              objRetiradaMes.push(parseFloat(value.valor.replace(",", ".")));  
            }

            if(new Date(retirada).toISOString().substr(0, 4)==new Date().toISOString().substr(0, 4)){
              objRetiradaAno.push(parseFloat(value.valor.replace(",", ".")));  
            }
          }
          
          //console.log(this.value.map(([k, v]) => v.mes));
          //this.value.map(x => x.mes).indexOf(this.dateMoment(value.entrega));
          //this.grafico.map(x => x.mes, ()=>{ x.qtd += 1 }).indexOf(this.dateMoment(value.entrega));
          Object.entries(this.grafico).forEach(([k, v]) =>{
            //console.log(v.mes+" - "+this.dateMoment(entrega)+" "+this.dateMomentAno(entrega));
            if(v.mes+" "+this.dateMomentAno(new Date().toISOString().substr(0, 10))==this.dateMoment(entrega)+" "+this.dateMomentAno(entrega)){
              v.qtd += 1
            }
          });
          //this.labels.push(this.dataFormatoMes(value.entrega));
          //this.value.push(1);
          //this.valorPago = parseFloat(this.valorPago) + parseFloat(value.valor);
          
          let contseries = [];
          Object.entries(this.grafico).forEach(([key, value]) =>{
            //this.indices.push(value.mes);
            this.valores.push(value.qtd);
            //contseries += value.qtd+',';
            contseries.push(value.qtd);
          });
          this.updateSeriesLine(this.series[0].data = contseries);
        }  
      });
      //Entregas
      this.entregasDia = objEntregaDia;
      this.entregasMes = objEntregaMes;
      this.entregasAno = objEntregaAno;  
      //Retiradas
      this.retiradasDia = objRetiradaDia;
      this.retiradasMes = objRetiradaMes;
      this.retiradasAno = objRetiradaAno;
      //Valores
      this.valorPago = objpago.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorPagoSemana = objpagoSemana.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorPagoMes = objpagoMes.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorPagoAno = objpagoAno.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorReceber = objareceber.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorReceberSemana = objareceberSemana.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorReceberMes = objareceberMes.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
      this.valorReceberAno = objareceberAno.reduce((a, b) => a + b, 0).toLocaleString("pt-BR", {minimumFractionDigits: 2});
    },

    filtroAnuncio(){
      //console.log(this.objpedido.filter(pedido => pedido.vendedor.email === this.email))
      Object.entries(this.objanuncio).forEach(([key, value]) =>{
        let anuncioid = value['.key'];
        let anunciousuario = value.usuario;
        let anunciovendedor = value.vendedor;
        let anunciovendedoremail = anunciovendedor.email;
        let anuncioproduto = value.produto;
        let anuncioenderecoentrega = value.enderecodentrega;
        let anuncioquantidade = value.quantidade;
        let reservado = 0;
        let total = 0;
        let produto = null;
        let produtoid = null;
        let produtoquantidade = null;
        Object.entries(this.objpedido).forEach(([k, v]) =>{
          produto = v.produto;
          produtoid = produto.id;
          produtoquantidade = produto.quantidade;
          //console.log(anuncioid+produtoid)
          if(anuncioid==produtoid){
            reservado += parseInt(produtoquantidade);        
          }
        });
        total = parseInt(anuncioquantidade) - parseInt(reservado); 
        //console.log(estoque+" "+calc+" "+reservado+" "+total);
        //console.log(anunciousuario+anunciovendedoremail+this.email);
        if(anunciovendedoremail === this.email){
          this.anuncio.push(
            {
              imagem: value.imagem[0],
              produto: value.titulo,
              quantidade: value.quantidade,
              emissao: this.computedDateFormattedMomentjs(value.emissao),
              status: this.arraystatusanuncio[value.status],
              //status: parseInt(value.quantidade) - parseInt(this.consultaEstoque(value['.key'])) +" "+ this.arraystatusanuncio[value.status],
              link: value['.key']
            }
          )
        }  
      });
    },
    updateSeriesLine (obj) {
      this.$refs.realtimeChart.updateSeries([{
        data: obj
      }], false, true)
    },
    getColor(obj) {
      if (obj=="À pagar") return 'red'
      else return 'teal'
    },
    getSituacaoColor(obj) {
      //situacaopedido: {0:'Em análise',1:'À entregar',2:'Entregue',3:'Recolhido',4:'Cancelado'},
      switch (obj) {
        case 'Em análise':
          return 'yellow'
          break;
        case 'À entregar':
          return 'teal'
          break;
        case 'Entregue':
          return '#1976D2'
          break;
        case 'Finalizado':
          return '#424242'
          break;
        case 'Cancelado':
          return 'red'
          break;      
        default:
          return 'black';
      }
      /*
      if (obj=="À pagar") return 'orange'
      else return 'teal'
      */
    },
    getTextColor(obj) {
      switch (obj) {
        case 'Em análise':
          return 'black'
          break;
        case 'À entregar':
          return 'white'
          break;
        case 'Entregue':
          return 'white'
          break;
        case 'Finalizado':
          return 'white'
          break;
        case 'Cancelado':
          return 'white'
          break;      
        default:
          return 'white';
      }
    },
    getStartEnd(start, end){
      //start, end
      let total = 100;
      let dateStart = moment(start);
      let dateEnd = moment(end);
      let dateNow = moment().format().slice(0, -15);
      let diffStartEnd = dateStart.diff(dateEnd, 'days');
      let diffNowEnd = dateStart.diff(dateNow, 'days');
      //var porcentagem = parseFloat('7') ;
      let result = total * (diffNowEnd/diffStartEnd);
      return result;
      //return start+" "+end;
    },
    getSituacao(id, situacao, telefone){
      this.selectsituacao = this.situacaopedidoreverso[situacao];
      this.dialogidsituacao = id;
      this.dialogsituacaotelefone = telefone;
      this.dialogsituacao = true;
    },
    getStatus(id, status){
      this.selectstatus = this.situacaostatusreverso[status];
      this.dialogidstatus = id;
      this.dialogstatus = true;
    },
    getRangeDate(dateStart, dateEnd){
      let range = [];
      let start = moment(dateStart);
      let end = moment(dateEnd);
      let now = moment().format().slice(0, -15);
      let diffStartEnd = end.diff(start, 'days');
      let diffNowEnd = end.diff(now, 'days');
      let teste = moment(dateEnd).endOf('day').fromNow();
      let resultrangename = '';
      let resulteventcolor = '';
      if(teste.match(/em/)){
        resultrangename = "Termina "+ teste;
        resulteventcolor = 'primary';
      }else{
        resultrangename = "Terminou "+ teste;
        resulteventcolor = '#424242';
      }
      range.push({
        name: resultrangename,//"Termina em "+diffNowEnd+" dias - "+
        start: dateStart,
        end: dateEnd,
        //color: resultrangecolor,
        //timed: !allDay,
      });
      this.titlecalendar = this.momentjsDiaMes(dateStart)+" - "+this.momentjsDiaMes(dateEnd)+" ("+diffStartEnd +" dias)";
      this.calend = dateStart;
      this.daterange = range;
      this.dialogdate = true;
      this.eventcolor = resulteventcolor;
      //alert(dateStart+dateEnd)
      //this.daterange = ['"'+dateStart+'"', '"'+dateEnd+'"'];
      //this.daterange.push("2020-10-20, 2020-10-30") 
    },
    mudaStatus: function(id, campo, situacao, telefone){
      var objeto;
      if(campo=='situacao'){
        objeto = {
          situacao: situacao
        }
        this.dialogsituacao = false;
        this.smsConfirmMessage(id, situacao, telefone);
      }else{
        objeto = {
          status: situacao 
        }
        this.dialogstatus = false;
      }
      db.ref('pedido/'+id).update(objeto);
      //alert(id + campo + situacao);
    },
    smsConfirmMessage(idpedido, obj, tel){
      let a = tel.replace('(', '');
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
            'mensagem': 'Aluga Já! O status do pedido mudou: ('+this.situacaopedido[obj]+'). Acesse: https://alugaja.app/request/'+idpedido+' e acompanhe seu pedido!!!'  
          }
        });
        console.log(sms.data);
      }  
    },
  },
  
  metaInfo(){
    return{
      title: `Dashboard`,
      meta: [
        {name: 'description', content: 'Dashboard'},
        {property: 'og:title', content: 'Dashboard'},
        {property: 'og:site_name', content: 'Aluga Já'},
        {property: 'og:description', content: 'Dashboard'},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: 'https://alugaja.app/'},
        {property: 'og:image', content: this.slides}    
      ]
    }
  },
};
</script>
<style>
  .statusborder{
    border-left:2px solid #000
  }
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
