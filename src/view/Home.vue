<template>
  <div>
  <el-carousel :interval="5000" type="card" height="200px">
    <el-carousel-item >
      <div><img src="https://www.swapassn.com/upload2/chrome_2018-11-30_17-30-35.png" style="width: 100%"></div>
    </el-carousel-item>
    <el-carousel-item>
      <div><img src="https://www.swapassn.com/upload2/chrome_2018-11-30_17-32-45.png" style="width: 100%"></div>
    </el-carousel-item>
    <el-carousel-item>
      <div><img src="https://www.swapassn.com/upload2/chrome_2018-11-30_17-33-37.png" style="width: 100%"></div>
    </el-carousel-item>
  </el-carousel>

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="新书列表" name="first">
        <el-row :gutter="20">
          <el-col v-for="(o, index) in this.linkList" :key="o.id" style="padding-top: 10px;width: 157px">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3009903943,852000831&fm=26&gp=0.jpg" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">陈小夏普</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination
          center="true"
          style="margin-top: 12px;"
          background
          layout="prev, pager, next"
          :total="110">
        </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="可借列表" name="second">
      <el-row :gutter="20">
        <el-col v-for="(o, index) in this.linkList" :key="o.id" style="padding-top: 10px;width: 157px">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543574172161&di=d6c23b76656f473816faa3df8cf9e566&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Fthumb180%2F7fd664e1gw1f2vzgc31axg21e01uo143.gif" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">陈小夏普</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        center="true"
        style="margin-top: 12px;"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-tab-pane>

    <el-tab-pane label="分类查找" name="third" disabled></el-tab-pane>
  </el-tabs>

  </div>


</template>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .image {
    width: 100%;
    display: block;
  }  .time {
       font-size: 13px;
       color: #999;
     }
  .button {
    padding: 0;
    float: right;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        currentDate:123,
        linkList:[{
          id:1,
          name:"商会的书"
        },{
          id:2,
          name:"商会的书"
        },{
          id:3,
          name:"商会的书"
        },{
          id:4,
          name:"商会的书"
        },{
          id:5,
          name:"商会的书"
        },{
          id:6,
          name:"商会的书"
        },{
          id:7,
          name:"商会的书"
        },{
          id:8,
          name:"商会的书"
        },{
          id:9,
          name:"商会的书"
        },{
          id:11,
          name:"商会的书"
        },{
          id:12,
          name:"商会的书"
        },{
          id:13,
          name:"商会的书"
        },{
          id:14,
          name:"商会的书"
        },{
          id:15,
          name:"商会的书"
        },{
          id:16,
          name:"商会的书"
        }]
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
