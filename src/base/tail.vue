<template>
    <section class="footer-info">
        <div class="footer-block">
            <router-link class="info-block" to='/about'>
                <span>关于我们</span>
            </router-link>
            <router-link class="info-block" to='/contact'>
                <span>联系我们</span>
            </router-link>
            <router-link class="info-block" to='/join'>
                <span>招商加盟</span>
            </router-link>
            <router-link class="info-block" to='/news'>
                <span>最新资讯</span>
            </router-link>
        </div>
        <div class="foot-bottom">
            <!-- <a href=""> -->
            <img src="//gw.alicdn.com/tfs/TB1GxwdSXXXXXa.aXXXXXXXXXXX-65-70.gif" style="width:20px;" alt="">
            <!-- </a> -->
            <!-- <a href=""> -->
            <img src="//img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" style="width:20px;" alt="">
            <!-- </a> -->
            <a href='http://www.miibeian.gov.cn' target="_blank">蜀ICP备19001237号</a>
            <span>地址：{{address}}</span>
            <span>联系电话：{{tel}}</span><br/>
            <span>{{copyRight}}</span>
        </div>
    </section>
</template>
<style lang="less" scoped>
.footer-info {
    background: #1a1c20 none repeat center top; // height: 100px;
    .footer-block {
        height: 50px;
        line-height: 50px; // padding: 20px auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        cursor: pointer;
        .info-block {
            color: #fff;
            margin-left: 5px;
            &::after {
                content: '|';
                display: inline-block;
                margin-left: 5px;
            }
            &:last-child::after {
                display: none;
            }
        }
    }
    .foot-bottom {
        transition: color .7s linear;
    }
    .foot-bottom:hover {
        filter: brightness(1.8);
        color: #f1fdd1;
    }
}
</style>
<script>
import global from 'assets/js/global'
export default {
    data() {
        return {
            address: global.address,
            tel: global.tel,
            copyRight: global.copyRight
        }
    }
}
</script>

