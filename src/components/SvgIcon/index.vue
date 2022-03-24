<!--
 * @Description: svg-icon
 * @Date: 2020-12-29 10:38:29
 * @Author: LeiLiu
-->
<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'SvgIcon',
    props: {
      iconClass: {
        type: String,
        required: true,
      },
      className: String,
    },
    setup(props) {
      return {
        iconName: computed(() => {
          return `#icon-${props.iconClass}`;
        }),
        svgClass: computed(() => {
          const cls = ['svg-icon', props.iconClass];
          if (props.className) {
            cls.push(props.className);
          }
          return cls.filter((s) => !!s).join(' ');
        }),
      };
    },
  };
</script>

<style lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    &:focus {
      outline: none;
    }
  }
</style>
