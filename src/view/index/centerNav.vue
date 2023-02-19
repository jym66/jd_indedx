<template>
  <div v-if="!bannerImgList.length>0" v-loading="true" v-loading.fullscreen.lock="true" element-loading-text="正在努力获取数据,请稍后"> 666</div>

  <div class="wrapper w">
    <div class="fl inner1" ref="sideNav" @mouseleave="mouseleave">
      <ul>
        <li class="centerMenuItem" v-for="item in items" :key="item" @mousemove="mousemove(item.id)">
          <a href="javascript:void(0)" v-for="(content,index) in item.title" :key=content>{{ content }}
            <span v-if="index !== item.title.length-1">/</span>
          </a>
        </li>
      </ul>
      <div class="centerPopMenu" ref="centerPopMenu" v-for="item in items" :key="item"
           v-show="this.popMenuShow && currentItem === item.id">
        <div class="part_col1">
          <div class="channel" v-for="i in item.centerPopMenuNavTags" :key="i">
            <div>
              <a href="#">{{ i }}</a>
              <i class="iconfont icon-jiantouyou"></i>
            </div>
          </div>
        </div>
        <div class="part_col2">
          <dl v-for="centerPopMenuNavItemsTitle in item.centerPopMenuNavItemsTitle" :key="centerPopMenuNavItemsTitle">
            <dt>
              <a href="javascript:void(0)">{{ centerPopMenuNavItemsTitle.title }}</a>
              <i class="iconfont icon-jiantouyou"></i>
            </dt>
            <dd>
              <a href="javascript:void(0)"
                 v-for="centerPopMenuNavItem in item.centerPopMenuNavItems[centerPopMenuNavItemsTitle.item]"
                 :key="centerPopMenuNavItem">{{ centerPopMenuNavItem }}</a>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class=" fl bannerWrapper">
      <div class="banner">
        <el-carousel v-if="bannerImgList.length>0" indicator-position="none" height="480px">
          <el-carousel-item v-for="(item,index) in bannerImgList" :key="index">
            <a href="javascript:void(0)"><img :src=item.imgUrl></a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--      <div class="banner2Wrapper">-->
      <!--        <div class="carousel_wrapper">-->
      <!--          <el-carousel indicator-position="none" height="480px">-->
      <!--            <el-carousel-item v-for="i in slid_recommend_banner_img" :key="i">-->
      <!--              <div class="banner2">-->
      <!--                <div class="item_recommend" v-for="img in i" :key="img">-->
      <!--                  <a href="javascript:void(0)">-->
      <!--                    <img :src=img class="slid_recommend_img">-->
      <!--                  </a>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </el-carousel-item>-->
      <!--          </el-carousel>-->
      <!--        </div>-->
      <!--      </div>-->

    </div>
    <div class="fl login_inner">
      <div class="user">
        <div class="user_inner">
          <div class="user_avatar">
            <el-avatar :size="40"><img src="../../assets/img/avatar.png" alt=""></el-avatar>
          </div>
          <div class="user_show">
            <a href="javascript:void(0)">Hi~欢迎逛飞燕！</a>
<!--            <p>-->
<!--              <router-link to="/login">登录</router-link>-->
<!--              <span>&nbsp;|&nbsp;</span>-->
<!--              <a href="javascript:void(0)">注册</a>-->
<!--            </p>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import {indexImg} from "@/util/api";

export default {
  setup() {
    let popMenuShow = ref(false)
    let currentItem = ref(0)
    let vm = getCurrentInstance()
    let bannerImgList = ref([])
    let slid_recommend_banner_img = ref([
      [
        'https://img14.360buyimg.com/babel/s380x300_jfs/t1/204751/7/10041/85038/6188be9cEdf40510d/264f1db0d3def6e5.jpg.webp',
        'https://img10.360buyimg.com/babel/s380x300_jfs/t1/160214/12/27896/73609/6188c030E8bfbe8d1/b7c2be05e9a3d6f6.jpg.webp',
        'https://img11.360buyimg.com/pop/s380x300_jfs/t1/115071/9/2508/53608/5ea271d4E12544976/cdcb4dc2226af61f.png.webp'
      ],
      [
        'https://img14.360buyimg.com/babel/s380x300_jfs/t1/204751/7/10041/85038/6188be9cEdf40510d/264f1db0d3def6e5.jpg.webp',
        'https://img10.360buyimg.com/babel/s380x300_jfs/t1/160214/12/27896/73609/6188c030E8bfbe8d1/b7c2be05e9a3d6f6.jpg.webp',
        'https://img11.360buyimg.com/babel/s380x300_jfs/t1/205641/15/14564/63720/618894c8E31d1161b/9eec14fd34d9ac8a.png.webp'
      ],
      [
        'https://img14.360buyimg.com/babel/s380x300_jfs/t1/204751/7/10041/85038/6188be9cEdf40510d/264f1db0d3def6e5.jpg.webp',
        'https://img10.360buyimg.com/babel/s380x300_jfs/t1/160214/12/27896/73609/6188c030E8bfbe8d1/b7c2be05e9a3d6f6.jpg.webp',
        'https://img11.360buyimg.com/babel/s380x300_jfs/t1/205641/15/14564/63720/618894c8E31d1161b/9eec14fd34d9ac8a.png.webp'
      ],
      [
        'https://img14.360buyimg.com/babel/s380x300_jfs/t1/204751/7/10041/85038/6188be9cEdf40510d/264f1db0d3def6e5.jpg.webp',
        'https://img10.360buyimg.com/babel/s380x300_jfs/t1/160214/12/27896/73609/6188c030E8bfbe8d1/b7c2be05e9a3d6f6.jpg.webp',
        'https://img11.360buyimg.com/babel/s380x300_jfs/t1/205641/15/14564/63720/618894c8E31d1161b/9eec14fd34d9ac8a.png.webp'
      ]
    ])
    let items = reactive([
      {
        id: 1,
        title: ['家用电器'],
        centerPopMenuNavTags: ['家电馆', '家电专卖店', '家电服务', '企业采购', '商用电器', '高价回收'],
        centerPopMenuNavItemsTitle: [
          {item: 0, title: '电视',},
          {item: 1, title: '空调'},
          {item: 2, title: '洗衣机'},
          {item: 3, title: '冰箱'},
          {item: 4, title: '厨卫大电'},
          {item: 5, title: '厨房小电'},
          {item: 6, title: '生活电器'},
          {item: 7, title: '个护健康'},
          {item: 8, title: '视听影音'},
        ],
        centerPopMenuNavItems: [
          ['全面屏电视', '教育电视', 'OLED电视', '智慧屏', '4K超清电视', '55英寸', '65英寸'],
          ['新风空调', '以旧换新', '空调挂机', '空调柜机', '新一级能效', '挂机1.5匹', '柜机3匹', '变频空调', '中央空调', '移动空调'],
          ['滚筒洗衣机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'],
          ['手机', '洗烘一体机', '波轮洗衣机', '洗烘套装', '迷你洗衣机', '洗衣机配件', '烘干机'],
          ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'],
          ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'],
          ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'],
          ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'],
          ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'],
        ]
      },
      {
        id: 2,
        title: ['手机', '运营商', '数码'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 3,
        title: ['电脑', '办公', '数码'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 4,
        title: ['家居', '家具', '家装', '厨具'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 5,
        title: ['男装', '女装', '童装', '内衣'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 6,
        title: ['美妆', '个护清洁', '宠物'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 7,
        title: ['女鞋', '箱包', '钟表', '珠宝'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 8,
        title: ['男鞋', '运动', '户外'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 9,
        title: ['房产', '汽车', '汽车用品'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 10,
        title: ['母婴', '玩具乐器'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 11,
        title: ['食品', '酒类', '生鲜', '特产'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 12,
        title: ['艺术', '礼品鲜花', '农资绿植'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 13,
        title: ['图书', '文娱', '教育', '电子书'],
        centerPopMenuNavTags: ['清洁用品', '美妆商城', '美妆馆', '妆比社', '全球购美妆', '宠物馆'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 14,
        title: ['机票', '酒店', '旅游', '生活'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
      {
        id: 15,
        title: ['工业品'],
        centerPopMenuNavItemsTitle: [{title: '电视', item: 0}, {title: '电视', item: 1}, {item: 2, title: '电视'}, {
          item: 3,
          title: '电视'
        }, {item: 4, title: '电视'}],
        centerPopMenuNavItems: [['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新'], ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '对讲机', '以旧换新']]
      },
    ])
    const mousemove = (index) => {
      currentItem.value = index
      if (!popMenuShow.value) {
        for (let i = 0; i < vm.ctx.$refs.centerPopMenu.length; i++) {
          vm.ctx.$refs.centerPopMenu[i].style.left = vm.ctx.$refs.sideNav.offsetLeft + vm.ctx.$refs.sideNav.offsetWidth - 9 + 'px'
          vm.ctx.$refs.centerPopMenu[i].style.height = vm.ctx.$refs.sideNav.offsetHeight - 30 + 'px'
          vm.ctx.$refs.centerPopMenu[i].style.width = 818 + 'px'
        }
        popMenuShow.value = !popMenuShow.value
      }
    }
    const mouseleave = () => {
      if (popMenuShow.value) {
        popMenuShow.value = !popMenuShow.value
      }
    }
    onMounted(() => {
      indexImg().then((response) => {
        bannerImgList.value = response.data
      })
    })
    return {popMenuShow, currentItem, bannerImgList, items, mousemove, mouseleave, slid_recommend_banner_img}
  },
}
</script>

<style scoped>
.wrapper {
  height: 480px;
  display: flex;
  justify-content: center;
}

.inner1 {
  display: flex;
  width: 20%;
  /*width: 190px;*/
  height: 480px;
  margin-top: 10px;
}

.inner1 ul {
  text-align: left;
}

.inner1 ul li {
  padding-top: 7px;
}

.centerMenuItem {
  padding-left: 14px;
  overflow: hidden;
  font-size: 14px;
  height: 25px;
  line-height: 25px;
  background-color: #fefefe;

}

.centerPopMenu {
  position: absolute;
  padding: 20px 0 10px 0;
  border: 1px solid #f7f7f7;
  background-color: #fff;
  box-shadow: 2px 0 5px rgb(0 0 0 / 30%);
  z-index: 10;
  overflow: hidden;
}

.centerMenuItem a span {
  padding: 0 2px;
  font-size: 12px
}

.part_col1 {
  display: flex;
  justify-content: space-around;
}


.banner {
  margin-top: 10px;
  width: 100%;
  height: 480px;
  /*margin-left: 15px;*/
}

.banner img {
  width: 100%;
  height: 100%;
}

.login_inner {
  width: 20%;
  height: 480px;
  background-color: #fefefe;
  margin-top: 10px;
  margin-left: 10px;
}

.user_inner {
  margin-top: 13px;
  display: flex;
  justify-content: center;
}

.user_avatar {
  margin-right: 10px;
}

.user_show {
  margin-left: 10px;
}

.channel div {
  margin-right: 10px;
  padding: 0 10px;
  height: 24px;
  background-color: #333;
  line-height: 24px;
  color: #fff;
}


.channel div a {
  color: #fff;
}

.part_col1 {
  margin-bottom: 20px;
  padding-left: 24px;
  line-height: 24px;
}

.part_col2 dl {
  display: flex;
  padding-bottom: 10px;
}

.part_col2 dl dt {
  left: 0;
  width: 70px;
  text-align: right;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 10px 0 0 25px
}


.part_col2 dl dt a {
  color: #333;
  font-weight: 700;
  text-align: right;
}

.part_col2 dl dd {
  width: 700px;
  padding: 10px 10px 1px 15px;
}

.part_col2 dl dd a {
  float: left;
  padding: 0 0 0 10px;
  line-height: 20px;
}

.icon-jiantouyou {
  font-size: 8px;
  padding-left: 4px;
}

.channel div:hover {
  background-color: red;
}

.bannerWrapper {
  display: flex;
  width: 1000px;
}

.banner2Wrapper {
  width: 190px;
  margin-top: 10px;
  height: 480px;
  margin-left: 10px;
}

.item_recommend {
  overflow: hidden;
  width: 190px;
  height: 150px;
  margin-bottom: 15px;
}

.item_recommend a img {
  width: 190px;
  height: 150px;
}

</style>
