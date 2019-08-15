<template>
    <!-- 列表显示 -->
    <section class="list-container">
        <!-- 单个 cell 的列表 -->
        <div class="list-card" v-for='(item,index) in list' :key="index" @click="toDetail(item)">
            <!-- 左侧图片 -->
            <img v-lazy="item.img" alt="">
            <!-- 右侧描述 -->
            <div class="list-card-right">
                <span class="list-title">{{item.title}}</span>
                <span class="list-sub-title">{{item.date}}</span>
                <p class="list-content">
                    {{item.abstract}}
                </p>
            </div>
        </div>
    </section>
</template>
<style lang="less" scoped>
.list-container {
    .list-card {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        img {
            perspective: 1px;
            transition: all 1s;
            display: inline-block;
        }
        .list-card-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-left: 10px;
            text-align: left;
            .list-title,
            .list-sub-title {
                margin: 10px;
            }
            .list-title {
                font-size: 30px;
                font-weight: bold;
            }
            .list-sub-title {
                font-size: 24px;
            }
            .list-content {
                font-size: 20px;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient: vertical;
                /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp: 2;
                /** 显示的行数 **/
                overflow: hidden;
                /** 隐藏超出的内容 **/
            }
        }
    }
    .list-card:hover {
        cursor: pointer;
        border: 2px solid rgba(0, 180, 220, 0.5);
        background-color: rgba(102, 102, 102, .1);
        animation: shine 1s linear 0s infinite alternate;
    }
    .list-card:hover img {
        transform: rotateY(180deg);
    }
}

@media screen and (min-width:1100px) {
    .list-container {
        padding: 10px 80px;
        margin-bottom: 100px;
        .list-card {
            margin: 10px 24px;
            height: 300px;
            img {
                width: 360px;
                height: 270px;
            }
        }
    }
}

@media screen and (min-width:415px) and (max-width:1099px) {
    .list-container {
        padding: 10px 20px;
        margin-bottom: 100px;
        .list-card {
            margin: 5px 12px;
            height: 200px;
            img {
                width: 240px;
                height: 180px;
            }
        }
    }
}

@media screen and (max-width:414px) {
    .list-container {
        padding: 10px 20px;
        margin-bottom: 100px;
        .list-card {
            margin: 5px 12px;
            height: 200px;
            img {
                width: 240px;
                height: 180px;
            }
        }
    }
}

@keyframes shine {
    from {
        -webkit-box-shadow: 0 0 18px rgba(72, 106, 170, 0.5);
    }
    to {
        -webkit-box-shadow: 0 0 18px rgba(72, 106, 170, 1.0), 0 0 30px rgba(0, 140, 255, 1.0);
    }
}
</style>

<script>
export default {
    props: ['list'],
    methods: {
        toDetail(item) {
            this.$emit('toDetail', item);
        }
    }
}
</script>
