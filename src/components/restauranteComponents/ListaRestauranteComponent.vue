<template>
    <div>
        <v-card
            class="mx-auto"
            :title="titleTable"
            :color="color"
            :prepend-icon="icon"
        >

            <v-data-table :items="items" height="70vh"></v-data-table>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "ListaRestauranteComponent",
    props: {
        items: Array,
        titleTable: String,
        color: String,
        icon: String,
    },
}
</script>