<template>
  <div id="app" class="waterfall">
    <div class="column" ref="column1">
      <div class="column-box" v-for="item in columsData[0]" :key="item.name">
        <h1>{{ item.name }}</h1>
        <p v-for="post in item.posts" :key="post" v-text="post"></p>
      </div>
    </div>
    <div class="column" ref="column2">
      <div class="column-box" v-for="item in columsData[1]" :key="item.name">
        <h1>{{ item.name }}</h1>
        <p v-for="post in item.posts" :key="post" v-text="post"></p>
      </div>
    </div>
    <div class="column" ref="column3">
      <div class="column-box" v-for="item in columsData[2]" :key="item.name">
        <h1>{{ item.name }}</h1>
        <p v-for="post in item.posts" :key="post" v-text="post"></p>
      </div>
    </div>
  </div>
</template>

<script>
import bars from "@/mock/index";
import bars2 from "@/mock/index2";
const BOX_MAX_HEIGHT = 125;
export default {
  data: () => ({
    bars,
    columsData: [[], [], []]
  }),
  watch: {
    bars: {
      immediate: true,
      handler: function(newBars, oldBars) {
        let isFirst = !oldBars ? true : false;
        if (isFirst) {
          oldBars = [];
        }
        if (newBars.length === oldBars.length) {
          return;
        }
        let t = 0;
        // 不考虑数据减少的情况
        for (let i = oldBars.length; i < newBars.length; ++i) {
          if (t === 3) {
            t = 0;
          }
          this.columsData[t++].push(newBars[i]);
        }
        if (isFirst) {
          return;
        }
        this.$nextTick(() => {
          this.adjust();
        });
      }
    }
  },
  mounted() {
    this.adjust();
    setTimeout(() => {
      this.bars = [...this.bars, ...bars2];
    }, 3000);
  },
  methods: {
    findMostValue(arr) {
      let t_index = -1;
      let s_index = -1;
      let tallest = -Infinity;
      let shortest = Infinity;
      for (let i = 0; i < arr.length; ++i) {
        if (shortest > arr[i]) {
          shortest = arr[i];
          s_index = i;
        }
        if (tallest < arr[i]) {
          tallest = arr[i];
          t_index = i;
        }
      }
      return [t_index, s_index, tallest, shortest];
    },
    adjust() {
      // 调整
      const heights = [];
      for (let i = 0; i < 3; ++i) {
        heights[i] = this.$refs[`column${i + 1}`].offsetHeight;
      }
      let [t_index, s_index, tallest, shortest] = this.findMostValue(heights);
      if (t_index === s_index || tallest - shortest < BOX_MAX_HEIGHT) {
        return;
      }
      let t = 0;
      const MAX_CALL_TIME = 3;
      while (t++ < MAX_CALL_TIME && t_index !== s_index && tallest - shortest >= BOX_MAX_HEIGHT) {
        this.columsData[s_index].push(
          ...this.columsData[t_index].splice(
            this.columsData[t_index].length - 1,
            1
          )
        );
        heights[s_index] += BOX_MAX_HEIGHT;
        heights[t_index] -= BOX_MAX_HEIGHT;
        [t_index, s_index, tallest, shortest] = this.findMostValue(heights);
      }
    }
  }
};
</script>

<style lang="scss">
.waterfall {
  width: 1080px;
  overflow: hidden;

  .column {
    float: left;
    width: 340px;
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }

    &-box {
      width: 100%;
      background: rgb(170, 201, 247);
      border-radius: 10px;
    }
  }
}
</style>
