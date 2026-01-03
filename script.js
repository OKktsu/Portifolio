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
const notificacao = document.querySelector('.notificacao');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

// Configuração inicial dos projetos
const projectsToShow = 2; // Quantidade de projetos para mostrar inicialmente
const allProjects = projetos.querySelectorAll('.card');

// Esconde os projetos extras ao carregar a página
allProjects.forEach((project, index) => {
    if (index >= projectsToShow) {
        project.classList.add('hidden');
    }
});

button.addEventListener('click', function() {
    const isExpanded = button.textContent.includes('menos');

    if (isExpanded) {
        // Recolher: esconde os extras e volta ao topo da seção
        allProjects.forEach((project, index) => {
            if (index >= projectsToShow) {
                project.classList.add('hidden');
                project.classList.remove('fade-in');
            }
        });
        button.textContent = 'Ver mais projetos';
        vermais.classList.remove('active');
        projetos.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Expandir: mostra todos
        allProjects.forEach(project => {
            if (project.classList.contains('hidden')) {
                project.classList.remove('hidden');
                project.classList.add('fade-in');
            }
        });
        button.textContent = ' Ver menos';
        vermais.classList.add('active');
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

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});