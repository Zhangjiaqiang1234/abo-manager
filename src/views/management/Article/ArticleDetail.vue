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
            <el-form-item prop="news_type" label="发布位置" label-width="100px">
              <el-radio-group v-model="postForm.news_type">
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
                  <el-form-item label-width="100px" label="发布时间:" class="postInfo-container-item" prop='create_time' required :default-value='new Date()'>
                    <el-date-picker v-model="postForm.create_time" type="datetime" value-forma="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="18">
                  <el-form-item label-width="100px" label="排序序号:" class="postInfo-container-item" prop="order_num">
                    <el-row justify="center" align="middle">
                      <el-col><el-input  v-model.trim="postForm.order_num" style="width:220px"></el-input></el-col>
                      <el-col><span style="font-size:0.4rem">设置序号的咨询会在App端置顶，不设置的按发布时间排序；序号越小排序越靠前，相同序号，最新设置/修改的靠前</span></el-col>
                    </el-row> 
                  </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="18">
                  <el-form-item style="margin-left:-48px;" label-width="150px" label="价格（商城商品）:" class="postInfo-container-item" prop="price">
                    <el-row justify="center" align="middle">
                      <el-col><el-input v-model.trim="postForm.price" style="width:220px"></el-input></el-col>
                    </el-row> 
                  </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="18">
                  <el-form-item label-width="100px" label="标签:" class="postInfo-container-item" prop="keywords">
                    <el-row justify="center" align="middle">
                      <el-col><el-input  v-model.trim="postForm.keywords" style="width:220px"></el-input></el-col>
                      <el-col><span style="font-size:0.4rem">每个标签之间用英文逗号分隔开</span></el-col>
                    </el-row> 
                  </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="18">
                  <el-form-item style="margin-left:-48px;" label-width="150px" label="销量:" class="postInfo-container-item" prop="sale_count">
                    <el-row justify="center" align="middle">
                      <el-col><el-input v-model.trim="postForm.sale_count" style="width:220px"></el-input></el-col>
                    </el-row> 
                  </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="18">
                  <el-form-item style="margin-left:-48px;" label-width="150px" label="优惠金额:" class="postInfo-container-item" prop="coupon">
                    <el-row justify="center" align="middle">
                      <el-col><el-input v-model.trim="postForm.coupon" style="width:220px"></el-input></el-col>
                    </el-row> 
                  </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="18">
                  <el-form-item style="margin-left:-48px;" label-width="150px" label="运费:" class="postInfo-container-item" prop="freight">
                    <el-row justify="center" align="middle">
                      <el-col><el-input v-model.trim="postForm.freight" style="width:220px"></el-input></el-col>
                    </el-row> 
                  </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="18">
                  <el-form-item style="margin-left:-48px;" label-width="150px" label="库存:" class="postInfo-container-item" prop="in_stock">
                    <el-row justify="center" align="middle">
                      <el-col><el-input v-model.trim="postForm.in_stock" style="width:220px"></el-input></el-col>
                    </el-row> 
                  </el-form-item>
                  </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="封面图片:" >
          <el-row :gutter=10>
            <el-col  v-model="postForm.cover_image" :md="9" :lg="8" :xl="5">
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
        <el-form-item style="margin-bottom: 40px;" prop="news_url" label="Url地址" label-width="100px">
          <el-input  v-model.trim="postForm.news_url" :maxlength="100" style="width:80%">
          </el-input>
          <p>*URL链接有内容时，文本编辑器内的内容不显示</p>
        </el-form-item>
        
          <el-row>
            <el-col :span='10'>
              <el-form-item style="margin-bottom: 40px;" prop="" label="附加阅读量" label-width="100px">
              <el-input name="name" v-model.trim="postForm.add_read_count" required :maxlength="100" style="width:20%">
              </el-input>
               </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item style="margin-bottom: 40px;" prop="" label="状态" label-width="100px" required>
              <el-radio v-model="postForm.show_flag" label='1'>可见</el-radio>
              <el-radio v-model="postForm.show_flag" label='0'>隐藏</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
       
        <div class="editor-container" v-show="!postForm.news_url">
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
  title: '', // 标题
  news_url: '', // 跳转地址
  modify_time: '', // 修改时间
  create_by: 0, // 创建人
  modified_by: 0, // 修改人
  content: '', // 跳转的落地页内容
  news_type: 1, // 新闻类型
  add_read_count: 0, // 附加阅读量
  order_num: null, // 排序序号
  cover_image: '', // 封面图
  price: null, // 价格
  show_flag: '1', // 是否显示
  create_time: '', // 创建时间
  keywords: '', // 标签
  sale_count: 0, // 销量
  coupon: 0, // 优惠金额
  freight: 0, // 运费
  in_stock: 0 // 库存
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
    const validateRequire = (rule, value, callback) => { // 对排序序号的验证规则
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
    const validatePrice = (rule, value, callback) => { // 对价格的验证规则
      var reg = /^[0-9]+(\.\d+)?$/
      if (value) {
        if (!reg.test(value)) {
          this.$message({
            message: '价格必须大于等于0的两位小数',
            type: 'error'
          })
        } else {
          this.postForm.price = (1 * value).toFixed(2) // 验证成功后将数字截取为2位
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
        { label: '活动', value: 3 },
        { label: '文章', value: 4 }
      ],
      loading1: false,
      pic1: '',
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        title: [{ required: true, message: '标题不能为空' }],
        news_type: [{ required: true, message: '新闻类型不能为空' }],
        price: [
          { required: true, message: '价格不能为空' },
          { validator: validatePrice, trigger: 'blur' }
        ],
        create_time: [{ required: true, message: '发布时间不能为空' }],
        order_num: [
          // { required: true, message: '序号不能为空' },
          { validator: validateRequire, trigger: 'blur' }
        ],
        news_url: [{ validator: validateSourceUri }]
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
    this.postForm.show_flag = '1'
    this.postForm.news_url = ''
    if (!this.isEdit) {
      // this.postForm.create_time = this.formatDateTime(new Date())
      this.postForm.create_time = new Date()
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
        this.postForm.cover_image = response.data.data.cover_image
        this.postForm.price = response.data.data.price
        this.pic1 = response.data.data.cover_image
        this.postForm.order_num = response.data.data.order_num
        this.postForm.news_url = response.data.data.news_url
        this.postForm.content = response.data.data.content
        this.postForm.create_time = response.data.data.create_time
        this.postForm.add_read_count = response.data.data.add_read_count
        this.postForm.show_flag = response.data.data.show_flag.toString()
        this.postForm.news_type = response.data.data.news_type
        this.postForm.keywords = response.data.data.keywords
        this.postForm.sale_count = response.data.data.sale_count
        this.postForm.coupon = response.data.data.coupon
        this.postForm.freight = response.data.data.freight
        this.postForm.in_stock = response.data.data.in_stock
      }).catch(err => {
        console.log('Article/ArticleDetail.vue -> getArticle error!')
        console.log(err)
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (this.postForm.news_type === 3 && !this.postForm.cover_image) {
            this.$message({
              message: '活动信息必须上传图片',
              type: 'warning'
            })
            return
          }
          this.postForm.show_flag = parseInt(this.postForm.show_flag)
          // this.postForm.create_time = this.formatDateTime(this.postForm.create_time)
          this.postForm.create_time = this.formatTime(this.postForm.create_time)
          if (!this.postForm.news_url) {
            var html1 = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>' + this.postForm.title + '</title><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /><style>img{max-width: 100%;}p{word-wrap:break-word;width:95%;margin:0 auto;}</style></head><body>'
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
            this.postForm.cover_image = res.data.data[0]
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

