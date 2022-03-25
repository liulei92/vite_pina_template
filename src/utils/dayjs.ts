/*
 * @Description: dayjs.ts 使用扩展的 dayjs
 * @Date: 2021-12-10 09:29:13
 * @Author: LeiLiu
 */
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isMoment from 'dayjs/plugin/isMoment';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import badMutable from 'dayjs/plugin/badMutable';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(weekYear);
dayjs.extend(weekOfYear);
dayjs.extend(isMoment);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(badMutable);

export default dayjs;
