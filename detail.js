const content = document.getElementById('detail');
const id = parseInt(window.location.hash.replace("#", ""), 10);

if (isNaN(id) || id < 1) {
  content.innerHTML = "<p>ID inválido. Tente acessar por um link válido.</p>";
  throw new Error("ID inválido");
}

async function getCharacterDetail() {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!response.ok) throw new Error("Personagem não encontrado");

    const character = await response.json();

    content.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}" />
      <ul>
        <li><strong>Espécie:</strong> ${character.species}</li>
        <li><strong>Gênero:</strong> ${character.gender}</li>
        <li><strong>Dimensão:</strong> ${character.location.name}</li>
        <li><strong>Status:</strong> ${character.status}</li>
      </ul>
      <a href="index.html"> ← Voltar para a lista</a>
    `;
  } catch (error) {
    content.innerHTML = `<p>Erro ao buscar personagem: ${error.message}</p>`;
  }
}

getCharacterDetail();
