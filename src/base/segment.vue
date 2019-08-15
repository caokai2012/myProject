<template>
    <!-- 图片与文章 -->
    <div class="article-container">
        <div v-if="content.title || content.date">
            <span class="article-title">{{content.title}}</span>
            <span class="article-date">{{content.date}}</span>
            <div v-html='content.content' class="article-content">
            </div>
        </div>
        <div v-else class="empty-box">
            <img src="../../static/img/empty-box.png" alt="">
            <span style="display:inline-block;width:100%;text-align:center;">暂时没有数据</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: Object,
            default: function() {
                return {
                    title: '',
                    content: ''
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.article-container {
    width: 100%;
    .article-title {
        font-size: 30px;
        color: #000;
    }
    .article-date {
        display: block;
        font-size: 20px;
        color: #666;
    }

    .article-content {
        text-align: left;
        font-size: 20px;
        color: #001;
    }
    .empty-box {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
}

@media screen and (max-width:414px) {
    .article-container {
        padding: 10px 20px;
        .article-content {
            overflow: hidden;
        }
    }
}

@media screen and (min-width:415px) and (max-width:1099px) {
    .article-container {
        padding: 10px 20px;
        .article-content {
            overflow: hidden;
            img {
                width: 100%;
            }
        }
    }
}

@media screen and (min-width:1100px) {
    .article-container {
        padding: 10px 80px;
        .empty-box {
            height: 200px;
        }
    }
}
</style>
