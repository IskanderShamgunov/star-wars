export function render(data) {
  const container = document.createElement('div')
  const pageTitle = document.createElement('h1')
  const episodesList = document.createElement('ul');

  pageTitle.textContent = 'Star Wars';

  container.classList.add('main-container');
  pageTitle.classList.add('main-title');
  episodesList.classList.add('episodes-list');

  data.results.sort((a, b) => a.episode_id - b.episode_id)
  .forEach((episodeData, i) => {
    const card = document.createElement('li');
    const episodeNum = document.createElement('p');
    const title = document.createElement('h2');
    const link = document.createElement('a');

    card.classList.add('episodes-list__card', 'card');
    episodeNum.classList.add('card__num');
    title.classList.add('card__title');
    link.classList.add('card__link');

    episodeNum.textContent = `Episode ${episodeData.episode_id}`;
    title.textContent = episodeData.title;
    link.textContent = 'Details';
    link.href = `?episode=${episodeData.url.replace(/[^\d+]/g, '')}`;

    link.addEventListener('click', function(e) {
      e.preventDefault();
      history.pushState(null, '', this.href);

      dispatchEvent(new Event('popstate'));
    });

    card.append(
      episodeNum,
      title,
      link
    );
    episodesList.append(card);
  });

  container.append(
    pageTitle,
    episodesList
  );

  return container;
}
