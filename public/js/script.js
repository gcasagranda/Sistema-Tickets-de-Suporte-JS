const urlParams = new URLSearchParams(window.location.search);
const mensagem = urlParams.get('mensagem');

if (mensagem) {
    alert(decodeURIComponent(mensagem));
}

