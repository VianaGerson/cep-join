<p align="center">
<img src="https://cep-join.vercel.app/static/logo.png" width="520" alt="Logo" />
</p>

<p align="center"\>Uma API RESTful gratuita e otimizada para buscar endereços a partir de um CEP, utilizando múltiplos serviços para garantir alta disponibilidade e precisão dos dados.</p>

-----

## Descrição

A **CEP Join** é uma API construída com **NestJS** que resolve o problema de indisponibilidade de serviços de CEP. Em vez de depender de uma única fonte, ela consulta e une dados de múltiplas APIs de CEP (como ViaCEP, Brasil API e OpenCEP). Isso garante que, mesmo que uma API falhe, a sua requisição será atendida.

A API retorna os dados de endereço de forma unificada e normalizada, independentemente da fonte, facilitando a integração em qualquer aplicação.

-----

## Rotas

### 1\. Consultar CEP (Rota principal)

Esta rota busca o endereço de um CEP, tentando diferentes APIs até encontrar um resultado válido.

  * **URL:** `https://cep-join.vercel.app/:zipCode`
  * **Método:** `GET`
  * **Exemplo de URL:** `https://cep-join.vercel.app/01001000`

### 2\. Consultar CEP com fonte específica

Esta rota permite que você force a busca de um CEP em uma API específica.

  * **URL:** `https://cep-join.vercel.app/:zipCode?source=:source`
  * **Método:** `GET`
  * **Parâmetros de Query:**
      * `source`: Nome da API a ser consultada. Opções: `viacep`, `opencep` ou `brasilapi`.
  * **Exemplo de URL:** `https://cep-join.vercel.app/01001000?source=viacep`

-----

## Formato de Resposta

O formato de retorno da API é consistente e normalizado, retornando os seguintes campos em JSON:

```json
{
  "zip_code": "01001-000",
  "street": "Praça da Sé",
  "neighborhood": "Sé",
  "city": "São Paulo",
  "state": "SP",
  "source": "viacep"
}
```

-----

## Desenvolvimento do Projeto

Este projeto é um excelente exemplo de como o **NestJS** pode ser usado para criar serviços robustos e tolerantes a falhas.

### Configuração

```bash
$ npm install
# ou
$ yarn
```

### Rodar a aplicação

```bash
# modo de desenvolvimento
$ npm run start

# modo de observação (watch mode)
$ npm run start:dev

# modo de produção
$ npm run start:prod
```

### Testes

```bash
# testes de unidade
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

-----

## Contato e Suporte

  * **Autor:** Gerson Viana
  * **GitHub:** [GitHub](https://github.com/VianaGerson)

Sinta-se à vontade para abrir uma *issue* para reportar bugs, sugerir melhorias ou fazer perguntas sobre o projeto.

-----

## Licença

Este projeto é [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).