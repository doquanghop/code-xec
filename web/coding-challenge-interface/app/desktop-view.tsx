"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Clock,
  RotateCcw,
  Layers,
  Settings,
  BookOpen,
  Code,
  CheckCircle,
  ExternalLink,
} from "lucide-react"
import CodeEditor from "@/components/code-editor"
import ProblemDescription from "@/components/problem-description"
import TestCase from "@/components/test-case"
import LanguageSelector from "@/components/language-selector"

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<"description" | "editorial" | "solutions" | "submissions">("description")
  const [activeRightTab, setActiveRightTab] = useState<"code" | "testcase" | "result">("code")
  const [isSaved, setIsSaved] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("mysql")

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-gray-300 overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-[#3e3e3e] rounded">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-1 bg-[#3e3e3e] px-2 py-1 rounded">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">S</div>
            <span className="text-sm">SQL 50</span>
          </div>
          <button className="p-1 hover:bg-[#3e3e3e] rounded">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1 hover:bg-[#3e3e3e] rounded">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm">
            <Clock size={16} />
            <span>00:15:07</span>
          </div>
          <button className="bg-[#3e3e3e] hover:bg-[#4e4e4e] px-3 py-1 rounded flex items-center gap-1">
            <Play size={16} />
            <span className="text-sm">Run</span>
          </button>
          <button className="bg-green-700 hover:bg-green-600 px-3 py-1 rounded flex items-center gap-1">
            <CheckCircle size={16} />
            <span className="text-sm">Submit</span>
          </button>
          <button className="p-1 hover:bg-[#3e3e3e] rounded">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1 hover:bg-[#3e3e3e] rounded">
            <ChevronRight size={18} />
          </button>
          <button className="p-1 hover:bg-[#3e3e3e] rounded">
            <RotateCcw size={18} />
          </button>
          <button className="p-1 hover:bg-[#3e3e3e] rounded">
            <Layers size={18} />
          </button>
          <button className="p-1 hover:bg-[#3e3e3e] rounded">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 flex flex-col border-r border-[#3e3e3e] overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#3e3e3e]">
            <button
              className={`px-4 py-2 text-sm flex items-center gap-1 ${activeTab === "description" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              <BookOpen size={16} />
              Description
            </button>
            <button
              className={`px-4 py-2 text-sm flex items-center gap-1 ${activeTab === "editorial" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("editorial")}
            >
              <BookOpen size={16} />
              Editorial
            </button>
            <button
              className={`px-4 py-2 text-sm flex items-center gap-1 ${activeTab === "solutions" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("solutions")}
            >
              <Code size={16} />
              Solutions
            </button>
            <button
              className={`px-4 py-2 text-sm flex items-center gap-1 ${activeTab === "submissions" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("submissions")}
            >
              <ExternalLink size={16} />
              Submissions
            </button>
            <div className="ml-auto flex items-center px-2">
              <button className="p-1 hover:bg-[#3e3e3e] rounded">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Problem Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === "description" && <ProblemDescription />}
            {/* Other tabs would be implemented similarly */}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#3e3e3e]">
            <button
              className={`px-4 py-2 text-sm flex items-center gap-1 ${activeRightTab === "code" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveRightTab("code")}
            >
              <Code size={16} />
              Code
            </button>
            <div className="ml-auto flex items-center px-2">
              <button className="p-1 hover:bg-[#3e3e3e] rounded">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            {activeRightTab === "code" && (
              <div className="h-full flex flex-col">
                <div className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
                  <LanguageSelector value={selectedLanguage} onChange={setSelectedLanguage} />
                  <div className="ml-auto">
                    <span className="text-xs bg-[#3e3e3e] px-2 py-1 rounded">Auto</span>
                  </div>
                </div>
                <CodeEditor
                  language={selectedLanguage}
                  onChange={(value) => {
                    setIsSaved(false)
                  }}
                />
                <div className="flex justify-between items-center px-4 py-1 bg-[#2d2d2d] border-t border-[#3e3e3e] text-xs">
                  <span>{isSaved ? "Saved" : "Unsaved"}</span>
                  <span>Ln 1, Col 1</span>
                </div>
              </div>
            )}
          </div>

          {/* Test Cases */}
          <div className="border-t border-[#3e3e3e] h-[300px] flex flex-col">
            <div className="flex border-b border-[#3e3e3e]">
              <button className="px-4 py-2 text-sm flex items-center gap-1 border-b-2 border-blue-500">
                <Code size={16} />
                Testcase
              </button>
              <button className="px-4 py-2 text-sm flex items-center gap-1">Test Result</button>
            </div>
            <div className="flex-1 overflow-hidden">
              <TestCase />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

