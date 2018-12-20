<template>
  <div v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="9">
        <div>
          <div class="block">
            <!--<span class="demonstration">默认 Hover 指示器触发</span>-->
            <el-carousel height="300px" indicator-position="none">
              <el-carousel-item v-for="(o, index) in bookData.picList" :key="o.url">
                <div class="box">
                  <img :src="o.url"/></div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div>
          <h3>{{bookData.bookName}}
            <el-rate
              v-model="(this.bookData.starNum==0||this.bookData.starNum==null)?0:(this.bookData.star/this.bookData.starNum).toFixed(1)"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}星">
            </el-rate>
          </h3>
          <b>作者：</b><span>{{bookData.author}}</span><br/>
          <b>主人：</b><span>{{bookData.bookOwner}}</span><br/>
          <b>类别：</b><span>{{bookData.bookType}}</span><br/>
          <b>适合年龄：</b><span>{{bookData.suitableAge}}</span><br/>
          <b>现在位置：</b><span>{{bookData.address}}</span><br/>
          <el-button type="text" size="big" icon="el-icon-star-off">收藏({{bookData.collectionNum}})</el-button>
          <el-button type="text" icon="el-icon-edit" @click="dialogFormVisible2 = true">书评({{bookData.starNum}})</el-button>
          <p>
            <el-button type="primary" size="small" @click="showReply">借阅</el-button>
          </p>
          <br/>
        </div>
      </el-col>
    </el-row>
    <div style="margin:2px 0px;">
      <fieldset style="border-top: 1px dashed lightgray;border-bottom: none;border-left: none;border-right: none">
        <legend><h5>【简介】</h5></legend><show-more style="margin-top: 10px" :showHeight="showHeight" :content="bookData.bookConent"></show-more>
      </fieldset>


    </div>
    <div style="margin:2px 0px;">
      <fieldset style="border-top: 1px dashed lightgray;border-bottom: none;border-left: none;border-right: none">
        <legend>  <h5>【轨迹】</h5></legend>
        <div id="allmap" ref="allmap" style="height: 300px"></div>
      </fieldset>


    </div>
    <div style="margin:2px 0px;">
      <fieldset style="border-top: 1px dashed lightgray;border-bottom: none;border-left: none;border-right: none">
        <legend>   <h5>【书评】</h5></legend>

        <comment :comments="replyData"></comment>
      </fieldset>

    </div>
    <el-dialog title="评论" :visible.sync="dialogFormVisible2">

      <el-rate
        v-model="replyForm.star"
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate><br/>
      <div><Tinymce ref="editor" :height="400" v-model="replyForm.content" v-if="dialogFormVisible2"/></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false" >取 消</el-button>
        <el-button type="primary" @click="sendRootReply">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import * as CommentData from '../mock/mockdata'
  import comment from '../components/comment'
  import Tinymce from '../components/Tinymce'

  import showMore from '../components/ShowMore'
  import request from '@/utils/request'

  export function getBookDetail(id) {
    return request({
      url: '/zuul/bookInfo/getBookDetail?id='+id,
      headers: {
        'content-type': 'application/json'
      },
      method: 'post'
    })
  }
  export function getBookReply(queryCondition) {
    return request({
      url: '/zuul/bookReply/readAll?pageNum='+queryCondition.pageNum+'&bookId='+queryCondition.bookId,
      headers: {
        'content-type': 'application/json'
      },
      method: 'post'
    })
  }
  export function addReplyRequest(form) {
    return request({
      url: '/zuul/bookReply/saveReply',
      headers: {
        'content-type': 'application/json'
      },
      method: 'post',
      data:form
    })
  }
  export default {
    created(){
      this.commentData = CommentData.comment.data;
      this.bookId=this.$route.query.bookId;
    },
    mounted (){
      this.map()
      this.bookId=this.$route.query.bookId;
      getBookDetail(parseInt(this.bookId)).then(response=>{
        this.bookData=response
       }).catch(error=>{console.log(error)})
      this.queryCondition.pageNum=1
      this.queryCondition.bookId=this.bookId
      this.shuaxinReply()
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
      },
      showReply(){
        console.log(this.replyData)
        console.log( CommentData.comment.data)

      },
      sendRootReply(){
        var aaa=this
          this.replyForm.bookId=this.bookId
          this.replyForm.parentId=0
          addReplyRequest(this.replyForm).then(response=>{
            this.replyData=response
            console.log(this.replyData)
            this.replyForm.star=4
            this.replyForm.content=''
            this.dialogFormVisible2=false
            this.shuaxinReply()
          }).catch(err=>{console.log(err)})
      },
      shuaxinReply(){
        getBookReply(this.queryCondition).then(res=>{
          this.replyData=res.list
          // this.replyData.push(this.reply)
          this.loading=false
        }).catch(err=>{console.log(err)})
      }
    },
    name: "BookDetail",
    data() {
      return {
        queryCondition:{
          pageNum:'',
          bookId:''
        },
        bookId:'',
        dialogFormVisible2:false,
        replyData: [],
        loading: true,
        replyForm:{
          parentId:'',
          bookId:'',
          acceptId:'',
          acceptName:'',
          content:'',
          star:4
        },
        starNum:null,
        bookData:{
          picList:null,
          bookConent:null,
          author:null,
          bookOwner:null,
          star:null,
          starNum:null,
          bookType:null,
          suitableAge:null,
          address:null,
          bookConent:null,
          collectionNum:null
        },
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
  .box {
    width: 100%;
    height: 290px;
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
