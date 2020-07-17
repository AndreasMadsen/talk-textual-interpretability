(function () {
    const section = document.currentScript.parentNode;
    function getFragmentIndex() {
        const activeFragments = section
        .querySelectorAll('.fragment.visible.current-fragment');
        if (activeFragments.length > 0) {
            return +activeFragments[0].dataset.fragmentIndex + 1;
        }
        return 0;
    }

    const img = section.querySelector('.img');
    function setPosition(stateIndex) {
        img.setAttribute('data-position', stateIndex);
    }

    Reveal.addEventListener('fragmentshown', function(event) {
        if (event.fragment.parentNode.id !== 'saliency-methods-logic') return;
            setPosition(getFragmentIndex());
    });
    Reveal.addEventListener('fragmenthidden', function(event) {
        if (event.fragment.parentNode.id !== 'saliency-methods-logic') return;
            setPosition(getFragmentIndex());
    });

    Reveal.addEventListener('slidechanged', function(event) {
        if (event.currentSlide === section) {
            setPosition(getFragmentIndex());
        }
    });
    if (Reveal.getCurrentSlide() === section) {
        setPosition(getFragmentIndex());
    }
})();
