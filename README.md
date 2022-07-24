# Habilite-se

Crie petições de habilitação em segundos direto do seu navegador.

## Vantagens

Todo o trabalho é feito diretamente pelo navegador do usuário. Nenhum dado da petição ou planilha é enviado para a internet ou para algum servidor, o que garante a confidencialidade dos dados e a total conformidade com a LGPD. Jamais exponha os dados de seus clientes ou escritório a web pública.

## Uso

O app lê uma petição modelo como template e uma planilha de excel com os dados para preencher o template.

Escolher uma petição para o modelo e substituir os seguintes trechos, incluindo as chaves:

- Endereçamento por {enderecamento}
- Número do processo por {processo}
- Nome da parte adversa por {parte}
- Data por {data}

O campo data será preenchido automaticamente com a data do dia no formato (dd de mês de aaaa).

Escolher uma planilha com os dados e mapear as colunas da planilha com os campos substituíveis.

Escolher o Tribunal e a instância e clicar em gerar petições.

## Development

```
npm start
npm test
```
