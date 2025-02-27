"use client"

import { useState, useEffect, type MouseEvent } from "react"
import Editor from "@monaco-editor/react"
import Header from "../components/Heder"
import { ChevronLeft, ChevronRight } from "lucide-react"

const defaultCode = `function solution(nums) {
  // Write your code here
  
}`

const MIN_PANEL_WIDTH = 300
const MAX_PANEL_WIDTH = 800
const DEFAULT_PANEL_WIDTH = 400

type Language = "javascript" | "python" | "java"

interface CodeError {
  name: string
  message: string
  stack?: string
}

export default function CodeEditor() {
  const [code, setCode] = useState<string>(defaultCode)
  const [output, setOutput] = useState<string>("")
  const [language, setLanguage] = useState<Language>("javascript")
  const [isProblemVisible, setIsProblemVisible] = useState<boolean>(true)
  const [panelWidth, setPanelWidth] = useState<number>(DEFAULT_PANEL_WIDTH)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isMobileView, setIsMobileView] = useState<boolean>(false)

  useEffect(() => {
    const savedWidth = localStorage.getItem("problemPanelWidth")
    if (savedWidth) {
      setPanelWidth(Number(savedWidth))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("problemPanelWidth", String(panelWidth))
  }, [panelWidth])

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleRunCode = () => {
    try {
      const fn = new Function("return " + code)()
      const result = fn([1, 2, 3])
      setOutput(`Test case result: ${JSON.stringify(result)}`)
    } catch (error) {
      const err = error as CodeError
      setOutput(`Error: ${err.name}: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row">
        {isMobileView ? (
          <div className="flex flex-col">
            <div className="flex justify-center gap-4 p-4 bg-gray-800">
              <button onClick={() => setIsProblemVisible(true)} className="bg-gray-700 px-4 py-2 rounded-md">Problem</button>
              <button onClick={() => setIsProblemVisible(false)} className="bg-gray-700 px-4 py-2 rounded-md">Editor</button>
            </div>
            {isProblemVisible ? (
              <div className="p-4 overflow-y-auto h-full">
                <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
                <p className="text-gray-300">Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
              </div>
            ) : (
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: "on" }}
                />
                <div className="h-32 bg-gray-800 p-4 overflow-y-auto">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Console Output:</h3>
                  <pre className="text-sm font-mono whitespace-pre-wrap">{output}</pre>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-row w-full h-full">
            <div style={{ width: panelWidth }} className="border-r border-gray-800 overflow-hidden flex-shrink-0">
              <div className="p-6 overflow-y-auto h-full">
                <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
                <p className="text-gray-300">Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <div className="bg-gray-800 p-4 flex items-center gap-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-gray-700 text-white px-3 py-1 rounded-md border border-gray-600"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                <button
                  onClick={handleRunCode}
                  className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-md transition-colors"
                >
                  Run
                </button>
              </div>
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: "on" }}
                />
              </div>
              <div className="h-32 bg-gray-800 p-4 overflow-y-auto">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Console Output:</h3>
                <pre className="text-sm font-mono whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
