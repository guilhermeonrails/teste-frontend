function uploadFile() {
  localStorage.removeItem('meusDados');
  const fileInput = document.getElementById('jsonFile');
  const file = fileInput.files[0];

  const reader = new FileReader();

  reader.onload = function (event) {
    const fileContent = event.target.result;
    let musicas = JSON.parse(fileContent);
    localStorage.setItem('meusDados', JSON.stringify(musicas));
    ExibirMusicasNaTela();
  };
  reader.readAsText(file);
}

function ExibirMusicasNaTela() {
  const playlistContent = document.getElementById('playlist-content');
  const musicas = JSON.parse(localStorage.getItem('meusDados'));

  playlistContent.innerHTML = ''; // Limpa o conteúdo atual da div
  const h2Element = document.querySelector('.hero-content h2');
  h2Element.textContent = ''
  const nomeComPrimeiraLetraMaiuscula = capitalizeFirstLetter(musicas.nome);
  h2Element.textContent = `Suas músicas favoritas ${nomeComPrimeiraLetraMaiuscula} 🎧` 

  console.log(musicas.musicas);

  musicas.musicas.forEach(musica => {
    playlistContent.innerHTML += `
    <ul class="list-unstyled">
    <li class="playlist-number">
        <div class="song-info">
            <h4>${musica.song}</h4>
            <p><strong>Artist</strong>: ${musica.artist} &nbsp;|&nbsp; <strong>Tipo</strong>:
            ${musica.genre}
            </p>
        </div>
        <div class="music-icon">
            <a href=""><i class="fa fa-play"></i></a>
            <a href=""><i class="fa fa-pause"></i></a>
        </div>
        <div class="clearfix"></div>
    </li>
    <div class="clearfix"></div>
</ul>
    `
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}