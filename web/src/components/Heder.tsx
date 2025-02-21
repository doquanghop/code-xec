"use client"

import { useState } from "react"
import { Menu, X, Code2, User, Settings } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-white hidden sm:inline-block">CodePen</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/problems" className="text-gray-300 hover:text-white transition-colors">
              Problems
            </Link>
            <Link href="/contests" className="text-gray-300 hover:text-white transition-colors">
              Contests
            </Link>
            <Link href="/discuss" className="text-gray-300 hover:text-white transition-colors">
              Discuss
            </Link>
            <Link href="/learn" className="text-gray-300 hover:text-white transition-colors">
              Learn
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Settings className="h-5 w-5 text-gray-400" />
            </button>
            <div className="flex items-center space-x-2 text-white">
              <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <span className="font-medium">John Doe</span>
            </div>
          </div>

          <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/problems"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                Problems
              </Link>
              <Link
                href="/contests"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                Contests
              </Link>
              <Link
                href="/discuss"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                Discuss
              </Link>
              <Link
                href="/learn"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                Learn
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-800">
              <div className="flex items-center px-5">
                <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">John Doe</div>
                  <div className="text-sm font-medium text-gray-400">john@example.com</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button className="block w-full px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md text-left">
                  Settings
                </button>
                <button className="block w-full px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md text-left">
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

