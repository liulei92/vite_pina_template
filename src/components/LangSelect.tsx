/*
 * @Description: LangSelect
 * @Date: 2022-03-28 17:35:59
 * @Author: LeiLiu
 */
import { useCommonStore } from '@/store/modules/common';
import { Dropdown, Menu } from 'ant-design-vue';

export default defineComponent({
  name: 'LangSelect',
  setup() {
    const { language, setLanguage } = useCommonStore();

    function renderOverlay() {
      return (
        <Menu selectedKeys={[unref(language)]} style="width: 125px">
          <Menu.Item key="zh" onClick={() => setLanguage('zh')}>
            中文
          </Menu.Item>
          <Menu.Item key="en" onClick={() => setLanguage('en')}>
            English
          </Menu.Item>
        </Menu>
      );
    }

    return () => (
      <Dropdown overlay={renderOverlay()} placement="bottomRight" class="lang-select">
        <div>
          <span>{unref(language) === 'en' ? 'English' : '中文'}</span>
        </div>
      </Dropdown>
    );
  },
});
