<template>
  <article-detail :is-edit='false'></article-detail>
</template>

<script>
import ArticleDetail from './ArticleDetail'

export default {
  name: 'createArticle',
  components: { ArticleDetail }
}
</script>

