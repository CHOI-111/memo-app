# 설치 및 실행 가이드

## PowerShell 권한 오류 해결 방법

### 방법 1: 배치 파일 사용 (권장)

1. `start-server-simple.bat` 파일을 더블클릭
2. 자동으로 서버가 시작됩니다

### 방법 2: 명령 프롬프트(CMD) 사용

1. Windows 키 + R을 눌러 실행 창 열기
2. `cmd` 입력 후 Enter
3. 프로젝트 폴더로 이동:
   ```
   cd "C:\Users\CKIRUser\Documents\MyProject - 복사본"
   ```
4. 서버 폴더로 이동:
   ```
   cd server
   ```
5. 의존성 설치:
   ```
   npm install
   ```
6. 서버 시작:
   ```
   npm start
   ```

### 방법 3: 관리자 권한으로 실행

1. Cursor를 관리자 권한으로 실행:
   - Cursor 아이콘 우클릭 → "관리자 권한으로 실행"
2. 터미널에서 명령어 실행

### 방법 4: 직접 Node.js 실행

1. 파일 탐색기에서 `server` 폴더 열기
2. 주소창에 `cmd` 입력 후 Enter
3. 다음 명령어 실행:
   ```
   npm install
   npm start
   ```

## 서버 실행 확인

서버가 정상적으로 실행되면 다음과 같은 메시지가 표시됩니다:

```
SQLite 데이터베이스에 연결되었습니다: ...
서버가 http://localhost:3001 에서 실행 중입니다.
```

## 브라우저 접속

서버가 실행된 후 브라우저에서 다음 주소로 접속:
- http://localhost:3001

## 문제 해결

### npm이 설치되지 않은 경우

1. Node.js 다운로드: https://nodejs.org/
2. LTS 버전 설치
3. 설치 후 터미널 재시작

### 포트 3001이 이미 사용 중인 경우

`server/server.js` 파일에서 포트 번호를 변경:
```javascript
const PORT = 3002; // 또는 다른 포트 번호
```

### 데이터베이스 오류

`server` 폴더에 쓰기 권한이 있는지 확인하세요.
