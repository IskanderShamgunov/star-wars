export function render(episodeData, planetsData, speciesData) {
  const container = document.createElement('div');
  const link = document.createElement('a');
  const title = document.createElement('h1');
  const descr = document.createElement('p');
  const planetcContainer = document.createElement('div');
  const planetsListTitle = document.createElement('h2');
  const planetsList = document.createElement('ul');
  const speciesContainer =document.createElement('div');
  const speciesListTitle = document.createElement('h2');
  const speciesList = document.createElement('ul');

  container.classList.add('episode-container', 'episode');
  link.classList.add('episode__link');
  title.classList.add('episode__title');
  descr.classList.add('episode__descr');
  planetsList.classList.add('episode__list');
  speciesList.classList.add('episode__list');

  link.href = '#';
  link.textContent = 'Back to episodes';
  title.textContent = `Episode ${episodeData.episode_id}. ${episodeData.title}`;
  descr.textContent = episodeData.opening_crawl;
  planetsListTitle.textContent = 'Planets:';
  speciesListTitle.textContent = 'Species:';

  link.addEventListener('click', function(e) {
    e.preventDefault();
    history.pushState(null, '', location.href.replace(/\?episode=\d+/, ''));

    dispatchEvent(new Event('popstate'));
  });

  planetsData.forEach(data => {
    const planetElement = document.createElement('li');
    planetElement.classList.add('episode__list-item')
    planetElement.textContent = data.name;
    planetsList.append(planetElement);
  });

  speciesData.forEach(data => {
    const speciesElement = document.createElement('li');
    speciesElement.classList.add('episode__list-item')
    speciesElement.textContent = data.name;
    speciesList.append(speciesElement);
  });

  planetcContainer.append(planetsListTitle, planetsList);
  speciesContainer.append(speciesListTitle, speciesList);

  container.append(
    link,
    title,
    descr,
    planetcContainer,
    speciesContainer
  );

  return container;
}
