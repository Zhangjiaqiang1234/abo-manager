<template>
  <div class="app-container">
    <el-row style="margin-bottom:2%" type="flex" align="middle">
      <el-col :span="6">
        <router-link :to="'/management/Banner/create/'+this.showFlagNum">
          <el-button type="primary" size="small" icon="el-icon-edit">新增</el-button>
        </router-link>
      </el-col>
    </el-row>
    <el-table :default-sort = "{prop: 'modifyTime', order: 'descending'}" :data="list.slice((listQuery.pageNum-1)*listQuery.pageSize,listQuery.pageNum*listQuery.pageSize)" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column align="center" label="title">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="缩略图" width="120">
        <template slot-scope="scope">
          <img style="width:100%" :src="scope.row.image_url">
        </template>
      </el-table-column>
      <el-table-column align="center" label="URl跳转地址">
        <template slot-scope="scope">
          <span>{{scope.row.Jump_url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="跳转类型" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.jump_type ===1 ? '新闻详情页': scope.row.jump_type ===2? '公告':'网页'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="show_flag" align="center" label="状态" width="100" :filters="[{ text: '显示', value: 1 }, { text: '隐藏', value: 0 }]" :filter-method="filterTag"> 
        <template slot-scope="scope">
          <span>{{scope.row.show_flag ===1 ? '显示':'隐藏'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.order_num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="新闻id" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.news_id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="160">
        <template slot-scope="scope">
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="160" prop="modify_time" sortable>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align='center'  width="200">
        <template slot-scope="scope">
          <el-button  @click="deleteBanner(scope.row.id)" size="small" type='danger' icon="el-icon-delete">删除</el-button>
          <router-link :to="'/management/Banner/edit/'+scope.row.id+'/'+showFlagNum">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
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
import { getBannerList, deleteBanner } from '@/api/banner'
export default {
  name: 'bannerList',
  data() {
    return {
      showFlagNum: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        typeId: null
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
      pageSize: 1000
    })
  },
  beforeUpdated() {
    this.getList({
      pageNum: 1,
      pageSize: 1000
    })
  },
  methods: {
    filterTag(value, row) {
      return row.show_flag === value
    },
    getList(param) {
      this.listLoading = true
      getBannerList(param)
        .then(response => {
          this.list = response.data.data.list.sort(function(a, b) {
            return a.order_num > b.order_num ? 1 : -1
          })
          if (response.data.data.list.length < 10) {
            this.listQuery.pageNum = 1
          }
          for (const i in response.data.data.list) { // 计数显示状态的banner数量
            if (response.data.data.list[i].show_flag === 1) {
              this.showFlagNum++
            }
          }
          this.total = response.data.data.list.length
          this.listLoading = false
        })
        .catch((err) => {
          // console.log('catch 了 但是不退出登录 err=')
          console.log(err)
          sessionStorage.clear()
          this.$router.push({ path: '/login' })
        })
    },
    deleteBanner(id) { // 删除 Banner 位
      this.$confirm('此操作将永久删除该Banner推荐位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteBanner(id).then(res => {
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
    handleStyleChange() {
      this.getList({
        pageNum: 1,
        pageSize: 10000,
        typeId: this.listQuery.typeId
      })
    },
    changeShow(row, column, cellValue, index) {
      console.log(row, column, cellValue, index)
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
