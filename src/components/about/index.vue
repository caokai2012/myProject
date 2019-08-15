<template>
    <section class="container">
        <!-- 第一区-安图 -->
        <div class="about">
        </div>
        <!-- 第二区中间介绍 -->
        <div class="router_view">
            <RadioGroup v-model="about_us" @on-change='radioChange'>
                <Radio label="公司简介">
                    <span class="pro-span">公司简介</span>
                </Radio>
                <Radio label="资质荣誉">
                    <span class="pro-span">资质荣誉</span>
                </Radio>
            </RadioGroup>
            <keep-alive>
                <router-view style="width:100%;"></router-view>
            </keep-alive>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            about_us: '',

        }
    },
    methods: {
        radioChange(val) {
            let path;
            if (val === '公司简介') {
                path = '/about/abstract';
            } else {
                path = '/about/honor'
            }
            this.$router.push({
                path
            });
        }
    },
    mounted() {
        if (this.$route.name === 'abstract') {
            this.about_us = '公司简介';
        } else if (this.$route.name === 'honor') {
            this.about_us = '资质荣誉';
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    .about {
        width: 100%;
        background-image: url(../../../static/img/top-img.png);
        height: 600px;
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: scroll;
    }
    .router_view {
        margin: 10px auto;
        width: 100%;
        overflow: hidden;
        &::after {
            content: '';
            display: inline;
            clear: both;
        }
    }
}
</style>

