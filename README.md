### Rodando os projetos

Primeiro execute: `docker compose up -d`, para que sejam criados os containers necessários para a execução do projeto.

Para rodar os projetos, antes crie as envs de cada um:

Para o projeto HTTP
```
SECRET_KEY = "aHR0cC1mb3ItYXM2NGEtc3VmZmljaWVuY3ktZXhhbQ=="
DATA_BASE_URI="mongodb://admin:aHR0cC1mb3ItYXM2NGEtc3VmZmljaWVuY3ktZXhhbQ%3D%3D@localhost:27017/"
REDIS_PORT=6379
REDIS_HOST=localhost
```

Para o projeto WEBS_OCKET:
```
SECRET_KEY="aHR0cC1mb3ItYXM2NGEtc3VmZmljaWVuY3ktZXhhbQ==";
CHAT_MSG_QUEE_NAME="chat-message";
```

Para o projeto WRINTING_SERVICE:
```
DATA_BASE_URI="mongodb://admin:aHR0cC1mb3ItYXM2NGEtc3VmZmljaWVuY3ktZXhhbQ%3D%3D@localhost:27017/"
SECRET_KEY="aHR0cC1mb3ItYXM2NGEtc3VmZmljaWVuY3ktZXhhbQ=="
CHAT_MSG_QUEE_NAME=chat-message
```

Pode rodar os projetos via termina e pela raiz utilizando os comandos: 

```sh
- npm run ws
- npm run http
- npm run websocket
```