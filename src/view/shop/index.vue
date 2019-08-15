<template>
    <section class="shop-content">
        <single-bg></single-bg>
        <div class="pro-select">
            <RadioGroup v-model="shop_image">
                <Radio label="专卖店形象">
                    <span class="pro-span">专卖店形象</span>
                </Radio>
            </RadioGroup>
            <!-- 图片列表 -->
            <block-pic :pictures='shopImages.data' @currentClicked='currentClicked'></block-pic>
            <Page :total="shopImages.total" v-show="shopImages.total" @on-change='pageChange'></Page>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </section>
</template>
<script>
import SingleBg from 'base/singleBg'
import BlockPic from 'base/picture'
export default {
    data() {
        return {
            shop_image: '专卖店形象',
            spinShow: false,
            shopImages: {
                data: [],
                pageIndex: 1,
                total: 0
            }
        }
    },
    watch: {
        "shopImages.pageIndex": {
            handler() {
                this.getAllPictures();
            }
        }
    },
    methods: {
        getAllPictures() {
            let param = {
                pageNo: this.shopImages.pageIndex
            }
            this.shopImages.data = [];
            this.spinShow = true;
            this.$http.shop.agency(param).then(res => {
                let { success, msg, data, pageNums } = res;
                this.spinShow = false;
                if (success) {
                    this.shopImages.total = pageNums;
                    if (data.length) {
                        this.shopImages.data = data.map(item => {
                            return {
                                title: item.title,
                                img: item.imgUrl,
                                id: item.id
                            }
                        });
                    }
                } else {
                    this.$Message.warning('当前区域工程业绩查询失败,原因: ' + msg);
                }
            })
        },
        currentClicked(item) {
            this.$router.push({
                name: 'shopDetail',
                params: {
                    id: item.id
                }
            })
        },
        pageChange(val) {
            this.shopImages.pageIndex = val;
        }
    },
    mounted() {
        this.getAllPictures();
    },
    components: {
        SingleBg,
        BlockPic
    }
}
</script>
<style lang="less" scoped>
.shop-content {
    .pro-select {
        margin: 20px;
    }
}
</style>
