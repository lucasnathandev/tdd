# Gravar compras no Cache

## Caso de sucesso
<ol>
<li>Sistema executa o comando "Salvar compras"</li>
<li>Sistema cria uma data para ser armazenada no Cache</li>
<li>Sistema limpa os dados do Cache atual</li>
<li>Sistema grava os novos dados no Cache</li>
<li>Sistema não retorna nenhum erro</li>
</ol>

## Exceção - erro ao apagar dados do cache

<ol>
<li>Sistema não grava os novos dados no Cache</li>
<li>Sistema retorna erro</li>
</ol>

## Exceção - erro ao gravar dados do cache

<ol>
<li>Sistema retorna erro</li>
</ol>