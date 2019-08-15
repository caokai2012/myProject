<template>
    <!-- 公司简介 -->
    <div class="who">
        <div class="who-describle">
            <pre style='text-align:left;white-space:pre-wrap;padding:0 10px;' v-html="introduction.describe">  </pre>
        </div>
    </div>
</template>
<style lang="less" scoped>
@media screen and (max-width:767px) {
    .who {
        width: 100%;
        .who-pic {
            width: 100%;
            height: 200px;
        }
        .who-describle {
            font-size: 20px;
        }
    }
}

@media screen and (min-width:768px) {
    .who {
        width: 100%;
        padding: 10px 80px;
    }
}
</style>

<script>
export default {
    data() {
        return {
            introduction: {
                imgUrl: '',
                describe: '',
                id: ''
            }
        }
    },
    methods: {
        getCompanyInfo() {
            this.introduction = Object.create(null);
            this.$http.about.introduction().then(res => {
                let { success, data, msg } = res;
                if (success) {
                    if (typeof data === 'object' && Object.keys(data).length) {
                        this.introduction = {
                            ...data,
                            describe: data.describe.replace(/↵/gi, '<br />'),
                            fuck: 1
                        }
                    }
                    console.log(this.introduction)
                } else {
                    this.$Message.warning('公司简介信息获取失败，原因： ' + msg);
                }
            })
        }
    },
    mounted() {
        this.getCompanyInfo();
    }
}
</script>

