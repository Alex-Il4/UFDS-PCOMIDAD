<template>
    <v-bottom-navigation v-model="localValue" :bg-color="bgColor" mode="shift">
        <v-btn v-for="(item, index) in menuItems" :key="index" @click="onMenuClick(index)">
            <v-icon :icon="item.icon"></v-icon>
            <span>{{ item.label }}</span>
        </v-btn>
    </v-bottom-navigation>
</template>
<script>
export default {
    name: "BottomNavigationMenu",
    props: {
        menuItems: {
            type: Array,
            required: true,
        },
        currentValue: {
            type: Number,
            required: true,
        },
        bgColor: {
            type: String,
            default: 'blue-grey',
        }
    },
    data() {
        return {
            localValue: this.currentValue,
        };
    },
    watch: {
        currentValue(newVal) {
            this.localValue = newVal;
        }
    },
    methods: {
        onMenuClick(index) {
            this.localValue = index;
            this.$emit('menu-item-click', index);
        },
    },
};
</script>
