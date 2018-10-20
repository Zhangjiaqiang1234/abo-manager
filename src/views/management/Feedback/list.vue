<template>
  <div class="app-container">
    <el-table :default-sort = "{prop: 'modifyTime', order: 'descending'}" :data="list.slice((listQuery.pageNum-1)*listQuery.pageSize,listQuery.pageNum*listQuery.pageSize)" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column align="center" prop="userId" label="用户ID" width="80">
      </el-table-column>
      <el-table-column align="center" prop="contact" label="联系方式" width="120">
      </el-table-column>
      <el-table-column align="center" prop="content" label="反馈内容" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center" label="图片数量" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.images?scope.row.images.length:0}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="反馈时间" width="160">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align='center'  width="120">
        <template slot-scope="scope">
          <!-- <el-button  @click="deleteNew(scope.row.id)" size="small" type='danger' icon="el-icon-delete">删除</el-button> -->
          <router-link :to="'/management/Feedback/FeedbackDetail/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">查看详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { fetchList } from '@/api/feedback'

export default {
  name: 'articleList',
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'info',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  mounted() {
    this.getList(1)
  },
  beforeUpdated() {
  },
  methods: {
    getList(param) {
      this.listLoading = true
      fetchList(param)
        .then(response => {
          this.list = response.data.data.sort(function(a, b) {
            return a.modifyTime < b.modifyTime ? 1 : -1
          })
          if (response.data.data.length < 10) {
            this.listQuery.pageNum = 1
          }
          this.total = response.data.data.length
          this.listLoading = false
        })
        .catch(() => {
          sessionStorage.clear()
          this.$router.push({ path: '/login' })
        })
    },
    // deleteNew(id) {
    //   this.listLoading = true
    //   deleteArticle(id).then(res => {
    //     if (res.data.code === 200) {
    //       this.$message({
    //         message: res.data.msg,
    //         type: 'success'
    //       })
    //     } else {
    //       this.$message({
    //         message: res.data.msg,
    //         type: 'warning'
    //       })
    //     }
    //     this.getList({
    //       pageNum: 1,
    //       pageSize: 10000
    //     })
    //     this.listLoading = false
    //   })
    // },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
    },
    handleStyleChange() {
      this.getList(1)
    }
    // changeShow(row, column, cellValue, index) {
    //   console.log(row, column, cellValue, index)
    // }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
