<template>
  <div>
    <svg-icon icon-class="feedback_time" />
    <lang-select class="fixed top-10px right-10px" />

    <a-form ref="formRef" :model="model" :rules="rules" v-bind="formItemLayout">
      <form-item label="Plain Text">
        <span class="ant-form-text">China</span>
      </form-item>
      <form-item
        name="input"
        label="Input"
        tip="Input"
        :rules="[{ required: true, message: 'Please select your country!' }]"
      >
        <a-input v-model:value="model.input" />
      </form-item>
      <a-form-item
        name="select"
        label="Select"
        has-feedback
        :rules="[{ required: true, message: 'Please select your country!' }]"
      >
        <a-select v-model:value="model.select" placeholder="Please select a country">
          <a-select-option value="china">China</a-select-option>
          <a-select-option value="usa">U.S.A</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        name="selectMultiple"
        label="Select[multiple]"
        :rules="[
          { required: true, message: 'Please select your favourite colors!', type: 'array' },
        ]"
      >
        <a-select
          v-model:value="model.selectMultiple"
          mode="multiple"
          placeholder="Please select favourite colors"
        >
          <a-select-option value="red">Red</a-select-option>
          <a-select-option value="green">Green</a-select-option>
          <a-select-option value="blue">Blue</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="InputNumber">
        <a-form-item name="number" no-style>
          <a-input-number v-model:value="model.number" :min="1" :max="10" />
        </a-form-item>
        <span class="ant-form-text">machines</span>
      </a-form-item>

      <a-form-item name="switch" label="Switch">
        <a-switch v-model:checked="model.switch" />
      </a-form-item>

      <a-form-item name="radio" label="Radio.Group">
        <a-radio-group v-model:value="model.radio">
          <a-radio value="a">item 1</a-radio>
          <a-radio value="b">item 2</a-radio>
          <a-radio value="c">item 3</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item name="checkbox" label="Checkbox">
        <a-checkbox v-model:checked="model.checkbox" />
      </a-form-item>

      <a-form-item name="checkboxGroup" label="Checkbox.Group">
        <a-checkbox-group v-model:value="model.checkboxGroup">
          <a-row>
            <a-col :span="8">
              <a-checkbox value="a" style="line-height: 32px">A</a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="b" style="line-height: 32px" disabled>B</a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="c" style="line-height: 32px">C</a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="d" style="line-height: 32px">D</a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="e" style="line-height: 32px">E</a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="f" style="line-height: 32px">F</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>

      <!-- <a-form-item name="upload" label="Upload" extra="longgggggggggggggggggggggggggggggggggg">
        <a-upload
          v-model:fileList="model.upload"
          name="logo"
          action="/upload.do"
          list-type="picture"
        >
          <a-button>
            <template #icon><UploadOutlined /></template>
            Click to upload
          </a-button>
        </a-upload>
      </a-form-item> -->

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" @click="onSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup name="Home">
  import type { FormInstance } from 'ant-design-vue';
  import { hotMusic1 } from '@/apis/free';

  hotMusic1({ format: 'json' });

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const formRef = ref<FormInstance>();

  const model = ref({
    input: 'pinna',
    select: 'china',
    selectMultiple: [],
    number: 3,
    switch: false,
    radio: 'a',
    checkbox: true,
    checkboxGroup: ['a', 'b'],
    upload: [],
  });

  const rules = ref({});

  const onSubmit = useDebounceFn(() => {
    const { validate } = unref(formRef)!;
    validate()
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 150);

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
