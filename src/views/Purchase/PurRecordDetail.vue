<template>
    <div class='PurRecordDetail'>
        <el-row class="content">
            <el-col :span='4'>
                <div>ID</div>
            </el-col>
            <el-col :span='20'>
                <div><input type="text" v-model="data.userId"></div>
            </el-col>
        </el-row>
        <el-row class="content">
            <el-col :span='4'>
                <div>认购地址</div>
            </el-col>
            <el-col :span='20'>
                <div>{{data.userEthAddress}}</div>
            </el-col>
        </el-row>
        <el-row class="content">
            <el-col :span='4'>
                <div class="name">认购ETH</div>
            </el-col>
            <el-col :span='6'>
                <div class="name"><input type="text" :disabled="true" v-model='data.amountEth'></div>
            </el-col>
            <el-col :span='4'>
                <div class="name">确认ETH</div>
            </el-col>
            <el-col :span='6'>
                <div class="name"><input type="text" v-model='ETHCount'></div>
            </el-col>
        </el-row>
        <el-row class="content">
            <el-col :span='4'>
                <div class="name">认购ABO</div>
            </el-col>
            <el-col :span='6'>
                <div class="name"><input type="text" :disabled="true" v-model='data.amountAbo'></div>
            </el-col>
            <el-col :span='4'>
                <div class="name">确认ABO</div>
            </el-col>
            <el-col :span='6'>
                <div class="name"><input type="text" v-model='aboCount'></div>
            </el-col>
        </el-row>
        <el-row class="content">
            <el-col :span='4'>
                <div class="passportId">护照编号</div>
            </el-col>
            <el-col :span='20'>
                <div class="passportId">{{data.passportId}}</div>
            </el-col>
        </el-row>
        <el-row class="content">
            <el-col :span='4'>
                <div class="isKYC">确认到账</div>
            </el-col>
            <el-col :span='20'>
                <el-radio v-model="isKYC" label="1">已确认</el-radio>
                <el-radio v-model="isKYC" label="2">待确认</el-radio>
            </el-col>
        </el-row>
        <el-row class="content">
            <el-col :span='4'>
                <div class="isTransfer">是否划拨</div>
            </el-col>
            <el-col :span='20'>
                <el-radio v-model="isTransfer" label="1">划拨</el-radio>
                <el-radio v-model="isTransfer" label="2">未划拨</el-radio>
            </el-col>
        </el-row>
        <el-row class="content">
            <el-col :span='6' :offset="4">
                <el-button type="primary" size="medium">提交</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'PurRecordDetail',
  props: {
    data: {}
  },
  data () {
    return {
      isKYC: '0',
      textarea: '',
      ETHCount: 0,
      aboCount: 0,
      isTransfer: 0
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.PurRecordDetail {
  width: 85%;
  margin: 3% auto;
}

.content {
  margin-bottom: 20px;
}

img {
  width: 100%;
}
p {
  text-align: center;
  margin: 0;
}
</style>
