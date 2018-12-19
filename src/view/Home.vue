<template>
  <div>
    <el-carousel :interval="5000" type="card" height="200px">
      <el-carousel-item>
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
              <div class="box">
                <img :src="o.bookHeadImg" alt=""/>
              </div>
              <div style="padding: 14px;">
                <span v-on:click="jumpToBookdetail(o.id)">{{o.bookName}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{o.author}} 著</time>
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
          :current-page="currentPage"
          :total="totalEnum"
          @current-change="handleSizeChange"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="可借列表" name="second">
        <el-row :gutter="20">
          <el-col v-for="(o, index) in this.linkList" :key="o.id" style="padding-top: 10px;width: 157px">

            <el-card :body-style="{ padding: '0px' }">
              <div class="box">
                <img :src="o.bookHeadImg" alt=""/>
              </div>
              <div style="padding: 14px;">
                <span v-on:click="jumpToBookdetail(o.id)" >{{o.bookName}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{o.author}} 著</time>
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
          :current-page="currentPage"
          :total="totalEnum"
          @current-change="handleSizeChange"
        >
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
  }

  .time {
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

  .box {
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-radius: 4px 4px 0 0;
  }

  .box img {
    height: 100%;
    width: auto;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<script>
  import request from '@/utils/request'

  export function findAll(queryCondition) {
    return request({
      url: '/zuul/bookInfo/readAll?type=' +queryCondition.type+'&pageNum='+queryCondition.pageNum,
      headers: {
        'content-type': 'application/json'
      },
      method: 'post'
    })
  }

  export default {
    data() {
      return {
        currentPage:1,
        totalEnum:0,
        activeName: 'first',
        currentDate: 123,
        linkList: [],
        queryCondition:{
          type:'',
          pageNum:''
        }
      };
    },
    mounted() {
      this.queryCondition.type=0;
      this.queryCondition.pageNum=1;
      this.findByCondition(this.queryCondition)
    },
    methods: {
      handleSizeChange(val){
        this.queryCondition.pageNum=val
        this.findByCondition(this.queryCondition)
      },
      handleClick(tab, event) {
        if(tab.index==0){
          this.queryCondition.type=0
          this.queryCondition.pageNum=1
          this.findByCondition(this.queryCondition)
        }else if(tab.index==1){
          this.queryCondition.type=1
          this.queryCondition.pageNum=1
          this.findByCondition(this.queryCondition)
        }
      },
      jumpToBookdetail: function (id) {
        console.log(id)
        this.$router.push({path:'/bookdetail',query:{bookId:id}});
      },
      findByCondition(queryCondition){
        findAll(this.queryCondition).then(response => {
          this.linkList = response.list;
          this.totalEnum=response.endRow
        }).catch((err) => {
          console.log(err)
        });
      }
    }
  };
</script>
