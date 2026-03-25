// Animações de Scroll (Intersection Observer)
const revealElements = document.querySelectorAll('.group, section h2, .aspect-square, .flex-col > p');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Anima apenas 1 vez
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    // Adiciona a classe base inicial
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
});

// Lógica para copiar contatos para a área de transferência
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast();
    }).catch(err => {
        console.error('Falha ao copiar: ', err);
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    
    // Mostra o toast subindo (removendo classe translateY e aumentando opacidade)
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    // Esconde depois de 2.5 segundos
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 2500);
}

// Lógica de Modal MenuBuilder
function openMenuBuilderModal() {
    const modal = document.getElementById('modalMenuBuilder');
    const content = document.getElementById('modalMenuBuilderContent');
    
    // Mostra o container
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Pequeno delay para a transição de entrada
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    // Previne scroll no body
    document.body.style.overflow = 'hidden';
}

function closeMenuBuilderModal() {
    const modal = document.getElementById('modalMenuBuilder');
    const content = document.getElementById('modalMenuBuilderContent');
    
    // Transição de saída
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    
    // Esconde depois da animação
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Fecha modal ao clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('modalMenuBuilder');
    if (event.target == modal) {
        closeMenuBuilderModal();
    }
}