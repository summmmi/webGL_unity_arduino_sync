import { useState } from 'react'
import UnityWebGL from './components/UnityWebGL'

function App() {
  const [showUnity, setShowUnity] = useState(true) // 기본적으로 Unity 표시

  const handleUnityLoad = () => {
    console.log('Unity WebGL이 성공적으로 로드되었습니다!')
  }

  const handleUnityError = (error: unknown) => {
    console.error('Unity WebGL 로드 오류:', error)
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      {showUnity ? (
        <UnityWebGL
          className="w-full h-full"
          onLoad={handleUnityLoad}
          onError={handleUnityError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <button
            onClick={() => setShowUnity(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
          >
            게임 시작
          </button>
        </div>
      )}
    </div>
  )
}

export default App
