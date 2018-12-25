<template>
  <div>
    <el-row :gutter="20">
      <el-table
        :data="linkList"
        style="width: 100%">
        <el-table-column
          label="书名"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ transTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="对方信息"
          width="380">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{scope.row.senderName }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="对方操作">
          <template slot-scope="scope">
            <span
              v-if="scope.row.isSend==1">已寄发
            </span>
            <span
              v-if="scope.row.isSend!=1">未寄发
            </span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.isAccept!=1">确认收书
            </el-button>
            <span
              size="mini"
              v-if="scope.row.isAccept==1">已收书
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        center="true"
        style="margin-top: 12px;"
        background
        layout="prev, pager, next"
        :total="totalItem">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import { formatDate } from 'element-ui/packages/date-picker/src/util';
  export function acceptBook(form) {
    return request({
      url: '/zuul/bookCross/acceptBook',
      headers: {
        'content-type': 'application/json'
      },
      method: 'post',
      data: form
    })
  }

  export function findBorrowIn(queryCondition) {
    return request({
      url: '/zuul/bookCross/searchCross?type=' + queryCondition.type + '&pageNum=' + queryCondition.pageNum,
      headers: {
        'content-type': 'application/json'
      },
      method: 'post'
    })
  }

  export default {
    name: "BorrowIn",
    data() {
      return {
        totalItem: 0,
        linkList: [],
        queryCondition: {
          type: '1',
          pageNum: 0
        },
        bookCross: {
          id: '',
        }
      }
    },
    mounted() {
      this.shuaxin()
    },
    methods: {
      transTime(a){
        return  formatDate(a, 'yyyy-MM-dd')
      },
      handleEdit(index, row) {
        this.bookCross.id = row.id;
        acceptBook(this.bookCross).then(response => {
          this.shuaxin()
        }).catch(error => {
          console.log(error)
        })
      },
      shuaxin() {
        findBorrowIn(this.queryCondition).then(response => {
          this.linkList = response.list
          this.totalItem = response.endRow
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
