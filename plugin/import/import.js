(function () {
  function downloadSection(section) {
    var url = section.dataset.importFrom;
    var name = url.slice(url.lastIndexOf('/') + 1, -5);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();

    var html = xhr.responseText;

    var scopedStyleStart = xhr.responseText.indexOf('<style scoped>');
    if (scopedStyleStart !== -1) {
      scopedStyleStart += '<style scoped>'.length;
      scopedStyleEnd = xhr.responseText.indexOf('</style>', scopedStyleStart);

      var style = html
        .slice(scopedStyleStart, scopedStyleEnd)
        .replace(/:scope/g, '#' + name);

      html = html.slice(0, scopedStyleStart) + style + html.slice(scopedStyleEnd);
    }

    section.id = name;
    section.innerHTML = html;

    if (section.dataset.script) {
      const script = document.createElement('script');
      script.src = section.dataset.script;
      section.appendChild(script);
    }
  }

  var sections = document.querySelectorAll('[data-import-from]');
  Array.from(sections).forEach(downloadSection);
})();
