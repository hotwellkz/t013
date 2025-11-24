import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
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

  const isActive = (path: string) => location.pathname === path
  const isVideoGenerationPage = location.pathname === '/'

  return (
    <div className="app">
      <header className="app-header">
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
            isCondensed={false}
          />
        )}
      </header>
      <main className="app-main">
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

