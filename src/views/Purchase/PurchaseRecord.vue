<template>
    <div class='PurchaseRecord'>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border center style="width: 100%">
            <el-table-column prop="subId" label="序号" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="userEthAddress" label="认购钱包地址" min-width="150" align='center'>
            </el-table-column>
            <el-table-column prop="amountEth" label="认购ETH" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="confirmMoney" label="确认收款" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="auditTime" label="确认时间" width="100" align='center'>
            </el-table-column>
            <el-table-column prop="confirmETH" label="确认ETH" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="amountAbo" label="对应ABO" min-width="100" align='center'>
            </el-table-column>
            <el-table-column prop="transfer" label="是否划拨" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="transferTime" label="划拨时间" width="100" align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-table-column fixed="right" label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </div>
    </div>
</template>

<script>
import {getSubList} from '@/api/service.js'
export default {
  name: 'PurchaseRecord',
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      pageSizes: [5, 10, 20, 50, 100]
    }
  },
  mounted () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      getSubList()
        .then(res => {
          this.tableData = res.data.page.list
        })
    },
    handleClick (row) {
      this.$emit('childChangeTab2', {id: 5, data: row})
    },
    handleSizeChange () { },
    handleCurrentChange () { }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.PurchaseRecord {
    width: 95%;
    margin: 3% auto
}

.block {
    text-align: right;
    margin-top: 1%;
}
</style>
