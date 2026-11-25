# CLEY COOE Studio para Windows

O repositório inclui uma versão desktop empacotada com Electron.

## Gerar o instalador automaticamente

1. Abra a aba Actions do repositório.
2. Selecione **Compilar CLEY COOE para Windows**.
3. Clique em **Run workflow** e confirme.
4. Aguarde o trabalho build-windows terminar com sucesso.
5. Abra a execução concluída e baixe o artefato **CLEY-COOE-Windows-Setup**.
6. Extraia o ZIP e execute o instalador EXE.

A compilação também é acionada automaticamente quando arquivos do aplicativo ou da configuração Windows são alterados na branch main.

## Executar localmente

Requer Node.js 22 ou superior e Windows.

    npm install
    npm start

Para gerar o instalador localmente:

    npm run dist:win

O instalador fica na pasta dist.

## Segurança e limites

O aplicativo abre o painel local index.html numa janela Electron. Node.js não é exposto à página (contextIsolation ativo e nodeIntegration desativado). O CMD interno executa apenas ações implementadas no painel; não é um terminal do Windows e não executa comandos arbitrários do sistema.
