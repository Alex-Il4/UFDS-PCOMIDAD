<template>
    <div>
        <h1>Lista de Restaurantes</h1>
        <v-data-table :items="items"></v-data-table>
    </div>
</template>

<script>
export default {
    name: "ListaRestauranteComponent",
    props: {
        items: Array,
    },
}
</script>