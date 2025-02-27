"use client"

import { useState } from "react"
import { ArrowLeft, Play, Clock, BookOpen, Code, CheckCircle, ExternalLink } from "lucide-react"
import CodeEditor from "@/components/code-editor"
import ProblemDescription from "@/components/problem-description"
import TestCase from "@/components/test-case"

export default function MobileView() {
  const [activeView, setActiveView] = useState<"problem" | "code" | "testcase">("problem")

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-gray-300 overflow-hidden md:hidden">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-2 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-[#3e3e3e] rounded">
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-1 bg-[#3e3e3e] px-2 py-1 rounded text-xs">
            <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">S</div>
            <span>SQL 50</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 text-xs">
            <Clock size={14} />
            <span>00:15:07</span>
          </div>
          <button className="bg-green-700 hover:bg-green-600 px-2 py-1 rounded text-xs">Submit</button>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex border-b border-[#3e3e3e]">
        <button
          className={`flex-1 px-2 py-2 text-xs flex items-center justify-center gap-1 ${activeView === "problem" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveView("problem")}
        >
          <BookOpen size={14} />
          Problem
        </button>
        <button
          className={`flex-1 px-2 py-2 text-xs flex items-center justify-center gap-1 ${activeView === "code" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveView("code")}
        >
          <Code size={14} />
          Code
        </button>
        <button
          className={`flex-1 px-2 py-2 text-xs flex items-center justify-center gap-1 ${activeView === "testcase" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveView("testcase")}
        >
          <ExternalLink size={14} />
          Testcase
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {activeView === "problem" && <ProblemDescription />}
        {activeView === "code" && (
          <div className="h-full flex flex-col">
            <div className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
              <span className="text-sm">MySQL</span>
              <div className="ml-auto">
                <span className="text-xs bg-[#3e3e3e] px-2 py-1 rounded">Auto</span>
              </div>
            </div>
            <CodeEditor />
          </div>
        )}
        {activeView === "testcase" && (
          <div className="h-full overflow-hidden">
            <TestCase />
          </div>
        )}
      </div>

      {/* Bottom Action Bar (only visible in code view) */}
      {activeView === "code" && (
        <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] border-t border-[#3e3e3e]">
          <button className="bg-[#3e3e3e] hover:bg-[#4e4e4e] px-3 py-1 rounded flex items-center gap-1">
            <Play size={14} />
            <span className="text-xs">Run</span>
          </button>
          <button className="bg-green-700 hover:bg-green-600 px-3 py-1 rounded flex items-center gap-1">
            <CheckCircle size={14} />
            <span className="text-xs">Submit</span>
          </button>
        </div>
      )}
    </div>
  )
}

