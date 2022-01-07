<template>
  <v-app>
    <v-content class="grey lighten-2"> 
      <Toolbar />
      <v-container fluid>  
        <router-view></router-view>
        <!--<Home/>-->
      </v-container>
    </v-content>
    <v-footer
      color="#4267B2"
      dark
    >
      <v-row
        align="start"
        justify="start"
        no-gutters
      >
        <v-btn
          @click="termos=true"
          x-small
          color="white"
          text
          rounded
          class="my-2"
        >
          Termos e condições
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          x-small
          color="white"
          text
          rounded
          class="my-2"
        >
          <v-icon
           small
          >
            mdi-instagram
          </v-icon>  
        </v-btn>
        <v-btn
          x-small
          color="white"
          text
          rounded
          class="my-2"
        >
          <v-icon
            small
          >
            mdi-facebook
          </v-icon>  
        </v-btn>
        <v-btn
          x-small
          color="white"
          text
          rounded
          class="my-2"
        >
          <v-icon
            small
          >
            mdi-whatsapp
          </v-icon>  
        </v-btn>
        <v-btn
          x-small
          color="white"
          text
          rounded
          class="my-2"
        >
          Aluga Já &copy; {{ new Date().getFullYear() }}
        </v-btn>
      </v-row>
      <div class="text-center">
        <v-dialog
          v-model="termos"
          width="500"
        >
          <v-card>
            <v-card-title class="headline grey lighten-2">
              Termos e condições
            </v-card-title>
            <v-card-text>
              <v-card-title>Aluga Já</v-card-title>
              <v-card-text>
                O Aluga Já não é fornecedor de quaisquer produtos ou serviços anunciados no site. O Aluga já presta um serviço consistente na oferta de uma plataforma na internet que fornece espaços para que anunciantes locarores anunciem, oferecendo à locação, os seus próprios produtos e serviços para que eventuais interessados, os Usuários locatários, possam negociar direta e exclusivamente entre si
              </v-card-text>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-card-title>Anunciante Locador</v-card-title>
              <v-card-text>
                Os anunciantes locadores somente poderão anunciar produtos ou serviços que possam locar e que tenham em estoque, estabelecendo diretamente os termos do anúncio e todas as suas características (como título, descrição e imagem dos bens, preço, quantidade, condições de venda, forma e prazo de entrega, além da forma de pagamento
              </v-card-text>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-card-title>Usuário Locatário</v-card-title>
              <v-card-text>
                Os usuários interessados em alugar produtos ou serviços anunciados por anunciantes no Aluga já devem manifestar seu interesse durante o período de vigência estipulado no anúncio. Os anúncios tem duração correspondente ao tipo de anúncio e categoria escolhidos pelo anunciante encerrando-se quando expirado o respectivo prazo de duração ou quando acaba a quantidade do produto anunciado. O Usuário locatário, após manifestar interesse em locar um item anunciado por meio do site, obriga-se a enviar os dados para confirmção da reserva para o anunciante e concretizar a transação, salvo se a negociação for proibida por lei ou por estes Termos e condições gerais de uso e anexos ou na hipótese de o anunciante ou locador desistirem do negócio de comum acordo.
                <br>
                Os Usuários não poderão, entre outras atitudes previstas nestes Termos e condições gerais e seus anexos: a) manipular os preços dos produtos anunciados; b) interferir nas negociações entre outros Usuários; c) manter algum tipo de comunicação direta, por e-mail ou por qualquer outra forma, salvo através da sessão de perguntas e respostas dos Sites, com Usuário que potencialmente seja a sua contraparte em uma negociação, antes de manifestada a intenção na locar do respectivo item; d) divulgar dados pessoais de contato por qualquer meio, em qualquer espaço dos Sites, antes de manifestada a intenção na compra do item anunciado, salvo o estipulado; e) anunciar produtos proibidos pelas políticas do Aluga Já e pela legislação; f) agredir, caluniar, injuriar ou difamar outros Usuários; g) adicionar em seus anúncios acréscimos de preço depois da reserva finalizada; h) fazer mais de um anúncio para o mesmo produto.
                <br>
                Estes tipos de comportamento poderão ser sancionados com o cancelamento do anúncio, ou com a suspensão da sua conta como Usuário, sem prejuízo das ações legais que possam ocorrer pela configuração de delitos ou contravenções ou os prejuízos civis que possam causar aos Usuários locadores, ao Aluga Já ou terceiros.
              </v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                text
                @click="termos = false"
              >
                Fechar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>  
    </v-footer>
    <!--
    <v-footer
      color="indigo"
      app
    >
      <v-spacer></v-spacer>
      <span class="white--text">Aluga Já &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    -->
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar';
import Home from './views/Home';

export default {
  name: 'App',
  metaInfo: {
    title: 'Seja Bem vindo',
    titleTemplate: '%s | Aluga Já',
    htmlAttrs: {
      lang: 'pt-BR',
      amp: true
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css' },
      { rel: 'favicon', href: '/favicon.ico' }
    ]
  },
  components: {
    Toolbar,
    Home
  },
  data: () => ({
    //
    termos: false,
  }),
};
</script>
