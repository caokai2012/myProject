<template>
    <Affix style="z-index:9999;">
        <!-- 导航栏 -->
        <Menu mode="horizontal" :theme="theme" @on-select='enterPro' active-name="home">
            <div v-if="isGiantScreen">
                <MenuItem name="home">
                <Icon type="home"></Icon>
                <span class="menu-title">首页</span>
                </MenuItem>
                <MenuItem name="shop">
                <Icon type="ribbon-a"></Icon>
                <span class="menu-title">专卖店形象</span>
                </MenuItem>
                <MenuItem name="join">
                <Icon type="fireball"></Icon>
                <span class="menu-title">招商加盟</span>
                </MenuItem>
                <MenuItem name="about">
                <Icon type="ios-people"></Icon>
                <span class="menu-title">关于我们</span>
                </MenuItem>
                <MenuItem name="contact">
                <Icon type="ios-telephone"></Icon>
                <span class="menu-title">联系我们</span>
                </MenuItem>
                <MenuItem name="news">
                <Icon type="social-twitter"></Icon>
                <span class="menu-title">最新资讯</span>
                </MenuItem>
            </div>
            <MenuItem v-else :name="singleOption" class="right-select">
            <Dropdown @on-click='tellMe' trigger='hover'>
                <a href="javascript:void(0)">
                    下拉
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name='home'>
                        <Icon type="home"></Icon>
                        首页
                    </DropdownItem>
                    <DropdownItem name='shop'>
                        <Icon type="ribbon-a"></Icon>
                        专卖店形象
                    </DropdownItem>
                    <DropdownItem name='join'>
                        <Icon type="fireball"></Icon>
                        招商加盟
                    </DropdownItem>
                    <DropdownItem name='contact'>
                        <Icon type="ios-telephone"></Icon>
                        联系我们
                    </DropdownItem>
                    <DropdownItem name='about'>
                        <Icon type="ios-people"></Icon>
                        关于我们</span>
                    </DropdownItem>
                    <DropdownItem name='news'>
                        <Icon type="social-twitter"></Icon>
                        最新资讯
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </MenuItem>

            <Submenu name="achievement">
                <template slot="title">
                    <Icon type="social-buffer"></Icon>
                    <span class="menu-title">工程业绩</span>
                </template>
                <MenuGroup title="区域">
                    <MenuItem :name="item.name" v-for="(item,index) in projects" :key="index">{{item.label}}</MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu name="product">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    <span class="menu-title">产品中心</span>
                </template>
                <MenuGroup title="类别">
                    <MenuItem :name="item.name" v-for="(item,index) in productCenter" :key="index">{{item.label}}</MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu name="about">
                <template slot="title">
                    <Icon type="university"></Icon>
                    <span class="menu-title">知识园地</span>
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="knowledge/product">产品知识</MenuItem>
                    <MenuItem name="knowledge/QA">问题解答</MenuItem>
                    <MenuItem name="knowledge/method">施工方法</MenuItem>
                </MenuGroup>
            </Submenu>

        </Menu>
    </Affix>
</template>
<style lang="less" scoped>
.menu-title {
    font-size: 20px;
}

.right-select {
    position: absolute;
    right: -10px;
    top: 0px;
    margin-left: 2px;
    a {
        color: #000;
    }
}
</style>
<script>
import { Navs } from 'assets/js/mixin'
export default {
    mixins: [Navs],
    data() {
        return {
            theme: 'light',
            singleOption: '',
            isGiantScreen: false
            // projects: []
        }
    },
    methods: {
        // 获取产品中心二级菜单
        getProducts() {
            this.$http.home.type().then(res => {
                let { success, data, msg } = res;
                if (success) {
                    // console.log(res);
                    if (data.length) {
                        let productCenter = data.map(item => {
                            return {
                                label: item.label,
                                name: `product/${item.id}`,
                                value: item.id
                            }
                        })
                        // item.id 就是该选项的 category
                        this.SET_PRO_CENTER(productCenter);
                    } else {
                        this.$Message.warning('产品分类暂无数据');
                    }
                } else {
                    this.$Message.warning('获取产品分类失败,原因：' + msg);
                }
            })
        },
        // 跳转路由
        enterPro(item) {
            let arr = item.split('/');
            if (arr.length === 1) {
                this.$router.replace({
                    path: `/${item}`
                });
            } else {
                if (arr[0] === 'product') {
                    // 设置当前选中的产品分类
                    this.SET_CURRENT_PRODUCT(arr[1]);
                } else if (arr[0] === 'project') {
                    // 设置当前选中的工程分类
                    this.SET_CURRENT_PROJECT(arr[1]);
                } else if (arr[0] === 'knowledge') {
                    // 设置当前选中的知识类型分类
                    this.SET_CURRENT_KNOWLEDGE(arr[1]);
                }
                this.$router.replace({
                    name: arr[0],
                    params: {
                        id: arr[1]
                    }
                })
            }
        },
        // 获取工程业绩的耳机菜单
        getProjects() {
            this.$http.home.options().then(res => {
                let { success, data, msg } = res;
                if (success) {
                    if (data.length) {
                        let projects = data.map(item => {
                            return {
                                label: item.area,
                                value: item.id,
                                name: `project/${item.id}`
                            }
                        });
                        // item.id 就是该选项的 category
                        this.SET_PROJECTS(projects);
                    }
                } else {
                    this.$Message.warning('获取工程业绩菜单失败');
                }
            })
        },
        getKnowledges() {
            let knowledges = [
                {
                    label: '产品知识',
                    value: 'product',
                    name: 'knowledge/product'
                },
                {
                    label: '问题解答',
                    value: 'QA',
                    name: 'knowledge/QA'
                },
                {
                    label: '施工方法',
                    value: 'method',
                    name: 'knowledge/method'
                }
            ];
            this.SET_KNOWLEDGES(knowledges);
        },
        tellMe(name) {
            this.enterPro(name);
        }
    },
    mounted() {
        let w = document.documentElement.clientWidth;
        w <= 768 ? this.isGiantScreen = false : this.isGiantScreen = true;
        this.getProducts();
        this.getProjects();
        this.getKnowledges();
    }
}
</script>
