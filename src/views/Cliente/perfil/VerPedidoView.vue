<template>
    <div>
        Pedido ID: {{ id }}
    </div>
</template>

<script>
export default {
    name: "VerPedidoView",
    data: () => ({
        id :'',
    }),
    created() {
        this.id = this.$route.params.id;
    },
}
</script>