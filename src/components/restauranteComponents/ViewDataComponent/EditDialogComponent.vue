<template>
    <div class="text-center pa-4">
      <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <v-card
          :prepend-1="icon"
          :text="text"
          :title="title"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" color="error">
              Cancelar
            </v-btn>
            <v-btn @click="$emit('deleteMethod')" color="success">
              Confirmar
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>

<script>
export default {
    name: "EditDialogComponent",
    props: {
        title: String,
        text: String,
        color: String,
        icon: String,
    },
    data: () => ({
        dialog: false,
    }),
}
</script>