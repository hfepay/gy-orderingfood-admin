<template>
  <div>
    <!--table模板-->
    <base-table-layout
      :page-obj="Mixins_$PageObj"
      :headers="Headers"
      :data="Mixins_$TableData"
      @sizeChange="Mixins_$SizeChange"
      @currentChange="Mixins_$CurrentChange"
    >
      <template slot="layout-operate">
        <el-button type="primary" @click="Mixins_$Add">
          新增
        </el-button>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" @click.stop="Mixins_$Del(scope.row)">
          删除
        </el-button>
        <el-button @click.stop="manageBusiness(scope.row)">
          管理角色
        </el-button>
      </template>
    </base-table-layout>
    <base-dialog
      :title="DialogForm['id']?'修改':'新增'"
      top="5vh"
      width="500px"
      :visible.sync="Mixins_$DialogVisible"
      center
      @closed="Mixins_$Reset"
    >
      <base-form
        ref="form"
        :model="DialogForm"
        :form-headers="DialogFormHeader"
        :rules="DialogFormRules"
        label-width="120px"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      >
        <template #logoImg>
          <el-form-item label="商户logo" prop="logoImg">
            <base-upload
              v-if="Mixins_$DialogVisible"
              :value="DialogForm.logoImg"
              :show-file-list="false"
              @success="logoImgSuccess"
            />
          </el-form-item>
        </template>
        <template #qualityImg>
          <el-form-item label="营业执照" prop="qualityImg">
            <base-upload
              v-if="Mixins_$DialogVisible"
              :value="DialogForm.qualityImg"
              :show-file-list="false"
              @success="qualityImgSuccess"
            />
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
    <base-dialog
      title="角色管理"
      top="5vh"
      width="600px"
      :visible.sync="RoleDialogVisible"
      center
      @closed="Mixins_$Reset"
    >
      <role-transfer
        v-model="RoleDialogForm.roles"
        :data="rolesList"
        filterable
        :titles="['可选用户', '已选用户']"
        @left-check-change="leftCheckChange"
        @right-check-change="rightCheckChange"
      />
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeBusinessApi'
import RoleTransfer from '@/views/components/Transfer/RoleTransfer'
import TradeUserToBusinessApi from '@/api/module/trade/TradeUserToBusinessApi'

export default {
  name: 'Business',
  components: { RoleTransfer },
  mixins: [Mixins],
  data() {
    return {
      ApiObject: ApiObject,
      RoleDialogVisible: false,
      DialogFormHeader: [
        { label: '商户全称', prop: 'businessName' },
        { label: '商户简称', prop: 'businessShortName' },
        { label: '商户logo', slot: 'logoImg' },
        { label: '商户电话', prop: 'mobile' },
        { label: '商户地址', prop: 'address' },
        { label: '商户简介', type: 'textarea', prop: 'introduction' },
        { label: '营业执照', slot: 'qualityImg' }
      ],
      DialogForm: {},
      RoleDialogForm: {
        id: '',
        roles: []
      },
      rolesList: [],
      DialogFormRules: {
        businessName: [{ required: true, message: '必填项不能为空' }],
        businessShortName: [{ required: true, message: '必填项不能为空' }],
        mobile: [{ required: true, message: '必填项不能为空' }],
        address: [{ required: true, message: '必填项不能为空' }],
        qualityImg: [{ required: true, message: '必填项不能为空' }]
      },
      Headers: [
        { type: 'index', label: '序号' },
        { label: '商户全称', prop: 'businessName' },
        { label: '商户简称', prop: 'businessShortName' },
        { label: '商户电话', prop: 'mobile' },
        { label: '商户地址', prop: 'address' },
        { label: '操作', slot: 'operator', width: 240 }
      ]
    }
  },
  methods: {
    async manageBusiness(row) {
      this.RoleDialogForm.id = row.id
      const [rolesRes, rolesListRes] = await Promise.all(
        [TradeUserToBusinessApi.get(row.id), TradeUserToBusinessApi.list()])
      this.rolesList = [...(rolesRes.data || []), ...(rolesListRes.data || [])].map(item => ({ key: item.id, label: item.account }))
      this.roles = rolesRes.data
      this.RoleDialogVisible = true
    },
    qualityImgSuccess(res) {
      const data = res.data
      this.DialogForm.qualityImg = data.imgName
    },
    logoImgSuccess(res) {
      const data = res.data
      this.DialogForm.logoImg = data.imgName
    },
    async leftCheckChange(item, key) {
      try {
        await TradeUserToBusinessApi.setRole(+key, this.RoleDialogForm.id)
        this.RoleDialogForm.roles.push(...key)
        this.$message.success('添加用户成功')
      } catch (e) {
        this.manageBusiness(this.RoleDialogForm)
      }
    },
    async rightCheckChange(item, key) {
      try {
        await TradeUserToBusinessApi.setRole(+key, this.RoleDialogForm.id)
        const index = this.RoleDialogForm.roles.indexOf(key + '')
        if (index > -1) {
          this.RoleDialogForm.roles.splice(index, 1)
        }
        this.$message.success('移除用户成功')
      } catch (e) {
        this.manageBusiness(this.RoleDialogForm)
      }
    }
  }
}
</script>
