<template>
  <div>
    <template>
      <el-tabs :activeName="activeLabel" @tab-click="handleClick">
        <el-tab-pane label="借入图书" name="first">
         <borrow-in></borrow-in>
        </el-tab-pane>
        <el-tab-pane label="借出图书" name="second">
          <borrow-out></borrow-out>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>


<script>
  import BorrowIn from "./BorrowIn"
  import BorrowOut from "./BorrowOut"
  export default {
    name: "NewsCenter",
    components: {
      BorrowIn,BorrowOut
    },
    data() {
      return {
        activeLabel: 'first',
        dialogFormVisible: false
      }
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
    }
  }
</script>

<style scoped>

</style>
