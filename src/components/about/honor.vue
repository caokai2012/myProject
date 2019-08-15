<template>
    <div>
        <picture-modal :pictures='pictures.data' :modalStyle='modalStyle'>
        </picture-modal>
        <Page :total="pictures.total" v-show="pictures.total" @on-change='pageChange'></Page>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
import PictureModal from 'base/pictureModal'
export default {
    components: {
        PictureModal
    },
    data() {
        return {
            spinShow: false,
            pictures: {
                data: [],
                pageIndex: 1,
                total: 0
            },
            modalStyle: {
                width: '354px',
                height: 'auto'
            }
        }
    },
    watch: {
        "pictures.pageIndex": {
            handler() {
                this.getHonor();
            },
            deep: true
        }
    },
    methods: {
        getHonor() {
            let param = {
                pageNo: this.pictures.pageIndex
            }
            this.pictures.data = [];
            this.spinShow = true;
            this.$http.about.getHonor(param).then(res => {
                let { success, msg, data, pageNums } = res;
                this.spinShow = false;
                this.pictures.total = pageNums;
                if (success) {
                    if (data.length) {
                        this.pictures.data = data.map(item => {
                            return {
                                title: item.title,
                                img: item.imgUrl
                            }
                        });
                    }
                } else {
                    this.$Message.warning('当前区域工程业绩查询失败,原因: ' + msg);
                }
            })
        },
        pageChange(val) {
            this.pictures.pageIndex = val;
        }
    },
    mounted() {
        this.getHonor();
    }
}
</script>