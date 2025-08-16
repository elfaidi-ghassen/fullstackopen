
const SearchInput = ({onChange, searchState, id}) => {
  return (
    <>
    <input 
      type="text"
      id={id}
      value={searchState}
      onChange={onChange} />
    </>
  )
}

export default SearchInput