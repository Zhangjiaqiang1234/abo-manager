<template>
  <div class="app-container">
    <!-- 顶部单选框及新增按钮开始 -->
    <el-row style="margin-bottom:2%" type="flex" align="middle">
      <el-col :span="16" :sm="15" :md="13" :lg="11" :xl="7">
      <span>新闻类型</span>
      <el-radio-group v-model="listQuery.news_type" @change="handleStyleChange()">
      <el-radio v-for="position in positions" :label="position.value" :key="position.value" :value="position.value">{{position.label}}</el-radio>
      </el-radio-group>
      </el-col>
      <el-col :span="6">
        <router-link to="/management/Article/create">
          <el-button type="primary" size="small" icon="el-icon-edit">新增</el-button>
        </router-link>
      </el-col>
    </el-row>
    <!-- 顶部单选框及新增按钮结束 -->
    <el-table :default-sort = "{prop: 'modify_time', order: 'descending'}" :data="list.slice((listQuery.pageNum-1)*listQuery.pageSize,listQuery.pageNum*listQuery.pageSize)" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <!-- <el-table :default-sort = "{prop: 'modify_time', order: 'descending'}" :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">   -->
      <el-table-column align="center" prop="id" label="ID" width="80" sortable>
      </el-table-column>
      <el-table-column align="center" label="title">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="URl地址" min-width="300">
        <template slot-scope="scope">
          <span>{{scope.row.news_url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格（商城）" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型" width="80">
        <template slot-scope="scope">
          <span>{{getName(scope.row.news_type)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.show_flag ===1 ? '显示':'隐藏'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.order_num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="阅读量" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.read_count}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="附加阅读量" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.add_read_count}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" width="160">
        <template slot-scope="scope">
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="160" prop="modify_time" sortable>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align='center'  width="200">
        <template slot-scope="scope">
          <el-button  @click="deleteNew(scope.row.id)" size="small" type='danger' icon="el-icon-delete">删除</el-button>
          <router-link :to="'/management/article/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
      <!-- <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">

          <router-link class="link-type" :to="'/management/edit/'+scope.row.id">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column> -->

      <!-- <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/management/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column> -->
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { fetchList, deleteArticle } from '@/api/article'

export default {
  name: 'articleList',
  data() {
    return {
      positions: [
        { label: '最新资讯', value: 1 },
        { label: '健康课堂', value: 2 },
        { label: '活动', value: 3 },
        { label: '文章', value: 4 }
      ],
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        news_type: null
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
    getName(news_type) {
      for (const i in this.positions) {
        if (this.positions[i].value === news_type) {
          return this.positions[i].label
        }
      }
    },
    getList(param) {
      this.listLoading = true
      fetchList(param).then(response => {
        this.list = response.data.data.list.sort(function(a, b) {
          return a.modify_time < b.modify_time ? 1 : -1
        })
        if (response.data.data.list.length < 10) {
          this.listQuery.pageNum = 1
        }
        this.total = response.data.data.list.length
        this.listLoading = false
      }).catch((err) => {
        console.log('Article/list.vue->getList ' + err)
        sessionStorage.clear()
        this.$router.push({ path: '/login' })
      })
    },
    addArticle() {

    },
    deleteNew(id) {
      this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteArticle(id).then(res => {
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
        news_type: this.listQuery.news_type
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
