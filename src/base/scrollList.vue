<template>
    <section class="list-container">
        <ul class="list">
            <li class="list-item" v-for="(item,index) in list" :href='item.title' :key='index'>
                <div class="img-container">
                    <img :src="item.img" alt="">

                </div>
            </li>
        </ul>
        <div class="list-left"></div>
        <div class="list-right"></div>
    </section>
</template>
<style lang="less" scoped>
@media screen and(min-width:767px) {
    .list-container {
        position: relative;
        margin: 0 auto;
        width: 1400px;
        .list {
            width: 1400px;
            height: 300px;
            overflow: hidden;
            list-style: none;
            .list-item {
                float: left;
                width: 400px;
                height: 300px;
                margin-left: 10px;
                .img-container {
                    img {
                        width: 500px;
                        height: 300px;
                    }
                }
                &::after {
                    content: '';
                    display: block;
                    clear: both;
                    visibility: hidden;
                }
            }
        }
        .list-left {
            content: '1111';
            display: block;
            position: absolute;
            width: 50px;
            height: 100px;
            top: 50%;
            left: 0px;
            transform: translateY(-50%);
            background: red;
        }
        .list-right {
            content: '1111';
            display: block;
            position: absolute;
            width: 50px;
            height: 100px;
            top: 50%;
            right: 0px;
            transform: translateY(-50%);
            background: red;
        }
    }
}

@media screen and (max-width:378px) {
    .list {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        overflow-y: hidden;
        overflow-x: scroll;
        .list-item {
            width: 100%;
            height: 300px;
            margin-left: 10px;
            img {
                width: 100%;
                height: 300px;
            }
            &::after {
                content: attr(href);
                display: inline-block;
                color: red;
            }
        }
    }
}
</style>
<script>
export default {
    data() {
        return {
            list: [
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531739021210.jpg',
                    title: 'Jack'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531722865717.jpg',
                    title: 'Jim'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531722922353.jpg',
                    title: 'Jet'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531739021210.jpg',
                    title: 'Tom'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531722865717.jpg',
                    title: 'Tim'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531722922353.jpg',
                    title: 'John'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531739021210.jpg',
                    title: 'Mike'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531722865717.jpg',
                    title: 'Silly'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531722922353.jpg',
                    title: 'Luccy'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531739021210.jpg',
                    title: 'Gucci'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531722865717.jpg',
                    title: 'Beckham'
                },
                {
                    img: 'http://39.108.151.206:3000/jeeweb-mybatis/upload/2018/07/16/1531722922353.jpg',
                    title: 'Nick'
                }
            ]
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>
