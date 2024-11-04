<template>
    <div class="border-sm border-info pa-4">
        <div v-for="(item, index) in Comentarios" :key="index" class="pa-3">
            <v-alert
                border="start"
                variant="tonal"
                color="warning"
                icon="mdi-comment-text"
                class="text-capitalize"
            >
            {{ item.comentario }}
            <div class="text-caption d-flex justify-end">
                <v-icon icon="bi bi-person-bounding-box" class="align-self-end mr-2"></v-icon>
                {{ item.usuario }} • {{ item.fecha }}
            </div>
          </v-alert>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableComentariosComponent',
    props: {
        Comentarios: Array,
    },
}
</script>