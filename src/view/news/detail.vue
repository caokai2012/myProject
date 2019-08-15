<template>
    <div class="segment-container">
        <segment :content='content'>
        </segment>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
import Segment from 'base/segment'
export default {
    components: {
        Segment
    },
    data() {
        return {
            spinShow: false,
            id: '',
            content: {}
        }
    },
    methods: {
        getNews() {
            let param = {
                id: this.id
            }
            this.spinShow = true;
            this.$http.news.company.newsInfo(param).then(res => {
                this.spinShow = false;
                let { success, msg, data } = res;
                if (success) {
                    this.content = {
                        ...this.$route.params.param,
                        ...data,
                    };
                } else {
                    this.$Message.warning('新闻详情请求数据失败，原因： ' + msg);
                }
            })
        }
    },
    mounted() {
        this.id = this.$route.params.param.id;
        this.getNews();
    }
}
</script>
<style lang="less" scoped>
.segment-container {
    width: 100%;
    min-height: 800px;
}
</style>
