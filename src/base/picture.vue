<template>
    <section>
        <div v-if='pictures.length' class="pic-container">
            <div v-for="(item,index) in pictures" :key="index" class="pic-item" @click='currentClicked(item)'>
                <div class="pic">
                    <span><img v-lazy="item.img" alt=""></span>
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
        <div v-else>
            <img src="../../static/img/empty-box.png" alt="">
            <span style="display:inline-block;width:100%;text-align:center;">暂时没有数据</span>
        </div>
    </section>
</template>
<style lang="less" scoped>
.pic-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .pic-item {
        height: 300px;
        box-sizing: border-box;
        margin: 10px 0;
        .pic {
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            height: 100%;
            width: 300px;
            border: 1px solid #ccc;
            transition: all .5s linear;
            span {
                font-size: 20px;
            }
            span:first-child {
                display: inline-block;
                width: 100%;
                height: 100%;
            }
            span:last-child {
                display: inline-block;
                position: absolute;
                bottom: 0;
                left: 0;
                z-index: 1;
                font-size-adjust: 20px;
                color: #fff;
                background-color: rgba(0, 0, 0, .4);
                line-height: 50px;
                width: 100%;
                height: 50px;
                transition: bottom .5s linear;
            }
            img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                transition: all .7s linear;
            }
            img:hover {
                transform: scale(1.1);
            }
        }
        &:hover {
            cursor: pointer;
            & .pic {
                border: 6px solid #336699;
                border-radius: 50%;
            }
            img {
                transform: scale(1.1); // filter: blur(0);
            }
            span:last-child {
                bottom: 50%;
                transform: translateY(50%);
                font-size: 30px;
                color: silver;
                height: 100px;
                line-height: 100px;
            }
        }
    }
}

@media screen and (max-width:414px) {
    .pic-container {
        padding: 10px 20px;
        .pic-item {
            width: 45%;
        }
    }
}

@media screen and (min-width:1100px) {
    .pic-container {
        padding: 10px 80px;
        .pic-item {
            width: 18%;
        }
    }
}
</style>

<script>
export default {
    props: ['pictures'],
    data() {
        return {

        }
    },
    methods: {
        // 选中某一个图片
        currentClicked(item) {
            this.$emit('currentClicked', item);
        }
    }
}
</script>

