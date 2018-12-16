<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline" >
      <el-form-item label="图书书名">
        <el-input placeholder="书名" style="width: 200px" v-model="bookForm.bookName"></el-input>
      </el-form-item>
      <el-form-item label="图书作者">
        <el-input placeholder="作者" style="width: 200px" v-model="bookForm.author"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="地图取点">
        <span @click="showMap(true)">
        <el-input v-model="bookForm.address" style='width:200px' :readonly="true" placeholder="地图选点"></el-input></span>
        <el-input v-model="bookForm.addressJ" style='width:200px' type="hidden"></el-input>
        <el-input v-model="bookForm.addressW" style='width:200px' type="hidden"></el-input>
      </el-form-item>
      <br/>
      <el-form-item label="适合年龄">
        <el-select  placeholder="适合年龄" style="width: 200px" v-model="bookForm.suitableAge">
          <el-option label="儿童" value="shanghai"></el-option>
          <el-option label="青年" value="beijing"></el-option>
          <el-option label="成人" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图书类型">
        <el-select  placeholder="类型" style="width: 200px" v-model="bookForm.bookType">
          <el-option label="教科书" value="shanghai"></el-option>
          <el-option label="计算机" value="beijing"></el-option>
          <el-option label="小说" value="beijing"></el-option>
          <el-option label="散文" value="beijing"></el-option>
          <el-option label="诗歌" value="beijing"></el-option>
          <el-option label="工具类" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <br/>
      <el-form-item label="图书内容">
        <el-upload
          :file-list="bookPicList"
          action="/zuul/file/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload><el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      </el-form-item>
      <br/>
      <el-form-item label="图书介绍">
        <Tinymce ref="editor" :height="300" v-model="bookForm.bookConent" />
      </el-form-item>
      <br/>
      <el-form-item label=" " label-width="70px">
        <el-button type="primary" @click="saveBook">保存</el-button>
      </el-form-item>
      <br/>
      <div >

      </div>
    </el-form>

    <el-dialog  v-bind:title="bookForm.address"  :visible.sync="dialogVisible2">
      <div id="allmap2" ref="allmap2" style="height: 300px"></div>
    </el-dialog>
    <!--<div id="allmap2" ref="allmap2" style="height: 300px"></div>-->
  </div>
</template>

<script>
  import Tinymce from '../components/Tinymce'
  import request from '@/utils/request'
  import {getToken, setToken} from '../utils/auth'

  export function saveBook(form) {
    return request({
      url: '/zuul/bookInfo/addBook',
      headers: {
        'content-type': 'application/json'
      },
      method: 'post',
      data: form
    })
  }
  const defaultForm = {
    bookName: "",
    address: "",
    addressJ: "",
    addressW: "",
    author: "",
    picList:[],
    bookConent: "",
    bookType:"",
    suitableAge:""
  }
  export default {
    name: "BookEdit",

    mounted() {
      this.map()
    },
    components: {
      Tinymce
    },
    created() {
      var that = this
      this.bookForm = Object.assign({}, defaultForm)

    },
    data() {
      return {
        dialogImageUrl:'',
        bookPicList:[],
        dialogVisibleShow:false,
        dialogVisible2:false,
        dialogVisible: false,
        abc: "abc",
        bookForm: Object.assign({}, defaultForm)
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.bookPicList=fileList
      },
      saveBook:function(){
        // this.$router.push({ name: 'UserCenter', params: { activeLabel: 'first' }})
        console.log(this.bookPicList)
        this.bookForm.picList=[];
        for(var s in this.bookPicList){
          var pic={url:''}
          pic.url=this.bookPicList[s].url
          console.log(pic)
          this.bookForm.picList.push(pic)
        }
        console.log(this.bookForm)
        saveBook(this.bookForm).then(response => {
          console.log(response)
          if(response.restCode=='0000'){

          }
        }).catch((err) => {
          console.log(err)
        })
      },
      handleSuccess(response,file, fileList) {
        file.url=response.data
        this.bookPicList=fileList
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      showMap: function (e) {
        this.dialogVisible2 = true
        this.map()

      },
      changeAddress: function (e, address) {
        this.bookForm.address = address
        this.bookForm.addressJ = e.lng
        this.bookForm.addressJ = e.lat
      },

      map: function () {
        setTimeout(() => {
          var aaaa = this;
          var message = null;
          var map = new BMap.Map("allmap2"); // 创建Map实例
          var geoc = new BMap.Geocoder();
          map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);// 初始化地图,设置中心点坐标和地图级别
          map.addControl(new BMap.MapTypeControl({//添加地图类型控件
            mapTypes: [
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP
            ]
          }));

          function showInfo(e) {
            var pt = e.point;
            var p1 = new BMap.Point(pt.lng, pt.lat)
            var marker1 = new BMap.Marker(p1);
            map.clearOverlays();
            map.addOverlay(marker1);
            geoc.getLocation(pt, function (rs) {
              var addComp = rs.addressComponents;
              var address = (addComp.province + ", " + addComp.city + ", " + addComp.district);
              aaaa.changeAddress(pt, address);
            });
          }

          var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
          });
          map.enableScrollWheelZoom(true);
          map.addControl(navigationControl);
          map.addEventListener("click", showInfo);
        }, 100)

        // map.enableScrollWheelZoom(true);
        // enableGeolocation: true
      }
    },
  }

</script>

<style scoped>

</style>
