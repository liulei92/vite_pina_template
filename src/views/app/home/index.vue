<template>
  <div>
    <svg-icon icon-class="feedback_time" />
    <lang-select class="fixed top-10px right-10px" />
    {{ model }}
    <a-form ref="formRef" :model="model" :rules="rules" v-bind="formItemLayout">
      <form-item label="Plain Text" tip="Plain Text">
        <span class="ant-form-text">China</span>
      </form-item>
      <input-item
        name="input"
        label="Input"
        tip="Input"
        :rules="[{ required: true, message: 'Please select your country!' }]"
        v-model:value="model.input"
        @change="inputChange"
      >
        <template #suffix>
          <a-tooltip title="Extra information">
            <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
          </a-tooltip>
        </template>
      </input-item>
      <select-item
        name="select"
        label="Select"
        has-feedback
        :rules="[{ required: true, message: 'Please select your country!' }]"
        v-model:value="model.select"
        placeholder="Please select a country"
        :options="[
          { title: 'China', value: 'china' },
          { title: 'U.S.A', value: 'usa' },
        ]"
      />
      <select-item
        name="selectMultiple"
        label="Select[multiple]"
        :rules="[
          { required: true, message: 'Please select your favourite colors!', type: 'array' },
        ]"
        v-model:value="model.selectMultiple"
        mode="multiple"
        placeholder="Please select favourite colors"
        :options="[
          { title: 'Red', value: 'red' },
          { title: 'Green', value: 'green' },
          { title: 'Blue', value: 'blue' },
        ]"
      />

      <form-item
        name="number"
        label="InputNumber"
        :rules="[{ required: true, message: 'Please input number!' }]"
      >
        <!-- <form-item name="number" no-style> -->
        <a-input-number v-model:value="model.number" :min="1" :max="10" />
        <!-- </form-item> -->
        <span class="ant-form-text">machines</span>
      </form-item>

      <switch-item name="switch" label="Switch" v-model:checked="model.switch" />

      <radio-group-item
        name="radio"
        label="Radio.Group"
        v-model:value="model.radio"
        optionType="button"
        :options="[
          { label: 'item 1', value: 'a' },
          { label: 'item 2', value: 'b' },
          { label: 'item 3', value: 'c' },
          { label: 'item 4', value: 'd' },
        ]"
        @change="inputChange"
      />

      <checkbox-item name="checkbox" label="Checkbox" v-model:checked="model.checkbox" />

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
  import { InfoCircleOutlined } from '@ant-design/icons-vue';
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
    selectMultiple: ['red'],
    number: 3,
    switch: false,
    radio: 'a',
    checkbox: true,
    checkboxGroup: ['a', 'b'],
    upload: [],
  });

  const rules = ref({});

  const inputChange = (...arg) => {
    console.log(arg);
  };

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
