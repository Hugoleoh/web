# FRONT-END DO SISTEMA DE VOTAÇÃO POLLAR

TUTORIAL DE INSTALAÇÃO DO AMBIENTE DE DESENVOLVIMENTO DO FRONT-END

Passo 1 - Clonagem do repositório com o comando "git clone https://github.com/Hugoleoh/web.git" no terminal dentro da pasta de sua máquina onde deseja manter os arquivos do projeto, é necessário ter o GIT instalado na máquina (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

COM DOCKER

Passo 2 - Tendo o docker instalado na máquina (https://docs.docker.com/get-docker/), rodar o comando "docker compose up", no linux "sudo docker compose up", no diretório do projeto. O docker iniciará a execução da sistema na porta 8000. Para acessar o front utilizar o endereço "localhost:8000"

SEM DOCKER

Passo 2 - Sem o docker será necessário ter o npm e o node instalados na máquina (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Passo 3 - Após a instalação do node e npm, rodar comando "npm install" no diretório do projeto web, para configuração inicial do ambiente

Passo 4 - Rodar o comando "npm run serve" que iniciará a execução da sistema na porta 8000. Para acessar o front utilizar o endereço "localhost:8000"

Obs.: Comandos úteis

### Compila e otimiza para produção
```
npm run build
```

### Roda o lint e corrige arquivos
```
npm run lint
```
### Personalizar configuração
See [Configuration Reference](https://cli.vuejs.org/config/).
