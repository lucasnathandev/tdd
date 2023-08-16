# Carregar compras do cache

## Caso de sucesso

<ol>
<li>Sistema executa o comando "Carregar compras"</li>
<li>Sistema carrega os dados do Cache</li>
<li>Sistema valida se o Cache tem menos de 3 dias</li>
<li>Sistema cria uma lista de compras a partir dos dados do Cache</li>
<li>Sistema retorna a lista de compras</li>
</ol>

## Exceção - Cache expirado

<ol>
<li>Sistema limpa o cache</li>
<li>Sistema retorna erro</li>
</ol>


## Exceção - Cache vazio

<ol>
<li>Sistema retorna erro</li>
</ol>