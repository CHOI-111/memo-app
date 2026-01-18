# GitHub Pages 배포 가이드

이 가이드는 GitHub Pages를 사용하여 메모장 앱을 무료로 배포하는 방법을 설명합니다.

## 사전 준비

1. GitHub 계정이 있어야 합니다 (없으면 [github.com](https://github.com)에서 가입)
2. Git이 설치되어 있어야 합니다

## 배포 단계

### 1단계: GitHub 저장소 생성

1. GitHub에 로그인
2. 우측 상단의 **+** 버튼 클릭 → **New repository** 선택
3. 저장소 이름 입력 (예: `memo-app`)
4. **Public** 또는 **Private** 선택
5. **Initialize this repository with a README** 체크 해제 (이미 README가 있으므로)
6. **Create repository** 클릭

### 2단계: 로컬 프로젝트를 Git 저장소로 초기화

터미널(또는 명령 프롬프트)에서 프로젝트 폴더로 이동:

```bash
cd "C:\Users\CKIRUser\Documents\MyProject - 복사본"
```

Git 저장소 초기화:

```bash
git init
```

### 3단계: 파일 추가 및 커밋

모든 파일 추가:

```bash
git add .
```

커밋 생성:

```bash
git commit -m "Initial commit: 메모장 앱"
```

### 4단계: GitHub 저장소에 연결

GitHub에서 생성한 저장소의 URL을 복사합니다 (예: `https://github.com/사용자명/memo-app.git`)

원격 저장소 추가:

```bash
git remote add origin https://github.com/사용자명/memo-app.git
```

**주의**: `사용자명`과 `memo-app`을 실제 값으로 변경하세요!

### 5단계: 코드 푸시

```bash
git branch -M main
git push -u origin main
```

### 6단계: GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. 상단 메뉴에서 **Settings** 클릭
3. 왼쪽 사이드바에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
5. **Save** 클릭

### 7단계: 배포 확인

몇 분 후 다음 주소로 접속:
- `https://사용자명.github.io/memo-app/`

## 업데이트 배포

코드를 수정한 후 다시 배포하려면:

```bash
git add .
git commit -m "업데이트 내용 설명"
git push
```

몇 분 후 변경사항이 자동으로 반영됩니다.

## 문제 해결

### 배포가 안 되는 경우

1. **index.html이 루트에 있는지 확인**
   - `index.html` 파일이 프로젝트 루트에 있어야 합니다

2. **GitHub Pages 설정 확인**
   - Settings → Pages에서 올바른 브랜치와 폴더가 선택되었는지 확인

3. **파일 경로 확인**
   - 모든 파일이 올바른 위치에 있는지 확인

### 커스텀 도메인 사용

GitHub Pages에서 커스텀 도메인을 사용하려면:
1. Settings → Pages → Custom domain에 도메인 입력
2. 도메인 제공업체에서 DNS 설정

## 참고사항

- GitHub Pages는 정적 사이트만 지원합니다 (서버 없이 작동하는 이 앱은 완벽합니다!)
- 무료 플랜에서도 사용 가능합니다
- 배포된 사이트는 HTTPS로 자동 제공됩니다
