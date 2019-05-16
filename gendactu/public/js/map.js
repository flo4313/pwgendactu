$(document).ready(function() {
  $('#francemap').vectorMap({
    map: 'france_fr',
    hoverOpacity: 0.5,
    hoverColor: true,
    backgroundColor: "#ffffff",
    colors: couleurs,
    showTooltip: true,
    borderColor: "#457812",
    selectedColor: "#EC0000",
      onRegionClick: function(element, code, region)
      {
        getTopics(code);
      }
  })
});
