<template>
  <div>
    <svg-icon icon-class="feedback_time" />
    <lang-select class="fixed top-10px right-10px" />
    {{ model }}
    <a-row>
      <a-col :span="12">
        <a-form
          ref="formRef"
          :model="model"
          :rules="rules"
          :scrollToFirstError="true"
          v-bind="formItemLayout"
        >
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

          <checkbox-item
            name="checkbox"
            label="Checkbox"
            render="萌白DS"
            trueVal="萌"
            falseVal="白"
            v-model:checked="model.checkbox"
          />

          <checkbox-group-item
            name="checkboxGroup"
            label="Checkbox.Group"
            v-model:value="model.checkboxGroup"
            :options="[
              { label: 'AA', value: 'a' },
              { label: 'BB', value: 'b', disabled: true },
              { label: 'CC', value: 'c' },
              { label: 'DD', value: 'd' },
              { label: 'EE', value: 'e' },
            ]"
          />

          <form-item name="date-picker" label="DatePicker" v-bind="config">
            <a-date-picker v-model:value="model['date-picker']" value-format="YYYY-MM-DD" />
          </form-item>
          <form-item name="date-time-picker" label="DatePicker[showTime]" v-bind="config">
            <a-date-picker
              v-model:value="model['date-time-picker']"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </form-item>
          <form-item name="range-time-picker" label="RangePicker[showTime]" v-bind="rangeConfig">
            <a-range-picker
              v-model:value="model['range-time-picker']"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </form-item>
          <form-item name="time-picker" label="TimePicker" v-bind="config">
            <a-time-picker v-model:value="model['time-picker']" value-format="HH:mm:ss" />
          </form-item>

          <upload-item
            name="upload"
            label="Upload"
            extra="longgggggggggggggggggggggggggggggggggg"
            fileFieldName="file"
            v-model:fileList="model.upload"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="{
              authorization: 'authorization-text',
            }"
            list-type="picture"
            @change="uploadChange"
          >
            <template #render>
              <a-button>
                <template #icon><UploadOutlined /></template>
                Click to upload
              </a-button>
            </template>
          </upload-item>

          <buttons-item
            :wrapper-col="{ span: 12, offset: 6 }"
            :okButton="{ text: 'Submit', loading: okLoading }"
            :resetButton="{ text: 'Reset' }"
            @ok="onSubmit"
            @reset="onReset"
          />
        </a-form>
      </a-col>

      <a-col :span="12">
        <h3 class="text-center">useFormRef</h3>
        <a-form :model="model2" :rules="rules2" v-bind="{ ...formRef2 }">
          <input-item name="id" label="ID" tip="ID" v-model:value="model2.id" @change="inputChange">
            <template #suffix>
              <a-tooltip title="Extra information">
                <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
              </a-tooltip>
            </template>
          </input-item>
          <input-item name="phone" label="Phone" tip="Phone" v-model:value="model2.phone" />
          <select-item
            v-if="false"
            name="select"
            label="Select"
            has-feedback
            v-model:value="model2.select"
            placeholder="Please select a country"
            :options="[
              { title: 'China', value: 'china' },
              { title: 'U.S.A', value: 'usa' },
            ]"
          />
          <checkbox-group-item
            name="fulij"
            label="Fulij"
            v-model:value="model2.fulij"
            :options="[
              { label: 'AA', value: 'aa' },
              { label: 'BB', value: 'bb', disabled: true },
              { label: 'CC', value: 'cc' },
              { label: 'DD', value: 'dd' },
              { label: 'EE', value: 'ee' },
            ]"
          />
          <buttons-item
            :wrapper-col="{ span: 12, offset: 6 }"
            okText="Submit"
            resetText="Reset"
            @ok="onSubmit2"
            @reset="onReset2"
          />
        </a-form>
      </a-col>
    </a-row>

    <ColorPicker v-model:value="colorRef" />
  </div>
</template>

<script lang="ts" setup name="Home">
  import type { FormInstance, UploadChangeParam } from 'ant-design-vue';
  import type { Rule /* , RuleObject */ } from 'ant-design-vue/es/form';
  import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
  import { hotMusic1 } from '@/apis/free';
  import { testForm } from '@/apis/common';
  import { useFormRef } from '@/hooks/useFormRef';

  hotMusic1({ format: 'json' });

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  /* form1 */
  const formRef = ref<FormInstance>();

  const model = reactive({
    input: 'pinna',
    select: 'china',
    selectMultiple: ['red'],
    number: 3,
    switch: false,
    radio: 'a',
    checkbox: '白',
    checkboxGroup: ['a', 'b'],
    'date-picker': undefined,
    'date-time-picker': undefined,
    'range-time-picker': undefined,
    'time-picker': undefined,
    upload: [],
  });

  const rules = reactive({});

  const config = {
    rules: [{ type: 'string' as const, required: true, message: 'Please select time!' }],
  };
  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
  };

  const inputChange = (...arg) => {
    console.log(arg);
  };

  const okLoading = ref(false);

  const onSubmit = useDebounceFn(async () => {
    const { validate } = unref(formRef)!;
    okLoading.value = true;
    return validate()
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          okLoading.value = false;
        }, 250);
      });
  }, 150);

  const onReset = useDebounceFn(() => {
    const { resetFields } = unref(formRef)!;
    resetFields();
  });

  const uploadChange = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const {
    model: model2,
    rules: rules2,
    updateModel,
    resetOriginalFields,
    initForm,
    submitForm,
    ...formRef2
  } = useFormRef(
    {
      id: '',
      phone: '',
      select: 'china',
      fulij: ['aa'],
    },
    {
      id: [
        { required: true, message: 'Please input your id!' },
        {
          min: 3,
          max: 5,
          message: 'Length should be 3 to 5',
          // trigger: 'blur',
        },
      ],
      phone: [
        { required: true, message: 'Please input your phone!' },
        {
          validator: async (_rule: Rule, value: string) => {
            if (unref(model2).id === '3333') return Promise.resolve();
            if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
              return Promise.reject('Please input right phone number');
            }
            return Promise.resolve();
          },
        },
      ],
      select: [{ required: true, message: 'Please select your select!' }],
    },
    {
      ...formItemLayout,
    },
  );

  // 异步更新
  const { reinit } = initForm(
    () =>
      testForm().then((res) => {
        updateModel(res, !0);
      }),
    { immediate: true },
  );

  const onSubmit2 = useDebounceFn(() => {
    // unref(formRef2)!
    //   .validate()
    //   .then((values) => {
    //     console.log(toRaw(values));
    //     console.log(model2.value);
    //   })
    //   .catch((err) => {
    //     console.log('error', err);
    //   });
    submitForm()
      .then((values) => {
        console.log(toRaw(values));
        console.log(model2.value);
        reinit();
      })
      .catch(() => {
        console.log(1);
      });
  }, 150);

  const onReset2 = useDebounceFn(() => {
    resetOriginalFields();
  }, 150);

  const colorRef = ref('rgba(51,51,51,1)');

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
