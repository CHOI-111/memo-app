@echo off
echo 메모장 앱 서버를 시작합니다...
cd server
echo 의존성을 설치합니다...
call npm install
echo.
echo 서버를 시작합니다...
echo 브라우저에서 http://localhost:3001 을 열어주세요.
echo.
call npm start
pause
