import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import SearchResult from "@/components/SearchResult"

import { useState, useEffect } from "react"
import Papa from "papaparse"

const SearchJobPage = () => {
  const [ file_url, setFileUrl ] = useState()
  const [ data, setData ] = useState([])
  const [searchQ, setSearch] = useState("")

  const fetchData = async () => {
    const response = await fetch("/output_file_path.json").then(r => r.json())
    setFileUrl(`/jsons/${response[0].fileName}`)
  }
  useEffect( () => {
    fetchData() 
  }, [])

  useEffect( () => {
    if (file_url)
    Papa.parse(file_url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setData(results.data)
      }
    })
  }, [file_url])

  const getData = () => {
    if (searchQ != "") return data.filter(f => f["Job Name"].includes(searchQ) || f["County"].includes(searchQ) || f["Address"].includes(searchQ) || f["Industry"].includes(searchQ) )
    return data
  }


  return (
    <>
      <Navbar />
      <main className="md:max-w-[1200px] mx-auto py-10 md:py-20 px-5 md:px-0">
        <SearchBar searchQuery={searchQ} updateSearchQuery={setSearch} />
        <SearchResult data={getData()} />
      </main>
    </>
  )
}

export default SearchJobPage
