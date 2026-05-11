@echo off
title Delta Gestao Publica - Servidor PAD
color 0A
echo.
echo ============================================================
echo   Delta Gestao Publica - Iniciando Servidor PAD Local
echo ============================================================
echo.
echo  O servidor ira consultar o TCE-RS em tempo real.
echo  Aguarde o inicio e acesse o link abaixo no navegador.
echo.
echo  ATENCAO: Mantenha esta janela aberta enquanto usar o dashboard.
echo.
cd /d "%~dp0"
node server\server.js
pause
