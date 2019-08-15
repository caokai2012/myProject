<template>
    <section>
        <single-bg></single-bg>
        <div class="pro-select">
            <RadioGroup v-model="pro_value" @on-change='radioChange'>
                <Radio :label="item.label" v-for="(item,index) in productCenter" :value='item.value' :key="index">
                    <span class="pro-span">
                        {{item.label}}
                    </span>
                </Radio>
            </RadioGroup>
            <!-- 图片列表 -->
            <pro-show :pictures='currentProducts.data'></pro-show>
            <Page :total="currentProducts.total" v-show="currentProducts.total" @on-change='pageChange'></Page>
        </div>
    </section>
</template>
<style lang="less" scoped>
.pro-select {
    // display: table;
    width: 100%;
    margin: 20px;
}
</style>

<script>
import { Navs } from 'assets/js/mixin'
import SingleBg from 'base/singleBg'
import ProShow from 'components/product/picture'
export default {
    mixins: [Navs],
    components: {
        SingleBg,
        ProShow
    },
    props: ['id'],
    data() {
        return {
            pro_value: '',
            currentCategory: '',
            currentProducts: {
                data: [],
                pageIndex: 1,
                total: 0
            }
        }
    },
    watch: {
        // 当前选中的产品分类
        currentProduct(val) {
            let current = this.productCenter.find(item => item.value === val);
            this.pro_value = current.label;
            this.currentCategory = val;
            this.getAllPictures();
        },
        "currentProducts.pageIndex": {
            handler() {
                this.getAllPictures();
            }
        }
    },
    methods: {
        // 请求全部产品数据
        getAllPictures() {
            let param = {
                productType: this.currentCategory,
                pageNo: this.currentProducts.pageIndex
            }
            this.currentProducts.data = [];
            this.$http.products.list(param).then(res => {
                let { success, msg, data, pageNums } = res;
                if (success) {
                    this.currentProducts.total = pageNums;
                    if (data.length) {
                        this.currentProducts.data = data.map(item => {
                            return {
                                title: item.label,
                                img: item.imgUrl
                            }
                        })
                    }
                } else {
                    this.$Message.warning('当前分类产品查询失败,原因: ' + msg);
                }
            })
        },
        // 改变选项
        radioChange(val) {
            let tmp = this.productCenter.find(item => item.label == val);
            this.currentCategory = tmp.value;
            this.getAllPictures();
        },
        pageChange(val) {
            this.currentProducts.pageIndex = val;
        }
    },
    mounted() {
        // id 就是 当前案的 category
        this.currentCategory = this.id;
        // 筛选 category
        let temp = this.productCenter.find(item => item.value === this.currentCategory);
        this.pro_value = temp.label;
        this.getAllPictures();
    }
}
</script>

