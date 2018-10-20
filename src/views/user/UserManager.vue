<template>
    <div class='userManage'>
        <el-input v-model="searchName" placeholder="请输入搜素关键词"></el-input><el-button @click='serchUser()'>搜索用户</el-button>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border center style="width: 95%;margin-top:1%">
            <!-- <el-table-column prop="id" label="序号" min-width="80" align='center'>
            </el-table-column> -->
            <el-table-column prop="userId" label="用户ID" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="150" align='center'>
            </el-table-column>
            <el-table-column prop="email" label="客户名称" min-width="200" align='center'>
            </el-table-column>
            <el-table-column prop="etherWallet" label="账号状态" min-width="180" align='center'>
            </el-table-column>
            <el-table-column prop="etherWallet" label="积分余额" min-width="180" align='center'>
            </el-table-column>
            <el-table-column prop="createTime" label="上次登录时间" width="100" align='center'>
            </el-table-column>
            <el-table-column prop="status" label="创建时间" min-width="80" align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row,1)" type="text" size="small">启用</el-button>
                    <el-button type="text" size="small" @click="handleClick(scope.row,0)">停用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
        </div>
    </div>
</template>

<script>
import { } from '@/api/service.js'
export default {
  name: 'userManage',
  data() {
    return {
      searchName: '',
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      pageSizes: [5, 10, 20, 50, 100]
    }
  },
  mounted() {
    // this.getUsers()
  },
  methods: {
    // getUsers() {
    //   getAllUser({
    //     username: this.searchName,
    //     limit: 1000000000
    //   })
    //     .then(res => {
    //       var datas = res.data.page.list
    //       for (var tmp of datas) {
    //         tmp.status = tmp.status === 1 ? '正常' : '禁用'
    //       }
    //       this.tableData = datas
    //     })
    // },
    serchUser() {
      this.getUsers()
    },
    handleClick(row, data) {
      // updateStatus({
      //   userId: row.userId,
      //   status: data
      // })
      //   .then(res => {
      //     this.getUsers()
      //   })
    },
    handleSizeChange: function(size) {
      this.pageSize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.userManage {
    width: 95%;
    margin: 3% auto
}
.userManage>.el-input{
    width:30%
}
.userManage>.el-button{
    margin-left:2%
}
.block {
    text-align: right;
    margin-top: 1%;
}
</style>
