<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="600">
            <v-form fast-fail ref="form">
                <v-card :prepend-icon="icon" :title="title">
                    <v-card-text>
                        <v-row dense>
                            <v-col v-for="(field, index) in fields" :key="index" :cols="field.cols" :md="field.md"
                                :sm="field.sm">
                                <component :is="field.type" v-model="form[field.model]" :label="field.label"
                                    :hint="field.hint" :rules="field.rules" :color="color" :required="field.required"
                                    :accept="field.accept" v-bind="field.bindProps"></component>
                            </v-col>
                        </v-row>
                        <small class="text-caption text-medium-emphasis">*indica campo obligatorio</small>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Cancelar" color="error" variant="plain" @click="closeDialog"></v-btn>
                        <v-btn color="primary" text="Actualizar" variant="tonal" @click="submitEdit"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog v-model="isVisible" width="auto">
            <v-card :color="colorAlert" max-width="400" :prepend-icon="iconAlert" :text="textAlert" :title="titleAlert">
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Ok" @click="isVisible = false"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "EditDialogComponent",
    props: {
        title: String, // Título del diálogo (por ejemplo, "Editar Menú", "Editar Restaurante")
        fields: Array, // Campos dinámicos, cada objeto puede tener { type, model, label, rules, hint, required, cols, md, sm }
        icon: String, // Ícono opcional para el diálogo
        color: String, // Color para los campos
        initialValues: Object,
    },
    data() {
        return {
            dialog: false,
            form: { ...this.initialValues },
            isVisible: false,
            colorAlert: '',
            iconAlert: '',
            titleAlert: '',
            textAlert: '',
        };
    },
    methods: {
        closeDialog() {
            this.dialog = false;
        },
        submitEdit() {
            this.$emit("submit", this.form); // Emitir los datos editados al componente padre
        },
        openDialog() {
            this.dialog = true;
        },
    },
};
</script>