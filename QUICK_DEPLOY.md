# 빠른 배포 가이드 (한국어)

## 5분 안에 배포하기

### 1. GitHub 저장소 만들기
1. [github.com](https://github.com) 로그인
2. 우측 상단 **+** → **New repository**
3. 이름 입력 (예: `memo-app`)
4. **Create repository** 클릭

### 2. 파일 업로드 (간단한 방법)

**방법 A: 웹에서 직접 업로드**
1. 저장소 페이지에서 **uploading an existing file** 클릭
2. `index.html` 파일 드래그 앤 드롭
3. **Commit changes** 클릭

**방법 B: Git 사용 (추천)**
```bash
# 프로젝트 폴더에서 실행
git init
git add index.html README.md
git commit -m "첫 배포"
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

### 3. GitHub Pages 활성화
1. 저장소 → **Settings**
2. 왼쪽 **Pages** 클릭
3. **Source**: `main` 브랜치, `/ (root)` 선택
4. **Save** 클릭

### 4. 완료!
몇 분 후 `https://사용자명.github.io/저장소명/` 접속

## 업데이트하기

파일 수정 후:
```bash
git add .
git commit -m "업데이트"
git push
```

자동으로 배포됩니다!
