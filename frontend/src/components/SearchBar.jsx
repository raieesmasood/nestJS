import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"

const SearchBar = ({ searchQuery, updateSearchQuery }) => {
  return (
    <div className="bg-black text-white rounded-2xl py-16 shadow-xs"> 
      <div className=" flex flex-col items-center justify-center gap-7 md:w-1/2 mx-auto ">
        <div className="text-4xl md:text-7xl font-bold">Enter Zip Code</div>
        <div className="flex justify-center w-3/4 relative">
          <Bars3Icon className="h-5 w-5 text-gray-800 absolute left-3 top-1/2 -translate-y-1/2" />
          { searchQuery == '' && <MagnifyingGlassIcon  className="h-5 w-5 text-gray-800 absolute right-5 top-1/2 -translate-y-1/2" /> }
          { searchQuery != '' && <XMarkIcon className="h-5 w-5 text-gray-800 absolute right-5 top-1/2 -translate-y-1/2" onClick={() => updateSearchQuery("")} /> }
          <input placeholder="Hinted search text" className="mx-auto px-9 py-2 rounded-full text-lg w-full text-gray-800 outline-0" onChange={ e => updateSearchQuery(e.target.value) } value={searchQuery} />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
