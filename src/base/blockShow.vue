<template>
    <section class="exhibition">
        <div class="hvr-bounce-to-right exhition-bg" v-for="(item,index) in exhibitions" v-lazy:background-image='item.img' :key="index" :href='item.title' @click='toDetail(item)'></div>
    </section>
</template>
<script>
export default {
    props: ['exhibitions'],
    methods: {
        toDetail(item) {
            this.$emit('toDetail', item);
        }
    }
}
</script>

<style lang="less" scoped>
.exhibition {
    width: 100%;
    height: 200px;
    overflow-y: scroll;
    display: flex;
    flex-direction: row nowrap;
    &::-webkit-scrollbar {
        display: none;
    }
    .exhition-bg {
        flex-grow: 1;
        margin: 0 10px;
    }
}

@keyframes toleft {
    from {
        transform: translate(0);
    }
    to {
        transform: translate(0, -20px);
    }
}
</style>

