/**
 * Created by gaolifa on 2017/6/22.
 */
import {validatorFunction} from './validatorFunction';

function createValidator(defaultOptions, validatorFunction, validatorFunctionType) {
    let validator = validatorFunction;
    return (options = defaultOptions) => (rule, value, callback) => {
        if (!value.length) {
            return callback();
        }
        if (validatorFunctionType === 'numberLength' || validatorFunctionType === 'characterLength' || validatorFunctionType === 'fixedCharacterLength') {
            validator = validatorFunction(options.length);
        }
        if (!validator(value, options)) {
            let errMsg;
            if (options.errMsg) {
                errMsg = options.errMsg;
            } else {
                if (validatorFunctionType === 'numberLength') {
                    errMsg = `输入不可全为空格且长度不可超过${options.length}`;
                }
                if (validatorFunctionType === 'characterLength') {
                    errMsg = `输入不可全为空格且长度不可超过${options.length / 2}个字/${options.length}个字符`;
                }
                if (validatorFunctionType === 'fixedCharacterLength') {
                    errMsg = `输入不可全为空格且长度必须为${options.length / 2}个字/${options.length}个字符`;
                }
                if (validatorFunctionType === 'numRange') {
                    errMsg = `请您输入 ${options.min}-${options.max} 的数字`;
                }
            }
            return callback(new Error(errMsg));
        }
        callback();
    };
}

export const validators = {
    // 数字长度不能大于10位
    validateNumberLength: createValidator({
        length: 10
    }, validatorFunction.createIsSuitableLength, 'numberLength'),
    // 是否为数字
    validateIsNum: createValidator({errMsg: '请输入数字'}, validatorFunction.isNumber),
    // 数字或字母
    validateIsNumOrString: createValidator({errMsg: '请输入数字或字母'}, validatorFunction.isNumberOrString),
    // 是否为正数
    validateIsPosNum: createValidator({errMsg: '请输入正数'}, validatorFunction.isPositiveNumber),
    // 是否为正整数
    validateIsPosInt: createValidator({errMsg: '请输入正整数'}, validatorFunction.isPosInt),
    // 是否为整数
    validateIsInt: createValidator({errMsg: '请输入整数'}, validatorFunction.isInt),
    // 是否为汉字
    validateIsChineseChar: createValidator({errMsg: '请输入汉字'}, validatorFunction.isChineseChar),
    // 是否为手机号
    validateIsTel: createValidator({errMsg: '请输入正确的手机号格式'}, validatorFunction.isTel),
    // 是否为url
    validateIsUrl: createValidator({errMsg: '请输入正确的链接'}, validatorFunction.isUrl),
    // 输入数据字符长度限制
    validateCharacterLength: createValidator({length: 60}, validatorFunction.isMaxCharacterL, 'characterLength'),
    // 输入数据字符固定长度
    validateFixedCharacterLength: createValidator({length: 4}, validatorFunction.isFixedCharacterLength, 'fixedCharacterLength'),
    // 是否满足数字范围 mode:
    // 0=> min<val<max
    // 1=> min<=val<max
    // 2=> min<val<=max
    // 3=> min<=val<=max
    validateIsNumRange: createValidator({min: 0, max: 120, mode: 0}, validatorFunction.isNumRange, 'numRange'),
    validateProbability: createValidator({min: 0, max: 120, mode: 0}, validatorFunction.probability, 'numRange'),
    // 是否是邮箱
    validateIsEmail: createValidator({errMsg: '请输入正确的邮箱格式'}, validatorFunction.isEmail)
};

