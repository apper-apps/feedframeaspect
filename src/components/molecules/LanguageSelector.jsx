import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' }
];

function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200",
          "bg-white hover:bg-gray-50 transition-colors duration-200",
          "text-sm font-medium text-gray-700 hover:text-gray-900",
          "focus:outline-none focus:ring-2 focus:ring-instagram-purple focus:ring-offset-2"
        )}
        aria-label={t('language.select')}
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-gray-500"
        />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute top-full right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200",
          "shadow-lg z-50 py-1 max-h-80 overflow-y-auto"
        )}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 text-left",
                "hover:bg-gray-50 transition-colors duration-150",
                "text-sm text-gray-700 hover:text-gray-900",
                i18n.language === language.code && "bg-instagram-purple bg-opacity-10 text-instagram-purple font-medium"
              )}
            >
              <span className="text-base">{language.flag}</span>
              <span>{language.name}</span>
              {i18n.language === language.code && (
                <ApperIcon name="Check" size={16} className="ml-auto text-instagram-purple" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;