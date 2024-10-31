<template>
    <v-responsive>
        <v-app :theme="theme">
            <v-layout>
                <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
                <v-main style="height: 250px">
                    <div class="pa-7">
                        <v-text-field
                            :loading="loading"
                            append-inner-icon="mdi-magnify"
                            density="compact"
                            placeholder="Busca Restaurantes"
                            variant="outlined"
                            hint="Busca tus restaurantes preferidos"
                            single-line
                            clearable
                            color="orange"
                            @click:append-inner="onClick"
                        >
                            <template v-slot:loader>
                                <v-progress-linear
                                :active="custom"
                                color="orange"
                                :model-value="progress"
                                height="7"
                                indeterminate
                                ></v-progress-linear>
                            </template>
                        </v-text-field>
                    </div>
                </v-main>
            </v-layout>
        </v-app>
    </v-responsive>
</template>

<script>
import SideBarComponent from '@/components/ClienteComponents/SidebarComponent/SideBarComponent.vue'
export default {
    name: 'HomeView',
    components: {
        SideBarComponent
    },
    data: () => ({
        theme: 'light'
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
    }
}
</script>