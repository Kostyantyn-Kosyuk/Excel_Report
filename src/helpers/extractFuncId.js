export default function extractFuncId(str) {
    if (str[0] === '$') {
        const funcId = str.split(':')[1];
        if (funcId) return funcId;
    }
};