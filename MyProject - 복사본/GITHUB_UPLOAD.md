# GitHub에 파일 업로드 가이드

## 방법 1: 웹에서 직접 업로드 (가장 간단) ⭐

### 1단계: 파일 업로드 시작
1. https://github.com/CHOI-111/memo-app 페이지로 이동
2. 저장소가 비어있으므로 "uploading an existing file" 링크를 클릭
   - 또는 상단의 **"Add file"** 버튼 클릭 → **"Upload files"** 선택

### 2단계: 파일 선택
1. **"choose your files"** 또는 파일 드래그 앤 드롭 영역 클릭
2. 다음 파일들을 선택:
   - `index.html` (필수!)
   - `README.md` (선택사항)
   - `DEPLOY.md` (선택사항)
   - `QUICK_DEPLOY.md` (선택사항)

**중요**: `index.html` 파일은 반드시 업로드해야 합니다!

### 3단계: 커밋
1. 하단의 **"Commit changes"** 섹션에서:
   - 제목: "메모장 앱 초기 업로드" (또는 원하는 메시지)
   - 설명: 선택사항
2. **"Commit changes"** 버튼 클릭

### 4단계: GitHub Pages 활성화
1. 저장소 페이지에서 **"Settings"** 탭 클릭
2. 왼쪽 사이드바에서 **"Pages"** 클릭
3. **"Source"** 섹션에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
4. **"Save"** 버튼 클릭

### 5단계: 배포 확인
- 몇 분 후 `https://choi-111.github.io/memo-app/` 접속
- 메모장 앱이 정상 작동하는지 확인!

---

## 방법 2: Git 명령어 사용 (추천)

### 사전 준비
Git이 설치되어 있어야 합니다. 설치되어 있지 않다면:
- https://git-scm.com/download/win 에서 다운로드

### 1단계: 프로젝트 폴더에서 Git 초기화

```bash
# 프로젝트 폴더로 이동
cd "C:\Users\CKIRUser\Documents\MyProject - 복사본"

# Git 초기화
git init
```

### 2단계: 파일 추가

```bash
# 모든 파일 추가
git add .

# 또는 특정 파일만 추가
git add index.html README.md DEPLOY.md
```

### 3단계: 커밋 생성

```bash
git commit -m "메모장 앱 초기 업로드"
```

### 4단계: GitHub 저장소 연결

```bash
git branch -M main
git remote add origin https://github.com/CHOI-111/memo-app.git
```

### 5단계: 파일 푸시

```bash
git push -u origin main
```

**주의**: 처음 푸시할 때 GitHub 로그인을 요청할 수 있습니다.

### 6단계: GitHub Pages 활성화
- 방법 1의 4단계와 동일

---

## 방법 3: GitHub Desktop 사용

1. **GitHub Desktop 다운로드**
   - https://desktop.github.com/ 에서 다운로드 및 설치

2. **저장소 추가**
   - File → Clone repository
   - URL 탭에서 `https://github.com/CHOI-111/memo-app.git` 입력
   - Clone 클릭

3. **파일 복사**
   - 프로젝트 폴더의 파일들을 클론된 폴더로 복사

4. **커밋 및 푸시**
   - 왼쪽에서 변경사항 확인
   - Summary에 "메모장 앱 초기 업로드" 입력
   - "Commit to main" 클릭
   - "Push origin" 클릭

---

## 업로드 후 확인사항

### 필수 파일 확인
- ✅ `index.html` - 메인 파일 (반드시 필요!)

### 선택 파일
- `README.md` - 프로젝트 설명
- `DEPLOY.md` - 배포 가이드
- `.gitignore` - Git 제외 파일 목록

### 업로드하지 않아도 되는 파일
- `server/` 폴더 (서버 없이 작동하므로)
- `src/` 폴더 (사용하지 않음)
- `public/` 폴더 (사용하지 않음)
- `.bat`, `.sh` 파일 (로컬 실행용)

---

## 문제 해결

### "uploading an existing file" 링크가 보이지 않는 경우
- 상단의 **"Add file"** 버튼 클릭
- **"Upload files"** 선택

### 파일이 너무 많은 경우
- 최소한 `index.html`만이라도 업로드
- 나머지는 나중에 Git으로 추가 가능

### Git push 오류가 발생하는 경우
```bash
# 강제 푸시 (주의: 기존 내용 덮어씀)
git push -u origin main --force
```

### GitHub Pages가 작동하지 않는 경우
1. Settings → Pages에서 올바른 브랜치 선택 확인
2. `index.html`이 루트에 있는지 확인
3. 몇 분 더 기다려보기 (배포에 시간이 걸릴 수 있음)
