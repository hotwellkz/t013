import React from 'react'

interface MobileActionsBarProps {
  onCopyPrompt: () => void
  onCopyTitle: () => void
  onGenerate: () => void
  promptDisabled?: boolean
  titleDisabled?: boolean
  generateDisabled?: boolean
  loading?: boolean
  className?: string
}

const MobileActionsBar: React.FC<MobileActionsBarProps> = ({
  onCopyPrompt,
  onCopyTitle,
  onGenerate,
  promptDisabled = false,
  titleDisabled = false,
  generateDisabled = false,
  loading = false,
  className = ''
}) => {
  return (
    <div className={`mobile-actions-bar ${className}`}>
      <div className="mobile-actions-bar__container">
        <button
          type="button"
          className="mobile-actions-bar__button mobile-actions-bar__button--secondary"
          onClick={onCopyPrompt}
          disabled={promptDisabled}
          title="Скопировать промпт"
        >
          <span className="mobile-actions-bar__icon">📋</span>
          <span className="mobile-actions-bar__text">Промпт</span>
        </button>
        <button
          type="button"
          className="mobile-actions-bar__button mobile-actions-bar__button--secondary"
          onClick={onCopyTitle}
          disabled={titleDisabled}
          title="Скопировать название"
        >
          <span className="mobile-actions-bar__icon">📋</span>
          <span className="mobile-actions-bar__text">Название</span>
        </button>
        <button
          className="mobile-actions-bar__button mobile-actions-bar__button--primary"
          onClick={onGenerate}
          disabled={generateDisabled}
        >
          <span className="mobile-actions-bar__icon">
            {loading ? '⏳' : '🎬'}
          </span>
          <span className="mobile-actions-bar__text">
            {loading ? 'Создание...' : 'Сгенерировать'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default MobileActionsBar
