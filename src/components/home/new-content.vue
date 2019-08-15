<template>
    <section class="wrap-container">
        <!-- 轮播图 -->
        <Carousel autoplay v-model="value" loop dots='outside' arrow='always'>
            <CarouselItem v-for="(item,index) in carousels" class="carousel" :key="index">
                <div class="demo-carousel">
                    <img :src="item" alt="">
                </div>
            </CarouselItem>
        </Carousel>
        <!-- 产品中心 -->
        <div class="product">
            <div class='index-title'>
                <span class="en">PRODUCT</span>
                产品中心
            </div>
            <div class="product-container">
                <div v-for="(item,index) in products" class="product-content" :key="index" @click='productDetail(item)'>
                    <div class="product-item">
                        <img class="img-content" v-lazy="item.imgUrl" alt="">
                        <div class="product-title">{{item.describe}}</div>
                    </div>
                </div>
            </div>
            <div class="more" @click='productMore'>更多</div>
        </div>
        <!-- 工程业绩 -->
        <div class="project">
            <div class='index-title'>
                <span class="en">ENGINEERING PERFORMANCE</span>
                工程业绩
            </div>
            <div class="project-line">
                <div v-for="(item,index) in projects" :key="index">
                    <div class="project-item">
                        <img class="img-content" v-lazy="item.imgUrl" alt="" @click='projectDetail(item)'>
                        <div class='project-article'>
                            <span class="project-title" @click="projectDetail(item)">{{item.title}}</span>
                            <p>{{item.describe}}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- 公司简介 -->
        <div class="introduction">
            <div class="right-content">
                <div class='index-title product-title'>
                    <span class="en">COMPANY PROFILE</span>
                    公司简介
                </div>
                <div class="right-describe">
                    <pre style='text-align:left;'>
                        <p v-html="introduction.describe" style="padding:0 10px;white-space: pre-wrap;"></p>
                    </pre>
                    <div class="forward" @click="about"></div>
                </div>
            </div>
        </div>
        <!-- 资质荣誉 -->
        <div class="honor">
            <div class='index-title'>
                <span class="en">QUALIFICATION HONOR</span>
                资质荣誉
            </div>
            <div class="honor-container">
                <div v-for="(item,index) in honors" class="honor-content" :key="index">
                    <div class="honor-item">
                        <img class="img-content" v-lazy="item.imgUrl" alt="">
                    </div>
                </div>
            </div>
            <div class="more" @click='honorMore'>更多</div>
        </div>
        <!-- 新闻动态 -->
        <div class="bg62">
            <div class="news">
                <div class='index-title first-section'>
                    <span class="en">NEWS <br/> INFORMATION</span>
                    新闻动态
                </div>
                <div v-for='(item,index) in news' :key='index' class="news-item">
                    <div class="news-date">{{item.date}}</div>
                    <div class="news-middle">
                        <div class="news-title" @click='newsDetail(item)'>{{item.title}}</div>
                        <div class="news-content">{{item.abstract}}</div>
                    </div>
                    <div class="news-right">
                        <img class="img-content" v-lazy="item.imgUrl" alt="">
                    </div>
                </div>
            </div>
            <!-- 知识园地 -->
            <div class="knowledge">
                <div class='index-title'>
                    <span class="en">KNOWLEDGE FIELD</span>
                    知识园地
                </div>
                <div class="knowledge-container">
                    <div v-for="(item,index) in knowledges" class="knowledge-content" :key="index" @click='knowledgeDetail(item)'>
                        <div class="knowledge-item">
                            <img class="img-content" v-lazy="item.imgUrl" alt="">
                            <div class="knowledge-title" @click='knowledgeDetail(item)'>{{item.title}}</div>
                        </div>
                    </div>
                </div>
                <div class="more" @click='knowledgeMore'>更多</div>
            </div>
        </div>
        <Modal v-model="currentSelected" width="60" :title='currentObj.describe'>
            <div style="text-align:center">
                <img v-lazy="currentObj.imgUrl" style="width:100%;height:100%;" alt="">
            </div>
        </Modal>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </section>
</template>
<script>
import BlockShow from 'base/blockShow'
export default {
    components: {
        BlockShow
    },
    data() {
        return {
            value: 1,
            currentObj: {
                describe: '',
                imgUrl: ''
            },
            currentSelected: false,
            spinShow: false, // 是否加载中
            carousels: [], // 轮播图
            products: [], // 产品展示
            honors: [], // 荣誉资质
            knowledges: [], // 知识园地
            news: [], // 最新资讯
            projects: [], // 工程业绩
            // 公司简介
            introduction: {

            }
        }
    },
    methods: {
        // 获取轮播图
        getCarousels() {
            this.carousels = [];
            this.$http.home.getCarousel().then(res => {
                let { success, data, msg } = res;
                if (success) {
                    if (data.length) {
                        this.carousels = data;
                    }
                } else {
                    this.$Message.warning('轮播图数据获取失败，原因： ' + msg);
                }
            })
        },
        // 获取 剩余功能展示项
        getIndex() {
            this.products = [];
            this.honors = [];
            this.knowledges = [];
            this.news = [];
            this.projects = [];
            this.introduction = {};
            this.spinShow = true;
            this.$http.home.getIndex().then(res => {
                let { success, data, msg } = res;
                this.spinShow = false;
                if (success) {
                    if (typeof data === 'object' && Object.keys(data).length) {
                        if (data.projectList.length > 2) {
                            this.projects = data.projectList.slice(0, 2);
                        } else {
                            this.projects = data.projectList
                        }
                        if (data.productType.length >= 4) {
                            this.products = data.productType.slice(0, 4);
                        } else {
                            this.products = data.productType
                        }
                        if (data.honorList.length >= 5) {
                            this.honors = data.honorList.slice(0, 5);
                        } else {
                            this.honors = data.honorList
                        }
                        if (data.knowledges.length >= 3) {
                            this.knowledges = data.knowledges.slice(0, 3);
                        } else {
                            this.knowledges = data.knowledges
                        }
                        if (data.newsList.length >= 3) {
                            this.news = data.newsList.slice(0, 3);
                        } else {
                            this.news = data.newsList
                        }
                        this.introduction = {
                            ...data.introduction,
                            describe: data.introduction.describe.replace(/↵/g, '<br/>')
                        }
                    }
                } else {
                    this.$Message.warning('轮播图数据获取失败，原因： ' + msg);
                }
            })
        },
        // 跳转到产品中心
        productMore() {
            this.$router.push({
                name: 'product',
                params: {
                    id: this.products[0].id
                }
            })
        },
        honorMore() {
            this.$router.push({
                path: '/about/honor'
            })
        },
        knowledgeMore() {
            this.$router.push({
                path: '/knowledge/product'
            })
        },
        // 跳转到当前产品的详情
        productDetail(item) {
            this.currentSelected = true;
            this.currentObj = item;
            console.info(this.currentObj);
        },
        knowledgeDetail(item) {
            this.$router.push({
                name: 'knowledgeDetail',
                params: {
                    id: item.id
                }
            })
        },
        newsDetail(item) {
            this.$router.push({
                name: 'newsDetail',
                params: {
                    param: item
                }
            })
        },
        projectDetail(item) {
            this.$router.push({
                name: 'projectDetail',
                params: {
                    id: item.id
                }
            })
        },
        about() {
            this.$router.push({
                path: '/about/abstract'
            })
        }
    },
    mounted() {
        this.getCarousels();
        this.getIndex();
    }
}
</script>
<style lang="less" scoped>
.index-title {
    color: #666666;
    font-size: 30px;
    line-height: 1.4;
    text-transform: uppercase;
    text-align: center;
    .en {
        font-size: 40px;
        font-family: Impact;
        color: #338de9;
        display: block;
    }
}

// 更多
.more {
    margin-top: 10px;
    display: inline-block;
    padding: 5px 40px;
    background: #1ebbf0;
    border-radius: 2px;
}

@media screen and (max-width:375px) {
    // 轮播图
    .demo-carousel {
        position: relative;
        cursor: pointer;
        .carousel-title {
            position: absolute;
            opacity: 0;
        }
        &:hover .carousel-title {
            background: #c3bcbc;
            height: 50px;
            color: #fff;
            width: 100%;
            transform: translateY(-8px);
            opacity: .8;
        }
        img {
            width: 100%;
            height: 400px;
        }
    } // 产品中心
    .product {
        .product-container {
            display: flex;
            flex-direction: column;
            .product-content {
                position: relative;
                margin: 10px 0;
                flex: 1;
                height: 420px;
                cursor: pointer;
                .product-title {
                    background: #c3bcbc;
                    position: absolute;
                    bottom: 0;
                    height: 80px;
                    line-height: 80px;
                    font-size: 40px;
                    color: #fff;
                    width: 100%;
                }
                img {
                    width: 100%;
                    height: 420px;
                }
            }
        }
    }
    .project {
        display: flex;
        flex-direction: column;
        .index-title {
            width: 100%;
            text-align: center;
        }
        .project-line {
            display: flex;
            flex-direction: column;
            margin-top: 20px; // justify-content: space-around;
            .project-item {
                width: 100%;
                .project-article {
                    .project-title {
                        display: block;
                        font-weight: bold;
                        &:hover {
                            color: #337ab7;
                            cursor: pointer;
                        }
                    }
                }
                img {
                    display: block;
                    cursor: pointer;
                    width: 100%;
                    height: 360px;
                }
            }
        }
    }
    .introduction {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: url(../../../static/img/img-55.png) no-repeat;
        color: #fff;
        margin-top: 10px;
        .index-title {
            .en {
                color: #fff;
            }
            font-weight: bold;
        }
        .product-title {
            color: #fff;
        }
        .right-content {
            width: 100%;
            p {
                word-wrap: break-word;
            }
            .forward {
                background: url(../../../static/img/img-70.png) no-repeat;
                width: 80px;
                height: 80px;
                display: block;
                margin: 30px 10px;
                &:hover {
                    background: url(../../../static/img/img-59.png) no-repeat;
                }
            }
        }
    }
    .honor {
        display: flex;
        flex-direction: column;
        background: url('../../../static/img/img-5.png');
        padding: 10px;
        .honor-container {
            display: flex;
            flex-flow: row wrap;
            width: 100%;
            .honor-content {
                flex: 1;
                margin: 10px;
                img {
                    width: 300px;
                    height: 400px;
                }
            }
        }
        .more {
            color: #fff;
        }
    }
    .bg62 {
        background: url(../../../static/img/img-62.png) no-repeat;
    }
    .news {
        display: flex;
        flex-direction: column;
        padding: 10px 0px;
        .first-section {
            width: 100%;
        }
        .news-item {
            margin: 20px 0;
            .news-date {
                display: inline-block;
                color: #666;
                font-size: 20px;
                width: 100%;
                text-align: center;
            }
            .news-middle {
                width: 100%;
                .news-title {
                    display: inline-block;
                    color: #000;
                    &:hover {
                        color: #337ab7;
                    }
                }
                .news-content {
                    font-size: 20px;
                    padding: 10px;
                    text-align: left;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 8;
                    overflow: hidden;
                }
            }
            .news-right {
                img {
                    width: 100%;
                    height: 360px;
                }
            }
        }
    }
    .knowledge {
        .knowledge-container {
            display: flex;
            flex-direction: column;
            .knowledge-content {
                margin-bottom: 10px;
                flex: 1;
                img {
                    width: 100%;
                    height: 360px;
                }
            }
            .knowledge-title:hover {
                color: #337ab7;
            }
        }
        .more {
            color: #fff;
            margin-bottom: 10px;
        }
    }
}

@media screen and (min-width: 376px) and (max-width: 999px) {
    .demo-carousel {
        position: relative;
        cursor: pointer;
        .carousel-title {
            position: absolute;
            opacity: 0;
        }
        &:hover .carousel-title {
            background: #c3bcbc;
            height: 50px;
            color: #fff;
            width: 100%;
            transform: translateY(-8px);
            opacity: .8;
        }
        img {
            width: 100%;
            height: 400px;
        }
    }
    .product {
        .product-container {
            display: flex;
            flex-direction: column;
            .product-content {
                position: relative;
                margin: 10px 0;
                flex: 1;
                height: 420px;
                cursor: pointer;
                .product-title {
                    background: #c3bcbc;
                    position: absolute;
                    bottom: 0;
                    height: 80px;
                    line-height: 80px;
                    font-size: 40px;
                    color: #fff;
                    width: 100%;
                }
                img {
                    width: 100%;
                    height: 420px;
                }
            }
        }
    }
    .project {
        display: flex;
        flex-direction: column;
        .index-title {
            width: 100%;
            text-align: center;
        }
        .project-line {
            display: flex;
            flex-direction: column;
            margin-top: 20px; // justify-content: space-around;
            .project-item {
                width: 100%;
                .project-article {
                    .project-title {
                        display: block;
                        font-weight: bold;
                        &:hover {
                            color: #337ab7;
                            cursor: pointer;
                        }
                    }
                }
                img {
                    display: block;
                    cursor: pointer;
                    width: 100%;
                    height: 360px;
                }
            }
        }
    }
    .introduction {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: url(../../../static/img/img-55.png) no-repeat;
        color: #fff;
        margin-top: 10px;
        .index-title {
            .en {
                color: #fff;
            }
            font-weight: bold;
        }
        .product-title {
            color: #fff;
        }
        .left-content {
            display: flex;
            flex-direction: column;
            width: 100%;
            .left-img {
                width: 100%;
                img {
                    width: 100%;
                    height: 400px;
                }
            }
        }
        .right-content {
            display: flex;
            flex-direction: column;
            width: 100%;
            .forward {
                background: url(../../../static/img/img-70.png) no-repeat;
                width: 50px;
                height: 50px;
                display: block;
                margin-top: 30px;
                &:hover {
                    background: url(../../../static/img/img-59.png) no-repeat;
                }
            }
        }
    }
    .honor {
        display: flex;
        flex-direction: column;
        background: url('../../../static/img/img-5.png');
        padding: 10px;
        .honor-container {
            display: flex;
            flex-flow: row wrap;
            width: 100%;
            .honor-content {
                margin: 10px;
                flex: 1;
                img {
                    width: 300px;
                    height: 400px;
                }
            }
        }
        .more {
            color: #fff;
        }
    }
    .bg62 {
        background: url(../../../static/img/img-62.png) no-repeat;
    }
    .news {
        display: flex;
        flex-direction: column;
        padding: 10px 0px;
        .first-section {
            width: 100%;
        }
        .news-item {
            margin: 20px 0;
            .news-date {
                display: inline-block;
                color: #666;
                font-size: 20px;
                width: 100%;
                text-align: center;
            }
            .news-middle {
                width: 100%;
                .news-title {
                    display: inline-block;
                    color: #000;
                    &:hover {
                        color: #337ab7;
                    }
                }
                .news-content {
                    font-size: 20px;
                    padding: 10px;
                    text-align: left;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 8;
                    overflow: hidden;
                }
            }
            .news-right {
                img {
                    width: 100%;
                    height: 360px;
                }
            }
        }
    }
    .knowledge {
        .knowledge-container {
            display: flex;
            flex-direction: column;
            .knowledge-content {
                margin-bottom: 10px;
                flex: 1;
                img {
                    width: 100%;
                    height: 360px;
                }
            }
            .knowledge-title:hover {
                color: #337ab7;
            }
        }
        .more {
            color: #fff;
            margin-bottom: 10px;
        }
    }
}

@media screen and (min-width: 1000px) {
    .product {
        padding: 10px 80px;
        .product-container {
            display: flex;
            flex-flow: row nowrap;
            .product-content {
                margin: 10px;
                flex: 1;
                height: 320px;
                cursor: pointer;
                .product-title {
                    opacity: 0;
                    transition: all .5s linear;
                }
                &:hover .product-title {
                    background: #c3bcbc;
                    height: 50px;
                    color: #fff;
                    width: 100%;
                    transform: translateY(-8px);
                    opacity: .8;
                }
                img {
                    width: 360px;
                    height: 270px;
                }
            }
        }
    }
    .project {
        padding: 10px 80px;
        display: flex;
        flex-direction: column;
        background: url('../../../static/img/img-45.png');
        .project-line {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            .project-article {
                display: inline-block;
                height: 400px;
                vertical-align: top;
                .project-title {
                    display: block;
                    &:hover {
                        color: #337ab7;
                        cursor: pointer;
                    }
                }
            }
            img {
                cursor: pointer;
                width: 360px;
                height: 270px;
            }
        }
    }
    .introduction {
        width: 100%;
        padding: 10px 80px;
        background: url(../../../static/img/img-55.png) no-repeat;
        color: #fff;
        margin-top: 10px;
        .product-title {
            color: #fff;
        }
        .right-content {
            .forward {
                background: url(../../../static/img/img-70.png) no-repeat;
                width: 50px;
                height: 50px;
                display: block;
                &:hover {
                    background: url(../../../static/img/img-59.png) no-repeat;
                }
            }
        }
    }
    .honor {
        padding: 10px 80px;
        display: flex;
        flex-direction: column;
        background: url('../../../static/img/img-5.png');
        padding: 10px;
        .honor-container {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            box-sizing: border-box;
            .honor-content {
                margin: 10px;
                img {
                    width: 270px;
                    height: 360px;
                }
            }
        }
        .more {
            display: inline-block;
            width: 160px;
            text-align: center;
            margin: 5px auto;
        }
    }
    .bg62 {
        background: url(../../../static/img/img-62.png) no-repeat;
    }
    .news {
        display: flex;
        flex-flow: row wrap;
        padding: 10px 20px;

        .first-section {
            width: 920px;
        }
        .news-item {
            display: flex;
            box-sizing: border-box;
            flex-direction: row;
            margin: 20px;
            .news-date {
                color: #666;
                font-size: 20px;
                width: 130px;
                height: 400px;
            }
            .news-middle {
                width: 300px;
                height: 400px;
                .news-title {
                    cursor: pointer;
                    color: #000;
                    &:hover {
                        color: #337ab7;
                    }
                }
                .news-content {
                    font-size: 20px;
                    color: #ccc;
                    text-align: left;
                    padding-right: 5px;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 8;
                    overflow: hidden;
                }
            }
            .news-right {
                width: 480px;
                img {
                    width: 480px;
                    height: 360px;
                }
            }
        }
    }
    .knowledge {
        padding: 10px 80px;
        .knowledge-container {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            .knowledge-content {
                margin: 10px;
                flex: 1;
                cursor: pointer;
                img {
                    width: 480px;
                    height: 270px;
                }
            }
            .knowledge-title:hover {
                color: #337ab7;
                cursor: pointer;
            }
        }
    }
    .more {
        cursor: pointer;
        background: #c3bcbc;
        border-radius: 2px;
        transition: all .2s ease-in-out;
        &:hover {
            background: linear-gradient(135deg, #1ebbf0 30%, #39dfaa 100%);
            color: #fff;
        }
    }
    .demo-carousel {
        position: relative;
        cursor: pointer;
        .carousel-title {
            position: absolute;
            opacity: 0;
        }
        &:hover .carousel-title {
            background: #c3bcbc;
            height: 50px;
            color: #fff;
            width: 100%;
            transform: translateY(-8px);
            opacity: .8;
        }
        img {
            width: 100%;
            height: 800px;
        }
    }
}
</style>


