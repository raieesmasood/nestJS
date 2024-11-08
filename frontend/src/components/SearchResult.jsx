const SearchResult = ({ data }) => {
  const htmlResult = data?.sort((a,b) => a.Index - b.Index ).map( (d, i) => <SearchItem data={d} index={i + 1} key={i} />)
  return (
    <div className="grid md:grid-cols-2 gap-x-9 gap-y-5 py-10">
      {htmlResult}
    </div>
  )
}

const SearchItem = ({ data, index }) => {

  return (
    <div className="bg-gray-200 grid grid-cols-12 gap-4 px-4 py-4 rounded-md shadow">
      <div className="col-span-3 flex flex-col justify-center">
        {
          data['Image'] &&
            <div className="aspect-video bg-gray-300">
              <img src={data['Image']} className="w-full object-contain rounded" />
            </div>
        }
      </div>
      <div className="col-span-6">
        <div className="text-lg font-bold text-gray-900">{ index }. {data['Job Name']}</div>
        <div className="text-gray-500">{data['Industry']}</div>
        <div className="text-wrap text-base text-gray-700 pt-1">{data['Address']}</div>
        <div className="text-lg">{data['Phone Number']}</div>
      </div>
      <div className="col-span-3 flex flex-col justify-center h-full">
        { data['Website'] && <div className="text-blue-700 font-bold cursor-pointer"><a target="_blank" href={data['Website']}>Visit Website</a></div> }
        <div className="text-yellow-700 font-bold">Write a Review</div>
      </div>
    </div>
  )
}

export default SearchResult
