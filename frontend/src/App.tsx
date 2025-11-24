import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import VideoGeneration from './components/VideoGeneration'
import ChannelSettings from './components/ChannelSettings'
import VideoJobsHistory from './pages/VideoJobsHistory'
import AutomationDebug from './pages/AutomationDebug'
import ToastContainer from './components/ToastContainer'
import { useToast } from './hooks/useToast'
import { useWizard } from './contexts/WizardContext'
import WizardSteps from './components/WizardSteps'

function App() {
  const location = useLocation()
  const toast = useToast()
  const { step, setStep, selectedChannel, setSelectedChannel } = useWizard()
  const [isHeaderCondensed, setIsHeaderCondensed] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) => location.pathname === path
  const isVideoGenerationPage = location.pathname === '/'

  // Отслеживание скролла для сжатия шапки на мобильных
  useEffect(() => {
    if (!isVideoGenerationPage || window.innerWidth > 768) return

    const handleScroll = () => {
      if (!headerRef.current || !mainContentRef.current) return
      
      const headerHeight = headerRef.current.offsetHeight
      const scrollY = window.scrollY
      
      // Сжимаем шапку когда прокрутили больше её высоты
      setIsHeaderCondensed(scrollY > headerHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVideoGenerationPage])

  return (
    <div className="app">
      <header 
        ref={headerRef}
        className={`app-header ${isHeaderCondensed && isVideoGenerationPage ? 'app-header--condensed' : ''}`}
      >
        {(!isHeaderCondensed || !isVideoGenerationPage) && (
          <>
            <h1>shortai.ru</h1>
            <nav className="tabs">
              <Link
                to="/"
                className={isActive('/') ? 'active' : ''}
                aria-label="Переключить на вкладку генерации видео"
              >
                Генерация видео
              </Link>
              <Link
                to="/jobs"
                className={isActive('/jobs') ? 'active' : ''}
                aria-label="Перейти к истории генераций"
              >
                📋 История видео
              </Link>
              <Link
                to="/settings"
                className={isActive('/settings') ? 'active' : ''}
                aria-label="Переключить на вкладку настроек каналов"
              >
                Настройки каналов
              </Link>
              <Link
                to="/automation-debug"
                className={isActive('/automation-debug') ? 'active' : ''}
                aria-label="Перейти к диагностике автоматизации"
              >
                Диагностика автоматизации
              </Link>
            </nav>
          </>
        )}
        {isVideoGenerationPage && (
          <WizardSteps
            currentStep={step}
            onStepClick={(newStep) => {
              setStep(newStep)
              // При возврате на шаг 1 сбрасываем канал
              if (newStep === 1) {
                setSelectedChannel(null)
              }
            }}
            selectedChannel={selectedChannel}
            isCondensed={isHeaderCondensed}
          />
        )}
      </header>
      <main ref={mainContentRef} className="app-main">
        {location.pathname === '/' && <VideoGeneration />}
        {location.pathname === '/jobs' && <VideoJobsHistory />}
        {location.pathname === '/settings' && <ChannelSettings />}
        {location.pathname === '/automation-debug' && <AutomationDebug />}
      </main>
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  )
}

export default App

