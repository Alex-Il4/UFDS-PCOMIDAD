<template>
    <div class="pa-4">
        <v-divider class="mx-3 mb-1"></v-divider>
        <div v-for="(item, index) in Comentarios.slice(0, maxComentarios)" :key="index" class="pa-3">
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
                <v-rating :model-value="item.puntaje" class="ml-2" color="amber" density="compact" size="small" half-increments
                    readonly></v-rating>
            </div>
          </v-alert>
        </div>
        <v-divider class="mx-3 mb-1"></v-divider>
        <!--si comentarios esta vacio, muestra un mensaje de no hay comentarios-->
        <div v-if="Comentarios.length === 0" class="pa-3">
            <v-alert border="start" variant="tonal" color="warning" icon="mdi-comment-text" class="text-capitalize">
                No hay comentarios
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
    data: () => ({
        maxComentarios: 5,
    }),
}
</script>