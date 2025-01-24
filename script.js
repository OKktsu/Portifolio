const button = document.querySelector('#vermais');
const vermais = document.querySelector('.vermais');
const contato = document.querySelector('#contato');
const modal = document.querySelector('.modal');
const main = document.querySelector('main');
const home = document.querySelector('#home');
const projetos = document.querySelector('#projetos');
const linkedin = document.querySelector('#linkedin');
const github = document.querySelector('#github');
const gmail = document.querySelector('#gmail');
const whatsapp = document.querySelector('#whatsapp');
const notificacao = document.querySelector('.notificacao')

button.addEventListener('click', function() {
   
    projetos.classList.toggle('active');
    vermais.classList.toggle('active');

    if(projetos.classList.contains('active')) {
        button.textContent = ' Ver menos';
    }
    else{
        button.textContent = 'Ver mais projetos'
    }
});
contato.onclick = function() {
    modal.classList.toggle('active');
    main.style.opacity = 0.5;
    home.style.opacity = 0.5;

}
main.onclick = function() {
    modal.classList.remove('active');
    main.style.opacity = 1;
    home.style.opacity = 1;
}
home.onclick = function() { 
    modal.classList.remove('active');
    main.style.opacity = 1;
    home.style.opacity = 1;   
}
linkedin.onclick = function(){
    navigator.clipboard.writeText('https://www.linkedin.com/in/marcelo-luan/')
    notificacao.classList.toggle('active')
    setTimeout(() => {
        notificacao.classList.remove('active')
        }, 1000);
    
}
github.onclick = function(){
    navigator.clipboard.writeText('https://github.com/OKktsu')
    notificacao.classList.toggle('active')
    setTimeout(() => {
        notificacao.classList.remove('active')
        }, 1000);
}
whatsapp.onclick = function(){
    navigator.clipboard.writeText('41941984821419')
    notificacao.classList.toggle('active')
    setTimeout(() => {
        notificacao.classList.remove('active')
        }, 1000);
}
gmail.onclick = function(){
    navigator.clipboard.writeText('marceloluan125@gmial.com')
    notificacao.classList.toggle('active')
    setTimeout(() => {
        notificacao.classList.remove('active')
        }, 1000);
}
