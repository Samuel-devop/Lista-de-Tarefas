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

    // Adiciona spinner de loading
    function showLoadingSpinner() {
        if ($('#loading-spinner').length) return;
        $('#tasksContainer').html('<div id="loading-spinner" style="display:flex; justify-content:center; align-items:center; padding:32px;"><i class="fas fa-spinner fa-spin" style="font-size:2.2rem; color:#b71c1c;"></i></div>');
    }
    function hideLoadingSpinner() {
        $('#loading-spinner').remove();
    }

    // Função para carregar tarefas do banco
    function loadTasks() {
        showLoadingSpinner();
        $.get('src/php/listar_tarefas.php', function(data) {
            let tarefas = [];
            try {
                tarefas = JSON.parse(data);
            } catch (e) {
                tarefas = [];
            }
            hideLoadingSpinner();
            if (!tarefas.length) {
                $('#tasksContainer').html(`
                    <div id="emptyState" class="empty-state">
                        <i class="fas fa-clipboard-list"></i>
                        <p>Nenhuma tarefa cadastrada</p>
                    </div>
                `);
                return;
            }
            tarefas.forEach(tarefa => {
                const formattedDate = new Date(tarefa.data_limite).toLocaleDateString('pt-BR');
                const priceValue = parseFloat(tarefa.custo);
                const formattedPrice = priceValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                addTaskItem(tarefa.id, tarefa.nome, formattedPrice, formattedDate, priceValue >= 1000, tarefa.concluida);
            });
        });
    }

    // Adiciona tarefa na tela
    function addTaskItem(id, taskName, formattedPrice, formattedDate, isHighCost = false) {
    const taskItem = $('<div>').addClass('task-item').attr('data-id', id);
    if (isHighCost) taskItem.addClass('high-cost');
    // Adiciona classe completed se estiver concluída
    if (arguments.length > 5 && arguments[5]) taskItem.addClass('completed');
        taskItem.html(`
            <div class="task-main-row" style="display:flex; align-items:flex-start; gap:12px;">
                <div style="flex:1;">
                    <h3>${taskName}</h3>
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
                <button class="edit-btn"><i class="fas fa-edit"></i> Editar</button>
                <button class="delete-btn"><i class="fas fa-trash"></i> Excluir</button>
            </div>
        `);
        $('#tasksContainer').append(taskItem);
    // Delegação de evento para o botão de concluir (agora integrado ao backend)
    $('#tasksContainer').off('click', '.complete-btn').on('click', '.complete-btn', function() {
        const taskItem = $(this).closest('.task-item');
        const id = taskItem.data('id');
        $.ajax({
            url: 'src/php/concluir_tarefa.php',
            type: 'POST',
            data: { id: id },
            success: function(response) {
                let res;
                try { res = JSON.parse(response); } catch (e) { res = {}; }
                if (res.success) {
                    // Atualiza visual conforme status retornado
                    if (res.message && res.message.includes('concluída')) {
                        taskItem.addClass('completed');
                    } else {
                        taskItem.removeClass('completed');
                    }
                    // Removido popup ao concluir ou deixar pendente
                } else {
                    showPopup(res.message || 'Erro ao atualizar status da tarefa.');
                }
            },
            error: function(xhr) {
                showPopup('Erro ao conectar ao servidor.');
            }
        });
    });
    }

    // Carrega as tarefas ao iniciar
    loadTasks();

    // Manipular o envio do formulário
    $('#expandedForm').off('submit').on('submit', function(e) {
        e.preventDefault();
        const taskName = $('#taskName').val().trim();
        const taskPrice = $('#taskPrice').val() || '0';
        const taskDate = $('#taskDate').val();
        if (!taskName) {
            showPopup('Por favor, insira um nome para a tarefa.');
            return;
        }
        if (!taskDate) {
            showPopup('Por favor, selecione uma data.');
            return;
        }
        showLoadingSpinner();
        $.ajax({
            url: 'src/php/incluir_tarefa.php',
            type: 'POST',
            data: {
                nome: taskName,
                custo: taskPrice,
                data_limite: taskDate
            },
            success: function(response) {
                let res;
                try {
                    res = typeof response === 'object' ? response : JSON.parse(response);
                } catch (e) {
                    hideLoadingSpinner();
                    showPopup('Resposta inválida do servidor.');
                    return;
                }
                hideLoadingSpinner();
                if (res.success) {
                    // Não mostrar pop-up de sucesso
                    loadTasks();
                    $('#expandedForm')[0].reset();
                    $('#expandedForm').slideUp(300);
                    $('#toggleForm').html('<i class="fas fa-plus"></i> Adicionar Nova Tarefa');
                } else {
                    showPopup(res.message || 'Erro ao incluir tarefa.');
                }
            },
            error: function(xhr, status, error) {
                hideLoadingSpinner();
                let msg = 'Erro ao incluir tarefa.';
                if (xhr && xhr.responseText) {
                    try {
                        let res = JSON.parse(xhr.responseText);
                        msg = res.message || msg;
                    } catch (e) {
                        msg = 'Erro inesperado: ' + xhr.responseText;
                    }
                }
                showPopup(msg);
            }
        });
    });

    // Função para mostrar pop-ups de mensagem
    function showPopup(message, success = false) {
        if ($('#custom-popup').length) return;
        const popup = $(`
            <div id="custom-popup" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.18); z-index:9999; display:flex; align-items:center; justify-content:center;">
                <div style="background:#fff; border-radius:16px; box-shadow:0 8px 32px #b71c1c22; border:2px solid #b71c1c; padding:32px 38px; min-width:320px; display:flex; flex-direction:column; align-items:center; gap:18px;">
                    <i class="fas ${success ? 'fa-check-circle' : 'fa-exclamation-triangle'}" style="color:#b71c1c; font-size:2.2rem;"></i>
                    <div style="font-size:1.15rem; color:#b71c1c; font-weight:700; text-align:center;">${message}</div>
                    <div style="display:flex; gap:18px; margin-top:10px;">
                        <button id="close-popup" style="background:#fff; color:#b71c1c; border:2px solid #b71c1c; border-radius:8px; padding:10px 22px; font-size:1rem; font-weight:600; cursor:pointer; box-shadow:0 2px 8px #b71c1c22;">OK</button>
                    </div>
                </div>
            </div>
        `);
        $('body').append(popup);
        $('#close-popup').on('click', function() {
            $('#custom-popup').remove();
        });
    }

    // Delegação de evento para o botão de excluir
    $('#tasksContainer').on('click', '.delete-btn', function() {
        const taskItem = $(this).closest('.task-item');
        const id = taskItem.data('id');
        showConfirmPopup('Tem certeza que deseja excluir esta tarefa?', function() {
            $.post('src/php/excluir_tarefa.php', { id: id }, function(response) {
                let res;
                try { res = JSON.parse(response); } catch (e) { res = {}; }
                if (res.success) {
                    showPopup(res.message || 'Tarefa excluída com sucesso!', true);
                    loadTasks();
                } else {
                    showPopup(res.message || 'Erro ao excluir tarefa.');
                }
            });
        });
    });

    // Pop-up de confirmação para exclusão
    function showConfirmPopup(message, onConfirm) {
        if ($('#custom-popup').length) return;
        const popup = $(`
            <div id="custom-popup" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.18); z-index:9999; display:flex; align-items:center; justify-content:center;">
                <div style="background:#fff; border-radius:16px; box-shadow:0 8px 32px #b71c1c22; border:2px solid #b71c1c; padding:32px 38px; min-width:320px; display:flex; flex-direction:column; align-items:center; gap:18px;">
                    <i class="fas fa-trash" style="color:#b71c1c; font-size:2.2rem;"></i>
                    <div style="font-size:1.15rem; color:#b71c1c; font-weight:700; text-align:center;">${message}</div>
                    <div style="display:flex; gap:18px; margin-top:10px;">
                        <button id="confirm-delete" style="background:#b71c1c; color:#fff; border:none; border-radius:8px; padding:10px 22px; font-size:1rem; font-weight:600; cursor:pointer; box-shadow:0 2px 8px #b71c1c22;">Confirmar</button>
                        <button id="cancel-delete" style="background:#fff; color:#b71c1c; border:2px solid #b71c1c; border-radius:8px; padding:10px 22px; font-size:1rem; font-weight:600; cursor:pointer; box-shadow:0 2px 8px #b71c1c22;">Cancelar</button>
                    </div>
                </div>
            </div>
        `);
        $('body').append(popup);
        $('#confirm-delete').on('click', function() {
            $('#custom-popup').remove();
            if (onConfirm) onConfirm();
        });
        $('#cancel-delete').on('click', function() {
            $('#custom-popup').remove();
        });
    }

    // Delegação de evento para o botão de editar
    $('#tasksContainer').on('click', '.edit-btn', function() {
        const taskItem = $(this).closest('.task-item');
        const id = taskItem.data('id');
        const name = taskItem.find('h3').text().trim();
        let priceText = taskItem.find('.task-price span').text();
        let price = priceText.replace(/[^\d,\.]/g, '').replace('.', '').replace(',', '.');
        const date = taskItem.find('.task-date span').text();
        // Cria campos editáveis
        taskItem.find('h3').replaceWith(`<input type='text' class='edit-name' value='${name}' style='margin-bottom:8px; width:90%; font-size:1.1rem; font-weight:600; color:#b71c1c; border:1px solid #b71c1c; border-radius:6px; padding:4px 10px;'>`);
        taskItem.find('.task-date span').replaceWith(`<input type='date' class='edit-date' value='${date.split('/').reverse().join('-')}' style='border:1px solid #b71c1c; border-radius:6px; padding:4px 10px;'>`);
        taskItem.find('.task-price span').replaceWith(`<input type='number' class='edit-price' value='${price}' min='0' step='0.01' style='border:1px solid #b71c1c; border-radius:6px; padding:4px 10px;'>`);
        taskItem.find('.edit-btn').hide();
        taskItem.find('.delete-btn').hide();
        taskItem.find('.complete-btn').hide();
        if (!taskItem.find('.save-btn').length) {
            taskItem.find('.task-actions').prepend(`<button class="save-btn"><i class="fas fa-save"></i> Salvar</button>`);
            taskItem.find('.task-actions').prepend(`<button class="cancel-edit-btn"><i class="fas fa-times"></i> Cancelar</button>`);
        }
    });

    // Cancelar edição
    $('#tasksContainer').on('click', '.cancel-edit-btn', function() {
        loadTasks();
    });

    // Salvar edição
    $('#tasksContainer').on('click', '.save-btn', function() {
        const taskItem = $(this).closest('.task-item');
        const id = taskItem.data('id');
        const newName = taskItem.find('.edit-name').val().trim();
        const newDate = taskItem.find('.edit-date').val();
        let newPrice = taskItem.find('.edit-price').val();
        if (typeof newPrice === 'string') {
            newPrice = newPrice.replace(',', '.');
        }
        $.post('src/php/editar_tarefa.php', {
            id: id,
            nome: newName,
            custo: newPrice,
            data_limite: newDate
        }, function(response) {
            let res;
            try { res = JSON.parse(response); } catch (e) { res = {}; }
            if (res.success) {
                showPopup(res.message || 'Tarefa editada com sucesso!', true);
                loadTasks();
            } else {
                showPopup(res.message || 'Erro ao editar tarefa.');
            }
        });
    });

    // Botões de mover tarefa
    $('#tasksContainer').on('click', '.move-up', function() {
        const item = $(this).closest('.task-item');
        const id = item.data('id');
        const ordem = item.index() + 1;
        const prev = item.prev('.task-item');
        if (!prev.length) return;
        const prevId = prev.data('id');
        const prevOrdem = prev.index() + 1;
        $.post('src/php/reordenar_tarefa.php', {
            id: id,
            ordem: ordem,
            id_alvo: prevId,
            ordem_alvo: prevOrdem
        }, function(response) {
            loadTasks();
        });
    });
    $('#tasksContainer').on('click', '.move-down', function() {
        const item = $(this).closest('.task-item');
        const id = item.data('id');
        const ordem = item.index() + 1;
        const next = item.next('.task-item');
        if (!next.length) return;
        const nextId = next.data('id');
        const nextOrdem = next.index() + 1;
        $.post('src/php/reordenar_tarefa.php', {
            id: id,
            ordem: ordem,
            id_alvo: nextId,
            ordem_alvo: nextOrdem
        }, function(response) {
            loadTasks();
        });
    });

});