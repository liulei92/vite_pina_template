<template>
  <div class="color-picker">
    <a-popover
      v-model:visible="visible"
      title=""
      :placement="placement"
      :trigger="trigger"
      @visibleChange="visibleChange"
    >
      <template #content>
        <!-- 颜色选择 -->
        <Chrome v-model="color" :disableAlpha="false" :disableFields="true" />
        <!-- 按钮区 -->
        <div class="color-picker__btns">
          <span class="rgba">{{ rgba }}</span>
          <a-button size="small" style="width: 80px; font-size: 12px" @click="confirm"
            >确定</a-button
          >
        </div>
      </template>
      <!-- 颜色预览 -->
      <div class="color-picker__trigger pointer">
        <span class="color-picker__color" :style="{ backgroundColor: rgba }"></span>
        <up-outlined :class="visible ? 'open' : ''" />
      </div>
    </a-popover>
  </div>
</template>

<script lang="ts" setup name="ColorPicker">
  import { Chrome } from '@ckpack/vue-color';
  import { PopoverProps } from 'ant-design-vue';
  import { UpOutlined } from '@ant-design/icons-vue';

  // export interface ColorPickerProps extends Pick<PopoverProps, 'trigger' | 'placement'> {
  //   value: string;
  // }

  type Rgba = {
    r?: number;
    g?: number;
    b?: number;
    a?: number;
  };
  interface Color extends Rgba {
    rgba?: Rgba;
  }

  // 方案1
  // https://github.com/vuejs/core/issues/4294 richardvanbergen commented on 27 Jan
  const props = withDefaults(
    defineProps<{
      trigger?: PopoverProps['trigger'];
      placement?: PopoverProps['placement'];
      value: string;
    }>(),
    {
      trigger: 'click',
      placement: 'bottomRight',
      value: '',
    },
  );

  // 方案2
  // const props = defineProps({
  //   trigger: {
  //     type: [String, Array] as PropType<Trigger>,
  //     default: 'click',
  //   },
  //   placement: {
  //     type: String as PropType<Placement>,
  //     default: 'bottomRight',
  //   },
  //   value: {
  //     type: String as PropType<string>,
  //     required: true,
  //   },
  // });
  const emits = defineEmits(['change', 'update:value']);

  const color = ref<Color>({ r: 51, g: 51, b: 51, a: 1 });
  const rgba = computed(() => {
    const { r = 0, g = 0, b = 0, a = 1, rgba } = color.value;
    if (rgba) {
      return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  });
  const visible = ref(false);

  const computeColor = (n: string) => {
    const value = n.replace(/^rgba?\((.*)\)$/i, (_, $1) => $1).replace(/\s/g, '');
    const [r = '0', g = '0', b = '0', a = '1'] = value.split(',');
    color.value = { r: Number(r), g: Number(g), b: Number(b), a: Number(a) };
  };

  // 暂不验证value 默认支持 rgba和rgb
  watch(
    () => props.value,
    (n) => {
      if (n) {
        computeColor(n);
      }
    },
    { immediate: true },
  );

  const visibleChange = (visible: boolean) => {
    if (!visible && props.value !== rgba.value) {
      computeColor(props.value!);
    }
  };

  const confirm = () => {
    emits('update:value', rgba.value);
    emits('change', rgba.value);
    visible.value = false;
  };
</script>

<style lang="scss">
  .color-picker {
    width: 100px;
    &__trigger {
      display: flex;
      width: 100%;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #dddfe4;
      background-color: #ffffff;
      padding: 4px;
    }
    &__color {
      width: calc(100% - 24px);
      height: 100%;
      border: 1px solid #d8d8d8;
    }
    &__btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      margin-top: 15px;
      .rgba {
        font-size: 12px;
      }
    }
    .anticon-up {
      &:not(.open) {
        transform: rotate(180deg);
      }
      transition: transform 0.28s;
    }
  }
</style>
