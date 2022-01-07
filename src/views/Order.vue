<template>
  <v-row
    align="start"
    justify="start"
  >
    <!--
    <v-tabs
      v-model="tabs"
      icons-and-text
      right
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        href="#mobile-tabs-5-1"  
      >
        lista
        <v-icon>mdi-view-list</v-icon> 
      </v-tab>
      <v-tab
        href="#mobile-tabs-5-2"
      >
        calendário
        <v-icon >mdi-calendar-month</v-icon>
      </v-tab>
    </v-tabs>
    -->
    <!--
    <v-toolbar elevation="0">
      <v-btn color="primary" small tile outlined v-on="on"><v-icon left>mdi-view-list</v-icon> lista</v-btn>
      <v-btn color="primary" small tile outlined v-on="on"><v-icon left>mdi-calendar-month</v-icon> calendário</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="viewgrid = false" small text icon><v-icon>mdi-view-list</v-icon></v-btn>
      <v-btn color="primary" @click="viewgrid = true" small text icon><v-icon>mdi-calendar-month</v-icon></v-btn>
    </v-toolbar>
    -->
    <v-subheader>Meus Pedidos ({{numeroPedidos}})</v-subheader>
    <v-expansion-panels popout>
      <v-expansion-panel
        v-for="(pedido, i) in filtroPedido(objpedido)"
        :key="i"
        hide-actions
      >
        <v-expansion-panel-header>
          <v-row
            align="center"
            class="spacer"
            no-gutters
          >
            <v-col
              cols="4"
              sm="2"
              md="1"
            >
              <v-avatar
                size="36px"
              >
                <img
                  v-if="pedido.produto.imagem"
                  :alt="pedido.produto.produto"
                  :src="pedido.produto.imagem"
                >
                <v-icon
                  v-else
                  color="teal"
                  v-text="'local_offer'"
                ></v-icon>
              </v-avatar>
            </v-col>

            <v-col
              class="hidden-xs-only"
              sm="5"
              md="3"
            >
              <strong v-html="pedido.produto.produto"></strong>
              <span
                v-if="pedido.produto.descricao"
                class="grey--text"
              >
                &nbsp;({{pedido.produto.quantidade}} unidade)
              </span>
            </v-col>

            <v-col
              class="text-no-wrap"
              cols="5"
              sm="3"
            >
              <v-chip
                v-if="pedido.situacao"
                :color="`${arraycorsituacao[pedido.situacao]}`"
                class="ml-0"
                label
                small
              >
                {{arraysituacao[pedido.situacao]}}
              </v-chip>
              <!--
              <strong v-html="arraysituacao[pedido.situacao]"></strong>
              -->
            </v-col>

            <v-col
              class="black--text text-truncate hidden-sm-and-down"
            >
              <small>
                De <strong>{{computedDateFormattedMomentjs(pedido.entrega)}}</strong> até <strong>{{computedDateFormattedMomentjs(pedido.retirada)}}</strong>
                <br/>
                 <strong> 
                 ({{pedido.enderecodentrega.entbairro}}, {{pedido.enderecodentrega.entcidade}})
                 </strong>
              </small>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row
            justify="space-around"
            no-gutters
          >
            <v-col cols="12" v-if="pedido.situacao != 0">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>{{pedido.produto.produto}} {{pedido.produto.descricao}}</v-list-item-title>
                  <v-list-item-subtitle>{{pedido.produto.quantidade}}x unidade</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>{{pedido.vendedor.nome}}</v-list-item-title>
                  <v-list-item-subtitle>{{pedido.vendedor.telefone}} / {{pedido.vendedor.telefone2}}</v-list-item-subtitle>
                  <v-list-item-subtitle>Vendedor ({{pedido.usuario.email}})</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>{{pedido.usuario.nome}}</v-list-item-title>
                  <v-list-item-subtitle>{{pedido.usuario.telefone}} / {{pedido.usuario.telefone2}}</v-list-item-subtitle>
                  <v-list-item-subtitle>Cliente ({{pedido.usuario.email}})</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>{{pedido.enderecodentrega.entlogradouro}}, {{pedido.enderecodentrega.entnumero}} - {{pedido.enderecodentrega.entbairro}}, {{pedido.enderecodentrega.entcidade}} - {{pedido.enderecodentrega.entestado}}</v-list-item-title>
                  <v-list-item-subtitle>Endereço</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Valor Total R${{pedido.valor}} ({{arraypagamentos[pedido.metodopgto]}})
                    <v-chip
                      v-if="pedido.status"
                      :color="`${arraycorstatus[pedido.status]}`"
                      class="ml-0"
                      label
                      small
                    >
                      {{arraystatus[pedido.status]}}
                    </v-chip>
                  </v-list-item-title>
                  <v-list-item-subtitle>Subtotal R${{pedido.subtotal}}</v-list-item-subtitle>
                  <v-list-item-subtitle>Frete R${{pedido.frete}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12">
              <v-subheader></v-subheader>
              <v-list-item >
                <v-range-slider
                  :readonly="true"
                  :tick-labels="situacaoPedido"
                  :value="[0, pedido.situacao]"
                  :min="0"
                  :max="3"
                  thumb-label="always"
                  ticks="always"
                  tick-size="1"
                >
                  <template v-slot:thumb-label="props">
                    <v-icon dark>
                      {{ iconePedido(props.value) }}
                    </v-icon>
                  </template>
                </v-range-slider>
              </v-list-item>
              <!--
              <v-stepper alt-labels>
                <v-stepper-header>
                  <v-stepper-step step="1" complete>Pedido Efetuado</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="2" complete>
                    Entrega
                    <small>{{computedDateFormattedMomentjs(pedido.entrega)}}</small>
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="3">
                    Retirada
                    <small>{{computedDateFormattedMomentjs(pedido.retirada)}}</small>
                  </v-stepper-step>
                </v-stepper-header>
              </v-stepper>
              -->
            </v-col>              
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--
    <v-sheet height="64">
      <v-toolbar flat color="white">
        <v-btn outlined class="mr-4" @click="setToday">
          Hoje
        </v-btn>
        <v-btn fab text small @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn
              outlined
              v-on="on"
            >
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Dia</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Semana</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Mês</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 dias</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="events"
        :event-color="getEventColor"
        :event-margin-bottom="3"
        :now="today"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="updateRange"
        locale="pt-br"
        :short-weekdays="false"
        interval-count="0"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        full-width
        offset-x
      >
        <v-card
          color="grey lighten-4"
          min-width="350px"
          flat
        >
          <v-toolbar
            :color="selectedEvent.color"
            dark
          >
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <span v-html="selectedEvent.details"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="secondary"
              @click="selectedOpen = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
    <v-row justify="center">
      <v-dialog v-model="dialogForm" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" big outlined v-on="on">Adicionar evento</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Criar Evento</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Título" persistent-hint hint="Defina o título do evento" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Descrição" persistent-hint hint="Defina a descrção do evendo"></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-date-picker :min="today" v-model="date" locale="pt-br" range></v-date-picker>
                </v-col>
                                  
                <v-col cols="12" sm="12">
                  <v-select
                    :items="['blue', 'red', 'green', 'cyan']"
                    label="Cor"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogForm = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addNewTodo">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    -->
  </v-row>
</template>

<script>
  import { db, auth, provider } from '../config/db';
  import moment from 'moment';
  moment.locale("pt-br");
  //console.log();
  //const dbusuario = db.ref('usuario');
  const dbpedido = db.ref('pedido'); 

  export default {
    props: {
      source: String,
    },
    data: () => ({
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
      arraystatus: {0:'À pagar', 1:'Pagamento efetuado'},
      arraycorstatus: {0:'yellow', 1:'teal white--text'},
      arraypagamentos: {
        0: 'Crédito',
        1: 'Débito',
        2: 'Dinheiro à vista',
        3: 'Boleto',
        4: 'Transferência Bancária'
      },
      dialog: false,
      dialogForm: false,
      drawer: null,
      items: [
        { icon: 'mdi-contacts', text: 'Contacts' },
        { icon: 'mdi-history', text: 'Frequently contacted' },
        { icon: 'mdi-content_copy', text: 'Duplicates' },
        {
          icon: 'mdi-keyboard_arrow_up',
          'icon-alt': 'mdi-keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [
            { icon: 'mdi-add', text: 'Create label' },
          ],
        },
        {
          icon: 'mdi-keyboard_arrow_up',
          'icon-alt': 'mdi-keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' },
          ],
        },
        { icon: 'mdi-settings', text: 'Settings' },
        { icon: 'mdi-chat_bubble', text: 'Send feedback' },
        { icon: 'mdi-help', text: 'Help' },
        { icon: 'mdi-phonelink', text: 'App downloads' },
        { icon: 'mdi-keyboard', text: 'Go to the old version' },
      ],
      dateteste: new Date().toISOString(),
      today: new Date().toISOString().slice(0,10),
      focus: new Date().toISOString().slice(0,10),
      type: 'month',
      typeToLabel: {
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        '4day': '4 Dias',
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      date: ['2020-01-01', '2020-01-31'],
      events: [
        /*
        {
          name: 'Fazer Evento Aparecer OnClick',
          details: 'Going to the beach!',
          start: new Date("2020-01-07").toISOString().slice(0,10),
          end: new Date("2020-01-11").toISOString().slice(0,10),
          color: 'blue',
        },
        {
          name: 'Outro evento teste',
          details: 'Spending time on how we do not have enough time',
          start: new Date("2020-01-07").toISOString().slice(0,10),
          end: new Date("2020-01-09").toISOString().slice(0,10),
          color: 'indigo',
        },
        */
      ],
    }),
    created: function () {
      const that = this;
      auth.onAuthStateChanged(function(user) {
        if(user){
          //alert(user.displayName);
          that.name = user.displayName;
          that.email = user.email;
          that.addNewTodo();
        }  
      })
    },
    computed: {
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    firebase:{
      objpedido: dbpedido,
      //objcategoria: dbcategoria
    },
    mounted () {
      this.$refs.calendar.checkChange();
    },
    methods: {
      iconePedido (val) {
        return this.iconeSituacaoPedido[val]
      },
      filtroPedido: function (objpedido) {
        this.numeroPedidos = this.objpedido.filter(pedido => pedido.usuario.email === this.email).length;
        return this.objpedido.filter(pedido => pedido.usuario.email === this.email).sort((a, b) => new Date(b.retirada) - new Date(a.retirada))
        //this.objpedido.sort((a, b) => new Date(a.entrega) - new Date(b.entrega))
      },
      computedDateFormattedMomentjs (objdate) {
        return objdate ? moment(objdate).format('llll').slice(0, -9): ''
      },
      addNewTodo() {
        //this.$refs.calendar.checkChange();
        for(const pedido of this.objpedido){
          if(pedido.usuario==this.email){
            console.log(pedido.produto.produto);
            this.events.push({
              name: pedido.enderecodentrega.entbairro,
              details: pedido.usuario,
              start: new Date(pedido.entrega).toISOString().slice(0,10),//new Date("2019-10-23").toISOString().slice(0,10),
              end: new Date(pedido.entrega).toISOString().slice(0,10),//new Date("2019-10-25").toISOString().slice(0,10),
              color: 'teal',
            },
            {
              name: pedido.enderecodentrega.entbairro,
              details: pedido.usuario,
              start: new Date(pedido.retirada).toISOString().slice(0,10),//new Date("2019-10-23").toISOString().slice(0,10),
              end: new Date(pedido.retirada).toISOString().slice(0,10),//new Date("2019-10-25").toISOString().slice(0,10),
              color: 'red',
            })  
          }  
        }
        //this.dialogForm = false        
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
    },
  }
</script>