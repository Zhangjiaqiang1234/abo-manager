<template>
  <banner-detail :is-edit='false'></banner-detail>
</template>

<script>
import BannerDetail from './BannerDetail'

export default {
  name: 'createBanner',
  components: { BannerDetail }
}
</script>

