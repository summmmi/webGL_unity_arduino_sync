import { useEffect, useRef, useState } from 'react'

interface UnityWebGLProps {
    buildPath?: string
    onLoad?: () => void
    onError?: (error: unknown) => void
    className?: string
}

export default function UnityWebGL({
    buildPath = '/Build/index.html',
    onLoad,
    onError,
    className = ''
}: UnityWebGLProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [debugInfo, setDebugInfo] = useState<string>('')

    useEffect(() => {
        const handleIframeLoad = () => {
            console.log('iframe 로드 완료')
            setDebugInfo('iframe 로드 완료')
            setIsLoading(false)
            onLoad?.()
        }

        const handleIframeError = () => {
            console.error('iframe 로드 실패')
            setDebugInfo('iframe 로드 실패')
            setError('Unity WebGL을 로드할 수 없습니다')
            setIsLoading(false)
            onError?.(new Error('Unity WebGL을 로드할 수 없습니다'))
        }

        const handleIframeLoadStart = () => {
            console.log('iframe 로딩 시작')
            setDebugInfo('iframe 로딩 시작...')
        }

        const iframe = iframeRef.current
        if (iframe) {
            iframe.addEventListener('load', handleIframeLoad)
            iframe.addEventListener('error', handleIframeError)
            iframe.addEventListener('loadstart', handleIframeLoadStart)

            // iframe 로딩 상태 확인
            setTimeout(() => {
                if (isLoading) {
                    console.log('iframe 로딩 타임아웃')
                    setDebugInfo('iframe 로딩 타임아웃')
                }
            }, 10000)
        }

        return () => {
            if (iframe) {
                iframe.removeEventListener('load', handleIframeLoad)
                iframe.removeEventListener('error', handleIframeError)
                iframe.removeEventListener('loadstart', handleIframeLoadStart)
            }
        }
    }, [onLoad, onError, isLoading])

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-10">
                    <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">로딩 중...</p>
                        <p className="text-sm mt-2">{debugInfo}</p>
                        <p className="text-xs mt-1 text-gray-400">경로: {buildPath}</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 bg-red-900 bg-opacity-95 flex items-center justify-center z-10">
                    <div className="text-center text-white p-4">
                        <div className="text-4xl mb-4">❌</div>
                        <p className="text-lg font-semibold mb-2">오류 발생</p>
                        <p className="text-sm mb-2">{error}</p>
                        <p className="text-xs text-gray-300">{debugInfo}</p>
                    </div>
                </div>
            )}

            <iframe
                ref={iframeRef}
                src={buildPath}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; microphone; camera; midi; encrypted-media"
                allowFullScreen
                style={{ display: 'block' }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            />
        </div>
    )
} 