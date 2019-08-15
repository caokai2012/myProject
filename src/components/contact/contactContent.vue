<template>
    <section class="main-container">
        <div class="contact-describle">
            <span>墙纸十大品牌，无缝墙布，提花壁布，刺绣墙布</span>
            <span>地址：{{address}}</span>
            <span>电话：{{tel}}</span>
            <img src="../../../static/img/location.jpg" alt="">
        </div>
        <div class="right-map">
            <div id="container"></div>
        </div>
    </section>
</template>
<script>
import global from 'assets/js/global'
export default {
    data() {
        return {
            address: global.address,
            tel: global.tel,
            brand: global.brand
        }
    },
    methods: {
        initMap() {
            // 构造地图对象的方法一：使用地图容器ID创建
            var map = new AMap.Map('container', {
                center: [120.41552, 30.116504],
                zoom: 11
            });
            // 构造地图对象的方法二：使用地图容器对象创建
            // var map = new AMap.Map(document.getElementById("container"));
            // 创建一个 Marker 实例：
            var marker = new AMap.Marker({
                position: new AMap.LngLat(120.41552, 30.116504),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: this.brand
            });
            // 将创建的点标记添加到已有的地图实例：
            marker.setTitle(this.brand);
            // 设置label标签
            marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                content: this.brand
            });
            map.add(marker);

        }
    },
    mounted() {
        this.initMap();
    }
}
</script>
<style lang="less" scoped>
@media screen and (max-width:767px) {
    .main-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        .contact-describle {
            text-align: center;
            display: flex;
            flex-direction: column;
            span {
                font-size: 20px;
                line-height: 40px;
                text-align: left;
                margin: 8px;
            }
            span:nth-child(1) {
                font-size: 30px;
                font-weight: bold;
                color: #006323;
                text-align: center;
            }
            img {
                width: 100%;
            }
        }
        .right-map {
            position: relative;
            margin-top: 5px;
            height: 600px;
            #container {
                position: absolute;
                left: 0;
                top: 0; // height: 400px;
                width: 100%;
            }
        }
    }
}

@media screen and (min-width:768px) {
    .main-container {
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        .contact-describle {
            flex: 1;
            text-align: left;
            display: flex;
            flex-direction: column;
            span:nth-child(1) {
                font-size: 30px;
                font-weight: bold;
                color: #006323;
            }
            span {
                font-size: 20px;
                line-height: 40px;
                margin: 8px;
            }
            img {
                width: 100%;
            }
        }
        .right-map {
            flex: 1;
            position: relative;
            margin-left: 5px;
            #container {
                position: absolute;
                right: 0;
                top: 0;
                width: 100%;
            }
        }
    }
}
</style>

