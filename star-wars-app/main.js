const cssResources = {};
const appContainer = document.getElementById('app');

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }

  if (src.endsWith('.css')) {
    if (!cssResources[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssResources[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssResources[src];
  }

  return fetch(src).then(res => res.json());
}

function renderPage(modulePath, apiUrl, css, episodePage = false) {
  Promise.all([modulePath, apiUrl, css].map(src => loadResource(src)))
    .then( ([pageModule, data]) => {

      if (episodePage) {

        Promise.all(data.planets.map(src => loadResource(src)))
          .then(planetsData => {
            Promise.all(data.species.map(src => loadResource(src)))
              .then(speciesData => {
                appContainer.append(pageModule.render(data, planetsData, speciesData));
              });
          });

      } else {
        appContainer.append(pageModule.render(data));
      }

    });
}

function pageInit() {

  const searchParams = new URLSearchParams(location.search);
  const episodeNum = searchParams.get('episode');

  if (episodeNum) {

    renderPage(
      './app/episode-details.js',
      `https://swapi.dev/api/films/${episodeNum}`,
      './css/episode-details.css',
      true
    );

  } else {

    renderPage(
      './app/episodes.js',
      'https://swapi.dev/api/films',
      './css/episodes.css'
    );

  }

}

window.addEventListener('popstate', function() {
  appContainer.innerHTML = '';
  pageInit();
});

pageInit();
