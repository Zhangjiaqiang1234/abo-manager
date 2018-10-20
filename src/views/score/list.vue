<template>
  <div class="createPost-container">
    <el-main class="createPost-main-container">
      <el-row class="postInfo-container">
        <el-col :span="2">用户ID</el-col>
        <el-col :span="3" style="border-bottom:1px solid #DDD;text-align:center">123</el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2">反馈时间</el-col>
        <el-col :span="3" style="border-bottom:1px solid #DDD;text-align:center">2018-09-12 10:12:53</el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2">联系方式</el-col>
        <el-col :span="3" style="border-bottom:1px solid #DDD;text-align:center">12345678901</el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2">反馈图片</el-col>
        <el-col :span="3">
          <img src="" alt="">
          <img src="" alt="">
          <img src="" alt="">
        </el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2">反馈内容</el-col>
        <el-col :span="3">
          <textarea name="" id="" cols="100" rows="5"></textarea>
        </el-col>
      </el-row>
      <el-row class="postInfo-container">
        <el-col :span="2"><el-button type="success">返回</el-button></el-col>
        <el-col :span="3"></el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import moment from 'moment'

// import Warning from './Warning'

export default {
  inject: ['reload'],
  name: 'FeedbackDetail',
  props: {
    feedbackId: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
    if (this.feedbackId) {
      const id = this.$route.params && this.$route.params.id
      this.postForm.id = id
      this.fetchData(id)
    }
  },
  mounted() {
  },
  beforeUpdate() {
  },
  methods: {
    formatTime(value) {
      if (value === '') {
        return ''
      }
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    fetchData(id) {
      (id).then(response => {
        this.postForm.title = response.data.data.title
        this.postForm.coverImage = response.data.data.coverImage
        this.pic1 = response.data.data.coverImage
        this.postForm.orderNum = response.data.data.orderNum
        this.postForm.newsUrl = response.data.data.newsUrl
        this.postForm.content = response.data.data.content
        this.postForm.releaseTime = response.data.data.releaseTime
        this.postForm.addReadCount = response.data.data.addReadCount
        this.postForm.showFlag = response.data.data.showFlag.toString()
        this.postForm.newsType = response.data.data.newsType
      }).catch(err => {
        console.log(err)
      })
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

</style>

