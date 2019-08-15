<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="称呼" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入您的姓名"></Input>
        </FormItem>
        <FormItem label="电话" prop="phoneNo">
            <Input v-model="formValidate.phoneNo" placeholder="请输入您的电话"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="formValidate.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请描述您的需求..."></Input>
        </FormItem>
    </Form>
</template>
<style lang="less">
.ivu-modal-header p,
.ivu-form .ivu-form-item-label,
.ivu-modal-header-inner {
    font-size: 20px;
}
</style>

<script>
import global from 'assets/js/global'
export default {
    data() {
        return {
            formValidate: {
                name: '',
                phoneNo: '',
                describe: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '称呼不能为空 ...', trigger: 'blur' }
                ],
                phoneNo: [
                    { required: true, message: '请填写电话号码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (!global.IsPhone(this.formValidate.phoneNo)) {
                        this.$Message.error('请填写正确的电话号码');
                        this.$emit('invalidate');
                        return
                    }
                    this.submit();
                }
            })
        },
        handleReset() {
            this.$refs['formValidate'].resetFields();
        },
        submit() {
            this.$http.clientInfo(this.formValidate).then(res => {
                let { success, data, msg } = res;
                if (success) {
                    this.$Message.success('信息提交成功!');
                    // 成功填写用户表 标记
                    sessionStorage.setItem('signOK', true);
                } else {
                    this.$Message.warning('用户需求提交失败，原因： ' + msg);
                }
            })
        }
    }
}
</script>
