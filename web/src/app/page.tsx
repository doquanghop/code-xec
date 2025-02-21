"use client"

import { useState, useEffect } from "react"
import Editor from "@monaco-editor/react"
import Header from "../components/Header"
import { ChevronLeft, ChevronRight } from "lucide-react"

const defaultCode = `function solution(nums) {
  // Write your code here
  
}`

const MIN_PANEL_WIDTH = 300
const MAX_PANEL_WIDTH = 800
const DEFAULT_PANEL_WIDTH = 400

export default function CodeEditor() {
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [isProblemVisible, setIsProblemVisible] = useState(true)
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH)
  const [isDragging, setIsDragging] = useState(false)

  // Load saved panel width from localStorage
  useEffect(() => {
    const savedWidth = localStorage.getItem("problemPanelWidth")
    if (savedWidth) {
      setPanelWidth(Number(savedWidth))
    }
  }, [])

  // Save panel width to localStorage
  useEffect(() => {
    localStorage.setItem("problemPanelWidth", String(panelWidth))
  }, [panelWidth])

  const handleRunCode = () => {
    try {
      const fn = new Function("return " + code)()
      const result = fn([1, 2, 3])
      setOutput(`Test case result: ${JSON.stringify(result)}`)
    } catch (error) {
      setOutput(`Error: ${error}`)
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newWidth = e.clientX
      if (newWidth >= MIN_PANEL_WIDTH && newWidth <= MAX_PANEL_WIDTH) {
        setPanelWidth(newWidth)
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="flex h-[calc(100vh-64px)] relative">
        {/* Problem Panel */}
        <div
          style={{ width: isProblemVisible ? panelWidth : 0 }}
          className={`
            relative border-r border-gray-800 transition-all duration-300 
            overflow-hidden flex-shrink-0
            ${isDragging ? "select-none" : ""}
          `}
        >
          <div className="p-6 overflow-y-auto h-full">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
              <p className="text-gray-300">
                Given an array of integers nums and an integer target, return indices of the two numbers such that they
                add up to target.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Example 1:</h3>
              <pre className="bg-gray-800 p-3 rounded-lg">
                <code>
                  Input: nums = [2,7,11,15], target = 9{"\n"}
                  Output: [0,1]{"\n"}
                  Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                </code>
              </pre>

              <h3 className="text-lg font-semibold mt-6 mb-2">Constraints:</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>2 ≤ nums.length ≤ 104</li>
                <li>-109 ≤ nums[i] ≤ 109</li>
                <li>-109 ≤ target ≤ 109</li>
              </ul>
            </div>
          </div>

          {/* Resize Handle */}
          <div
            className={`absolute right-0 top-0 w-1 h-full cursor-col-resize bg-gray-800 hover:bg-blue-500 
              ${isDragging ? "bg-blue-500" : ""}`}
            onMouseDown={handleMouseDown}
          />
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsProblemVisible(!isProblemVisible)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 p-1 rounded-r-md hover:bg-gray-700 transition-colors z-10"
        >
          {isProblemVisible ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>

        {/* Code Editor Section */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-gray-800 p-4 flex flex-wrap items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
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

          {/* Editor */}
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
              }}
            />
          </div>

          {/* Console Output */}
          <div className="h-32 md:h-48 bg-gray-800 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Console Output:</h3>
            <pre className="text-sm font-mono whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>

      {/* Overlay when dragging */}
      {isDragging && <div className="fixed inset-0 z-50 cursor-col-resize" />}
    </div>
  )
}

