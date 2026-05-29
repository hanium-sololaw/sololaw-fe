interface SearchResultsProps {
  results: string[]
}

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return <p className="text-gray-500">검색 결과가 없습니다.</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {results.map((result, i) => (
        <li key={i} className="rounded-lg border p-4">
          {result}
        </li>
      ))}
    </ul>
  )
}
