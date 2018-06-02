/**
 * Created by gaolifa on 2017/6/22.
 */
// 给字符串添加判断字符长度方法
String.prototype.gblen = function() {
    let len = 0;
    for (let i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) === 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};
// 数字
export const numberReg = /^[0-9]+.?[0-9]*$/;

// 数字或字母
export const numberOrString = /^[a-zA-Z0-9]*$/;

// 正数
export const positiveNumberReg = /^\d+(\.\d+)?$/;

// 正整数
export const positiveIntegerReg = /^[1-9]\d*$/;

// 整数
export const integerReg = /^[0-9]\d*$/;

// 汉字
export const chineseReg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;

// 手机正则
export const mobileReg = /^1[35789]\d{9}$/;

//  邮箱正则
export const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

// url
export const urlReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/;


export const validatorFunction = {
    // 是否是数字
    isNumber(val) {
        return !(val !== '' && !numberReg.test(val));
    },
    // 数字，字母
    isNumberOrString(val) {
        return !(val !== '' && !numberOrString.test(val));
    },
    // 整数范围
    isNumRange(val, options) {
        let isInRange;
        const isInt = val !== '' && integerReg.test(val);
        switch (options.mode) {
            case 0:
                isInRange = parseInt(val) > options.min && parseInt(val) < options.max;
                break;
            case 1:
                isInRange = parseInt(val) >= options.min && parseInt(val) < options.max;
                break;
            case 2:
                isInRange = parseInt(val) > options.min && parseInt(val) <= options.max;
                break;
            case 3:
                isInRange = parseInt(val) >= options.min && parseInt(val) <= options.max;
                break;
            default:
                isInRange = parseInt(val) > options.min && parseInt(val) < options.max;
                break;
        }
        // const isInRange = parseInt(val) > options.min && parseInt(val) < options.max;
        return isInt && isInRange;
    },
    // 是否为正数 常用于价格校验
    isPositiveNumber(val) {
        return !(val !== '' && !positiveNumberReg.test(val));
    },
    // 是否为正整数 不包括0
    isPosInt(val) {
        return !(val !== '' && !positiveIntegerReg.test(val));
    },
    // 是否为整数 包括0
    isInt(val) {
        return !(val !== '' && !integerReg.test(val));
    },
    // 是否是汉字
    isChineseChar(val) {
        return !(val !== '' && !chineseReg.test(val));
    },
    // 是否为手机号
    isTel(val) {
        return !(val !== '' && !mobileReg.test(val));
    },
    // 是否为url
    isUrl(val) {
        return !(val !== '' && !urlReg.test(val));
    },
    // 数字或字符串的长度是否合适
    isSuitableLength(val, length) {
        return val.toString().trim().length <= length;
    },
    // 数字或字符串的长度是否合适
    createIsSuitableLength(length) {
        return val => !(val !== '' && !(val.toString().trim().length <= length && val.toString().trim().length !== 0));
    },
    // 固定的宽度
    isFixedCharacterLength(length) {
        return val => val.toString().trim().gblen() === length;
    },
    isMaxCharacterL(length) {
        return val => !(val !== '' && !(val.toString().trim().gblen() <= length && val.toString().trim().gblen() !== 0));
    },
    // 是否是图片
    isPic(type) {
        const isJPG = type === 'image/jpg';
        const isJPEG = type === 'image/jpeg';
        const isPNG = type === 'image/png';
        const isGif = type === 'image/gif';
        return isGif || isJPEG || isJPG || isPNG;
    },
    isPng(type) {
        return type === 'image/png';
    },
    // 判断图片的大小
    isSize(size, maxSize) {
        console.log('fileSize============', size);
        // return size / 1024 / 1024 < maxSize / 1000;
        return size < maxSize * 1024;
    },
    // 是否是邮箱
    isEmail(str) {
        return emailReg.test(str);
    },
    // 大转盘模版概率，包含小数
    probability(val, options) {
        let isInRange;
        const isNumber = val !== '' && numberReg.test(val);
        switch (options.mode) {
            case 0:
                isInRange = parseFloat(val) > options.min && parseFloat(val) < options.max;
                break;
            case 1:
                isInRange = parseFloat(val) >= options.min && parseFloat(val) < options.max;
                break;
            case 2:
                isInRange = parseFloat(val) > options.min && parseFloat(val) <= options.max;
                break;
            case 3:
                isInRange = parseFloat(val) >= options.min && parseFloat(val) <= options.max;
                break;
            default:
                isInRange = parseFloat(val) > options.min && parseFloat(val) < options.max;
                break;
        }
        // const isInRange = parseInt(val) > options.min && parseInt(val) < options.max;
        return isNumber && isInRange;
    }
};