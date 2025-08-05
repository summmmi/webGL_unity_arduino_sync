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

    useEffect(() => {
        const handleIframeLoad = () => {
            setIsLoading(false)
            onLoad?.()
        }

        const handleIframeError = () => {
            setError('Unity WebGL을 로드할 수 없습니다')
            setIsLoading(false)
            onError?.(new Error('Unity WebGL을 로드할 수 없습니다'))
        }

        const iframe = iframeRef.current
        if (iframe) {
            iframe.addEventListener('load', handleIframeLoad)
            iframe.addEventListener('error', handleIframeError)
        }

        return () => {
            if (iframe) {
                iframe.removeEventListener('load', handleIframeLoad)
                iframe.removeEventListener('error', handleIframeError)
            }
        }
    }, [onLoad, onError])

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-10">
                    <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">로딩 중...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 bg-red-900 bg-opacity-95 flex items-center justify-center z-10">
                    <div className="text-center text-white p-4">
                        <div className="text-4xl mb-4">❌</div>
                        <p className="text-lg font-semibold mb-2">오류 발생</p>
                        <p className="text-sm">{error}</p>
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
            />
        </div>
    )
} 