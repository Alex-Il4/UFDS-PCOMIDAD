<template>
    <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
                v-model="comentario"
                label="Comentario"
                type="text"
                variant="outlined"
                clearable
                color="warning"
                @click="$emit('comentario-metodo')"
                :rules="[rules.maxlength, rules.required]"
            >
                <template v-slot:prepend>
                <v-icon color="warning">bi bi-chat-quote-fill</v-icon>
                </template>
                <template v-slot:append>
                <v-icon color="warning">mdi-send</v-icon>
                </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
    name: 'SendComentarioComponent',
    data: () => ({
        comentario: '',
        rules: {
            required: value => !!value || 'El campo es requerido',
            maxlength: value => value.length <= 255 || 'El texto no puede superar los 255 caracteres',
        },
    }),
}
</script>