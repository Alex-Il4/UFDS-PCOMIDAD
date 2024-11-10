<template>
    <div>
        <v-card class="mx-auto" :title="titleTable" :color="color" :prepend-icon="icon" :search="search">
            <template v-slot:text>
                <v-text-field
                  v-model="search"
                  label="Buscar elemento"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  hide-details
                  single-line
                ></v-text-field>
            </template>
            <v-data-table :items="items" :headers="headers" :height="height ? height:'60vh'" :search="search">
                <template v-slot:[`item.imagen`]="{ item }">
                    <div v-if="item.imagen === null">
                        <v-chip color="error" class="d-flex justify-center align-center mb-2" small>
                            Sin imagen
                        </v-chip>
                    </div>
                    <div v-else class="d-flex justify-center align-center mb-2">
                        <v-img :src="baseUrl+item.imagen" width="100" height="100"></v-img>
                    </div>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <div class="">
                        <v-chip append-icon="bi bi-file-text-fill" color="success" class="d-flex justify-center align-center mb-2 mt-2" small  @click="$emit('edit-item', item.id)"> {{ textEditar }}</v-chip>
                        <v-chip color="error" class="d-flex justify-center align-center mb-2" small append-icon="bi bi-trash3-fill"
                            @click="$emit('delete-item', item.id)">
                            {{ textEliminar }}
                        </v-chip>

                        <v-chip color="warning" class="d-flex justify-center align-center mb-2" small append-icon="bi bi-arrow-up-right-square-fill" @click="redirectMetdosRestaurante(item.id)" v-if="isFunciones">
                            {{ textFunciones }}
                        </v-chip>
                    </div>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog
            v-model="isVisible"
            width="auto"
        >
            <v-card
                :color="colorAlert"
                max-width="400"
                :prepend-icon="iconAlert"
                :text="textAlert"
                :title="titleAlert"
            >
                <template v-slot:actions>
                    <v-btn
                        class="ms-auto"
                        text="Ok"
                        @click="isVisible = false"
                    ></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: "TablaInformacionComponent",
    props: {
        items: Array,
        headers: Array,
        titleTable: String,
        color: String,
        icon: String,
        textEliminar: String,
        textEditar: String,
        isFunciones: Boolean,
        textFunciones: String,
        height: String,
    },
    data: () => ({
        search: '',
        isVisible: false,
        colorAlert: '',
        iconAlert: '',
        titleAlert: '',
        textAlert: '',
        baseUrl: process.env.VUE_APP_API_URL,
    }),
}
</script>