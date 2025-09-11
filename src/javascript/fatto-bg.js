// Cria um background repetido com a palavra FATTO
(function(){
    if (typeof window === 'undefined' || !document) return;
    // Evita duplicação
    if (document.querySelector('.fatto-bg')) return;

    const container = document.createElement('div');
    container.className = 'fatto-bg';

    // Insere no body cedo para garantir que estilos CSS sejam aplicados
    document.body.insertBefore(container, document.body.firstChild);

    // Mede um elemento palavra para calcular quantidades necessárias
    function measureWord() {
        const probe = document.createElement('div');
        probe.className = 'fatto-bg__word';
        probe.style.visibility = 'hidden';
        probe.style.position = 'absolute';
        probe.style.whiteSpace = 'nowrap';
        probe.textContent = 'FATTO';
        container.appendChild(probe);
        const rect = probe.getBoundingClientRect();
        probe.remove();
        return rect; // { width, height }
    }

    function build() {
        // limpa de forma rápida
        container.innerHTML = '';

        // medir tamanho de uma palavra usando estilos atuais
        const rect = measureWord();

        // tenta ler gap a partir do CSS (fallback 16px)
        let gapPx = 16;
        try {
            const style = getComputedStyle(container.querySelector('.fatto-bg__row') || container);
            const gap = style && style.gap;
            if (gap && gap.endsWith('px')) gapPx = parseFloat(gap);
        } catch (e) {
            // ignore e mantenha fallback
        }

        // calcular quantas palavras por linha cabem
        const perRow = Math.max(2, Math.floor((window.innerWidth - 40) / (rect.width + gapPx)));
        // calcular número de linhas para preencher a altura (usar fator para evitar sobreposição)
        const rows = Math.max(3, Math.ceil((window.innerHeight - 40) / (rect.height * 1.25)));

        const frag = document.createDocumentFragment();
        for (let r = 0; r < rows; r++) {
            const row = document.createElement('div');
            row.className = 'fatto-bg__row';
            for (let i = 0; i < perRow; i++) {
                const w = document.createElement('div');
                w.className = 'fatto-bg__word';
                w.textContent = 'FATTO';
                row.appendChild(w);
            }
            frag.appendChild(row);
        }
        container.appendChild(frag);
    }

    // Reconstrói em resize com debounce
    let timeoutId = null;
    function scheduleRebuild() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(build, 120);
    }

    build();
    window.addEventListener('resize', scheduleRebuild);
    window.addEventListener('unload', function(){
        clearTimeout(timeoutId);
        window.removeEventListener('resize', scheduleRebuild);
    });

})();


