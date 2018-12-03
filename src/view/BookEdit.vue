<template>
  <div>
    <el-alert
      title="为了方便您的图书被人找到，请尽量完善自己的个人信息。在这个平台里，您的个人信息不会被滥用，
            只会对有意向借书并付出书币的用户获取到，同一时间最多只有一个用户能获取到您的联系方式。"
      type="success">
    </el-alert>
    <br/>
    <span @click="showMap(true)">ss</span>
    <el-form :model="bookForm"  label-width="100px">
      <el-form-item label="书名：" prop="username">
        <el-input v-model="bookForm.bookName" style='width:200px'></el-input>
      </el-form-item>
      <el-form-item label="地图取点：" >
        <el-input v-model="bookForm.address" style='width:200px' :readonly="true" ></el-input>
        <el-input v-model="bookForm.addressJ" style='width:200px' type="hidden"></el-input>
        <el-input v-model="bookForm.addressW" style='width:200px' type="hidden"></el-input>

      </el-form-item>
      <el-form-item label="作者：" prop="phoneNum">
        <el-input v-model="bookForm.author" style='width:200px'></el-input>
      </el-form-item>
      <el-form-item label="封面：">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card" >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="内页图：">
        <el-input v-model="bookForm.innerPic" style='width:200px'></el-input>
      </el-form-item>
      <el-form-item label="简介：" prop="userImg">
        <div>
          <Tinymce ref="editor" :height="400"/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button type="warning">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <div id="allmap2" ref="allmap2" style="height: 300px"></div>
    </el-dialog>
    <!--<div id="allmap2" ref="allmap2" style="height: 300px"></div>-->
  </div>
</template>

<script>
  import Tinymce from '../components/Tinymce'

  const defaultForm = {
    bookName: "",
    address: "",
    addressJ: "",
    addressW: "",
    author: "",
    headPic: "",
    innerPic: "",
    describe: ""
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
        dialogVisible:false,
        abc:"abc",
        bookForm: Object.assign({}, defaultForm)
      }
    },
    methods: {
      showMap:function(e){
        debugger
        alert(e)
        this.dialogVisible=true
        this.map()
        if(e) {
          this.showMap(false)
        }
      },
      changeAddress:function(e,address) {
        this.bookForm.address=address
        this.bookForm.addressJ=e.lng
        this.bookForm.addressJ=e.lat
      },

      map: function () {
        var aaaa=this;
        var message = null;
        let map = new BMap.Map("allmap2"); // 创建Map实例
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
          geoc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;
            var address= (addComp.province + ", " + addComp.city + ", " + addComp.district);
            aaaa.changeAddress(pt,address);
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
        map.addControl(navigationControl);
        map.addEventListener("click", showInfo);
        // map.enableScrollWheelZoom(true);
        // enableGeolocation: true
      }
    },
  }

</script>

<style scoped>

</style>
