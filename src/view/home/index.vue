<template>
    <section class="wrap">
        <contents @popupForm='popupForm'></contents>
        <Modal v-model="formShow" title="填写信息加入丝润墙布" @on-ok='asyncOK' @on-cancel='cancel'>
            <user-form ref='userForm' @invalidate='invalidate'></user-form>
        </Modal>
        <footers></footers>
    </section>
</template>
<script>
import Contents from 'components/home/new-content'
import Footers from 'components/home/footer'
import UserForm from 'base/userForm'
export default {
    components: {
        Contents,
        UserForm,
        Footers
    },
    data() {
        return {
            formShow: false
        }
    },
    methods: {
        asyncOK() {
            const child = this.$refs.userForm;
            if (!child.formValidate.name || !child.formValidate.phoneNo) {
                this.$Message.warning('请填写完信息再提交哟');
                this.invalidate();
                return
            }
            this.$refs.userForm.handleSubmit();
        },
        cancel() {
            this.$refs.userForm.handleReset();
        },
        invalidate() {
            setTimeout(_ => {
                this.formShow = true;
            }, 500);
        },
        popupForm() {
            this.formShow = true;
        }
    },
    mounted() {
        let signOk = sessionStorage.getItem('signOK');
        if (!signOk) {
            this.formShow = true;
        } else {
            this.formShow = false;
        }
    }
}
</script>

