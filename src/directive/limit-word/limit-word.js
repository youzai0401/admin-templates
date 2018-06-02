export default {
    name: 'limitword',
    params: [],
    bind(el, val) {
        const wordLimit = Number(val.value.limit);
        const bindText = val.value.val.toString();
        let needTitle;
        let len = 0;
        for (let i = 0; i < bindText.length; i++) {
            if (bindText.charCodeAt(i) > 127 || bindText.charCodeAt(i) === 94) {
                len += 2;
                if (len > wordLimit) {
                    needTitle = bindText.substring(0, i);
                    needTitle = needTitle + '...';
                    break;
                }
            } else {
                len++;
                if (len > wordLimit) {
                    needTitle = bindText.substring(0, i);
                    needTitle = needTitle + '...';
                    break;
                }
            }
        }
        // console.log(needTitle);
        if (needTitle) {
            el.innerHTML = `<span title="${bindText}">${needTitle}</span>`;
        } else {
            el.innerHTML = `<span>${bindText}</span>`;
        }
    },
    update(el, val) {
        const wordLimit = Number(val.value.limit);
        const bindText = val.value.val.toString();
        let needTitle;
        let len = 0;
        for (let i = 0; i < bindText.length; i++) {
            if (bindText.charCodeAt(i) > 127 || bindText.charCodeAt(i) === 94) {
                len += 2;
                if (len > wordLimit) {
                    needTitle = bindText.substring(0, i);
                    needTitle = needTitle + '...';
                    break;
                }
            } else {
                len++;
                if (len > wordLimit) {
                    needTitle = bindText.substring(0, i);
                    needTitle = needTitle + '...';
                    break;
                }
            }
        }
        // console.log(needTitle);
        if (needTitle) {
            el.innerHTML = `<span title="${bindText}">${needTitle}</span>`;
        } else {
            el.innerHTML = `<span>${bindText}</span>`;
        }
    }
};