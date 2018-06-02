import emitter from 'element-ui/lib/mixins/emitter';
import deepCopy from 'deepcopy';
import {validatorFunction} from '../../common/validatorFunction';

export default {
    props: {
        value: {
            type: Array,
            required: true
        },
        imgWidth: {
            type: String
        },
        imgHeight: {
            type: String
        },
        minWidth: {
            type: String
        },
        minHeight: {
            type: String
        },
        fixedWidth: {
            type: String
        },
        fixedHeight: {
            type: String
        },
        action: {
            type: String,
            default: '/pyramid/uploadImg'
        },
        listType: {
            type: String,
            default: 'picture-card'
        },
        name: {
            type: String,
            default: 'filename'
        },
        multiple: {
            type: Boolean,
            default: true
        },
        maxSize: {
            type: Number,
            default: 500
        },
        maxCount: {
            type: Number,
            default: 5
        },
        validateEvent: {
            type: Boolean,
            default: true
        },
        imageAccept: {
            type: Array,
            default() {
                return ['png'];
            }
        },
        specialRemark: {
            type: Boolean,
            default: false
        }
    },
    mixins: [emitter],
    data() {
        return {
            imgList: deepCopy(this.value),
            uploadImagesLength: '',
            currentValue: deepCopy(this.value),
            dialogImageUrl: '',
            dialogVisible: false
        };
    },
    computed: {
        disabled() {
            return this.currentValue.length >= this.maxCount;
        },
        uploadUrl() {
            const maxWidth = this.imgWidth || '';
            const maxHeight = this.imgHeight || '';
            const minWidth = this.minWidth || '';
            const minHeight = this.minHeight || '';
            const fixedWidth = this.fixedWidth || '';
            const fixedHeight = this.fixedHeight || '';
            if (fixedWidth && fixedHeight) {
                return `${this.action}?maxWidth=${fixedWidth}&&maxHeight=${fixedHeight}&&minWidth=${fixedWidth}&&minHeight=${fixedHeight}`;
            } else {
                return `${this.action}?maxWidth=${maxWidth}&&maxHeight=${maxHeight}&&minWidth=${minWidth}&&minHeight=${minHeight}`;
            }
        }
        ,
        accept() {
            return this.getImageAcceptContent(this.getTransferContent(accept => `image/${accept}`));
        },
        acceptText() {
            return this.getImageAcceptContent(this.getTransferContent(accept => `${accept.toUpperCase()}`));
        }
    },
    watch: {
        'value'(val) {
            this.setCurrentValue(val);
        }
    },
    methods: {
        handleRemove(file, fileList) {
            if (!file) {
                this.processMoreImages(fileList);
                return false;
            }
            const imgList = [];
            fileList.forEach(file => {
                imgList.push({url: file.url});
            });
            this.uploadImagesLength = imgList.length;
            this.currentValue = imgList;
            this.updateValue();
        },
        handleBeforeUpload(file) {
            this.uploadImagesLength++;
            const isType = this.imageAccept.length === 1 ? validatorFunction.isPng(file.type) : validatorFunction.isPic(file.type);
            if (!isType) {
                this.$message.error('图片格式不正确');
                return false;
            }
            if (!validatorFunction.isSize(file.size, this.maxSize)) {
                this.$message.error(`上传的图片大小不能超过${this.maxSize}k!`);
                return false;
            }
            if (this.uploadImagesLength > this.maxCount) {
                console.log('图片超过了：', this.uploadImagesLength);
                this.$message.error(`上传的图片不能超过 ${this.maxCount}张`);
                return false;
            }
        },
        handleSuccessUpload(response, file, fileList) {
            if (response.code === 200) {
                file.url = response.data.url;
                this.$set(this.currentValue, this.currentValue.length, {url: response.data.url});
                this.updateValue();
            } else {
                this.processMoreImages(fileList);
                this.$message.error(response.message);
            }
        },
        handleUploadError() {
            this.uploadImagesLength = this.currentValue.length;
        },
        handleProgressUpload(event, file, fileList) {
            if (!file) {
                this.processMoreImages(fileList);
            }
        },
        handleChangeUpload() { //   手动触发图片校验
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', [this.currentValue]);
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 图片传太多之后的处理
        processMoreImages(fileList) {
            const imgList = [];
            this.currentValue.forEach(dataItem => {
                fileList.forEach(item => {
                    if (item.url === dataItem.url) {
                        imgList.push(item);
                    }
                });
            });
            this.imgList = deepCopy(imgList);
            this.uploadImagesLength = this.currentValue.length;
        },
        updateValue() {
            this.$emit('input', deepCopy(this.currentValue));
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', [this.currentValue]);
            }
        },
        setCurrentValue(value) {
            if (JSON.stringify(value) === JSON.stringify(this.currentValue)) return;
            this.currentValue = deepCopy(value);
            this.imgList = deepCopy(value);
            this.uploadImagesLength = value.length;
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.change', [value]);
            }
        },
        getImageAcceptContent(getTransferContent) {
            return this.imageAccept.reduce((content, accept) => content += getTransferContent(content, accept), '');
        },
        getTransferContent(getFormat) {
            return (content, accept) => {
                let text = `${getFormat(accept)}`;
                if (content) {
                    text = `,${text}`;
                }
                return text;
            };
        }
    }
};
