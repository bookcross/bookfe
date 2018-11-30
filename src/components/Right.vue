<template>
  <div>
    <el-card class="box-card" style="width: 100%;box-shadow: none;">
      <div slot="header" class="clearfix">
        <span>最新公告</span>
        <el-button style="float: right; padding: 3px 0" type="text">查看所有</el-button>
      </div>
      <div v-for="o in this.tableData" :key="o" class="text item" style="font-size: small;color: #666">
        <span>{{o.date}} &nbsp;<b>{{o.address}}</b></span>
      </div>
    </el-card>
    <div style="height: 20px"></div>
    <el-card class="box-card" style="width: 100%;box-shadow: none;">
      <div slot="header" class="clearfix">
        <span>漂流动态</span>
        <el-button style="float: right; padding: 3px 0" type="text">查看所有</el-button>
      </div>
      <div v-for="o in this.tableData" :key="o" class="text item" style="font-size: small;font-size: small;color: #666">
        <span>{{o.date}} &nbsp;<b>{{o.address}}</b></span>
      </div>
    </el-card>
  </div>
</template>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 10px;
  }

</style>
<script>
  export default {
    data() {
      return {
        tableData: [{
          id:1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {id:2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {id:3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {id:4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {id:5,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {id:6,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {id:7,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {id:8,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>
