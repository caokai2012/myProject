<template>
    <section>
        <single-bg></single-bg>
        <list @toDetail='toDetail' :list='list.data'></list>
        <Page :current="list.pageIndex" :total="list.total" v-show="list.total" @on-change='pageChange'></Page>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </section>
</template>
<script>
import SingleBg from 'base/singleBg'
import List from 'base/list'
export default {
    components: {
        SingleBg,
        List
    },
    data() {
        return {
            spinShow: false,
            list: {
                pageIndex: 1,
                total: 0,
                data: []
            }
        }
    },
    watch: {
        "list.pageIndex": {
            handler() {
                this.getNewsList();
            }
        }
    },
    methods: {
        toDetail(item) {
            this.$router.push({
                name: 'newsDetail',
                params: {
                    param: item
                }
            })
        },
        getNewsList() {
            this.spinShow = true;
            let param = {
                pageNo: this.list.pageIndex
            }
            this.$http.news.company.news(param).then(res => {
                this.spinShow = false;
                let { success, data, msg, pageNums } = res;
                if (success) {
                    this.list.total = pageNums;
                    if (data.length) {
                        this.list.data = data.map(item => {
                            return {
                                title: item.title,
                                date: item.date,
                                img: item.imgUrl,
                                id: item.id,
                                abstract: item.abstract
                            }
                        })
                    }
                } else {
                    this.$Message.warning('获取公司新闻失败，原因： ' + msg);
                }
            })
        },
        pageChange(val) {
            this.list.pageIndex = val;
        }
    },
    mounted() {
        this.getNewsList();
    }
}
</script>

