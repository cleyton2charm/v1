<template>
    
  <v-row
    align="start"
    justify="start"
  >
          
    <v-subheader>Minhas Vendas ({{numeroPedidos}})</v-subheader>
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
            <v-col cols="12">
              <div v-if="pedido.situacao==0">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-btn tile color="success" @click="mudaStatus(pedido['.key'] , 'situacao', 1), smsConfirmMessage(1, pedido.vendedor.telefone)" outlined dark><v-icon small left>mdi-checkbox-marked-circle</v-icon>Sim, confirmar pedido!</v-btn>
                      &nbsp;
                      <v-btn tile color="error" @click="mudaStatus(pedido['.key'] , 'situacao', 4), smsConfirmMessage(4, pedido.vendedor.telefone)" outlined dark><v-icon small left>mdi-cancel</v-icon>Não, cancelando pedido!</v-btn>   
                    </v-list-item-title>  
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div v-else>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>

                      <v-btn v-if="pedido.situacao==1" x-small tile color="primary" @click="mudaStatus(pedido['.key'] , 'situacao', 2), smsConfirmMessage(2)" outlined dark>marcar como entregue</v-btn>
                      &nbsp;
                      <v-btn v-if="pedido.situacao==2" x-small tile color="primary" @click="mudaStatus(pedido['.key'] , 'situacao', 3), smsConfirmMessage(3)" outlined dark>marcar como recolhido</v-btn>
                      &nbsp;
                      <v-btn v-if="pedido.status==0" x-small tile color="primary" @click="mudaStatus(pedido['.key'] , 'status', 1)" outlined dark>marcar como pago</v-btn>
                    </v-list-item-title>  
                  </v-list-item-content>
                </v-list-item>
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
                        <strong v-html="arraystatus[pedido.status]"></strong>
                      </v-chip>
                    </v-list-item-title>
                    <v-list-item-subtitle>Subtotal R${{pedido.subtotal}}</v-list-item-subtitle>
                    <v-list-item-subtitle>Frete R${{pedido.frete}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </diV>  
            </v-col>
            
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    
  </v-row>    
  
</template>

<script>
  import { db, auth, provider } from '../config/db';
  import axios from 'axios';
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
        'Aguardando Confirmação',
        'Pedido Confirmado',
        'Entrega Efetuada',
        'Retirada Confirmada',
        'Pedido Cancelado'
      ],
      iconeSituacaoPedido: [
        'mdi-file-document-box-check',
        'mdi-truck-check',
        'mdi-calendar-check'
      ],
      name: '',
      email: '',
      objpedido: [],
      arraycorsituacao: {0:'primary white--text', 1:'yellow', 2:'teal white--text', 3:'grey', 4:'error'},
      arraysituacao: {0:'Aguardando confirmação', 1:'À entregar', 2:'Pedido entregue', 3:'Pedido Retirado', 4:'Pedido Cancelado'},
      //arraysituacao: {0:'À entregar', 1:'Pedido entregue', 2:'Pedido Retirado'},
      arraypagamentos: {
        0: 'Crédito',
        1: 'Débito',
        2: 'Dinheiro à vista',
        3: 'Boleto',
        4: 'Transferência Bancária'
      },
      arraystatus: {0:'À pagar', 1:'Pagamento efetuado'},
      arraycorstatus: {0:'yellow', 1:'teal white--text'},
      arraynomepagamento: {'dinheiro':'Dinheiro', 'credito':'Cartão de Crédito', 'debito':'Cartão de Débito', 'boleto':'Boleto', 'transferencia':'Transferência Bancária', 'deposito':'Depósito Bancário'},
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
      mudaStatus: function(id, campo, situacao){
        var objeto;
        if(campo=='situacao'){
          objeto = {
            situacao: situacao
          }
        }else{
          objeto = {
            status: situacao 
          }
        }
        db.ref('pedido/'+id).update(objeto);    
        //alert(id + campo + situacao);
      },
      smsConfirmMessage(obj, tel){
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
              'mensagem': 'Aluga Já! O status do pedido mudou: ('+this.arraysituacao[obj]+'). Acesse: https://alugaja.app/order e acompanhe seu pedido!!!'  
            }
          });
          console.log(sms.data);
        }  
      },
      iconePedido (val) {
        return this.iconeSituacaoPedido[val]
      },
      filtroPedido: function (objpedido) {
        this.numeroPedidos = this.objpedido.filter(pedido => pedido.vendedor.email === this.email).length;
        return this.objpedido.filter(pedido => pedido.vendedor.email === this.email)
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