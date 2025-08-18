const content = document.getElementById('content');
let page = Number(window.location.hash.replace("#", ""));
let maxpage = 0;

async function getCharacters() {
  const response = await fetch(`https://rickandmortyapi.com/api/character${isNaN(page) ? '' : '?page=' + page}`);
  const data = await response.json();
  maxpage = data.info.pages;

  const lista = document.createElement('ul');
  let characters = '';

  data.results.forEach(element => {
    characters += `<li>
      <a href="detail.html#${element.id}">${element.name}</a><br>
      <img src="${element.image}" alt="${element.name}" width="150"/>
    </li>`;
  });

  lista.innerHTML = characters;
  content.appendChild(lista);

  let paginate = '';
  if (!page || page === 1) {
    paginate = `<button onClick="next()">Próximo</button>`;
  } else if (page > 1 && page < maxpage) {
    paginate = `<button onClick="prev()">Anterior</button>
                <button onClick="next()">Próximo</button>`;
  } else if (page >= maxpage) {
    paginate = `<button onClick="prev()">Anterior</button>`;
  }

  document.getElementById('paginate').innerHTML = paginate;
}

function next() {
  const newPage = page === 0 ? 2 : page + 1;
  window.location.hash = "#" + newPage;
  window.location.reload();
}

function prev() {
  const newPage = page === 0 ? 2 : page - 1;
  window.location.hash = "#" + newPage;
  window.location.reload();
}

getCharacters();
