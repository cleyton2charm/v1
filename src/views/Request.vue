<template>
  <v-flex>
    <v-row
      v-for="pedido in objfirebase" :key="pedido"
    >
      <v-col cols="12">
        <v-card>  
          <v-img
            class="white--text align-end"
            height="120px"
            :src="pedido.produto.imagem"
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
                    >
                      <v-avatar left>
                        <v-icon small>mdi-tag</v-icon>
                      </v-avatar>
                      {{pedido.produto.produto}}
                    </v-chip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      label
                      small
                      color="white"
                    >
                      {{pedido.produto.quantidade}} unidade<span v-if="pedido.produto.quantidade!=1">s</span>
                    </v-chip>
                  </v-list-item-subtitle>               
                </v-list-item-content>
              </v-list-item>
            </v-list>      
          </v-img>
          <v-subheader>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  class="mx-0"
                  small
                  tile
                  v-bind="attrs"
                  v-on="on"
                  block
                >
                  <v-icon small left>mdi-account-search</v-icon> Buscando profissional?
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="subheader">
                Procurando profissional?
                  <v-spacer></v-spacer>
                  <v-icon
                    color="red darken-1"
                    text
                    @click="dialog = false">
                    mdi-close-circle
                    </v-icon>
                </v-card-title>
                <v-card-text elevation="5">
                  <v-carousel
                    height="350"
                    v-model="model"
                    hide-delimiters
                    show-arrows-on-hover  
                  >
                    <v-carousel-item
                      v-for="(color, i) in colors"
                      :key="i"
                    >
                      <v-img
                        :src="color.src"
                        :lazy-src="color.src"
                        class="white--text align-end"
                        gradient="to top, rgba(0,0,0,.9), rgba(0,0,0,.0)"
                        width="500"
                        height="350"
                        aspect-ratio="1.4"
                        
                      >
                        <v-list two-line class="transparent ">
                          <v-list-item>
                            <!--
                            <v-list-item-avatar size="24">
                              <img 
                                v-if="color.src"
                                :src="color.src"
                                :alt="color.name"
                                class="instagram"
                              >
                              <v-icon v-else x-small left>mdi-account-circle</v-icon>
                            </v-list-item-avatar>
                            -->
                            <v-list-item-content>
                              <v-list-item-title><strong>{{color.name}}, {{color.age}}</strong></v-list-item-title>
                              <v-list-item-subtitle><v-icon small>mdi-briefcase-outline</v-icon> {{color.tec}}</v-list-item-subtitle>
                              <v-list-item-subtitle><v-icon small>mdi-map-marker-outline</v-icon> {{color.location}}</v-list-item-subtitle>
                              <v-list-item-subtitle><v-icon small>mdi-alert-circle-outline</v-icon> {{color.info}}</v-list-item-subtitle>
                              <v-list-item-subtitle>
                                <br>
                                <v-btn outlined x-small :href="`https://api.whatsapp.com/send?phone=5521999634039&text=Solicito contato com o profissional ${color.name} (${color.tec}). Sou ${pedido.usuario.nome} de ${pedido.enderecodentrega.entbairro}, ${pedido.enderecodentrega.entcidade}. Meu pedido é https://alugaja.app/request/${request}`" 
                      target="_blank">
                                  Chamar profissional
                                  <v-icon right x-small>mdi-send</v-icon>
                                </v-btn>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                        <!--
                        <v-row>
                          <v-col
                            align="center"
                            v-for="n in color.img"
                            :key="n"
                            cols="3"
                            width="60"
                          >
                            <v-img
                              :src="n"
                              :lazy-src="n"
                              aspect-ratio="1"
                              class="grey lighten-2"
                              width="60"
                            >
                              <template v-slot:placeholder>
                                <v-row
                                  class="fill-height ma-0"
                                  align="center"
                                  justify="center"
                                >
                                  <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                  ></v-progress-circular>
                                </v-row>
                              </template>
                            </v-img>
                          </v-col>
                        </v-row>
                        -->
                      </v-img>
                    </v-carousel-item>
                  </v-carousel>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-subheader>
          <v-divider></v-divider>
          <!--
          <v-subheader>Situação do pedido<v-icon>mdi-menu-right</v-icon>
            <v-chip
              :class="(pedido.situacao==0) ? 'black--text ml-0' : 'white--text ml-0'"
              :color="getSituacaoColor(pedido.situacao)"
              label
              small
            >
              {{situacaopedido[pedido.situacao]}}
            </v-chip>
          </v-subheader>
          -->
          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              :color="(pedido.situacao==0) ? 'yellow' : 'grey'"
              small
            >
              <!--
              <v-card
                color="yellow"
                dark
                max-width="90%"
              >
                <v-card-title class="title black--text">
                  Em análise
                </v-card-title>
                <v-card-text class="white text--primary">
                  <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
                  <v-btn
                    color="yellow"
                    class="mx-0"
                    outlined
                  >
                    Button
                  </v-btn>
                </v-card-text>
              </v-card>
              -->
              
              <v-row justify="space-between">
                <v-col cols="12">
                  <v-chip
                    :class="(pedido.situacao==0) ? 'black--text ml-0' : 'white--text ml-0'"
                    :color="(pedido.situacao==0) ? 'yellow' : 'grey'"
                    label
                    small
                  >
                    Em análise
                  </v-chip>
                  <div v-if="pedido.situacao==0" :class="(pedido.situacao==0) ? 'caption black--text ml-0' : 'caption grey--text ml-0'">                   
                    A {{pedido.vendedor.nome}} está analisando seu pedido, aguarde...
                  </div>
                  
                  <v-btn
                    color="primary"
                    class="mx-0"
                    x-small
                    tile
                    target="_blank"
                    :href="`https://api.whatsapp.com/send?phone=5521999634039&text=Solicito o cancelamento do meu pedido. Sou ${pedido.usuario.nome} de ${pedido.enderecodentrega.entbairro}, ${pedido.enderecodentrega.entcidade}. Meu pedido é https://alugaja.app/request/${request}`"
                    v-if="pedido.situacao==0 && getStartEnd(pedido.entrega, pedido.retirada)>=1"
                  >
                    Cancelar pedido
                  </v-btn>

                </v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item
              small
              :color="(pedido.situacao==1) ? 'teal' : 'grey'"
              v-show="pedido.situacao==0 || pedido.situacao==1 || pedido.situacao==2 || pedido.situacao==3"
            >
              <v-row justify="space-between">
                <v-col cols="12">
                  <v-chip
                    class="white--text ml-0"
                    :color="(pedido.situacao==1) ? 'teal' : 'grey'"
                    label
                    small
                  >
                    À entregar
                  </v-chip>
                  <div v-if="pedido.situacao==1" :class="(pedido.situacao==1) ? 'caption black--text ml-0' : 'caption grey--text ml-0'">
                    Sua entrega está confirmada, será entregue: {{computedDateFormattedMomentjs(pedido.entrega)}}
                  </div>
                  <v-btn
                    color="primary"
                    class="mx-0"
                    x-small
                    tile
                    target="_blank"
                    :href="`https://api.whatsapp.com/send?phone=5521999634039&text=Solicito o cancelamento do meu pedido. Sou ${pedido.usuario.nome} de ${pedido.enderecodentrega.entbairro}, ${pedido.enderecodentrega.entcidade}. Meu pedido é https://alugaja.app/request/${request}`"
                    v-if="pedido.situacao==1 && getStartEnd(pedido.entrega, pedido.retirada)>=1"
                  >
                    Cancelar pedido
                  </v-btn>
                         
                  <!--
                  <v-btn
                    color="red"
                    class="mx-0"
                    outlined
                    x-small
                  >
                    cancelar pedido
                  </v-btn>
                  -->
                </v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item
              small
              :color="(pedido.situacao==2) ? 'primary' : 'grey'"
              v-show="pedido.situacao==0 || pedido.situacao==1 || pedido.situacao==2 || pedido.situacao==3"
            >
              <v-row justify="space-between">
                <v-col cols="12">
                  <v-chip
                    class="white--text ml-0"
                    :color="(pedido.situacao==2) ? 'primary' : 'grey'"
                    label
                    small
                  >
                    Entregue
                  </v-chip>
                  <div v-if="pedido.situacao==2" :class="(pedido.situacao==2) ? 'caption black--text ml-0' : 'caption grey--text ml-0'">
                   Seu pedido chegou! Sua retirada será: {{computedDateFormattedMomentjs(pedido.retirada)}}
                  </div>
                  <div v-if="pedido.situacao==2 && getStartEnd(pedido.entrega, pedido.retirada)<1">
                    <v-btn
                      color="primary"
                      class="mx-0"
                      x-small
                      tile
                      target="_blank"
                      :href="`https://api.whatsapp.com/send?phone=5521999634039&text=Solicito adicionar mais tempo ao meu pedido. Sou ${pedido.usuario.nome} de ${pedido.enderecodentrega.entbairro}, ${pedido.enderecodentrega.entcidade}. Meu pedido é https://alugaja.app/request/${request}`"
                    >
                      <v-icon small left>mdi-calendar-clock</v-icon>Adicionar mais tempo
                    </v-btn>
                  </div>
                  <div v-if="pedido.situacao==2 && getStartEnd(pedido.entrega, pedido.retirada)<1">
                    <v-btn
                      color="primary"
                      class="mx-0"
                      x-small
                      tile
                      target="_blank"
                      :href="`https://api.whatsapp.com/send?phone=5521999634039&text=Solicito um pedido similar a este. Sou ${pedido.usuario.nome} de ${pedido.enderecodentrega.entbairro}, ${pedido.enderecodentrega.entcidade}. Meu pedido é https://alugaja.app/request/${request}`"
                    >
                      <v-icon small left>mdi-plus-one</v-icon>Fazer um Pedido Igual
                    </v-btn>
                  </div>
                  <div v-if="pedido.situacao==2 && getStartEnd(pedido.entrega, pedido.retirada)<1">
                    <v-btn
                      color="primary"
                      class="mx-0"
                      x-small
                      tile
                      target="_blank"
                      :href="`https://api.whatsapp.com/send?phone=5521999634039&text=Solicito a retirada antecipada do meu pedido. Sou ${pedido.usuario.nome} de ${pedido.enderecodentrega.entbairro}, ${pedido.enderecodentrega.entcidade}. Meu pedido é https://alugaja.app/request/${request}`"
                    >
                      <v-icon small left>mdi-calendar-remove</v-icon>Antecipar Retirada do Pedido
                    </v-btn>
                  </div>  
                  <!--
                  <v-btn
                    color="red"
                    class="mx-0"
                    outlined
                    x-small
                  >
                    cancelar pedido
                  </v-btn>
                  -->
                </v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item
              small
              :color="(pedido.situacao==3) ? 'black' : 'grey'"
              v-show="pedido.situacao==3"
            >
              <v-row justify="space-between">
                <v-col cols="12">
                  <v-chip
                    class="white--text ml-0"
                    :color="(pedido.situacao==3) ? 'black' : 'grey'"
                    label
                    small
                    tile
                  >
                    Finalizado
                  </v-chip>
                  <div v-if="pedido.situacao==3" :class="(pedido.situacao==3) ? 'caption black--text ml-0' : 'caption grey--text ml-0'">
                    Seu pedido foi finalizado, obrigado pela preferência!
                  </div>
                  <div v-if="pedido.situacao==3">
                    <v-btn
                      color="primary"
                      class="mx-0"
                      x-small
                      tile
                      target="_blank"
                      :href="`https://api.whatsapp.com/send?phone=5521999634039&text=Solicito um pedido similara este. Sou ${pedido.usuario.nome} de ${pedido.enderecodentrega.entbairro}, ${pedido.enderecodentrega.entcidade}. Meu pedido é https://alugaja.app/request/${request}`"
                    >
                      <v-icon small left>mdi-plus-one</v-icon>Fazer um Pedido Igual
                    </v-btn>
                  </div>
                  <!--
                  <v-btn
                    color="red"
                    class="mx-0"
                    outlined
                    x-small
                  >
                    cancelar pedido
                  </v-btn>
                  -->
                </v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item
              :color="(pedido.situacao==4) ? 'red' : 'grey'"
              small
              v-show="pedido.situacao==4"
            >
              <v-row justify="space-between">
                <v-col cols="12">
                  <v-chip
                    class="white--text ml-0"
                    :color="(pedido.situacao==4) ? 'red' : 'grey'"
                    label
                    small
                  >
                    Cancelado
                  </v-chip>
                  <div v-if="pedido.situacao==4" :class="(pedido.situacao==4) ? 'caption black--text ml-0' : 'caption grey--text ml-0'">
                    {{pedido.vendedor.nome}} cancelou seu pedido!
                  </div>  
                  <!--
                  <v-btn
                    color="red"
                    class="mx-0"
                    outlined
                    x-small
                  >
                    cancelar pedido
                  </v-btn>
                  -->
                </v-col>
              </v-row>
            </v-timeline-item>  
          
          <v-divider></v-divider></v-timeline>  
          <v-subheader>Detalhes do pedido<v-icon>mdi-menu-right</v-icon></v-subheader>
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
                    {{pedido.usuario.nome}}
                    </v-chip>
                  </v-list-item-subtitle>
                  <!--
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
                    {{pedido.usuario.registro}}
                    </v-chip>
                  </v-list-item-subtitle>
                  -->
                </v-list-item-content>
                <!--
                <v-list-item-action>
                  <v-btn x-small color="error" @click="dialog = false"><v-icon x-small>mdi-close</v-icon></v-btn>
                  <v-btn x-small color="primary" @click="editdialog = true"><v-icon x-small>mdi-pencil</v-icon></v-btn>
                  <v-btn x-small color="primary" @click="editdialog = true"><v-icon x-small>mdi-printer</v-icon></v-btn>
                </v-list-item-action>
                -->
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
                        <v-icon small>mdi-phone</v-icon>
                      </v-avatar>
                      Contato
                    </v-chip>
                  </v-list-item-title>
                  
                  <v-list-item-subtitle>
                    <v-chip
                      label
                      small
                      :href="'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to='+pedido.usuario.email"
                      target="_blank"
                    >
                      <v-avatar>
                        <v-icon small>mdi-gmail</v-icon>
                      </v-avatar>  
                    </v-chip>
                    <v-chip
                      label
                      small
                      :href="'mailto:'+pedido.usuario.email"
                      target="_blank"
                    >
                    {{pedido.usuario.email}}
                    </v-chip>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-chip
                      label
                      small
                      :href="'https://api.whatsapp.com/send?phone=55'+pedido.usuario.telefone"
                      target="_blank"
                    >
                      <v-avatar>
                        <v-icon small>mdi-whatsapp</v-icon>
                      </v-avatar>  
                    </v-chip>
                    <v-chip
                      label
                      small
                      :href="'tel:'+pedido.usuario.telefone"
                      target="_blank"
                    >
                    {{pedido.usuario.telefone}}
                    </v-chip>
                  </v-list-item-subtitle>
                 
                  <v-list-item-subtitle>
                    <v-chip
                      label
                      small
                      :href="'https://api.whatsapp.com/send?phone=55'+pedido.usuario.telefone2"
                      target="_blank"
                    >
                      <v-avatar>
                        <v-icon small>mdi-whatsapp</v-icon>
                      </v-avatar>  
                    </v-chip>
                    <v-chip
                      label
                      small
                      :href="'tel:'+pedido.usuario.telefone2"
                    >
                    {{pedido.usuario.telefone2}}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              -->
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
                      :href="'https://waze.com/ul?q='+pedido.enderecodentrega.entlogradouro+', '+pedido.enderecodentrega.entnumero+' - '+pedido.enderecodentrega.entbairro+', '+pedido.enderecodentrega.entcidade+' - '+pedido.enderecodentrega.entestado+', '+pedido.enderecodentrega.entcep"
                      target="_blank"
                    >
                      <v-avatar>
                        <v-icon small>mdi-waze</v-icon>
                      </v-avatar>  
                    </v-chip>
                    <v-chip
                      label
                      small
                      :href="'https://maps.google.com/?q='+pedido.enderecodentrega.entlogradouro+', '+pedido.enderecodentrega.entnumero+' - '+pedido.enderecodentrega.entbairro+', '+pedido.enderecodentrega.entcidade+' - '+pedido.enderecodentrega.entestado+', '+pedido.enderecodentrega.entcep"
                      target="_blank"
                    > 
                    {{pedido.enderecodentrega.entlogradouro}}, {{pedido.enderecodentrega.entnumero}} - {{pedido.enderecodentrega.entbairro}}, {{pedido.enderecodentrega.entcidade}} - {{pedido.enderecodentrega.entestado}}
                    </v-chip>
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="pedido.enderecodentrega.entcomplemento!=''">  
                    <v-chip
                      label
                      small
                    >    
                      {{pedido.enderecodentrega.entcomplemento}}
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
                      Entrega: {{computedDateFormattedMomentjs(pedido.entrega)}}
                    </v-chip>  
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-chip
                      label
                      small
                    >      
                      Retirada: {{computedDateFormattedMomentjs(pedido.retirada)}}
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
                    Subtotal: R${{pedido.subtotal}}
                    </v-chip>
                    <v-chip
                      label
                      small
                    >      
                    Frete: R${{pedido.frete}}
                    </v-chip>  
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-chip
                      label
                      small
                    >      
                      Total: R${{pedido.valor}}
                    </v-chip>
                    <v-chip
                      label
                      small
                    >      
                      {{arraypagamentos[pedido.situacao]}} ({{arraystatus[pedido.status]}})
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          <v-divider></v-divider>        
          <v-card-actions>
            
          </v-card-actions>
        </v-card>
      </v-col>  
    </v-row>
  </v-flex>  
</template>

<script>
  import { db, auth, provider } from '../config/db';
  import moment from 'moment';
  moment.locale("pt-br");
  //console.log();
  //const dbusuario = db.ref('usuario');
  const dbpedido = db.ref('pedido'); 

  export default {
    props:['request'],
    data: () => ({
      model: 0,
      dialog: false,
      colors: 
        [
          {
            name:'Vinícius Soares',
            age:'29',
            location: 'Rio de janeiro',
            tec: 'Montador de Andaimes',
            info:'Montagem de Andaimes 1.00x1.00, 1.50x1.50 e 1.50x1.00',
            color:'blue',
            src: require('../assets/vinicius.jpg'),
            img:[
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
            ]
          },
          {
            name:'Carlos Sidnei',
            age: '37',
            location: 'Rio de janeiro',
            tec: 'Montador de Andaimes',
            info:'Montador Andaimes 1.00, 1.50, fachadeiro, jaú elétrico e manual, passarela, balancim, leitura de projetos',
            src: require('../assets/sidnei.jpg'),
            img:[
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
            ]
          },
          {
            name:'Thiago Meirelles',
            age: '36',
            location: 'Rio de janeiro',
            tec: 'Técnico em Refrigeração',
            info:'Instalação e Manutenção Ar-condicionado split, Freezers, Geladeiras, Bebedouro',
            src: require('../assets/thiago.jpg'),
            img:[
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
            ]
          },
          /*
          {
            name:'Eulandinho',
            age: '30',
            location: 'Rio de janeiro',
            tec: 'Técnico em pisadinha',
            info:'Barões da pisadinha e etc...',
            src: 'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/64315661_2333344866907430_719556475221379015_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=e6UNQ7Vi49cAX8-gz0H&tp=1&oh=6f57827b2a1aee38691144b406d304e5&oe=5FFBD7C8',
            img:[
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
              'https://instagram.fgig4-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/101189836_136412241400164_1994794781749693472_n.jpg?_nc_ht=instagram.fgig4-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=1LIQVC5VFowAX9t69Zp&tp=1&oh=5283f597a9751c7d172e62915055ad0d&oe=5FFCB2E2',
            ]
          },
          */
      ],
      numeroPedidos: 0,
      situacaoPedido: [
        'Em análise',
        'À entregar',
        'Entregue',
        'Recolhido',
        'Cancelado'
      ],
      iconeSituacaoPedido: [
        'mdi-feature-search',
        'mdi-file-document-box-check',
        'mdi-truck-check',
        'mdi-calendar-check',
        'mdi-cancel'
      ],
      name: '',
      email: '',
      objpedido: [],
      arraycorsituacao: {0:'primary white--text', 1:'yellow', 2:'teal white--text', 3:'grey', 4:'error'},
      arraysituacao: {0:'Aguardando confirmação', 1:'À entregar', 2:'Pedido entregue', 3:'Pedido Retirado', 4:'Pedido Cancelado'},
      //arraycorsituacao: {0:'yellow', 1:'teal', 2:'grey'},
      arraycortextosituacao: {0:'black--text', 1:'white--text', 2:'black--text'},
      //arraysituacao: {0:'À entregar', 1:'Pedido entregue', 2:'Pedido Retirado'},
      arraycorstatus: {0:'yellow', 1:'teal white--text'},
      arraypagamentos: {
        0: 'Crédito',
        1: 'Débito',
        2: 'Dinheiro à vista',
        3: 'Boleto',
        4: 'Transferência Bancária'
      },
      arraystatus: {0:'À pagar', 1:'Pago'},
      situacaopedido: {0:'Em análise',1:'À entregar',2:'Entregue',3:'Finalizado',4:'Cancelado'},
    }),
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
        return this.objpedido.filter(f => 
          {
            let itemUpper = f['.key'].toUpperCase();
            let searchUpper = this.request.toUpperCase();
            return itemUpper.includes(searchUpper)===true;
          }
        );
      },
    },
    firebase:{
      objpedido: dbpedido,
      //objcategoria: dbcategoria
    },
    methods: {
      computedDateFormattedMomentjs (objdate) {
        return objdate ? moment(objdate).format('llll').slice(0, -9): ''
      },
      getSituacaoColor(obj) {
        //situacaopedido: {0:'Em análise',1:'À entregar',2:'Entregue',3:'Recolhido',4:'Cancelado'},
        switch (obj) {
          case 0:
            return 'yellow'
            break;
          case '0':
            return 'yellow'
            break;  
          case 1:
            return 'teal'
            break;
          case 2:
            return '#1976D2'
            break;
          case 3:
            return '#424242'
            break;
          case 4:
            return 'red'
            break;      
          default:
            return 'grey';
        }
        /*
        if (obj=="À pagar") return 'orange'
        else return 'teal'
        */
      },
      getStartEnd(start, end){
        //start, end
        let total = 100;
        let dateStart = moment(start);
        //return dateStart.fromNow();
        let a = moment(start);
        let b = moment().format().slice(0, -15);
        return a.diff(b, 'days')   // dia
        //let dateEnd = moment(end);
        //let dateNow = moment().format().slice(0, -15);
        //let diffStartEnd = dateStart.diff(dateEnd, 'days');
        //let diffNowEnd = dateStart.diff(dateNow, 'days');
        //var porcentagem = parseFloat('7') ;
        //let result = total * (diffNowEnd/diffStartEnd);
        //return result;
        //return start+" "+end;
      },
    },
  }
</script>