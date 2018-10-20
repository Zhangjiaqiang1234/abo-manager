<template>
  <div class="app-container">
    <el-row >
      <el-col :span='6' :offset="18">
        <el-select v-model="value" placeholder="请选择状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="filterStatus(value)" type="primary" size="small">筛选</el-button>
      </el-col>
    </el-row>
    <el-table :default-sort = "{prop: 'modifyTime', order: 'descending'}" :data="list.slice((listQuery.pageNum-1)*listQuery.pageSize,listQuery.pageNum*listQuery.pageSize)" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%;margin-top:1%">
      <el-table-column align="center" prop="id" label="序号" width="80">
      </el-table-column>
      <el-table-column align="center" prop="userId" label="用户ID" width="80">
      </el-table-column>
      <el-table-column align="center" prop="nickName" label="昵称" width="150">
      </el-table-column>
      <el-table-column align="center" prop="registerPhone" label="注册手机号" width="120">
      </el-table-column>
      <el-table-column align="center" prop="userName" label="姓名" width="100">
      </el-table-column>
      <el-table-column align="center" label="性别" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.sex===1?'男':'女'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="phone" label="预约手机号" width="120">
      </el-table-column>
      <el-table-column align="center" prop="email" label="邮箱">
      </el-table-column>
      <el-table-column align="center" prop="email" label="状态" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.status===1?'未处理':'已处理'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="申请时间" width="160">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align='center'  width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status ===1" @click="change(scope.row.id,1)" size="small" type='danger' icon="el-icon-edit">处理</el-button>
          <el-button v-if="scope.row.status ===0" @click="change(scope.row.id,0)" size="small" type='success' icon="el-icon-edit">取消</el-button>
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
import { fetchList, changeStatus } from '@/api/geneticTesting'

export default {
  name: 'geneticTesting',
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      options: [
        { value: 1, label: '未处理' },
        { value: 0, label: '已处理' }
      ],
      value: ''
    }
  },
  mounted() {
    this.getList({
      pageNum: 1,
      pageSize: 10000
    })
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
    change(id, status) {
      var info1 = '确认已处理该预约?'
      var info2 = '确认取消该预约?'
      if (status === 1) {
        this.changeStatu(id, info1, 0)
      } else {
        this.changeStatu(id, info2, 1)
      }
    },
    changeStatu(id, info, statu) {
      this.$confirm(info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeStatus({
          id: id,
          status: statu,
          pageNum: 1,
          pageSize: 10000
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
          }
          this.getList({
            pageNum: 1,
            pageSize: 10000
          })
          this.listLoading = false
        })
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
    },
    filterStatus(val) {
      this.getList({
        status: val
      })
    }
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
