<template>
  <v-flex>
    <div v-if="finish == false">
      <div v-if="specific == false">
        <v-row>
          <v-subheader>Insira os dados específicos</v-subheader>
          <v-col
            cols="12"
          >
            <v-select
              v-model="altura.value"
              :items="altura.array"
              label="Defina a altura da torre em metros"
              outlined
              persistent-hint
              hint="Ex: 4 Metros"
            >
            </v-select>
          </v-col>  
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="fabricante"
              label="Defina o Fabricante"
              outlined
              persistent-hint
              hint="Ex: Sherrer Montagens"
            ></v-text-field>
          </v-col>  
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="modelo"
              label="Defina o modelo"
              outlined
              persistent-hint
              hint="Ex: NR18"
            ></v-text-field>
          </v-col>  
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn block outlined @click="moreinfo = !moreinfo" color="secondary">
              Informações Técnicas
              <v-icon v-if="moreinfo==true" right dark>mdi-chevron-up</v-icon>
              <v-icon v-if="moreinfo==false" right dark>mdi-chevron-down</v-icon>
            </v-btn>  
          </v-col>
        </v-row>
        <div v-if="moreinfo==true">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="andaimes1x1.value"
                label="Andaimes 1,00x1,00"
                hint="Quantidade"
                persistent-hint
                :readonly="!andaimes1x1.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${andaimes1x1.status}`"
                      :color="andaimes1x1.status ? 'success' : 'red'"
                      @click="andaimes1x1.status = !andaimes1x1.status"
                      v-text="andaimes1x1.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="andaimes150x100.value"
                label="Andaimes 1,50x1,00"
                hint="Quantidade"
                persistent-hint
                :readonly="!andaimes150x100.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${andaimes150x100.status}`"
                      :color="andaimes150x100.status ? 'success' : 'red'"
                      @click="andaimes150x100.status = !andaimes150x100.status"
                      v-text="andaimes150x100.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="andaimes150x150.value"
                label="Andaimes 1,50x1,50"
                hint="Quantidade"
                persistent-hint
                :readonly="!andaimes150x150.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${andaimes150x150.status}`"
                      :color="andaimes150x150.status ? 'success' : 'red'"
                      @click="andaimes150x150.status = !andaimes150x150.status"
                      v-text="andaimes150x150.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="diagonais.value"
                label="Diagonais"
                hint="Quantidade"
                persistent-hint
                :readonly="!diagonais.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${diagonais.status}`"
                      :color="diagonais.status ? 'success' : 'red'"
                      @click="diagonais.status = !diagonais.status"
                      v-text="diagonais.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>      
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="sapatas.value"
                label="Sapatas Reguláveis"
                hint="Quantidade"
                persistent-hint
                :readonly="!sapatas.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${sapatas.status}`"
                      :color="sapatas.status ? 'success' : 'red'"
                      @click="sapatas.status = !sapatas.status"
                      v-text="sapatas.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="rodinhas.value"
                label="Rodinhas com Travas"
                hint="Quantidade"
                persistent-hint
                :readonly="!rodinhas.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${rodinhas.status}`"
                      :color="rodinhas.status ? 'success' : 'red'"
                      @click="rodinhas.status = !rodinhas.status"
                      v-text="rodinhas.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="plataformaMetalica.value"
                label="Plataformas Metálicas"
                hint="Quantidade"
                persistent-hint
                :readonly="!plataformaMetalica.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${plataformaMetalica.status}`"
                      :color="plataformaMetalica.status ? 'success' : 'red'"
                      @click="plataformaMetalica.status = !plataformaMetalica.status"
                      v-text="plataformaMetalica.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="plataformaMadeira.value"
                label="Plataformas de Madeira"
                hint="Quantidade"
                persistent-hint
                :readonly="!plataformaMadeira.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${plataformaMadeira.status}`"
                      :color="plataformaMadeira.status ? 'success' : 'red'"
                      @click="plataformaMadeira.status = !plataformaMadeira.status"
                      v-text="plataformaMadeira.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="guardacorpo.value"
                label="Quarda Corpo"
                hint="Quantidade"
                persistent-hint
                :readonly="!guardacorpo.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${guardacorpo.status}`"
                      :color="guardacorpo.status ? 'success' : 'red'"
                      @click="guardacorpo.status = !guardacorpo.status"
                      v-text="guardacorpo.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="travessas.value"
                label="Travessas"
                hint="Quantidade"
                persistent-hint
                :readonly="!travessas.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${travessas.status}`"
                      :color="travessas.status ? 'success' : 'red'"
                      @click="travessas.status = !travessas.status"
                      v-text="travessas.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="tesouras.value"
                label="Tesouras"
                hint="Quantidade"
                persistent-hint
                :readonly="!tesouras.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${tesouras.status}`"
                      :color="tesouras.status ? 'success' : 'red'"
                      @click="tesouras.status = !tesouras.status"
                      v-text="tesouras.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="escadas.value"
                label="Escadas de Acesso"
                hint="Quantidade"
                persistent-hint
                :readonly="!escadas.status"
                outlined
                type="number"
                min="1"
                max="100"
              >
                <template v-slot:append>
                  <v-slide-x-reverse-transition
                  mode="out-in"
                  >
                  <v-icon
                      :key="`icon-${escadas.status}`"
                      :color="escadas.status ? 'success' : 'red'"
                      @click="escadas.status = !escadas.status"
                      v-text="escadas.status ? 'mdi-lock-open' : 'mdi-lock'"
                  ></v-icon>
                  </v-slide-x-reverse-transition>
                </template>
              </v-text-field>        
            </v-col>
          </v-row>    
        </div>
        <v-row>
          <v-col>
            <v-btn block color="primary" @click="specific=true" dark>Continuar <v-icon right dark>mdi-arrow-right</v-icon></v-btn>
          </v-col>
        </v-row>    
      </div>  
      
      <div v-else>
        <v-row>  
          <v-subheader>Insira as Fotos do anúncio</v-subheader>      
          <v-col cols="12">  
            <v-alert
              outlined
              color="grey"
            >
              <v-row>
                <v-col
                  :md="3"
                  :sm="12"
                >
                  <v-card height="200" class="grey lighten-2">
                    <v-row justify="center">
                      <div v-if="url == ''" >
                        <v-file-input rel="img1" @change="onFileChange" v-model="files" full-width="0" class="mt-10 ml-10 mr-n5" prepend-icon="mdi-image-plus" dense chip></v-file-input>            
                      </div>  
                      <div v-if="url != ''" >
                        <v-img
                          :src="url"
                          :src-lazy="url"
                          class="grey lighten-2"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          max-width="200"
                          max-height="150"
                          min-height="150"
                        >     
                        </v-img>           
                        <v-card-actions>
                          <v-chip
                            class="ma-2 text-truncate"
                            label
                            small
                            close
                            outlined
                            @click:close="url = '', files = []"
                          >
                            <span
                              class="d-inline-block text-truncate"
                              style="max-width: 120px;"
                            >
                              {{foto}}
                            </span>
                          </v-chip>                                        
                        </v-card-actions>
                      </div>
                    </v-row>
                  </v-card>
                </v-col>

                <v-col
                  :md="3"
                  :sm="12"
                  v-if="url != ''"
                >
                  <v-card height="200" class="grey lighten-2">
                    <v-row justify="center">
                      <div v-if="url2 == ''">
                        <v-file-input @change="onFileChange2" v-model="files2" full-width="0" class="mt-10 ml-10 mr-n5" prepend-icon="mdi-image-plus" dense chip></v-file-input>
                      </div>  
                      <div v-if="url2 != ''" >
                        <v-img
                          v-if="url2 != ''"
                          :src="url2"
                          :src-lazy="url2"
                          class="grey lighten-2"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          max-width="200"
                          max-height="150"
                          min-height="150"
                        >      
                        </v-img>
                        <v-card-actions>
                          <v-chip
                            class="ma-2 text-truncate"
                            
                            label
                            small
                            close
                            outlined
                            @click:close="url2 = '', files2 = []"
                          >
                            <span
                              class="d-inline-block text-truncate"
                              style="max-width: 120px;"
                            >
                              {{foto2}}
                            </span>
                          </v-chip>                                        
                        </v-card-actions>
                      </div>  
                    </v-row>
                  </v-card>
                </v-col>

                <v-col
                  :md="3"
                  :sm="12"
                  v-if="url2 != ''"
                >
                  <v-card height="200" class="grey lighten-2">
                    <v-row justify="center">
                      <div v-if="url3 == ''">
                        <v-file-input @change="onFileChange3" v-model="files3" full-width="0" class="mt-10 ml-10 mr-n5" prepend-icon="mdi-image-plus" dense chip></v-file-input>
                      </div>  
                      <div v-if="url3 != ''" >
                        <v-img
                          v-if="url3 != ''"
                          :src="url3"
                          :src-lazy="url3"
                          class="grey lighten-2"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          max-width="200"
                          max-height="150"
                          min-height="150"
                        >      
                        </v-img>
                        <v-card-actions>
                          <v-chip
                            class="ma-2 text-truncate"
                            
                            label
                            small
                            close
                            outlined
                            @click:close="url3 = '', files3 = []"
                          >
                            <span
                              class="d-inline-block text-truncate"
                              style="max-width: 120px;"
                            >
                              {{foto3}}
                            </span>
                          </v-chip>                                        
                        </v-card-actions>
                      </div>  
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="title"
              label="Defina o Título do anúncio"
              outlined
              persistent-hint
              hint="Ex: 1 Torre de andaimes de 1x1"
            ></v-text-field>
          </v-col>  
        </v-row>  
            
        <v-row>        
          <v-col cols="12">
            <v-textarea
              v-model="description"
              outlined
              name="input-7-4"
              label="Descrição (Opcional)"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>        
          <v-col cols="12">
            <v-text-field
              v-model="quantidade"
              label="Quantidade disponível"
              outlined
              persistent-hint
              hint="Ex: 7 unidades"
              type="number"
              min="1"
              max="100"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--
        <v-subheader>Selecione o valor das diárias</v-subheader>
        -->
        <v-row>
          <v-col cols="8">  
            <v-text-field
              v-model="adicional.nome"
              label="Item adicional (opcional)"
              hint="Ex: Escada de Acesso 3.00 metros"
              persistent-hint
              :readonly="!adicional.status"
              outlined  
              :color="adicional.status ? 'success' : 'red'"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="adicional.valor"
              label="Valor do Item"
              hint="Ex: 30,00"
              persistent-hint
              :readonly="!adicional.status"
              outlined
              :color="adicional.status ? 'success' : 'red'"
            >
              <template v-slot:append>
                <v-slide-x-reverse-transition
                mode="out-in"
                >
                <v-icon
                  :key="`icon-${adicional.status}`"
                  :color="adicional.status ? 'success' : 'red'"
                  @click="adicional.status = !adicional.status"
                  v-text="adicional.status ? 'mdi-lock-open' : 'mdi-lock'"
                ></v-icon>
                </v-slide-x-reverse-transition>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">  
            <v-text-field
              v-model="adicionalum.nome"
              label="Item adicional (opcional)"
              hint="Ex: Escada de Acesso 3.00 metros"
              persistent-hint
              :readonly="!adicionalum.status"
              outlined  
              :color="adicionalum.status ? 'success' : 'red'"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="adicionalum.valor"
              label="Valor do Item"
              hint="Ex: 30,00"
              persistent-hint
              :readonly="!adicionalum.status"
              outlined
              :color="adicionalum.status ? 'success' : 'red'"
            >
              <template v-slot:append>
                <v-slide-x-reverse-transition
                mode="out-in"
                >
                <v-icon
                  :key="`icon-${adicionalum.status}`"
                  :color="adicionalum.status ? 'success' : 'red'"
                  @click="adicionalum.status = !adicionalum.status"
                  v-text="adicionalum.status ? 'mdi-lock-open' : 'mdi-lock'"
                ></v-icon>
                </v-slide-x-reverse-transition>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">  
            <v-text-field
              v-model="adicionaldois.nome"
              label="Item adicional (opcional)"
              hint="Ex: Escada de Acesso 3.00 metros"
              persistent-hint
              :readonly="!adicionaldois.status"
              outlined  
              :color="adicionaldois.status ? 'success' : 'red'"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="adicionaldois.valor"
              label="Valor do Item"
              hint="Ex: 30,00"
              persistent-hint
              :readonly="!adicionaldois.status"
              outlined
              :color="adicionaldois.status ? 'success' : 'red'"
            >
              <template v-slot:append>
                <v-slide-x-reverse-transition
                mode="out-in"
                >
                <v-icon
                  :key="`icon-${adicionaldois.status}`"
                  :color="adicionaldois.status ? 'success' : 'red'"
                  @click="adicionaldois.status = !adicionaldois.status"
                  v-text="adicionaldois.status ? 'mdi-lock-open' : 'mdi-lock'"
                ></v-icon>
                </v-slide-x-reverse-transition>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">  
            <v-text-field
              v-model="adicionaltres.nome"
              label="Item adicional (opcional)"
              hint="Ex: Escada de Acesso 3.00 metros"
              persistent-hint
              :readonly="!adicionaltres.status"
              outlined  
              :color="adicionaltres.status ? 'success' : 'red'"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="adicionaltres.valor"
              label="Valor do Item"
              hint="Ex: 30,00"
              persistent-hint
              :readonly="!adicionaltres.status"
              outlined
              :color="adicionaltres.status ? 'success' : 'red'"
            >
              <template v-slot:append>
                <v-slide-x-reverse-transition
                mode="out-in"
                >
                <v-icon
                  :key="`icon-${adicionaltres.status}`"
                  :color="adicionaltres.status ? 'success' : 'red'"
                  @click="adicionaltres.status = !adicionaltres.status"
                  v-text="adicionaltres.status ? 'mdi-lock-open' : 'mdi-lock'"
                ></v-icon>
                </v-slide-x-reverse-transition>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">  
            <v-text-field
              v-model="opcional.nome"
              label="Item opcional (opcional)"
              hint="Ex: Sapatas Reguláveis"
              persistent-hint
              :readonly="!opcional.status"
              outlined  
              :color="opcional.status ? 'success' : 'red'"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="opcional.valor"
              label="Valor da item"
              hint="Ex: 30,00"
              persistent-hint
              :readonly="!opcional.status"
              outlined
              :color="opcional.status ? 'success' : 'red'"
            >
              <template v-slot:append>
                <v-slide-x-reverse-transition
                mode="out-in"
                >
                <v-icon
                  :key="`icon-${opcional.status}`"
                  :color="opcional.status ? 'success' : 'red'"
                  @click="opcional.status = !opcional.status"
                  v-text="opcional.status ? 'mdi-lock-open' : 'mdi-lock'"
                ></v-icon>
                </v-slide-x-reverse-transition>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">  
            <v-text-field
              v-model="opcionalum.nome"
              label="Item opcional (opcional)"
              hint="Ex: Sapatas Reguláveis"
              persistent-hint
              :readonly="!opcionalum.status"
              outlined  
              :color="opcionalum.status ? 'success' : 'red'"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="opcionalum.valor"
              label="Valor da item"
              hint="Ex: 30,00"
              persistent-hint
              :readonly="!opcionalum.status"
              outlined
              :color="opcionalum.status ? 'success' : 'red'"
            >
              <template v-slot:append>
                <v-slide-x-reverse-transition
                mode="out-in"
                >
                <v-icon
                  :key="`icon-${opcionalum.status}`"
                  :color="opcionalum.status ? 'success' : 'red'"
                  @click="opcionalum.status = !opcionalum.status"
                  v-text="opcionalum.status ? 'mdi-lock-open' : 'mdi-lock'"
                ></v-icon>
                </v-slide-x-reverse-transition>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">  
            <v-text-field
              v-model="opcionaldois.nome"
              label="Item opcional (opcional)"
              hint="Ex: Sapatas Reguláveis"
              persistent-hint
              :readonly="!opcionaldois.status"
              outlined  
              :color="opcionaldois.status ? 'success' : 'red'"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="opcionaldois.valor"
              label="Valor da item"
              hint="Ex: 30,00"
              persistent-hint
              :readonly="!opcionaldois.status"
              outlined
              :color="opcionaldois.status ? 'success' : 'red'"
            >
              <template v-slot:append>
                <v-slide-x-reverse-transition
                mode="out-in"
                >
                <v-icon
                  :key="`icon-${opcionaldois.status}`"
                  :color="opcionaldois.status ? 'success' : 'red'"
                  @click="opcionaldois.status = !opcionaldois.status"
                  v-text="opcionaldois.status ? 'mdi-lock-open' : 'mdi-lock'"
                ></v-icon>
                </v-slide-x-reverse-transition>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>        
          <!--
          <v-col cols="2"
          >
            <v-chip large :color="thirtyDays.status ? 'teal' : 'red'" text-color="white">
                <v-avatar left :class="thirtyDays.status ? 'teal darken-4' : 'red darken-4'">30</v-avatar>
                dias
            </v-chip>
          </v-col>
          -->
          <v-col cols="12">  
            <v-text-field
                v-model="thirtyDays.value"
                label="Digite o Valor para 30 dias"
                hint="Ex: 100,00"
                persistent-hint
                :readonly="!thirtyDays.status"
                outlined
                @click:append-outer="alldates = !alldates"
                :append-outer-icon="(alldates==false) ? 'mdi-minus' : 'mdi-plus'"
            >
                <template v-slot:append>
                    <v-slide-x-reverse-transition
                    mode="out-in"
                    >
                    <v-icon
                        :key="`icon-${thirtyDays.status}`"
                        :color="thirtyDays.status ? 'success' : 'red'"
                        @click="thirtyDays.status = !thirtyDays.status"
                        v-text="thirtyDays.status ? 'mdi-lock-open' : 'mdi-lock'"
                    ></v-icon>
                    </v-slide-x-reverse-transition>
                </template>
            </v-text-field>
          </v-col>
          <!--
          <v-col cols="1">
            <v-btn top right fab x-small color="primary" @click="alldates = !alldates"><v-icon dark>{{ alldates ? 'add' : 'remove' }}</v-icon></v-btn>
          </v-col>
          -->
        </v-row>
        <div v-show="!alldates">
          <v-row>    
            <!--    
            <v-col cols="2">
              <v-chip large :color="twentyOneDays ? 'teal' : 'red'" text-color="white">
                <v-avatar left :class="twentyOneDays ? 'teal darken-4' : 'red darken-4'">21</v-avatar>
                dias
              </v-chip>
            </v-col>
            -->
            <v-col cols="12">
              <v-text-field
                  v-model="twentyOneDays.value"
                  label="Digite o Valor para 21 dias"
                  hint="Ex: 100,00"
                  persistent-hint
                  :readonly="!twentyOneDays.status"
                  outlined
              >
                  <template v-slot:append>
                      <v-slide-x-reverse-transition
                      mode="out-in"
                      >
                      <v-icon
                          :key="`icon-${twentyOneDays.status}`"
                          :color="twentyOneDays.status ? 'success' : 'red'"
                          @click="twentyOneDays.status = !twentyOneDays.status"
                          v-text="twentyOneDays.status ? 'mdi-lock-open' : 'mdi-lock'"
                      ></v-icon>
                      </v-slide-x-reverse-transition>
                  </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!--
            <v-col cols="2">
              <v-chip large :color="fifteenDays ? 'teal' : 'red'" text-color="white">
                  <v-avatar left :class="fifteenDays ? 'teal darken-4' : 'red darken-4'">15</v-avatar>
                  dias
              </v-chip>
            </v-col>
            -->
            <v-col cols="12">
              <v-text-field
                  v-model="fifteenDays.value"
                  label="Digite o Valor para 15 dias"
                  hint="Ex: 100,00"
                  persistent-hint
                  :readonly="!fifteenDays.status"
                  outlined
              >
                  <template v-slot:append>
                      <v-slide-x-reverse-transition
                      mode="out-in"
                      >
                      <v-icon
                          :key="`icon-${fifteenDays.status}`"
                          :color="fifteenDays.status ? 'success' : 'red'"
                          @click="fifteenDays.status = !fifteenDays.status"
                          v-text="fifteenDays.status ? 'mdi-lock-open' : 'mdi-lock'"
                      ></v-icon>
                      </v-slide-x-reverse-transition>
                  </template>
              </v-text-field>
            </v-col>  
          </v-row>
          <v-row>
            <!--
            <v-col cols="2">
              <v-chip large :color="tenDays ? 'teal' : 'red'" text-color="white">
                  <v-avatar left :class="tenDays ? 'teal darken-4' : 'red darken-4'">10</v-avatar>
                  dias
              </v-chip>
            </v-col>
            -->
            <v-col cols="12">
              <v-text-field
                  v-model="tenDays.value"
                  label="Digite o Valor para 10 dias"
                  hint="Ex: 100,00"
                  persistent-hint
                  :readonly="!tenDays.status"
                  outlined
              >
                  <template v-slot:append>
                      <v-slide-x-reverse-transition
                      mode="out-in"
                      >
                      <v-icon
                          :key="`icon-${tenDays.status}`"
                          :color="tenDays.status ? 'success' : 'red'"
                          @click="tenDays.status = !tenDays.status"
                          v-text="tenDays.status ? 'mdi-lock-open' : 'mdi-lock'"
                      ></v-icon>
                      </v-slide-x-reverse-transition>
                  </template>
              </v-text-field>
            </v-col> 
          </v-row>
          <v-row>
            <!--
            <v-col cols="2">
              <v-chip large :color="sevenDays ? 'teal' : 'red'" text-color="white">
                  <v-avatar left :class="sevenDays ? 'teal darken-4' : 'red darken-4'">7</v-avatar>
                  dias
              </v-chip>
            </v-col>
            -->
            <v-col cols="12">
              <v-text-field
                  v-model="sevenDays.value"
                  label="Digite o Valor para 7 dias"
                  hint="Ex: 100,00"
                  persistent-hint
                  :readonly="!sevenDays.status"
                  outlined
              >
                  <template v-slot:append>
                      <v-slide-x-reverse-transition
                      mode="out-in"
                      >
                      <v-icon
                          :key="`icon-${sevenDays.status}`"
                          :color="sevenDays.status ? 'success' : 'red'"
                          @click="sevenDays.status = !sevenDays.status"
                          v-text="sevenDays.status ? 'mdi-lock-open' : 'mdi-lock'"
                      ></v-icon>
                      </v-slide-x-reverse-transition>
                  </template>
              </v-text-field>
            </v-col> 
          </v-row>
          <v-row>
            <!--
            <v-col cols="2">
              <v-chip large :color="threeDays ? 'teal' : 'red'" text-color="white">
                  <v-avatar left :class="threeDays ? 'teal darken-4' : 'red darken-4'">3</v-avatar>
                  dias
              </v-chip>
            </v-col>
            -->
            <v-col cols="12">
              <v-text-field
                  v-model="threeDays.value"
                  label="Digite o Valor para 3 dias"
                  hint="Ex: 100,00"
                  persistent-hint
                  :readonly="!threeDays.status"
                  outlined
              >
                  <template v-slot:append>
                      <v-slide-x-reverse-transition
                      mode="out-in"
                      >
                      <v-icon
                          :key="`icon-${threeDays.status}`"
                          :color="threeDays.status ? 'success' : 'red'"
                          @click="threeDays.status = !threeDays.status"
                          v-text="threeDays.status ? 'mdi-lock-open' : 'mdi-lock'"
                      ></v-icon>
                      </v-slide-x-reverse-transition>
                  </template>
              </v-text-field>
            </v-col> 
          </v-row>
          <v-row>
            <!--
            <v-col cols="2">
              <v-chip large :color="oneDay ? 'teal' : 'red'" text-color="white">
                  <v-avatar left :class="oneDay ? 'teal darken-4' : 'red darken-4'">1</v-avatar>
                  dia
              </v-chip>
            </v-col>
            -->
            <v-col cols="12">
              <v-text-field
                  v-model="oneDay.value"
                  label="Digite o Valor para 1 dia"
                  hint="Ex: 100,00"
                  persistent-hint
                  :readonly="!oneDay.status"
                  outlined
              >
                  <template v-slot:append>
                      <v-slide-x-reverse-transition
                      mode="out-in"
                      >
                      <v-icon
                          :key="`icon-${oneDay.status}`"
                          :color="oneDay.status ? 'success' : 'red'"
                          @click="oneDay.status = !oneDay.status"
                          v-text="oneDay.status ? 'mdi-lock-open' : 'mdi-lock'"
                      ></v-icon>
                      </v-slide-x-reverse-transition>
                  </template>
              </v-text-field>
            </v-col> 
          </v-row>
        </div>
        <!--
        <v-subheader>Selecione o valor do frete</v-subheader>
        -->
        <v-row>        
          <!--
          <v-col cols="2">
            <v-chip :color="shipping.status ? 'teal' : 'red'" text-color="white">
              Frete
            </v-chip>
          </v-col>
          -->
          <v-col cols="12">  
            <v-text-field
                v-model="shipping.value"
                label="Digite o Valor do Frete"
                hint="Ex: 60,00 - Entregas e Retiradas"
                persistent-hint
                :readonly="!shipping.status"
                outlined
            >
                <template v-slot:append>
                    <v-slide-x-reverse-transition
                    mode="out-in"
                    >
                    <v-icon
                        :key="`icon-${shipping.status}`"
                        :color="shipping.status ? 'success' : 'red'"
                        @click="shipping.status = !shipping.status"
                        v-text="shipping.status ? 'mdi-lock-open' : 'mdi-lock'"
                    ></v-icon>
                    </v-slide-x-reverse-transition>
                </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>        
          <!--
          <v-col cols="2">
            <v-chip :color="shipping.status ? 'teal' : 'red'" text-color="white">
              Frete
            </v-chip>
          </v-col>
          -->
          <v-col cols="12">  
            <v-text-field
                v-model="localpickup.value"
                label="Digite o Valor da Retirada Local"
                hint="Ex: 60,00 - Retirada local"
                persistent-hint
                :readonly="!localpickup.status"
                outlined
            >
                <template v-slot:append>
                    <v-slide-x-reverse-transition
                    mode="out-in"
                    >
                    <v-icon
                        :key="`icon-${localpickup.status}`"
                        :color="localpickup.status ? 'success' : 'red'"
                        @click="localpickup.status = !localpickup.status"
                        v-text="localpickup.status ? 'mdi-lock-open' : 'mdi-lock'"
                    ></v-icon>
                    </v-slide-x-reverse-transition>
                </template>
            </v-text-field>
          </v-col>
        </v-row>
        <!--
        <v-subheader>Selecione os metodos de pagamento {{arraypagamentos[pagamentos]}}</v-subheader>
        -->
        <v-row>
          <v-col cols="12">
            <v-alert
              outlined
              color="grey"
            >
              <v-sheet class="pa-4">
                <v-chip-group
                  v-model="pagamentos"
                  column
                  active-class="primary--text"
                  multiple
                >
                  <v-chip filter outlined v-for="tag in tags" :key="tag">
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-alert>  
          </v-col>    
        </v-row>
      

      <v-row>
        <v-col>
          <v-btn block color="primary" @click="onUpload" dark>Cadastrar Anúncio<v-icon right dark>mdi-arrow-right</v-icon></v-btn>
          <!--
          <v-progress-linear
            v-model="uploadValue"
            color="blue-grey"
            height="25"
            reactive
          >
            <template v-slot="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>
          -->
        </v-col>
      </v-row>
    </div>
    </div>
    <div v-else>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title
              class="headline"
              primary-title
            >
              <v-icon size="75px" color="light-blue darken-3">check_circle_outline</v-icon> Anúncio Finalizado com sucesso! 
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
                    <v-list-item-title>{{title}}</v-list-item-title>
                    <v-list-item-sub-title>{{description}}</v-list-item-sub-title>
                  </v-list-item-content>
                </v-list-item>
                <!--
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
                    <v-list-item-title>Entrega: {{}}</v-list-item-title>
                    <v-list-item-sub-title>Retirada: {{}}</v-list-item-sub-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon>mdi-square-inc-cash</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="black--text font-weight-black">Valor total à pagar R$,00 () </v-list-item-title>
                    
                  </v-list-item-content>
                </v-list-item>
                -->
              </v-list>
              
              <v-divider light></v-divider>
              <!-- Em breve, vamos te ligar para confirmar! -->
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn block color="primary" @click="insertAd" dark>Finalizar Anúncio</v-btn>    
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-flex>
</template>
<script>  
  import { db, auth, storageRef, provider } from '../config/db';
  const dbusuario = db.ref('usuario');
  const dbanuncio = db.ref('anuncio');
  export default {
    name: 'Andaime',
    data: () => ({
      // finish serve para controle de exibição do corpo
      finish: false,
      // Specific serve para controle de exibição do corpo especifico de andaime
      specific: false,
      //
      imageData: null,
      imageData2: null,
      imageData3: null,
      picture: null,
      uploadValue: 0,
      //
      files: [],
      files2: [],
      files3: [],
      url: '',
      url2: '',
      url3: '',
      foto:'',
      foto2:'',
      foto3:'',
      listImage2: false,
      listImage3: false,
      imgurl: [],
      imagem:'',
      imagem2:'',
      imagem3:'',
      /* Data Vendor */
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
      /* Data User */
      email:'',
      /* Data Filds */
      title:'',
      description:'',
      altura:{
          value:'',    
          array:["2 Metros", "3 Metros", "4 Metros", "5 Metros" , "6 Metros", "7 Metros", "8 Metros", "9 Metros", "10 Metros", "11 Metros", "12 Metros", "13 Metros", "14 Metros" , "15 Metros", "16 Metros", "17 Metros", "18 Metros", "19 Metros", "20 Metros"],
      },
      quantidade: 1,
      /* Payment Methods Tags*/
      tags: [
        'Crédito',
        'Débito',
        'Dinheiro à vista',
        'Boleto',
        'Transferência Bancária'
      ],
      /*Array Pagamentos */
      arraypagamentos: {
        0: 'Crédito',
        1: 'Débito',
        2: 'Dinheiro à vista',
        3: 'Boleto',
        4: 'Transferência Bancária'
      },
      pagamentos:[],
      /* Payment Methods*/
      payment:{
          credito:false,
          debito:false,
          dinheiro:false,
          boleto:false,
          deposito:false,
          transferencia:false,
      },
      /* Values, Prices and Dates Settings */
      alldates:true,
      oneDay:{
        value:'',
        status: false
      },
      threeDays:{
        value:'',
        status: false
      },
      sevenDays:{
        value:'',
        status: false
      },
      tenDays:{
        value:'',
        status: false
      },
      fifteenDays:{
        value:'',
        status: false
      },
      twentyOneDays:{
        value:'',
        status: false
      },
      thirtyDays:{
        value:'',
        status: true
      },
      /*Entrega e Retirada*/
      shipping:{
        value:'',
        status: true
      },
      /* Retirada Local*/
      localpickup:{
        value:'',
        status: false        
      },
      /* Opcionais */
      opcional:{
        nome:'',
        status: false,
        valor: 0
      },
      opcionalum:{
        nome:'',
        status: false,
        valor: 0
      },
      opcionaldois:{
        nome:'',
        status: false,
        valor: 0
      },
      /* Adicionais */
      adicional:{
        nome:'',
        status: false,
        valor: 0
      },
      adicionalum:{
        nome:'',
        status: false,
        valor: 0
      },
      adicionaldois:{
        nome:'',
        status: false,
        valor: 0
      },
      adicionaltres:{
        nome:'',
        status: false,
        valor: 0
      },
      /* Acessórios */
      andaimes1x1:{
          status:false,
          value: 0
      },
      andaimes150x100:{
          status:false,
          value: 0
      },
      andaimes150x150:{
          status:false,
          value: 0
      },
      sapatas:{
          status:false,
          value: 0
      },
      rodinhas:{
          status:false,
          value: 0
      },
      plataformaMetalica:{
          status:false,
          value: 0
      },
      plataformaMadeira:{
          status:false,
          value: 0
      },
      travessas:{
          status:false,
          value: 0
      },
      tesouras:{
          status:false,
          value: 0
      },
      diagonais:{
          status:false,
          value: 0
      },
      guardacorpo:{
          status:false,
          value: 0
      },
      escadas:{
          status:false,
          value: 0
      },
      acessorios:{
          panel:[true],
      },
      fabricante:'',
      modelo:'',
      moreinfo: false,
    }),
    created: function () {
      const that = this;
      auth.onAuthStateChanged(function(user) {
        if(user){
          //alert(user.displayName);
          that.email = user.email;
          that.searchUser(user.email)
        }  
      })
    },
    methods: {
      onFileChange() {
        const obj = this.files;
        const nome = obj.name;
        this.foto = nome;
        this.url = URL.createObjectURL(obj);
      },
      onFileChange2() {
        const obj = this.files2;
        const nome = obj.name;
        this.foto2 = nome;
        this.url2 = URL.createObjectURL(obj);
      },
      onFileChange3() {
        const obj = this.files3;
        const nome = obj.name;
        this.foto3 = nome;
        this.url3 = URL.createObjectURL(obj); 
      },
      onUpload(){
        this.finish=true;
        this.picture=null;
        this.uploadValue=0;
        this.imageData = this.files;
        this.imageData2 = this.files2;
        this.imageData3 = this.files3;
        if(this.imageData != null){
          const storage = storageRef.ref('photos/'+this.imageData.name).put(this.imageData);
          storage.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storage.snapshot.ref.getDownloadURL().then((objurl)=>{
              this.imagem = objurl;
              this.imgurl.push(objurl);
            });
          }
          );
        }
        if(this.imageData2 != null){
          const storage = storageRef.ref('photos/'+this.imageData2.name).put(this.imageData2);
          storage.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storage.snapshot.ref.getDownloadURL().then((objurl)=>{
              this.imagem2 = objurl;
              this.imgurl.push(objurl);
            });
          }
          );
        }
        if(this.imageData3 != null){
          const storage = storageRef.ref('photos/'+this.imageData3.name).put(this.imageData3);
          storage.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storage.snapshot.ref.getDownloadURL().then((objurl)=>{
              this.imagem3 = objurl;
              this.imgurl.push(objurl);
            });
          }
          );
        }
      },
      insertAd(){    
        /*
        if(this.imgurl.length > 0){
          alert("Mais Imagens: "+this.imgurl.length);
        }else{
          alert("Menos Imagens: "+this.imgurl.length);
        }
        */
        const anuncio = dbanuncio.push({
          usuario: this.email,  
          categoria: 'andaimes1x1',
          titulo: this.title, 
          descricao: this.description,
          altura: this.altura.value,
          quantidade: this.quantidade,
          acessorios:{
            andaimes1x1:{
              status: this.andaimes1x1.status,
              value: this.andaimes1x1.value
            },
            andaimes150x100:{
              status: this.andaimes150x100.status,
              value: this.andaimes150x100.value
            },
            andaimes150x150:{
              status: this.andaimes150x150.status,
              value: this.andaimes150x150.value
            },
            sapatas:{
              status: this.sapatas.status,
              value: this.sapatas.value
            },
            rodinhas:{
              status: this.rodinhas.status,
              value: this.rodinhas.value
            },
            plataformaMetalica:{
              status: this.plataformaMetalica.status,
              value: this.plataformaMetalica.value
            },
            plataformaMadeira:{
              status: this.plataformaMadeira.status,
              value: this.plataformaMadeira.value,
            },
            travessas:{
              status: this.travessas.status,
              value: this.travessas.value
            },
            tesouras:{
              status: this.tesouras.status,
              value: this.tesouras.value
            },
            diagonais:{
              status: this.diagonais.status,
              value: this.diagonais.value
            },
            guardacorpo:{
              status: this.guardacorpo.status,
              value: this.guardacorpo.value
            },
            escadas:{
              status: this.escadas.status,
              value: this.escadas.status
            },
          },
          valores:{
            30:{
              status: this.thirtyDays.status,
              value: this.thirtyDays.value
            },  
          },
          periodos:{
            7:{
              status: this.sevenDays.status,
              value: this.sevenDays.value
            },
            15:{
              status: this.fifteenDays.status,
              value: this.fifteenDays.value
            },
            30:{
              status: this.thirtyDays.status,
              value: this.thirtyDays.value
            },  
          },
          opcionais:{
            0:{
              status: this.opcional.status,
              nome: this.opcional.nome,
              valor: this.opcional.valor,
            },
            1:{
              status: this.opcionalum.status,
              nome: this.opcionalum.nome,
              valor: this.opcionalum.valor,
            },
            2:{
              status: this.opcionaldois.status,
              nome: this.opcionaldois.nome,
              valor: this.opcionaldois.valor,
            }  
          },
          adicionais:{
            0:{
              status: this.adicional.status,
              nome: this.adicional.nome,
              valor: this.adicional.valor,
            },
            1:{
              status: this.adicionalum.status,
              nome: this.adicionalum.nome,
              valor: this.adicionalum.valor,
            },
            2:{
              status: this.adicionaldois.status,
              nome: this.adicionaldois.nome,
              valor: this.adicionaldois.valor,
            },
            3:{
              status: this.adicionaltres.status,
              nome: this.adicionaltres.nome,
              valor: this.adicionaltres.valor,
            },  
          },
          frete:{
            retiradalocal:{
              status: this.localpickup.status,
              value: this.localpickup.value
            },  
            entregaretirada:{
              status: this.shipping.status,
              value: this.shipping.value
            }      
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
          fabricante: this.fabricante,
          modelo: this.modelo,
          pagamentos: this.pagamentos,
          imagem: this.imgurl,
          //valor: parseFloat(this.valor) + parseFloat(this.frete) ,
          situacao:'0',
          status:'0',
          emissao: new Date().toISOString().substr(0, 10), 
        }).key;
        //this.redirectAccount();
        //user = objetoid;
        console.log("Revelado o ID do Pedido do "+anuncio);
        //this.redirectProduct(anuncio);  
        this.$router.push({ name: 'product2', params: { product: anuncio} });
      },
      searchUser(obj){
        const that = this; 
        const query = dbusuario.orderByChild("email").equalTo(obj).limitToFirst(1);
        query.on('child_added', snapshot => {
          if(snapshot.exists()) {
            that.idusuario = snapshot.key;
            that.vendedor.nome = snapshot.val().nome;
            that.vendedor.email = snapshot.val().email;
            that.vendedor.registro = snapshot.val().registro;
            that.vendedor.telefone = snapshot.val().telefone;
            that.vendedor.telefone2 = snapshot.val().telefone2;
            let enderecovededores = snapshot.val().endereco;
            that.vendedor.endereco.cep = enderecovededores['cep'];
            that.vendedor.endereco.numero = enderecovededores['numero'];
            that.vendedor.endereco.complemento = enderecovededores['complemento'];   
            that.vendedor.endereco.logradouro = enderecovededores['logradouro'];
            that.vendedor.endereco.bairro = enderecovededores['bairro'];
            that.vendedor.endereco.cidade = enderecovededores['cidade'];
            that.vendedor.endereco.uf = enderecovededores['uf'];   
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
    }
  }
</script>
<style>
  .btn-file{
    width:10px;
    height: 10px;
  }
</style>
