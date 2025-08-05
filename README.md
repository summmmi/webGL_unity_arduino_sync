# Unity WebGL + React + Tailwind CSS

Unity WebGL 게임을 React와 Tailwind CSS로 감싸는 프로젝트입니다.

## 🚀 기술 스택

- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안전성
- **Vite** - 빠른 개발 서버 및 빌드 도구
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Unity WebGL** - 웹 브라우저에서 실행되는 Unity 게임

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
yarn install
```

### 2. 개발 서버 실행
```bash
yarn dev
```

### 3. 프로덕션 빌드
```bash
yarn build
```

### 4. 빌드 미리보기
```bash
yarn preview
```

## 🎮 Unity WebGL 설정

### 1. Unity에서 WebGL 빌드 생성

1. Unity 프로젝트를 열고 `File → Build Settings`로 이동
2. Platform을 **WebGL**로 변경
3. `Player Settings`에서 WebGL 설정 확인:
   - **Resolution and Presentation**: WebGL Template을 "Minimal"로 설정
   - **Publishing Settings**: Compression Format을 "Disabled"로 설정 (개발용)
4. `Build` 버튼 클릭하여 빌드 실행

### 2. 빌드 파일 배치

빌드된 파일들을 `public/Build/` 폴더에 복사:

```
public/Build/
├── Build.data
├── Build.framework.js
├── Build.loader.js
└── Build.wasm
```

### 3. 게임 실행

1. 개발 서버 실행: `yarn dev`
2. 브라우저에서 `http://localhost:5173` 접속
3. "게임 시작" 버튼 클릭하여 Unity WebGL 게임 실행

## 🛠️ 프로젝트 구조

```
src/
├── components/
│   └── UnityWebGL.tsx    # Unity WebGL 로더 컴포넌트
├── App.tsx               # 메인 앱 컴포넌트
├── main.tsx             # 앱 진입점
└── index.css            # Tailwind CSS 디렉티브

public/
└── Build/               # Unity WebGL 빌드 파일들
    ├── Build.data
    ├── Build.framework.js
    ├── Build.loader.js
    └── Build.wasm
```

## 🎨 주요 기능

- **Unity WebGL 통합**: React 컴포넌트로 Unity 게임 로드
- **반응형 디자인**: Tailwind CSS로 모바일 친화적 UI
- **게임 컨트롤**: 시작/정지 버튼으로 게임 제어
- **로딩 상태**: Unity 로딩 진행률 표시
- **에러 처리**: Unity 로드 실패 시 에러 메시지 표시

## 🔧 커스터마이징

### Unity WebGL 컴포넌트 설정

```tsx
<UnityWebGL
  buildPath="/Build/Build.data"
  loaderPath="/Build/Build.loader.js"
  onLoad={() => console.log('Unity 로드 완료!')}
  onError={(error) => console.error('Unity 로드 실패:', error)}
  className="w-full h-96"
/>
```

### Tailwind CSS 커스터마이징

`tailwind.config.js` 파일에서 테마를 확장할 수 있습니다:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'unity-blue': '#007ACC',
      }
    },
  },
  plugins: [],
}
```

## 🐛 문제 해결

### Unity WebGL이 로드되지 않는 경우

1. **빌드 파일 확인**: `public/Build/` 폴더에 모든 파일이 있는지 확인
2. **파일 경로 확인**: `UnityWebGL` 컴포넌트의 `buildPath`와 `loaderPath` 설정 확인
3. **브라우저 콘솔 확인**: 개발자 도구에서 에러 메시지 확인
4. **CORS 설정**: 로컬 서버에서 파일 접근 권한 확인

### 성능 최적화

1. **Unity 빌드 최적화**: Unity에서 WebGL 빌드 시 압축 설정 조정
2. **이미지 최적화**: Unity 프로젝트의 텍스처 압축 설정 확인
3. **코드 분할**: React 컴포넌트의 지연 로딩 적용

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
# webGL_unity_arduino_sync
