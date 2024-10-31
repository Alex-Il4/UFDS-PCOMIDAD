<template>
    <v-responsive>
        <v-app :theme="theme">
            <menu-component :current-title="currentTitle" :theme="theme" @toggle-theme="onClick"
                @edit-profile="onEditProfile" />
            <v-main>
                <v-container class="bg-surface-variant">
                    <v-row no-gutters>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                            <v-sheet class="bg-blue-lighten-3">
                                <v-card
                                    :disabled="loading"
                                    :loading="loading"
                                    class="mx-auto my-2"
                                    max-width="500"
                                >
                                    <template v-slot:loader="{ isActive }">
                                    <v-progress-linear
                                        :active="isActive"
                                        color="deep-purple"
                                        height="4"
                                        indeterminate
                                    ></v-progress-linear>
                                    </template>

                                    <v-img
                                    height="250"
                                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                    cover
                                    ></v-img>

                                    <v-card-item>
                                    <v-card-title>Cafe Badilico</v-card-title>

                                    <v-card-subtitle>
                                        <span class="me-1">Local Favorite</span>

                                        <v-icon
                                        color="error"
                                        icon="mdi-fire-circle"
                                        size="small"
                                        ></v-icon>
                                    </v-card-subtitle>
                                    </v-card-item>

                                    <v-card-text>
                                    <v-row
                                        align="center"
                                        class="mx-0"
                                    >
                                        <v-rating
                                        :model-value="4.5"
                                        color="amber"
                                        density="compact"
                                        size="small"
                                        half-increments
                                        readonly
                                        ></v-rating>

                                        <div class="text-grey ms-4">
                                        4.5 (413)
                                        </div>
                                    </v-row>

                                    <div class="my-4 text-subtitle-1">
                                        $ • Italian, Cafe
                                    </div>

                                    <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                                    </v-card-text>

                                    <v-divider class="mx-4 mb-1"></v-divider>

                                    <v-card-title>Tonight's availability</v-card-title>

                                    <div class="px-4 mb-2">
                                    <v-chip-group v-model="selection" selected-class="bg-deep-purple-lighten-2">
                                        <v-chip>5:30PM</v-chip>

                                        <v-chip>7:30PM</v-chip>

                                        <v-chip>8:00PM</v-chip>

                                        <v-chip>9:00PM</v-chip>
                                    </v-chip-group>
                                    </div>

                                    <v-card-actions>
                                    <v-btn
                                        color="deep-purple-lighten-2"
                                        text="Reserve"
                                        block
                                        border
                                        @click="reserve"
                                    ></v-btn>
                                    </v-card-actions>
                                </v-card>   
                            </v-sheet>
                        </v-col>
                       
                    </v-row>
                </v-container>
                <v-container class="bg-surface-variant">

                </v-container>
                <v-container>
                    <component :is="currentComponent" :items="ListaRestaurante" v-if="value === 0"
                        :title-table="'Mis Restaurantes'" :color="color" :icon="'bi bi-building-check'"
                        @refreshListaRestaurantes="GetRestaurantes" />
                    <component :is="currentComponent" v-if="value === 2"></component>
                    <v-bottom-navigation v-model="value" :bg-color="color" mode="shift">
                        <v-btn @click="value = 0">
                            <v-icon icon="bi bi-cart"></v-icon>
                            <span>Carrito</span>
                        </v-btn>

                    </v-bottom-navigation>
                </v-container>
            </v-main>

        </v-app>
    </v-responsive>



</template>


<script>
import MenuComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue'

export default {
    name: "CarritoUserView",
    components: {
        MenuComponent,
    },

    data: () => ({

        theme: 'light'
    }),

    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        }
    }


}

</script>