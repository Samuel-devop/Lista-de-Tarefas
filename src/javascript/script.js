$(document).ready(function() {
    // Alternar a exibição do formulário
    $('#toggleForm').click(function() {
        const form = $('#expandedForm');
        if (form.is(':visible')) {
            form.slideUp(300);
            $(this).html('<i class="fas fa-plus"></i> Adicionar Nova Tarefa');
        } else {
            form.slideDown(300);
            $(this).html('<i class="fas fa-minus"></i> Fechar Formulário');
        }
    });

    // Adiciona botões de mover (setas lado a lado, sem número)
    // Adiciona botão de editar e lógica de edição inline
    function addTaskItem(taskName, formattedPrice, formattedDate, isHighCost = false) {
        const taskItem = $('<div>').addClass('task-item');
        if (isHighCost) taskItem.addClass('high-cost');
        taskItem.html(`
            <div style="display:flex; align-items:flex-start; gap:12px;">
                <div style="flex:1;">
                    <h3 style="margin-bottom:8px;">${taskName}</h3>
                    <div class="task-details-col" style="display:flex; flex-direction:column; align-items:flex-start; gap:8px;">
                        <div class="task-date">
                            <i class='fas fa-calendar-alt'></i> <span>${formattedDate}</span>
                        </div>
                        <div class="task-price${isHighCost ? ' high-price' : ''}">
                            <i class='fas fa-coins'></i> <span>${formattedPrice}</span>
                        </div>
                    </div>
                </div>
                <div class="move-actions" style="display:flex; gap:6px; margin-top:8px;">
                    <button class="move-up" title="Subir" style="background:none; border:none; color:#b71c1c; font-size:18px; cursor:pointer;"><i class="fas fa-arrow-up"></i></button>
                    <button class="move-down" title="Descer" style="background:none; border:none; color:#b71c1c; font-size:18px; cursor:pointer;"><i class="fas fa-arrow-down"></i></button>
                </div>
            </div>
            <div class="task-actions" style="margin-top:10px;">
                <button class="complete-btn"><i class="fas fa-check"></i> Concluir</button>
                <button class="edit-btn" style="background:#fff; color:#b71c1c; border:1.5px solid #b71c1c; border-radius:6px; padding:7px 16px; font-size:15px; font-weight:500; cursor:pointer; box-shadow:0 2px 6px rgba(183,28,28,0.07);"><i class="fas fa-edit"></i> Editar</button>
                <button class="delete-btn"><i class="fas fa-trash"></i> Excluir</button>
            </div>
        `);
        $('#tasksContainer').append(taskItem);
    }

    // Manipular o envio do formulário
    $('#expandedForm').off('submit').on('submit', function(e) {
        e.preventDefault();
        const taskName = $('#taskName').val().trim();
        const taskPrice = $('#taskPrice').val() || '0';
        const taskDate = $('#taskDate').val();
        if (!taskName) {
            alert('Por favor, insira um nome para a tarefa.');
            return;
        }
        if (!taskDate) {
            alert('Por favor, selecione uma data.');
            return;
        }
        // Verifica se já existe uma tarefa com o mesmo nome
        let nameExists = false;
        $('.task-item h3').each(function() {
            if ($(this).text().trim().toLowerCase() === taskName.toLowerCase()) {
                nameExists = true;
            }
        });
        if (nameExists) {
            showCreateNameExistsPopup();
            return;
        }
        const formattedDate = new Date(taskDate).toLocaleDateString('pt-BR');
        const priceValue = parseFloat(taskPrice);
        const formattedPrice = priceValue.toLocaleString('pt-BR', {
            style: 'currency', currency: 'BRL'
        });
        addTaskItem(taskName, formattedPrice, formattedDate, priceValue >= 1000);
        if ($('#emptyState').length) {
            $('#emptyState').remove();
        }
        $('#expandedForm')[0].reset();
        $('#expandedForm').slideUp(300);
        $('#toggleForm').html('<i class="fas fa-plus"></i> Adicionar Nova Tarefa');
    // Pop-up de aviso estilizado para nome duplicado na criação
    function showCreateNameExistsPopup() {
        if ($('#delete-popup').length) return;
        const popup = $(`
            <div id="delete-popup" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.18); z-index:9999; display:flex; align-items:center; justify-content:center;">
                <div style="background:#fff; border-radius:16px; box-shadow:0 8px 32px #b71c1c22; border:2px solid #b71c1c; padding:32px 38px; min-width:320px; display:flex; flex-direction:column; align-items:center; gap:18px;">
                    <i class="fas fa-exclamation-triangle" style="color:#b71c1c; font-size:2.2rem;"></i>
                    <div style="font-size:1.15rem; color:#b71c1c; font-weight:700; text-align:center;">Não foi possível salvar essa tarefa, pois já existe uma com o mesmo nome.</div>
                    <div style="display:flex; gap:18px; margin-top:10px;">
                        <button id="cancel-create-name" style="background:#fff; color:#b71c1c; border:2px solid #b71c1c; border-radius:8px; padding:10px 22px; font-size:1rem; font-weight:600; cursor:pointer; box-shadow:0 2px 8px #b71c1c22;">OK</button>
                    </div>
                </div>
            </div>
        `);
        $('body').append(popup);
        $('#cancel-create-name').on('click', function() {
            $('#delete-popup').remove();
        });
    }
    });

    // Botões de mover tarefa
    $('#tasksContainer').on('click', '.move-up', function() {
        const item = $(this).closest('.task-item');
        item.prev('.task-item').before(item);
    });
    $('#tasksContainer').on('click', '.move-down', function() {
        const item = $(this).closest('.task-item');
        item.next('.task-item').after(item);
    });

    // Delegação de evento para o botão de excluir
    $('#tasksContainer').on('click', '.delete-btn', function() {
        const taskItem = $(this).closest('.task-item');
        showDeletePopup(function() {
            taskItem.remove();
        });
    });

    // Pop-up de confirmação de exclusão
    function showDeletePopup(onConfirm) {
        if ($('#delete-popup').length) return;
        const popup = $(`
            <div id="delete-popup" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.18); z-index:9999; display:flex; align-items:center; justify-content:center;">
                <div style="background:#fff; border-radius:16px; box-shadow:0 8px 32px #b71c1c22; border:2px solid #b71c1c; padding:32px 38px; min-width:320px; display:flex; flex-direction:column; align-items:center; gap:18px;">
                    <i class="fas fa-trash" style="color:#b71c1c; font-size:2.2rem;"></i>
                    <div style="font-size:1.15rem; color:#b71c1c; font-weight:700; text-align:center;">Tem certeza que deseja excluir esta tarefa?</div>
                    <div style="display:flex; gap:18px; margin-top:10px;">
                        <button id="confirm-delete" style="background:#b71c1c; color:#fff; border:none; border-radius:8px; padding:10px 22px; font-size:1rem; font-weight:600; cursor:pointer; box-shadow:0 2px 8px #b71c1c22;">Confirmar</button>
                        <button id="cancel-delete" style="background:#fff; color:#b71c1c; border:2px solid #b71c1c; border-radius:8px; padding:10px 22px; font-size:1rem; font-weight:600; cursor:pointer; box-shadow:0 2px 8px #b71c1c22;">Cancelar</button>
                    </div>
                </div>
            </div>
        `);
        $('body').append(popup);
        $('#confirm-delete').on('click', function() {
            $('#delete-popup').remove();
            if (onConfirm) onConfirm();
        });
        $('#cancel-delete').on('click', function() {
            $('#delete-popup').remove();
        });
    }

    // Delegação de evento para o botão de concluir
    $('#tasksContainer').on('click', '.complete-btn', function() {
        $(this).closest('.task-item').toggleClass('completed');
        const isCompleted = $(this).closest('.task-item').hasClass('completed');
        
        if (isCompleted) {
            $(this).html('<i class="fas fa-undo"></i> Reabrir');
        } else {
            $(this).html('<i class="fas fa-check"></i> Concluir');
        }
    });

    // Adicionar empty state inicial se não houver tarefas
    if ($('#tasksContainer').children().length === 0) {
        $('#tasksContainer').html(`
            <div id="emptyState" class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>Nenhuma tarefa cadastrada</p>
            </div>
        `);
    }

    // Adicionar data de hoje como padrão no campo de data
    const today = new Date().toISOString().split('T')[0];
    $('#taskDate').val(today);

    // Adiciona o background com a escrita FATTO centralizada horizontalmente
    function createFattoBackground() {
        const bg = $('<div id="fatto-bg"></div>').css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
            background: 'none',
        });
        let html = '';
        const rows = Math.ceil(window.innerHeight / 100);
        const cols = Math.ceil(window.innerWidth / 350);
        for (let i = 0; i < rows; i++) {
            let line = '';
            for (let j = 0; j < cols; j++) {
                line += 'FATTO &nbsp; ';
            }
            html += `<div class='fatto-row' style='white-space:nowrap; opacity:0.09; font-size:5vw; font-weight:900; color:#b71c1c; position:absolute; top:${i*100}px; left:50%; transform:translateX(-50%); width:100vw; text-align:center;'>${line}</div>`;
        }
        bg.html(html);
        $('body').prepend(bg);
    }
    createFattoBackground();

    // Adiciona redirecionamento ao ícone do GitHub no rodapé
    $(document).ready(function() {
        $('.footer-right .fa-github').on('click', function() {
            window.open('https://github.com/Samuel-devop', '_blank');
        });
        $('.footer-right .fa-envelope').on('click', function(e) {
            e.preventDefault();
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to=samuel.ramos.07@edu.ufes.br', '_blank');
        });
    });

    // Edição inline da tarefa
    $('#tasksContainer').on('click', '.edit-btn', function() {
        const taskItem = $(this).closest('.task-item');
        const name = taskItem.find('h3').text().trim();
        // Extrai o valor do preço original, removendo símbolos e convertendo vírgula para ponto
        let priceText = taskItem.find('.task-price span').text();
        let price = priceText.replace(/[^\d,\.]/g, '').replace('.', '').replace(',', '.');
        const date = taskItem.find('.task-date span').text();
        // Cria campos editáveis
        taskItem.find('h3').replaceWith(`<input type='text' class='edit-name' value='${name}' style='margin-bottom:8px; width:90%; font-size:1.1rem; font-weight:600; color:#b71c1c; border:1px solid #b71c1c; border-radius:6px; padding:4px 10px;'>`);
        taskItem.find('.task-date span').replaceWith(`<input type='date' class='edit-date' value='${date.split('/').reverse().join('-')}' style='border:1px solid #b71c1c; border-radius:6px; padding:4px 10px;'>`);
        taskItem.find('.task-price span').replaceWith(`<input type='number' class='edit-price' value='${price}' min='0' step='0.01' style='border:1px solid #b71c1c; border-radius:6px; padding:4px 10px;'>`);
        $(this).hide();
        taskItem.find('.complete-btn').hide();
        taskItem.find('.delete-btn').hide();
        if (!taskItem.find('.save-btn').length) {
            taskItem.find('.task-actions').prepend(`<button class="save-btn" style="background:#fff; color:#b71c1c; border:1.5px solid #b71c1c; border-radius:6px; padding:7px 16px; font-size:15px; font-weight:500; cursor:pointer; box-shadow:0 2px 6px rgba(183,28,28,0.07);"><i class="fas fa-save"></i> Salvar</button>`);
            taskItem.find('.task-actions').prepend(`<button class="cancel-edit-btn" style="background:#fff; color:#b71c1c; border:1.5px solid #b71c1c; border-radius:6px; padding:7px 16px; font-size:15px; font-weight:500; cursor:pointer; box-shadow:0 2px 6px rgba(183,28,28,0.07);"><i class="fas fa-times"></i> Cancelar</button>`);
        }
    });

    // Cancelar edição
    $('#tasksContainer').on('click', '.cancel-edit-btn', function() {
        location.reload(); // Simples: recarrega para restaurar estado original
    });

    // Pop-up de aviso estilizado para nome duplicado
    function showNameExistsPopup() {
        if ($('#delete-popup').length) return;
        const popup = $(`
            <div id="delete-popup" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.18); z-index:9999; display:flex; align-items:center; justify-content:center;">
                <div style="background:#fff; border-radius:16px; box-shadow:0 8px 32px #b71c1c22; border:2px solid #b71c1c; padding:32px 38px; min-width:320px; display:flex; flex-direction:column; align-items:center; gap:18px;">
                    <i class="fas fa-exclamation-triangle" style="color:#b71c1c; font-size:2.2rem;"></i>
                    <div style="font-size:1.15rem; color:#b71c1c; font-weight:700; text-align:center;">Já existe uma tarefa com esse nome!<br>Não é possível salvar esta tarefa.</div>
                    <div style="display:flex; gap:18px; margin-top:10px;">
                        <button id="cancel-name" style="background:#fff; color:#b71c1c; border:2px solid #b71c1c; border-radius:8px; padding:10px 22px; font-size:1rem; font-weight:600; cursor:pointer; box-shadow:0 2px 8px #b71c1c22;">OK</button>
                    </div>
                </div>
            </div>
        `);
        $('body').append(popup);
        $('#cancel-name').on('click', function() {
            $('#delete-popup').remove();
        });
    }

    // Salvar edição
    $('#tasksContainer').on('click', '.save-btn', function() {
        const taskItem = $(this).closest('.task-item');
        const newName = taskItem.find('.edit-name').val().trim();
        const newDate = taskItem.find('.edit-date').val();
        let newPrice = taskItem.find('.edit-price').val();
        // Corrige para aceitar vírgula ou ponto
        if (typeof newPrice === 'string') {
            newPrice = newPrice.replace(',', '.');
        }
        // Verifica nome duplicado (exceto o próprio)
        let nameExists = false;
        $('.task-item').not(taskItem).find('h3, .edit-name').each(function() {
            if ($(this).val ? $(this).val().trim().toLowerCase() === newName.toLowerCase() : $(this).text().trim().toLowerCase() === newName.toLowerCase()) {
                nameExists = true;
            }
        });
        if (nameExists) {
            showNameExistsPopup();
            return;
        }
        // Atualiza campos sem recriar estrutura
        const formattedDate = new Date(newDate).toLocaleDateString('pt-BR');
        let priceValue = parseFloat(newPrice);
        if (isNaN(priceValue)) {
            priceValue = parseFloat(taskItem.find('.edit-price').attr('value').replace(',', '.')) || 0;
        }
        const formattedPrice = priceValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const isHighCost = priceValue >= 1000;
        // Atualiza apenas o texto dos campos
        taskItem.find('.edit-name').replaceWith(`<h3 style="margin-bottom:8px;">${newName}</h3>`);
        taskItem.find('.edit-date').replaceWith(`<span>${formattedDate}</span>`);
        taskItem.find('.edit-price').replaceWith(`<span>${formattedPrice}</span>`);
        // Atualiza classe de destaque
        if (isHighCost) {
            taskItem.addClass('high-cost');
            taskItem.find('.task-price').addClass('high-price');
        } else {
            taskItem.removeClass('high-cost');
            taskItem.find('.task-price').removeClass('high-price');
        }
        taskItem.find('.save-btn').remove();
        taskItem.find('.cancel-edit-btn').remove();
        taskItem.find('.edit-btn').show();
        taskItem.find('.complete-btn').show();
        taskItem.find('.delete-btn').show();
    });
});