var RevealControlHide = window.RevealControlHide || (function(){

  return {
    id: 'control-hide',
    init(deck) {
      deck.addKeyBinding({ keyCode: 67, key: 'C' }, function () {
        const controls = Reveal.getConfig().controls;
        Reveal.configure({ controls: !controls });

        document.documentElement.classList.toggle("controls", !controls);

        const videos = document.getElementsByTagName('video');
        for (var i = 0; i < videos.length; i++) {
          videos[i].controls = !controls;
        }
      });
    }
  };

})();
