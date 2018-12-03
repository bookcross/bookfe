<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="9">
        <div>
          <div class="block">
            <!--<span class="demonstration">默认 Hover 指示器触发</span>-->
            <el-carousel height="300px" indicator-position="none">
              <el-carousel-item v-for="item in 5" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div>
          <h3>鲁宾逊漂流记
            <el-rate
              v-model="value5"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </h3>
          <b>作者：</b><span>笛福</span><br/>
          <b>主人：</b><span>王小明</span><br/>
          <b>类别：</b><span>励志</span><br/>
          <b>适合年龄：</b><span>成人</span><br/>
          <b>现在位置：</b><span>湖北省武汉市</span><br/>
          <el-button type="text" size="big" icon="el-icon-star-off">收藏(41)</el-button>
          <el-button type="text" icon="el-icon-edit" @click="dialogFormVisible = true">书评(22)</el-button>
          <p>
            <el-button type="primary" size="small">借阅</el-button>
          </p>
          <br/>
        </div>
      </el-col>
    </el-row>
    <div style="margin:2px 0px;">
      <h4>简介：</h4>
      <show-more style="margin-top: 20px" :showHeight="showHeight" :content="contentTxt"></show-more>
    </div>
    <div style="margin:2px 0px;">
      <h4>漂流动态：</h4>
      <div id="allmap" ref="allmap" style="height: 300px"></div>
    </div>
    <div style="margin:2px 0px;">
      <h4>书评：</h4>
      <comment :comments="commentData"></comment>
    </div>
    <el-dialog title="评论" :visible.sync="dialogFormVisible">
      <div><Tinymce ref="editor" :height="400"/></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import * as CommentData from '../mock/mockdata'
  import comment from '../components/comment'
  import Tinymce from '../components/Tinymce'

  import showMore from '../components/ShowMore'
  export default {
    created(){
      this.commentData = CommentData.comment.data;
    },
    mounted (){
      this.map()
    },
    components: {
      showMore,
      comment,Tinymce
    },
    methods:{
      map(){
//         var map = new BMap.Map(this.$refs.allmap);
// // 创建地图实例
//         var point = new BMap.Point(116.404, 39.915);
// // 创建点坐标
//         map.centerAndZoom(point, 15);
        let map =new BMap.Map(this.$refs.allmap); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);// 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl({//添加地图类型控件
          mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
          ]}));
        map.setCurrentCity("北京");// 设置地图显示的城市 此项是必须设置的
        // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        var polyline = new BMap.Polyline([
            new BMap.Point(116.488, 39.920),
            new BMap.Point(118.499, 34.920),
            new BMap.Point(111.488, 31.920),
          ],
          {strokeColor:"black", strokeWeight:3, strokeOpacity:0.9}
        );
        var p1=new BMap.Point(116.488, 39.920)
        var p2=new BMap.Point(118.499, 34.920)
        var p3=new BMap.Point(111.488, 31.920)
        var marker1 = new BMap.Marker(p1);
        var marker2 = new BMap.Marker(p2);
        var marker3 = new BMap.Marker(p3);
        map.addOverlay(marker1);
        map.addOverlay(marker2);
        map.addOverlay(marker3);
        map.addOverlay(polyline);
      }
    },
    name: "BookDetail",
    data() {
      return {
        dialogFormVisible:false,
        commentData: [],
        value5: 4.5,
        contentTxt: "注意：该项目目前使用element-ui@1.4.2版本，所以最低兼容 Vue 2.3.0\n" +
          "\n" +
          "楼主这里有一份调查问卷 有空请填写一下，以表对本项目的支持~ps:不是给这个调查问卷网站做广告，所以填完问卷不用点上面抽奖有的没的那些东西\n" +
          "前言\n" +
          "\n" +
          "    这半年来一直在用vue写管理后台，目前后台已经有百来个页面，十几种权限，但维护成本依然很低，所以准备开源分享一下后台开发的经验和成果。目前的技术栈主要的采用vue+element+axios由webpack2打包。由于是个人项目，所以数据请求都是用了mockjs模拟。注意：在此项目基础上改造开发时请移除mock文件。\n" +
          "\n" +
          "写了一个系列的教程配套文章，如何从零构建后一个完整的后台项目:\n" +
          "\n" +
          "    wiki\n" +
          "    手摸手，带你用 vue 撸后台 系列一(基础篇)\n" +
          "    手摸手，带你用 vue 撸后台 系列二(登录权限篇)\n" +
          "    手摸手，带你用 vue 撸后台 系列三 (实战篇)\n" +
          "    手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)\n" +
          "\n" +
          "    手摸手，带你封装一个vue component\n" +
          "\n" +
          "    相应需求，开了一个qq群 591724180 方便大家交流\n" +
          "\n" +
          "    或者可以加入该 圈子 讨论问题\n" +
          "\n" +
          "    如有问题请先看上述文章和Wiki，若不能满足，欢迎 issue 和 pr\n" +
          "\n" +
          "    该项目并不是一个脚手架，更倾向于是一个集成解决方案\n" +
          "\n" +
          "    该项目不支持低版本游览器(如ie)，有需求请自行添加polyfil",
        showHeight: 100
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
