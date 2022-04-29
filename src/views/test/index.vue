<template>
  <div class="test-sticky" ref="testRef">
    <div :class="{ head: !0, fixed: fixed }">HEAD</div>
    <div :class="{ acts: !0, fixed: fixed }">ACTS</div>
    <div :class="{ backend: !0, changed: fixed }">
      <div class="tabs">TABS</div>
      <div class="content">
        Content1<br />
        Content2<br />
        Content3<br />
        Content4<br />
        Content5<br />
        Content6<br />
        Content7<br />
        Content8<br />
        Content9<br />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="index">
  const testRef = ref<Element>();
  const scrollTop = ref(0);

  const fixed = computed(() => {
    return unref(scrollTop) > 10;
  });

  watch(
    () => fixed.value,
    (n, o) => {
      if (n && !o) {
        console.log(unref(scrollTop));
      }
    },
  );

  const onScroll = (e: Event) => {
    scrollTop.value = (e.target as Element).scrollTop;
    console.log(scrollTop.value);
  };
  const {} = useEventListener(testRef, 'scroll', onScroll);
</script>

<style lang="scss" scoped>
  .test-sticky {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background-color: azure;

    .head {
      width: 96%;
      height: 80px;
      border: 1px solid aqua;
      background-color: #ffffff;
      text-align: right;
      &.fixed {
        position: fixed;
        top: 0px;
        transition: all 0.28s ease-in-out;
      }
    }

    .acts {
      width: 96%;
      height: 56px;
      border: 1px solid cadetblue;
      // background-color: #ffffff;
      &.fixed {
        position: fixed;
        top: 0px;
        z-index: 9;
        transition: all 0.28s ease-in-out;
      }
    }

    .backend {
      width: 96%;
      min-height: 0;
      position: relative;

      .tabs {
        width: 100%;
        height: 40px;
        border: 1px solid wheat;
        background-color: #ffffff;
      }

      .content {
        width: 100%;
        height: 1400px;
        padding-top: 16px;
        background-color: green;
      }

      &.changed {
        padding-top: 120px;
        // transition: all 0.28s ease-in-out;
        .tabs {
          width: 96%;
          position: fixed;
          top: 56px;
          z-index: 9;
          // transition: all 0.28s ease-in-out;
        }
        .content {
          padding-top: 56px;
          // transition: all 0.28s ease-in-out;
        }
      }
    }
  }
</style>
