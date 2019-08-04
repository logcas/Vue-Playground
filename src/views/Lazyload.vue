<template>
  <div v-lazy-container="{ selector: 'img' }" v-html="rawHtml">
  </div>
</template>

<script>
import images from '@/mock/images';
export default {
  data: () => ({
    images,
    rawHtml: ''
  }),
  created() {
    for(let i = 0;i < images.length; ++i) {
      this.rawHtml += `<img style="height: 350px;width: 500px;" data-src="${images[i]}" />`
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 500px;
  height: 350px;
}
</style>
