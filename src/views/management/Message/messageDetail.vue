<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
      <sticky className='sub-navbar'>
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">发布
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->
          <el-col :span="24">
            <el-form-item prop="newsType" label="发布位置" label-width="100px">
              <el-radio-group v-model="postForm.newsType">
                <el-radio   v-for="position in positions" :label="position.value" :key="position.value" :value="position.value">{{position.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model.trim="postForm.title" required :maxlength="100">
                标题
              </MDinput>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="10">
                  <el-form-item label-width="100px" label="发布时间:" class="postInfo-container-item" prop='releaseTime' required :default-value='new Date()'>
                    <el-date-picker v-model="postForm.releaseTime" type="datetime" value-forma="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="18">
                  <el-form-item label-width="100px" label="排序序号:" class="postInfo-container-item" prop="orderNum">
                    <el-row justify="center" align="middle">
                      <el-col><el-input  v-model.trim="postForm.orderNum" style="width:220px"></el-input></el-col>
                      <el-col><span style="font-size:0.4rem">设置序号的咨询会在App端置顶，不设置的按发布时间排序；序号越小排序越靠前，相同序号，最新设置/修改的靠前</span></el-col>
                    </el-row> 
                  </el-form-item>
                  </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="封面图片:" >
          <el-row :gutter=10>
            <el-col  v-model="postForm.coverImage" :md="9" :lg="8" :xl="5">
              <input id='file1' ref="file1" type="file" name="file" class="inputfile" accept="image/jpeg,image/jpg,image/png" style="display:none" @change="changePic()"/>
              <div v-loading="loading1" class="uploadImg" @click="refInput()">
                <i class="el-icon-upload" v-show="!pic1"></i>
                <img  class="inputPic" :src='pic1' @click="input(1)">
              </div>
            </el-col>
            <el-col :md="6" :lg="6" :xl="6">
              <p style="margin:0 auto">*最新咨询、健康课堂封面图片分辨率为:宽179px*高132px</p>
              <p style="margin:0 auto">*活动封面图片分辨率为:宽692px*高320px</p>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" prop="newsUrl" label="Url地址" label-width="100px">
          <el-input  v-model.trim="postForm.newsUrl" :maxlength="100" style="width:80%">
          </el-input>
          <p>*URL链接有内容时，文本编辑器内的内容不显示</p>
        </el-form-item>
        
          <el-row>
            <el-col :span='10'>
              <el-form-item style="margin-bottom: 40px;" prop="" label="附加阅读量" label-width="100px">
              <el-input name="name" v-model.trim="postForm.addReadCount" required :maxlength="100" style="width:20%">
              </el-input>
               </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item style="margin-bottom: 40px;" prop="" label="状态" label-width="100px" required>
              <el-radio v-model="postForm.showFlag" label='1'>可见</el-radio>
              <el-radio v-model="postForm.showFlag" label='0'>隐藏</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
       
        <div class="editor-container" v-show="!postForm.newsUrl">
          <Tinymce :height=400 ref="editor" v-model="postForm.content" />
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { getArticle, submitNews } from '@/api/article'
import { uploadImage } from '@/api/service'
import { validateURL } from '@/utils/validate'
import moment from 'moment'

// import Warning from './Warning'

const defaultForm = {
  title: '',
  newsUrl: '',
  createTime: '',
  modifyTime: '',
  createBy: 0,
  modifiedBy: 0,
  content: '',
  newsType: 1,
  addReadCount: 0,
  orderNum: null,
  coverImage: '',
  showFlag: '1',
  releaseTime: ''
}

export default {
  inject: ['reload'],
  name: 'articleDetail',
  components: { Tinymce, MDinput, Multiselect, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      var reg = /^[1-9]\d*$/
      if (value) {
        if (!reg.test(value)) {
          // callback(new Error('排序序号必须为正整数'))
          this.$message({
            message: '排序序号必须为正整数',
            type: 'error'
          })
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
        }
      } else {
        callback()
      }
    }
    return {
      positions: [
        { label: '最新资讯', value: 1 },
        { label: '健康课堂', value: 2 },
        { label: '活动', value: 3 }
      ],
      loading1: false,
      pic1: '',
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        title: [{ required: true, message: '标题不能为空' }],
        newsType: [{ required: true, message: '新闻类型不能为空' }],
        releaseTime: [{ required: true, message: '发布时间不能为空' }],
        orderNum: [
          // { required: true, message: '序号不能为空' },
          { validator: validateRequire, trigger: 'blur' }
        ],
        newsUrl: [{ validator: validateSourceUri }]
      }
    }
  },
  computed: {
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.postForm.id = id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  mounted() {
    this.$refs.postForm.resetFields()
    this.pic1 = ''
    this.postForm.showFlag = '1'
    this.postForm.newsUrl = ''
    if (!this.isEdit) {
      // this.postForm.releaseTime = this.formatDateTime(new Date())
      this.postForm.releaseTime = new Date()
    }
  },
  beforeUpdate() {
  },
  methods: {
    // formatDateTime(inputTime) {
    //   var date = new Date(inputTime)
    //   var y = date.getFullYear()
    //   var m = date.getMonth() + 1
    //   m = m < 10 ? ('0' + m) : m
    //   var d = date.getDate()
    //   d = d < 10 ? ('0' + d) : d
    //   var h = date.getHours()
    //   h = h < 10 ? ('0' + h) : h
    //   var minute = date.getMinutes()
    //   var second = date.getSeconds()
    //   minute = minute < 10 ? ('0' + minute) : minute
    //   second = second < 10 ? ('0' + second) : second
    //   return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    // },
    formatTime(value) {
      if (value === '') {
        return ''
      }
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    fetchData(id) {
      getArticle(id).then(response => {
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
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (this.postForm.newsType === 3 && !this.postForm.coverImage) {
            this.$message({
              message: '活动信息必须上传图片',
              type: 'warning'
            })
            return
          }
          this.postForm.showFlag = parseInt(this.postForm.showFlag)
          // this.postForm.releaseTime = this.formatDateTime(this.postForm.releaseTime)
          this.postForm.releaseTime = this.formatTime(this.postForm.releaseTime)
          if (!this.postForm.newsUrl) {
            var html1 = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>' + this.postForm.title + '</title><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /><style>img{max-width: 100%;}p{word-wrap:break-word}</style></head><body>'
            var html2 = "<script type='text/javascript'>window.onload = function() {var lastTouchEnd = 0;document.addEventListener('touchstart', function(event) {if (event.touches.length > 1) {event.preventDefault();}});document.addEventListener('touchend', function(event) {var now = (new Date()).getTime();if (now - lastTouchEnd <= 300) {event.preventDefault();}lastTouchEnd = now;}, false);document.addEventListener('gesturestart', function(event) {event.preventDefault();});}<\/script></body></html>"
            this.postForm.content = html1 + this.postForm.content + html2
          } else {
            this.postForm.content = ''
          }
          this.loading = true
          submitNews(this.postForm)
            .then(res => {
              if (res.data.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '文章发布成功',
                  type: 'success',
                  duration: 2000
                })
                this.reload()
                this.$router.push({ path: '/management/Article/list' })
                this.$refs.postForm.resetFields()
              } else {
                this.$notify({
                  title: '失败',
                  message: '文章发布失败',
                  type: 'warning',
                  duration: 2000
                })
              }
            })
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
    },
    changePic() {
      this.loading1 = true
      var f
      f = this.$refs.file1.files[0]
      var formData = new FormData()
      formData.append('file', f)
      uploadImage(formData)
        .then(res => {
          if (res.data.code === 200) {
            this.idcardImage1 = res.data.data[0]
            this.pic1 = res.data.data[0]
            this.postForm.coverImage = res.data.data[0]
            this.loading1 = false
          } else {
            // messageInfo(this.code(res.data.code))
          }
        })
    },
    refInput() {
      this.$refs.file1.click()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
<style scoped>
.uploadImg{
  width:20rem;
  height:12rem;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
}
i{
  font-size: 67px;
    color: #c0c4cc;
    margin: 80px 0 16px;
    line-height: 50px;
}
.uploadImg img{
  width:100%
}
</style>

