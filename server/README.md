# 서버 실행 방법

## 1. 의존성 설치

```bash
cd server
npm install
```

## 2. 서버 실행

```bash
npm start
```

또는 개발 모드로 실행 (nodemon 사용):

```bash
npm run dev
```

서버가 `http://localhost:3001`에서 실행됩니다.

## 3. 데이터베이스

서버 실행 시 자동으로 `memoapp.db` 파일이 생성됩니다.

## 문제 해결

### 서버가 실행되지 않는 경우

1. Node.js가 설치되어 있는지 확인: `node --version`
2. 의존성이 설치되어 있는지 확인: `npm install` 실행
3. 포트 3001이 사용 중인지 확인

### 데이터베이스 오류

- `memoapp.db` 파일이 생성되지 않으면 서버 폴더에 쓰기 권한이 있는지 확인하세요.
