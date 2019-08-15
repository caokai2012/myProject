import axios from '../utils/axios'

// const baseUrl = 'http://39.108.151.206:3000/company';
const baseUrl = 'http://182.61.33.203:3000/company';
export  const request = {
    clientInfo:param => {
        return axios.get(`${baseUrl}/insertContact`,param)
    },
    // 首页
    home:{
        // 工程区域
        options:() => {
            return axios.get(`${baseUrl}/options`)
        },
         // 产品类型
        type:() => {
            return axios.get(`${baseUrl}/product/type`)
        },
         // 轮播图
        getCarousel:() => {
            return axios.get(`${baseUrl}/getCarousel`)
        },
        //  倾听客户的需求
        getIndex:() => {
            return axios.get(`${baseUrl}/getIndex`)
        }
    },
    // 专卖店形象
    shop:{
          // 专卖店列表
        agency:param => {
            return axios.get(`${baseUrl}/agency`,param)
        },
          // 专卖店详情
        agencyInfo:param => {
            return axios.get(`${baseUrl}/agencyInfo`,param)
        }
    },
    // 加入我们
    join:{
        // 招商加盟
        getInvest:() => {
            return axios.get(`${baseUrl}/getInvest`)
        }
    },
    // 关于我们
    about:{
        // 公司简介
        introduction:() => {
            return axios.get(`${baseUrl}/introduction/get`)
        },
        // 资质荣誉
        getHonor:param => {
            return axios.get(`${baseUrl}/getHonor`,param)
        }
    },
    // 最新资讯
    news:{
        // 最新资讯
        company:{
            // 企业新闻-新闻列表
            news:param => {
                return axios.get(`${baseUrl}/news`, param)
            },
            // 新闻详情
            newsInfo:param => {
                return axios.get(`${baseUrl}/newsInfo`, param)
            }
        }
    },
    // 工程业绩
    projects:{
         // 工程列表
        projectList:param => {
            return axios.get(`${baseUrl}/projectList`, param)
        },
         // 工程列表
        projectInfo:param => {
            return axios.get(`${baseUrl}/projectInfo`, param)
        }
    },
    // 产品中心
    products:{
         // 产品
        list:param => {
            return axios.get(`${baseUrl}/product/list`,param)
        }
    },
    // 知识园地
    knowledge:{
        // 知识园地类型
        knowledgeType:param => {
            return axios.get(`${baseUrl}/knowledgeType`,param)
        },
        // 知识园地类型
        knowledgeInfo:param => {
            return axios.get(`${baseUrl}/knowledgeInfo`,param)
        }
    }
}