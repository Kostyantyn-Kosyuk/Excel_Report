function setMaxHeight(table) {
    var element = table.rootElement;
    var elementRect = element.getBoundingClientRect();
    var maxHeight = window.innerHeight - elementRect.top;

    table.updateSettings({height: maxHeight - 20});
}

function setMaxWidth(table) {
    var element = table.rootElement;
    var elementRect = element.getBoundingClientRect();
    var maxWidth = window.innerWidth - elementRect.left;

    table.updateSettings({width: maxWidth - 20});
}

function onWindowResize(table) {
    setMaxHeight(table);
    setMaxWidth(table);
};

function createCallback(table) {
    const callback = () => onWindowResize(table);
    return callback;
}

const resizeElements = {
    subscribe(table) {
        window.addEventListener('resize', createCallback(table));
    },
    destroy() {
        window.removeEventListener('resize', createCallback);
    },
};
export default resizeElements;
