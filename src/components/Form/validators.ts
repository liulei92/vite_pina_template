/*
 * @Description: validators
 * @Date: 2022-04-24 16:00:55
 * @Author: LeiLiu
 */
import type { Rule /* , RuleObject */ } from 'ant-design-vue/es/form';

export default {
  required: (message?: string) => {
    return { required: true, message: message ?? 'The item can not be empty!' };
  },
  rangeLength: ({ min, max }: { min: number; max: number }) => {
    return {
      min,
      max,
      message: `Length should be ${min} to ${max}`,
      // trigger: 'blur',
    };
  },
  maxLength: (max: number) => ({
    validator: async (_rule: Rule, value: string) => {
      if (value === undefined) return Promise.resolve();
      if (value.length > max) {
        return Promise.reject(`maxlength is ${max}`);
      }
      return Promise.resolve();
    },
  }),
  mobilePhone: () => ({
    validator: async (_rule: Rule, value: string) => {
      console.log(value);
      if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
        return Promise.reject('Please input right phone number');
      }
      return Promise.resolve();
    },
  }),
};
