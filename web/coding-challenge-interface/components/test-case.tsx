export default function TestCase() {
  return (
    <div className="h-[300px] overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Case 1</span>
          </div>
          <button className="ml-auto p-1 hover:bg-[#3e3e3e] rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm mb-2">Products =</div>
          <div className="font-mono text-xs bg-[#2d2d2d] p-4 rounded overflow-x-auto whitespace-nowrap">
            {`| product_id | low_fats | recyclable |
|-----------|----------|------------|
| 0         | Y        | N          |
| 1         | Y        | Y          |
| 2         | N        | Y          |
| 3         | Y        | Y          |
| 4         | N        | N          |`}
          </div>
        </div>

        {/* Adding more content to demonstrate scrolling */}
        <div className="mb-4">
          <div className="text-sm mb-2">Expected Output:</div>
          <div className="font-mono text-xs bg-[#2d2d2d] p-4 rounded overflow-x-auto whitespace-nowrap">
            {`| product_id |
|-----------|
| 1         |
| 3         |`}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-bold mb-2">Case 2</div>
          <div className="text-sm mb-2">Products =</div>
          <div className="font-mono text-xs bg-[#2d2d2d] p-4 rounded overflow-x-auto whitespace-nowrap">
            {`| product_id | low_fats | recyclable |
|-----------|----------|------------|
| 5         | Y        | N          |
| 6         | Y        | Y          |
| 7         | N        | Y          |
| 8         | Y        | Y          |
| 9         | N        | N          |`}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm mb-2">Expected Output:</div>
          <div className="font-mono text-xs bg-[#2d2d2d] p-4 rounded overflow-x-auto whitespace-nowrap">
            {`| product_id |
|-----------|
| 6         |
| 8         |`}
          </div>
        </div>
      </div>
    </div>
  )
}

