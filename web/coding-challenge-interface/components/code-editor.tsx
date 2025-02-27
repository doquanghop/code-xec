"use client"

import { useState, useRef, useEffect } from "react"
import Editor, { type Monaco } from "@monaco-editor/react"
import { Loader2 } from "lucide-react"

interface CodeEditorProps {
  language?: string
  value?: string
  onChange?: (value: string | undefined) => void
}

const DEFAULT_CODE = {
  python: `# Write your Python code here
def solution():
    # Your code goes here
    pass

# Test the solution
if __name__ == "__main__":
    solution()`,
  cpp: `// Write your C++ code here
#include <iostream>
using namespace std;

int main() {
    // Your code goes here
    return 0;
}`,
  java: `// Write your Java code here
public class Solution {
    public static void main(String[] args) {
        // Your code goes here
    }
}`,
  c: `// Write your C code here
#include <stdio.h>

int main() {
    // Your code goes here
    return 0;
}`,
  javascript: `// Write your JavaScript code here
function solution() {
    // Your code goes here
}

// Test the solution
solution();`,
  mysql: `# Write your MySQL query statement below
select product_id from Products
where low_fats='Y' and recyclable='Y'`,
}

export default function CodeEditor({ language = "mysql", value, onChange }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)
  const monacoRef = useRef<Monaco | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [code, setCode] = useState(value || DEFAULT_CODE[language as keyof typeof DEFAULT_CODE])

  // Handle editor initialization
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    monacoRef.current = monaco

    // Configure editor settings
    editor.updateOptions({
      fontSize: 14,
      fontFamily: "JetBrains Mono, Menlo, Monaco, Courier New, monospace",
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      lineNumbers: "on",
      roundedSelection: false,
      scrollBars: {
        vertical: "visible",
        horizontal: "visible",
      },
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      scrollbar: {
        vertical: "visible",
        horizontal: "visible",
        useShadows: false,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
    })
  }

  // Handle language change
  useEffect(() => {
    if (language !== currentLanguage) {
      setCurrentLanguage(language)
      setCode(DEFAULT_CODE[language as keyof typeof DEFAULT_CODE])
    }
  }, [language, currentLanguage])

  // Handle code change
  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "")
    onChange?.(value)
  }

  // Client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center bg-[#1e1e1e]">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={code}
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "JetBrains Mono, Menlo, Monaco, Courier New, monospace",
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          roundedSelection: false,
          // scrollBars: {
          //   vertical: "visible",
          //   horizontal: "visible",
          // },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          wrappingStrategy: "advanced",
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
        }}
      />
    </div>
  )
}

