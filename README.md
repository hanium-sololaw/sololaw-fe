# 🎯 Branch Convention & Git Convention

## 🎯 Git Convention

- 🎉 **Start:** Start New Project [:tada]
- ✨ **Feat:** 새로운 기능을 추가 [:sparkles]
- 🐛 **Fix:** 버그 수정 [:bug]
- 🎨 **Design:** CSS 등 사용자 UI 디자인 변경 [:art]
- ♻️ **Refactor:** 코드 리팩토링 [:recycle]
- 🔧 **Settings:** Changing configuration files [:wrench]
- 🗃️ **Comment:** 필요한 주석 추가 및 변경 [:card_file_box]
- ➕ **Dependency/Plugin:** Add a dependency/plugin [:heavy_plus_sign]
- 📝 **Docs:** 문서 수정 [:memo]
- 🔀 **Merge:** Merge branches [:twisted_rightwards_arrows:]
- 🚀 **Deploy:** Deploying stuff [:rocket]
- 🚚 **Rename:** 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 [:truck]
- 🔥 **Remove:** 파일을 삭제하는 작업만 수행한 경우 [:fire]
- ⏪️ **Revert:** 전 버전으로 롤백 [:rewind]

## 🪴 Branch Convention (GitHub Flow)

- `main`: 배포 가능한 브랜치, 항상 배포 가능한 상태를 유지
- `feature/{description}`: 새로운 기능을 개발하는 브랜치
  - 예: `feature/add-login-page`

### Flow

1. `main` 브랜치에서 새로운 브랜치를 생성.
2. 작업을 완료하고 커밋 메시지에 맞게 커밋.
3. Pull Request를 생성 / 팀원들의 리뷰.
4. 리뷰가 완료되면 `main` 브랜치로 병합.
5. 병합 후, 필요시 배포.
   **예시**:

```bash
# 새로운 기능 개발
git checkout -b feature/add-login-page
# 작업 완료 후, main 브랜치로 병합
git checkout main
git pull origin main
git merge feature/add-login-page
git push origin main
```

# sololaw-fe

## 기술 스택

| 분류          | 기술                        |
| ------------- | --------------------------- |
| 프레임워크    | React 19                    |
| 언어          | TypeScript 6                |
| 빌드 도구     | Vite 8                      |
| 스타일        | Tailwind CSS 4              |
| 라우팅        | React Router DOM 7          |
| 패키지 매니저 | Yarn Berry 4 (node-modules) |

---

## 프로젝트 구조 - Page-Scoped Colocation 구조

````
src/
├── main.tsx                        # 앱 진입점
├── global.css                      # 전역 스타일
│
├── app/                            # 앱 초기화 레이어
│   ├── router.tsx                  # 라우트 정의
│   └── providers.tsx               # 전역 Provider
│
├── pages/                          # 페이지 레이어
│   ├── home/
│   │   ├── index.tsx
│   │   └── ui/
│   │
│   ├── login/
│   │   ├── index.tsx
│   │   ├── api/
│   │   └── ui/
│
└── shared/
    ├── api/
    │   ├── client.ts
    │   └── interceptors.ts
    │
    ├── ui/
    │   ├── layouts/
    │   │   ├── MainLayout.tsx
    │   │   └── AuthLayout.tsx
    │   ├── Button/
    │   ├── Input/
    │   ├── Modal/
    │   └── Avatar/
    │
    └──  hooks/
````


### 구조 규칙

- **pages/** 하위 폴더는 `index.tsx`(페이지 조합), `ui/`(UI 컴포넌트), `api/`(API 호출), `hooks/`(해당 페이지 전용 훅)으로 구성합니다.
- **shared/**는 여러 페이지에서 재사용되는 코드만 둡니다. 특정 페이지에서만 쓰이는 코드는 해당 페이지 폴더에 둡니다.
- import는 `@/` alias를 사용합니다. (`@` = `src/`)

---

## 시작하기

### 의존성 설치

```bash
yarn install
````

### 개발 서버 실행

```bash
yarn dev
```

### 빌드

```bash
yarn build
```

### 빌드 결과물 미리보기

```bash
yarn preview
```

---

## Yarn Berry 주요 명령어

```bash
# 패키지 설치
yarn add <패키지명>

# 개발 의존성 설치
yarn add -D <패키지명>

# 패키지 제거
yarn remove <패키지명>

# 설치된 패키지 목록 확인
yarn info <패키지명>

# 패키지 버전 업그레이드 (interactive)
yarn up <패키지명>

# 전체 패키지 최신 버전으로 업그레이드
yarn up --recursive '*'

# 스크립트 실행
yarn <스크립트명>
```
