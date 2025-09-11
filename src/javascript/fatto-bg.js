// Cria um background repetido com a palavra FATTO
(function(){
    if (typeof window === 'undefined' || !document) return;
    // Evita duplicação
    if (document.querySelector('.fatto-bg')) return;

    const container = document.createElement('div');
    container.className = 'fatto-bg';

    // Mede um elemento palavra para calcular quantidades necessárias
    function measureWord() {
        const probe = document.createElement('div');
        probe.className = 'fatto-bg__word';
        probe.style.visibility = 'hidden';
        probe.style.position = 'absolute';
        probe.style.whiteSpace = 'nowrap';
        probe.textContent = 'FATTO';
        document.body.appendChild(probe);
        const rect = probe.getBoundingClientRect();
        probe.remove();
        return rect; // { width, height }
    }

    function build() {
        container.innerHTML = '';
        // medir tamanho de uma palavra usando estilos atuais
        const rect = measureWord();
        const gapPx = 16; // corresponde aproximadamente a 1rem -> 16px (CSS usa 1rem gaps)

        // calcular quantas palavras por linha cabem
        const perRow = Math.max(2, Math.floor((window.innerWidth - 40) / (rect.width + gapPx)));
        // calcular número de linhas para preencher a altura (usar fator para evitar sobreposição)
        const rows = Math.max(3, Math.ceil((window.innerHeight - 40) / (rect.height * 1.25)));

        for (let r = 0; r < rows; r++) {
            const row = document.createElement('div');
            row.className = 'fatto-bg__row';
            for (let i = 0; i < perRow; i++) {
                const w = document.createElement('div');
                w.className = 'fatto-bg__word';
                w.textContent = 'FATTO';
                row.appendChild(w);
            }
            container.appendChild(row);
        }

        // Distribuir verticalmente sem grandes lacunas
        container.style.justifyContent = 'space-between';
    }

    // Reconstrói em resize com debounce
    let to = null;
    function scheduleRebuild() {
        clearTimeout(to);
        to = setTimeout(build, 120);
    }

    build();
    window.addEventListener('resize', scheduleRebuild);

    // Insere no body como primeiro filho para ficar atrás do conteúdo
    document.body.insertBefore(container, document.body.firstChild);
})();
 

