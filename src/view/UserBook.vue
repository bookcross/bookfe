<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--<span>我的图书</span>-->
        <el-button type="primary" v-if="!isEdit" v-on:click="function() {isEdit=!isEdit}">新书发布</el-button>
        <el-button type="text" v-if="isEdit" v-on:click="function() {isEdit=!isEdit}"><<返回</el-button>
      </div>

      <div v-if="!isEdit">
        <el-row :gutter="20">
          <el-table
            :data="linkList"
            style="width: 100%">
            <el-table-column
              label="书名"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.bookName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="日期"
              width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ transTime(scope.row.createdDate )}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.address }}</el-tag>
                </div>
              </template>
              <!--<template slot-scope="scope">-->
                <!--<el-popover trigger="hover" placement="top">-->
                  <!--<p>姓名: {{ scope.row.name }}</p>-->
                  <!--<p>住址: {{ scope.row.address }}</p>-->
                  <!--<div slot="reference" class="name-wrapper">-->
                    <!--<el-tag size="medium">{{ scope.row.address }}</el-tag>-->
                  <!--</div>-->
                <!--</el-popover>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-pagination
          center="true"
          style="margin-top: 12px;"
          background
          layout="prev, pager, next"
          :total="totalEnum">
        </el-pagination>
      </div>

      <div v-if="isEdit">
        <BookEdit :isEdit="isEdit" :showMsg="showMsg" v-on:ee="isEditChange"></BookEdit>
      </div>
    </el-card>


    <!--<el-tab-pane label="新书列表" name="first">-->

    <!--</el-tab-pane>-->
  </div>
</template>

<script>
  import { formatDate } from 'element-ui/packages/date-picker/src/util';
  import BookEdit from './BookEdit'
  import request from '@/utils/request'
  export function findAll(queryCondition) {
    return request({
      url: '/zuul/bookInfo/searchBook?type=' +0+'&keyword='+queryCondition.keyword+'&pageNum='+queryCondition.pageNum,
      headers: {
        'content-type': 'application/json'
      },
      method: 'post'
    })
  }
  export default {
    name: "UserBook",
    methods: {

    },
    components: {
      BookEdit
    },
    methods:{
      transTime(a){
        return  formatDate(a, 'yyyy-MM-dd')
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      isEditChange(data){
        if (data.isEdit==false){
          this.isEdit=false
        }
        this.findByCondition()
      },
      jumpTo: function (s) {
        this.$router.push(s);
      },
      findByCondition(){
        findAll(this.queryCondition).then(response => {
          this.linkList = response.list;
          console.log(this.linkList)
          this.totalEnum=response.endRow
        }).catch((err) => {
          console.log(err)
        });
      }
    },
    data() {
      return {
        totalEnum:0,
        isEdit:false,
        showMsg:"abbc",
        linkList: [],
        queryCondition:{
          field:'',
          keyword:'',
          pageNum:0
        }
      }
    },
    mounted(){
      this.queryCondition.field='userId';
      this.queryCondition.keyword='12345';
      this.queryCondition.pageNum=1;
      this.findByCondition()
    }
  }
</script>

<style scoped>

</style>
