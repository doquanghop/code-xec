export default function ProblemDescription() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">1757. Recyclable and Low Fat Products</h1>
        <div className="flex items-center gap-2">
          <span className="text-green-500 flex items-center gap-1">
            Solved{" "}
            <span className="inline-block w-4 h-4 rounded-full bg-green-500 text-black text-xs flex items-center justify-center">
              ✓
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-[#3e3e3e] text-xs px-2 py-1 rounded">Easy</span>
        <span className="border border-[#3e3e3e] text-xs px-2 py-1 rounded flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Topics
        </span>
        <span className="border border-[#3e3e3e] text-xs px-2 py-1 rounded flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          Companies
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <a href="#" className="text-blue-500 hover:underline text-sm">
          SQL Schema
        </a>
        <span className="text-gray-500">›</span>
        <a href="#" className="text-blue-500 hover:underline text-sm">
          Pandas Schema
        </a>
      </div>

      <div className="mb-6">
        <div className="text-sm mb-2">Table: Products</div>
        <div className="font-mono text-xs bg-[#2d2d2d] p-4 rounded overflow-x-auto whitespace-nowrap">
          {`+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| low_fats    | enum    |
| recyclable  | enum    |
+-------------+---------+
product_id is the primary key (column with unique values) for this table.
low_fats is an ENUM (category) of type ('Y', 'N') where 'Y' means this product is low fat and 'N' means it is not.
recyclable is an ENUM (category) of types ('Y', 'N') where 'Y' means this product is recyclable and 'N' means it is not.`}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm mb-4">
          Write a solution to find the ids of products that are both low fat and recyclable.
        </p>
        <p className="text-sm mb-4">
          Return the result table in <strong>any order</strong>.
        </p>
        <p className="text-sm mb-4">The result format is in the following example.</p>
      </div>

      <div className="mb-6">
        <div className="text-sm font-bold mb-2">Example 1:</div>
        <div className="text-sm mb-2">Input:</div>
        <div className="font-mono text-xs bg-[#2d2d2d] p-4 rounded overflow-x-auto whitespace-nowrap mb-4">
          {`Products table:
+-------------+---------+------------+
| product_id  | low_fats | recyclable |
+-------------+---------+------------+
| 0           | Y       | N          |
| 1           | Y       | Y          |
| 2           | N       | Y          |
| 3           | Y       | Y          |
| 4           | N       | N          |
+-------------+---------+------------+`}
        </div>
        <div className="text-sm mb-2">Output:</div>
        <div className="font-mono text-xs bg-[#2d2d2d] p-4 rounded overflow-x-auto whitespace-nowrap">
          {`+-------------+
| product_id  |
+-------------+`}
        </div>
      </div>
    </div>
  )
}

