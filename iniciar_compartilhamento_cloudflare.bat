```bat
@echo off
setlocal

title Compartilhamento Completo Dashboard TCE

echo ==========================================
echo INICIANDO DASHBOARD TCE
echo ==========================================

cd /d "C:\Users\bruno.santos\.gemini\antigravity\scratch"

REM ==========================================
REM INICIA O DASHBOARD ORIGINAL
REM ==========================================

start "Dashboard TCE" cmd /k "C:\Users\bruno.santos\.gemini\antigravity\scratch\Iniciar Dashboard.bat"

timeout /t 10 >nul

REM ==========================================
REM INICIA O SERVIDOR HTML
REM ==========================================

start "Servidor HTML" cmd /k "python -m http.server 8080"

timeout /t 5 >nul

REM ==========================================
REM VERIFICA CLOUDFLARED
REM ==========================================

set CLOUDFLARED=C:\cloudflared\cloudflared.exe

IF NOT EXIST "%CLOUDFLARED%" (
    echo.
    echo ERRO:
    echo cloudflared.exe nao encontrado em:
    echo %CLOUDFLARED%
    echo.
    pause
    exit
)

REM ==========================================
REM ABRE TUNEL DO BACKEND 3131
REM ==========================================

start "Tunnel Backend" cmd /k "%CLOUDFLARED% tunnel --url http://127.0.0.1:3131"

timeout /t 8 >nul

REM ==========================================
REM ABRE TUNEL DO FRONTEND 8080
REM ==========================================

start "Tunnel Frontend" cmd /k "%CLOUDFLARED% tunnel --url http://127.0.0.1:8080"

echo.
echo ==========================================
echo TUDO INICIADO
echo ==========================================
echo.
echo AGORA:
echo.
echo 1. Aguarde abrir DUAS janelas do Cloudflare
echo.
echo 2. COPIE o link HTTPS da janela:
echo.
echo    Tunnel Frontend
echo.
echo 3. Compartilhe com os colaboradores:
echo.
echo    LINK/index_colaborador.html
echo.
echo EXEMPLO:
echo.
echo https://abc.trycloudflare.com/index_colaborador.html
echo.
pause
```
