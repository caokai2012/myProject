<template>
    <section class="project-content">
        <single-bg></single-bg>
        <div class="pro-select">
            <RadioGroup v-model="project_area" @on-change='radioChange'>
                <Radio :label="item.label" v-for="(item,index) in projects" :value='item.value' :key="index">
                    <span class="pro-span">
                        {{item.label}}
                    </span>
                </Radio>
            </RadioGroup>
            <!-- 图片列表 -->
            <block-pic :pictures='currentProjects.data' @currentClicked='currentClicked'></block-pic>
            <Page :total="currentProjects.total" v-show="currentProjects.total" @on-change='pageChange'></Page>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
    </section>
</template>
<script>
import SingleBg from 'base/singleBg'
import { Navs } from 'assets/js/mixin'
import BlockPic from 'base/picture'
export default {
    mixins: [Navs],
    props: ['id'],
    data() {
        return {
            spinShow: false,
            project_area: '',
            currentCategory: '',
            currentProjects: {
                data: [],
                pageIndex: 1,
                total: 0
            }
        }
    },
    watch: {
        currentProject(val) {
            let current = this.projects.find(item => item.value == val);
            this.project_area = current.label;
            this.currentCategory = val;
            this.getAllPictures();
        },
        "currentProjects.pageIndex": {
            handler() {
                this.getAllPictures();
            }
        }
    },
    methods: {
        getAllPictures() {
            let param = {
                area: this.currentCategory,
                pageNo: this.currentProjects.pageIndex
            }
            this.currentProjects.data = [];
            this.spinShow = true;
            this.$http.projects.projectList(param).then(res => {
                let { success, msg, data, pageNums } = res;
                this.spinShow = false;
                if (success) {
                    this.currentProjects.total = pageNums;
                    if (data.length) {
                        this.currentProjects.data = data.map(item => {
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
        // 工程业绩点击某一个图片
        currentClicked(item) {
            this.$router.push({
                name: 'projectDetail',
                params: {
                    ...item
                }
            })
        },
        radioChange(val) {
            let temp = this.projects.find(item => item.label === val);
            this.currentCategory = temp.value;
            this.getAllPictures();
        },
        pageChange(val) {
            this.currentProjects.pageIndex = val;
        }
    },
    components: {
        SingleBg,
        BlockPic
    },
    mounted() {
        // id 就是 当前案的 category
        this.currentCategory = this.id;
        // 筛选 category
        let temp = this.projects.find(item => item.value === this.currentCategory);
        this.project_area = temp.label;
        this.getAllPictures();
    }
}
</script>
<style lang="less" scoped>
@media screen and (min-width:768px) {
    .project-content {
        margin-bottom: 100px;
    }
}

.pro-select {
    margin: 20px;
}
</style>
