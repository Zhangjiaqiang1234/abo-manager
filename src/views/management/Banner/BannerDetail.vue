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
            <div class="postInfo-container">
              <el-row>
                <el-col :span="18">
                  <el-form-item label-width="100px" label="Banner名称" class="postInfo-container-item" prop='title' required>
                    <el-input  v-model.trim="postForm.title"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label-width="100px" label="排序序号:" class="postInfo-container-item" prop="order_num" required>
                    <el-row justify="center" align="middle">
                      <el-col><el-input  v-model.trim="postForm.order_num" style="width:220px"></el-input></el-col>
                      <el-col><span style="font-size:0.4rem">设置序号的咨询会在App端置顶，不设置的按发布时间排序；序号越小排序越靠前，相同序号，最新设置/修改的靠前</span></el-col>
                    </el-row> 
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="Banner图片:" >
          <el-row :gutter=10>
            <el-col  v-model="postForm.image_url" :md="9" :lg="8" :xl="5">
              <input id='file1' ref="file1" type="file" name="file" class="inputfile" accept="image/jpeg,image/jpg,image/png" style="display:none" @change="changePic()"/>
              <div v-loading="loading1" class="uploadImg" @click="refInput()">
                <i class="el-icon-upload" v-show="!pic1"></i>
                <img  class="inputPic" :src='pic1' @click="input(1)">
              </div>
            </el-col>
            <el-col :md="6" :lg="6" :xl="6">
              <p style="margin:0 auto">*Banner封面图片分辨率为:宽375px*高188px</p>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-row>
          <el-col :span='6'>
            <el-form-item style="margin-bottom: 40px;" label="跳转位置" label-width="100px" required>
              <el-select v-model="value" placeholder="跳转位置" style="width:80%">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row>
          <el-col :span='6'>
            <el-form-item style="margin-bottom: 40px;" prop="" label="跳转内容" label-width="100px" required>
              <el-input  v-model.trim="postForm.Jump_url" :maxlength="100" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span='6'>
            <el-form-item style="margin-bottom: 40px;" label="新闻id" label-width="100px" required>
              <el-select v-model="postForm.news_id" placeholder="新闻id" style="width:80%" @change="changeNewsid">
                <el-option
                  v-for="item in newsList"
                  :key="item.id"
                  :title="item.title"
                  :value="item.id+'----'+item.title">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="urlBoxShow">
          <el-col>
            <el-form-item prop="Jump_url" label="Url地址" label-width="100px">
              <el-input v-model.trim="postForm.Jump_url" :maxlength="100" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="!urlBoxShow">
          <el-col>
             <el-form-item prop="Jump_url" label="Url地址" label-width="100px">
              <el-input placeholder="此链接是跳转至abo文章页面，无法编辑" :disabled="true" :maxlength="100" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='6'>
            <el-form-item style="margin-bottom: 40px;" prop="" label="状态" label-width="100px" required>
              <el-radio v-model="postForm.show_flag" label='1'>显示</el-radio>
              <el-radio v-model="postForm.show_flag" label='0'>隐藏</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
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
import { addBanner, getBanner } from '@/api/banner'
import { uploadImage } from '@/api/service'
import { validateURL } from '@/utils/validate'
import moment from 'moment'
import { fetchList } from '@/api/article'

// import Warning from './Warning'

const defaultForm = {
  title: '',
  news_id: '',
  Jump_url: '',
  create_by: 1,
  modify_by: 1,
  order_num: null,
  image_url: '',
  show_flag: '1',
  jump_type: '1'
}

export default {
  inject: ['reload'],
  name: 'bannerDetail',
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
      // options: [
      //   { label: '最新资讯', value: 1 },
      //   { label: '健康课堂', value: 2 },
      //   { label: '活动', value: 3 }
      // ],
      newsList: [], // 文章列表
      news_id: null, // 当前选中的对象的 id
      newsIndex: -1, // 当前选中的对象的索引值
      urlBoxShow: 1, // 是否可以输入 url 地址
      // value: 1,
      loading1: false,
      pic1: '',
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        title: [{ required: true, message: 'banner名称不能为空' }],
        order_num: [
          { required: true, message: '序号不能为空' },
          { validator: validateRequire, trigger: 'blur' }
        ],
        Jump_url: [{ validator: validateSourceUri }]
      }
    }
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
    this.getList({
      pageNum: 1,
      pageSize: 1000
    })
    this.$refs.postForm.resetFields()
    this.pic1 = ''
    this.postForm.show_flag = '1'
    this.postForm.Jump_url = ''
    if (!this.isEdit) {
      // this.postForm.releaseTime = new Date()
    }
  },
  beforeUpdate() {
  },
  methods: {
    changeNewsid() {
      console.log('当select 改变会触发这个')
      // 每当重新选择了 新闻 id ，重新获取 url 给跳转链接 和 新闻id 赋值
      this.postForm.news_id = this.postForm.news_id.replace(/----.*/ig, '')
      for (const i in this.newsList) {
        if (this.newsList[i].id === +this.postForm.news_id) {
          this.newsIndex = i
        }
      }
      this.postForm.Jump_url = this.newsList[this.newsIndex].newsUrl
      if (this.newsList[this.newsIndex].content) { // 如果是跳转外部网页的
        this.urlBoxShow = 0
      } else {
        this.urlBoxShow = 1
      }
    },
    getList(param) { // 获取文章列表信息
      this.listLoading = true
      fetchList(param).then(response => {
        this.newsList = response.data.data.sort(function(a, b) {
          return a.modifyTime < b.modifyTime ? 1 : -1
        })
        if (response.data.data.length < 10) {
          this.listQuery.pageNum = 1
        }
        this.total = response.data.data.length
        this.listLoading = false
      })
    },
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
      getBanner(id).then(response => {
        this.postForm.title = response.data.data.title
        this.postForm.image_url = response.data.data.image_url
        this.pic1 = response.data.data.image_url
        this.postForm.order_num = response.data.data.order_num
        this.postForm.Jump_url = response.data.data.Jump_url
        this.postForm.show_flag = response.data.data.show_flag.toString()
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (!this.postForm.image_url) {
            this.$message({
              message: '必须上传Banner封面图片',
              type: 'warning'
            })
            return
          }
          this.postForm.show_flag = parseInt(this.postForm.show_flag)
          if (!this.postForm.Jump_url) {
            // var html1 = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>' + this.postForm.title + '</title><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /><style>img{max-width: 100%;}p{word-wrap:break-word}</style></head><body>'
            // var html2 = "<script type='text/javascript'>window.onload = function() {var lastTouchEnd = 0;document.addEventListener('touchstart', function(event) {if (event.touches.length > 1) {event.preventDefault();}});document.addEventListener('touchend', function(event) {var now = (new Date()).getTime();if (now - lastTouchEnd <= 300) {event.preventDefault();}lastTouchEnd = now;}, false);document.addEventListener('gesturestart', function(event) {event.preventDefault();});}<\/script></body></html>"
            // this.postForm.content = html1 + this.postForm.content + html2
          } else {
            // this.postForm.content = ''
          }
          this.loading = true
          addBanner(this.postForm)
            .then(res => {
              if (res.data.code === 200) {
                this.$notify({
                  title: '成功',
                  message: 'banner发布成功',
                  type: 'success',
                  duration: 2000
                })
                this.reload()
                this.$router.push({ path: '/management/Banner/list' })
                this.$refs.postForm.resetFields()
              } else {
                this.$notify({
                  title: '失败',
                  message: 'banner发布失败',
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
    // draftForm() {
    //   if (this.postForm.title.length === 0) {
    //     this.$message({
    //       message: '请填写必要的标题和内容',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   this.$message({
    //     message: '保存成功',
    //     type: 'success',
    //     showClose: true,
    //     duration: 1000
    //   })
    // },
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
            this.postForm.image_url = res.data.data[0]
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
        width:100%;
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

