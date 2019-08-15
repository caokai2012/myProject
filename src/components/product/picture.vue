<template>
    <pic :pictures='pictures' :modalWidth='60' :modalStyle='modalStyle'>
    </pic>
</template>
<script>
import Pic from 'base/pictureModal'
export default {
    data() {
        return {
            modalStyle: {
                width: '100%',
                height: '100%'
            }
        }
    },
    components: {
        Pic
    },
    props: ['pictures']
}
</script>
