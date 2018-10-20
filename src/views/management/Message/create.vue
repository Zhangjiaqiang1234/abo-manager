<template>
  <article-detail :is-edit='false'></article-detail>
</template>

<script>
import ArticleDetail from './messageDetail'

export default {
  name: 'createArticle',
  components: { ArticleDetail }
}
</script>

