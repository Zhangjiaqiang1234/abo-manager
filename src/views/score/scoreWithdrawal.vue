<template>
  <div class="app-container">
    <el-row type="flex" align="middle">
      <el-col><span style="display:inline-block;color:red;vertical-align:middle;">*</span><small>说明：钱包地/交易ID 点击即可复制</small></el-col>
      <el-col :offset="8">
        <el-select v-model="value" placeholder="请选择状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="filtertxId(value)" type="primary" size="small">筛选</el-button>
      </el-col>
      <el-col>
        <el-row type="flex">
          <el-col>
            <el-input v-model.trim="userInput" placeholder="请输入手机号/ID号搜索" style="width:95%"></el-input>
          </el-col>
          <el-col>
            <el-button @click="search(userInput)" type="primary" size="small">搜索</el-button><el-button @click="reset()" type="primary" size="small">重置</el-button>
          </el-col>
        </el-row>
      </el-col>   
    </el-row>
    <el-table :default-sort = "{prop: 'createTime', order: 'descending'}" :data="list.slice((listQuery.pageNum-1)*listQuery.pageSize,listQuery.pageNum*listQuery.pageSize)" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%;margin-top:1%">
      <el-table-column align="center" prop="id" label="序号">
      </el-table-column>
      <el-table-column align="center" prop="openId" label="用户ID" width="100">
      </el-table-column>
      <el-table-column align="center" prop="userName" label="昵称">
      </el-table-column>
      <el-table-column align="center" prop="phone" label="手机号" width="120">
      </el-table-column>
      <el-table-column align="center" prop="fees" label="手续费">
      </el-table-column>
      <el-table-column align="center" prop="extractPoint" label="实际到账">
        <template slot-scope="scope">
          <!-- <el-tooltip class="item" effect="dark" content="点击即可复制" placement="bottom-end"> -->
            <span>{{scope.row.extractPoint-scope.row.fees}}</span>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="钱包地址" width="200">
        <template slot-scope="scope">
          <!-- <el-tooltip class="item" effect="dark" content="点击即可复制" placement="bottom-end"> -->
            <span class="buttonCopy" @click="buttonCopy(scope.row.extractAddress)">{{scope.row.extractAddress}}</span>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="申请时间" width="100">
      </el-table-column>
      <el-table-column align="center" prop="txId" label="交易ID" width="280">
        <template slot-scope="scope">
          <!-- <el-tooltip class="item" effect="dark" content="点击即可复制" placement="bottom-end"> -->
            <span class="buttonCopy" @click="buttonCopy(scope.row.txId)">{{scope.row.txId}}</span>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="modifyTime" label="交易ID录入时间" width="100">
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="100" :filters="[{ text: '交易已完成', value: 2 }]" :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <span>{{!scope.row.txId ? '交易未处理': scope.row.status ===2? '交易已完成':'交易已发起'}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align='center'  width="270">
        <template slot-scope="scope">
          <el-button v-show='!scope.row.txId' type="primary" size="small" icon="el-icon-edit" @click='submitTxId(scope.row.id,"录入")'>录入交易ID</el-button>
          <el-button v-show='scope.row.txId && scope.row.status === 1' @click="deleteTxId(scope.row.id)" size="small" type='danger' icon="el-icon-delete">删除交易ID</el-button>
          <el-button v-show='scope.row.txId && scope.row.status === 1' type="primary" size="small" icon="el-icon-edit" @click='submitTxId(scope.row.id,"修改")'>修改交易ID</el-button>
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
import { fetchScoreList, txIDUpdate } from '@/api/score'

export default {
  name: 'articleList',
  data() {
    return {
      options: [
        { value: 2, label: '交易已完成' },
        { value: 1, label: '交易已发起' },
        { value: 0, label: '交易未处理' }
      ],
      value: '',
      userInput: '',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        status: null,
        phone: null,
        openId: null
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  mounted() {
    this.getList({
      pageNum: 1,
      pageSize: 1000,
      status: null,
      phone: null,
      openId: null
    })
  },
  watch: {
    total(val, oldVal) {
      return val
    }
  },
  beforeUpdated() {
    this.getList({
      pageNum: 1,
      pageSize: 1000,
      status: null,
      phone: null,
      openId: null
    })
  },
  methods: {
    getList(param) {
      this.listLoading = true
      this.list = []
      this.total = 0
      fetchScoreList(param)
        .then(response => {
          if (param.status === 1) {
            for (var tmp of response.data.data) {
              if (tmp.txId) {
                this.list.push(tmp)
              }
            }
          } else {
            this.list = response.data.data.sort(function(a, b) {
              return a.createTime < b.createTime ? 1 : -1
            })
          }
          if (this.list.length < 10) {
            this.listQuery.pageNum = 1
          }
          this.total = this.list.length
          this.listLoading = false
        })
        .catch(() => {
          sessionStorage.clear()
          this.$router.push({ path: '/login' })
        })
    },
    filtertxId() {
      this.search()
    },
    search() {
      if (this.userInput && this.userInput.length === 11) {
        this.getList({
          pageNum: 1,
          pageSize: 1000,
          status: this.value,
          phone: this.userInput
        })
      } else {
        this.getList({
          pageNum: 1,
          pageSize: 1000,
          status: this.value,
          openId: this.userInput
        })
      }
    },
    reset() {
      this.value = null
      this.userInput = null
      this.listQuery.pageNum = 1
      this.pageSize = 10
      this.getList({
        pageNum: 1,
        pageSize: 1000,
        status: null,
        phone: null,
        openId: null
      })
    },
    deleteTxId(data) {
      this.$confirm('此操作将删除该交易ID, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        txIDUpdate({
          id: data,
          txhash: ''
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '删除成功',
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
    },
    changeShow(row, column, cellValue, index) {
      console.log(row, column, cellValue, index)
    },
    buttonCopy(data) {
      var oInput = document.createElement('input')
      oInput.value = data
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    submitTxId(data1, data2) {
      this.$prompt('请输入交易ID', data2, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^0[xX][0-9A-Fa-f]{64}$/,
        inputErrorMessage: '交易ID不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的交易ID是: ' + value
        })
        txIDUpdate({
          id: data1,
          txhash: value
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    filterTag(value, row) {
      return row.status === value
    }
  }
}
</script>

<style scoped>
.buttonCopy{
  color:#0BA4E6
}
</style>
