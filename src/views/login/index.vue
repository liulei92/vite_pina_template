<template>
  <div class="login-page w-screen h-screen">
    <lang-select class="fixed top-10px right-10px" />
    <a-row class="container h-full mx-auto">
      <div class="flex w-full h-full">
        <a-col :span="12" class="introduce-box relative">
          <div class="logo flex items-center h-60px mt-20px">
            <img src="src/assets/svg/logo.svg" class="w-40px h-40px" alt="logo" />
            <span class="ml-8px text-20px text-white">Pinna</span>
          </div>
          <div class="info absolute top-1/2 transform -translate-y-1/2">
            <img src="src/assets/svg/login-box-bg.svg" class="w-3/5" alt="login-box-bg" />
            <div class="mt-40px text-20px text-white">{{ $t('Login_Motto') }}</div>
          </div>
        </a-col>
        <a-col :span="12" class="form-box !flex items-center">
          <a-form
            class="login-form w-7/10 !mx-auto enter-x"
            ref="formRef"
            layout="vertical"
            :model="model"
            :rules="rules"
            autocomplete="off"
            @finish="onFinish"
            @validate="onValidate"
            @finishFailed="onFinishFailed"
          >
            <div class="text-24px mb-20px enter-x">{{ $t('Login') }}</div>
            <a-form-item name="username" label="用户名称" class="enter-x">
              <a-input v-model:value="model.username" size="large">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password" label="密码" class="enter-x">
              <a-input-password v-model:value="model.password" size="large" @pressEnter="onSubmit">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item name="checked" label="" class="enter-x">
              <a-checkbox v-model:checked="checked">记住我</a-checkbox>
            </a-form-item>

            <a-form-item class="enter-x">
              <!-- <a-button type="primary" size="large" html-type="submit" class="w-full">
                {{ $t('Login') }}
              </a-button> -->
              <a-button type="primary" size="large" class="w-full" @click="onSubmit">
                {{ $t('Login') }}
              </a-button>
            </a-form-item>

            <a-row class="enter-x">
              <a-col :span="8">
                <a-button type="default" class="w-full">{{ $t('Mobile') }}</a-button>
              </a-col>
              <a-col :span="8" :offset="1">
                <a-button type="default" class="w-full">{{ $t('Qrcode') }}</a-button>
              </a-col>
              <a-col :span="6" :offset="1">
                <a-button type="default" class="w-full">{{ $t('Signup') }}</a-button>
              </a-col>
            </a-row>

            <a-divider>{{ $t('Login_With') }}</a-divider>

            <div class="login-ways flex justify-around">
              <GithubOutlined />
              <WechatOutlined />
              <AlipayOutlined />
              <GoogleOutlined />
              <TwitterOutlined />
            </div>
          </a-form>
        </a-col>
      </div>
    </a-row>
  </div>
</template>

<script lang="ts" setup name="Login">
  import {
    UserOutlined,
    LockOutlined,
    GithubOutlined,
    WechatOutlined,
    AlipayOutlined,
    GoogleOutlined,
    TwitterOutlined,
  } from '@ant-design/icons-vue';
  import type { FormInstance } from 'ant-design-vue';
  import type { RuleObject } from 'ant-design-vue/es/form';
  import { login } from '@/apis/user';
  import { useCommonStore } from '@/store/modules/common';

  // const layout = {
  //   labelCol: { span: 4 },
  //   wrapperCol: { span: 14 },
  // };

  const formRef = ref<FormInstance>();
  const model = ref({
    username: '',
    password: '',
  });
  const validatePass = async (_rule: RuleObject, value: string) => {
    if (value === '') {
      return Promise.reject('Please input Please input your password!');
    } else if (value.length < 8 || value.length > 16) {
      return Promise.reject("Password's length range is 8 to 16!");
    }
    return Promise.resolve();
  };
  const rules = ref({
    username: [
      {
        required: true,
        whitespace: true,
        message: 'Please input your username!',
      },
    ],
    password: [
      {
        required: true,
        whitespace: true,
        validator: validatePass,
      },
    ],
  });
  const checked = ref(false);

  const onFinish = (values: typeof model.value) => {
    console.log('Success:', values);
  };

  const onValidate = (...args: any[]) => {
    console.log(args);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const { setUserInfo } = useCommonStore();
  const router = useRouter();
  const onSubmit = useDebounceFn(() => {
    const { validate, scrollToField } = unref(formRef)!;
    validate()
      .then((values: typeof model.value) => {
        login(values)
          .then((res) => {
            setUserInfo(res);
            router.push('/app');
          })
          .catch((err) => {
            message.error(err);
          });
      })
      .catch((error) => {
        console.log(error);
        scrollToField(error.errorFields[0].name);
      });
  }, 150);
</script>

<style lang="scss" scoped>
  .login-page {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-image: url('src/assets/svg/login-bg.svg');
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      content: ' ';
    }
    .login-form {
      :deep(.ant-divider-inner-text) {
        font-size: 12px;
        opacity: 0.73;
      }
      .login-ways {
        .anticon {
          font-size: 22px;
          color: #888;
          cursor: pointer;
        }
      }
    }
  }
</style>
