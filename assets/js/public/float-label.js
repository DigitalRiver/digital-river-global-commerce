/*
 * floating-label.js
 * https://gist.github.com/Steamforge/849e47be507ca0a9080a2b473b74f57e
 */

const FloatLabel = (() => {

    // add active class
    const handleFocus = (e) => {
        const target = e.target;
        target.parentNode.classList.add('active');
        // target.setAttribute('placeholder', target.getAttribute('data-placeholder'));
    };

    // remove active class
    const handleBlur = (e) => {
        const target = e.target;
        if (!target.value) {
            target.parentNode.classList.remove('active');
        }
        // target.removeAttribute('placeholder');
    };

    // register events
    const bindEvents = (element) => {
        const floatField = element.querySelector('input');
        if (!floatField) return;
        floatField.addEventListener('focus', handleFocus);
        floatField.addEventListener('blur', handleBlur);
    };

    // get DOM elements
    const init = () => {
        const floatContainers = document.querySelectorAll('.float-container');

        for (let i = 0; i < floatContainers.length; i++) {
            let element = floatContainers[i];

            if (element.querySelector('input') && element.querySelector('input').value) {
                element.classList.add('active');
            }

            bindEvents(element);
        }
    };

    return {
        init: init
    };
})();

export default FloatLabel;
