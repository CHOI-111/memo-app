@echo off
chcp 65001 >nul
echo ========================================
echo 메모장 앱 서버 시작
echo ========================================
echo.

cd /d "%~dp0server"

if not exist "node_modules" (
    echo [1/2] 의존성 패키지를 설치하는 중...
    call npm install
    if errorlevel 1 (
        echo 오류: npm install 실패
        pause
        exit /b 1
    )
    echo.
) else (
    echo [1/2] 의존성 패키지는 이미 설치되어 있습니다.
    echo.
)

echo [2/2] 서버를 시작합니다...
echo.
echo ========================================
echo 서버 주소: http://localhost:3001
echo ========================================
echo 브라우저에서 위 주소를 열어주세요.
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo.

call npm start

pause
