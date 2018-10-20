<template>
  <banner-detail :is-edit='true'></banner-detail>
</template>

<script>
import BannerDetail from './BannerDetail'

export default {
  name: 'editBanner',
  components: { BannerDetail }
}
</script>

