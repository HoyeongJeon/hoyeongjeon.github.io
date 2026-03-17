# Task 002: Quartz 초기 셋업 + GitHub repo 생성

## Context
프로젝트 루트: `/Users/hoyoungjeon/dev/ho0_ho0_`
현재 상태: CLAUDE.md만 존재. git 초기화 안 됨. GitHub repo 없음.
GitHub 계정: HoyeongJeon (gh CLI 인증 완료)

## Objective
Quartz v4를 설치하고, GitHub에 `hoyeongjeon.github.io` repo를 생성하여 초기 코드를 push한다.

## Scope

### 1. Quartz v4 설치
- Quartz 공식 방법: `git clone https://github.com/jackyzha0/quartz.git .` 후 설정
- **주의**: 현재 디렉토리에 CLAUDE.md와 misc/ 폴더가 이미 있음. Quartz clone 시 충돌하지 않도록 처리 필요.
- 방법: 임시 디렉토리에 clone → 필요한 파일을 프로젝트 루트로 이동 → 기존 CLAUDE.md 보존
- `npm install` 실행

### 2. Quartz 기본 설정 (`quartz.config.ts`)
- `pageTitle`: "ho0_ho0_" 
- `baseUrl`: "hoyeongjeon.github.io"
- 나머지는 기본값 유지 (커스터마이징은 다음 task에서)

### 3. Git 초기화 + GitHub repo 생성
- Quartz clone이 이미 .git을 포함하므로, remote를 변경해야 함
- `gh repo create hoyeongjeon.github.io --public --source=. --remote=origin`
- 또는 기존 origin을 제거하고 새로 설정
- 초기 커밋 + push (main branch)

### 4. 빌드 확인
- `npx quartz build` 성공 확인

## Non-goals
- 스타일 커스터마이징 (Task 003)
- 콘텐츠 작성 (Task 004)
- GitHub Actions 설정 (Task 005)

## Constraints
- CLAUDE.md, misc/ 폴더가 보존되어야 함
- Quartz의 기본 content/ 샘플 파일은 제거해도 됨 (Task 004에서 새로 만듦)
- Node.js가 설치되어 있다고 가정

## Acceptance Criteria
- `npx quartz build` 성공
- GitHub에 `hoyeongjeon.github.io` repo 존재
- main branch에 초기 코드 push 완료
- CLAUDE.md가 프로젝트 루트에 보존됨
