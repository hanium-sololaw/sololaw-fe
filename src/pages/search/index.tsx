import { useState } from 'react'
import SearchBar from './ui/SearchBar'
import SearchResults from './ui/SearchResults'

export default function SearchPage() {
  const [results, setResults] = useState<string[]>([])

  function handleSearch(query: string) {
    setResults([`"${query}" 검색 결과 1`, `"${query}" 검색 결과 2`])
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  )
}
