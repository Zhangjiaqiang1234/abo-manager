<template>
  <div class="createPost-container">
    <el-main class="createPost-main-container">
      <el-row class="postInfo-container">
        <el-col :span="2">用户ID</el-col>
        <el-col :span="3" style="border-bottom:1px solid #DDD;text-align:center">{{data.userId}}</el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2">反馈时间</el-col>
        <el-col :span="3" style="border-bottom:1px solid #DDD;text-align:center">{{data.createTime}}</el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2">联系方式</el-col>
        <el-col :span="3" style="border-bottom:1px solid #DDD;text-align:center">{{data.contact}}</el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2">反馈图片</el-col>
        <el-col :span="8">
          <el-row type="flex" justify="center">
            <el-col  v-for="(item,index) in data.images" :key="index" v-show="data.images">
              <img :src="item+'?x-oss-process=image/resize,m_fill,h_100,w_100'" @click="checkImage(index)">
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2">反馈内容</el-col>
        <el-col :span="3">
          <textarea name="" id="" cols="100" rows="5">{{data.content}}</textarea>
        </el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2">
          <router-link :to="'/management/Festival/list'"><el-button type="success">返回</el-button></router-link>
        </el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-dialog :visible.sync="view" width="40%" class="viewImage">
          <img :src="viewImageUrl">
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import moment from 'moment'
import { fetchList } from '@/api/feedback'
// import Warning from './Warning'

export default {
  inject: ['reload'],
  name: 'FeedbackDetail',
  data() {
    return {
      id: Number,
      data: {
        userId: '',
        contact: '',
        content: '',
        imgage: [],
        createTime: ''
      },
      viewImageUrl: '',
      view: false
    }
  },
  computed: {
  },
  created() {
    this.id = parseInt(this.$route.params.id)
  },
  mounted() {
    this.getList(2)
  },
  beforeUpdate() {
  },
  methods: {
    getList(param) {
      this.listLoading = true
      fetchList(param)
        .then(res => {
          for (var tmp of res.data.data) {
            if (tmp.id === this.id) {
              console.log(tmp.id)
              this.data = tmp
            }
          }
          console.log(this.data)
        })
        .catch(() => {
          sessionStorage.clear()
          this.$router.push({ path: '/login' })
        })
    },
    checkImage(index) {
      this.viewImageUrl = this.data.images[index]
      this.view = true
      // event.target.src = this.data.images[index]
    },
    formatTime(value) {
      if (value === '') {
        return ''
      }
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 60px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 50px;
    }
  }
}
</style>
<style scoped>
img{
  cursor: pointer;
  margin:0 auto;
}
.viewImage{
  text-align:center
}
.viewImage img{
  width:90%
}
</style>

