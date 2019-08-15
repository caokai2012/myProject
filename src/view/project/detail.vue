<template>
    <div class="segment-container">
        <div v-if="imgs.length">
            <span class="segment-title">{{title}}</span>
            <div v-for="(item,index) in imgs" :key="index">
                <img :src="item" alt="">
            </div>
        </div>
        <div v-else class="empty-box">
            <img src="../../../static/img/empty-box.png" style="width:200px;height:200px;" alt="">
            <span style="display:inline-block;width:100%;text-align:center;">暂时没有数据</span>
        </div>
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
            title: '',
            imgs: []
        }
    },
    methods: {
        // 获取当前工程的详情
        getProjectInfo() {
            let param = {
                projectId: this.id
            }
            this.imgs = [];
            this.spinShow = true;
            this.$http.projects.projectInfo(param).then(res => {
                let { success, msg, data } = res;
                this.spinShow = false;
                if (success) {
                    if (typeof data === 'object' && Object.keys(data).length) {
                        this.imgs = data.img;
                    }
                } else {
                    this.$Message.warning('新闻详情请求数据失败，原因： ' + msg);
                }
            })
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.title = this.$route.params.title;
        this.getProjectInfo();
    }
}
</script>
<style lang="less" scoped>
.segment-container {
    width: 100%;
    padding: 10px 80px;
    min-height: 800px;
    .segment-title {
        display: inline-block;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
    }
    img {
        width: 100%;
    }
}
</style>
