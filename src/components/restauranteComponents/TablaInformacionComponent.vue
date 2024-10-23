<template>
    <div>
        <v-data-table :items="items" :headers="headers" height="68vh">
            <template v-slot:[`item.actions`]="{ item }">
                <div class="">
                    <v-chip append-icon="bi bi-file-text-fill" color="success" class="d-flex justify-center align-center mb-2 mt-2" small @click="getID(item.id)">Editar restaurante</v-chip>

                    <v-chip color="error" class="d-flex justify-center align-center mb-2" small append-icon="bi bi-trash3-fill"
                        @click="deleteRestaurant(item.id)">
                        Eliminar restaurante
                    </v-chip>

                    <v-chip color="warning" class="d-flex justify-center align-center mb-2" small append-icon="bi bi-arrow-up-right-square-fill" @click="redirectMetdosRestaurante(item.id)">
                        Funciones restaurante
                    </v-chip>
                </div>
            </template>
        </v-data-table>
    </div>
</template>
<script>
export default {
    name: "TablaInformacionComponent",
    props: {
        items: Array,
        headers: Array,
    },
}
</script>