<template>
    <section>
        <div class="pic-container" v-if="pictures.length">
            <div v-for="(item,index) in pictures" :key="index" class="pic-item" @click="currentClick(item)">
                <div class="pic">
                    <span><img v-lazy="item.img" alt=""></span>
                    <span>{{item.title}}</span>
                </div>
            </div>
            <Modal v-model="currentSelected" :width='modalWidth' :title='currentObj.title'>
                <div style="text-align:center">
                    <img :src="currentObj.img" :style="modalStyle" alt="">
                </div>
            </Modal>
        </div>
        <div v-else>
            <img src="../../static/img/empty-box.png" alt="">
            <span style="display:inline-block;width:100%;text-align:center;">暂时没有数据</span>
        </div>
    </section>
</template>
<script>
export default {
    props: ['pictures', 'modalWidth', 'modalStyle'],
    data() {
        return {
            currentSelected: false,
            currentObj: {
                title: '',
                img: ''
            },
        }
    },
    methods: {
        currentClick(item) {
            this.currentSelected = true;
            this.currentObj.title = item.title;
            this.currentObj.img = item.img;
        }
    }
}
</script>

<style lang="less" scoped>
.pic-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .pic-item {
        box-sizing: border-box;
        height: 300px;
        transition: border .5s linear;
        margin: 10px 0;
        .pic {
            border-radius: 8px;
            width: 300px;
            height: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 10px;
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
                width: 100%;
                height: 50px;
                display: inline-block;
                position: absolute;
                left: 0;
                bottom: 0;
                color: #fff;
                z-index: 1;
                font-size-adjust: 20px;
                line-height: 50px;
                background-color: rgba(0, 0, 0, .4);
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
        }
        &:hover {
            cursor: pointer;
            & .pic {
                border: 6px solid #336699;
                border-radius: 50%;
            }
            img {
                transform: scale(1.1);
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

