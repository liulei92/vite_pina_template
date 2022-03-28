<template>
  <div>
    <svg-icon icon-class="feedback_time" />
    <lang-select />
  </div>
</template>

<script lang="ts" setup>
  import { hotMusic1 } from '@/apis/free';
  import { useCommonStore } from '@/store/modules/common';

  const { pageOneList, fetchPageOne } = useCommonStore();

  hotMusic1({ format: 'json' });
  fetchPageOne({ page: 0, limit: 10 });

  watch(
    pageOneList!,
    (n) => {
      if (n) {
        console.log(n);
      }
    },
    { deep: true },
  );

  // export default defineComponent({
  //   name: 'Index',
  //   components: {},
  //   props: {},
  //   emits: [],
  //   setup() {
  //     page_one_list({ page: 0, limit: 10 });
  //     hotMusic1({ format: 'json' });
  //     return {};
  //   },
  // });
</script>

<style lang="scss" scoped></style>
