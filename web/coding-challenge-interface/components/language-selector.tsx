"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import * as Popover from "@radix-ui/react-popover"

interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
}

const LANGUAGES = [
  { id: "python", name: "Python", icon: "🐍" },
  { id: "cpp", name: "C++", icon: "⚡" },
  { id: "java", name: "Java", icon: "☕" },
  { id: "c", name: "C", icon: "🔧" },
  { id: "javascript", name: "JavaScript", icon: "💛" },
  { id: "mysql", name: "MySQL", icon: "🗄️" },
]

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false)
  const selectedLanguage = LANGUAGES.find((lang) => lang.id === value)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-[#3e3e3e] rounded transition-colors">
          <span>{selectedLanguage?.icon}</span>
          <span>{selectedLanguage?.name}</span>
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="z-50 w-48 rounded-md border border-[#3e3e3e] bg-[#2d2d2d] shadow-lg" sideOffset={5}>
          <div className="py-1">
            {LANGUAGES.map((language) => (
              <button
                key={language.id}
                className={`
                  w-full flex items-center px-3 py-2 text-sm gap-2
                  ${value === language.id ? "bg-[#3e3e3e]" : "hover:bg-[#3e3e3e]"}
                `}
                onClick={() => {
                  onChange(language.id)
                  setOpen(false)
                }}
              >
                <span>{language.icon}</span>
                <span className="flex-1 text-left">{language.name}</span>
                {value === language.id && <Check size={16} />}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

