<template>
    <!-- 单独的背景图片 -->
    <section>
        <div>
            <img src="../../static/img/top-img.png" style="width:100%;height:100%;" alt="">
        </div>
    </section>
</template>
<style lang="less" scoped>
@media screen and (max-width:767px) {
    div {
        width: 100%;
        height: 300px;
    }
}

@media screen and (min-width:768px) {
    div {
        width: 100%;
        height: 500px;
    }
}
</style>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

