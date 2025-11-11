export default function ProfileInfoDropDownItem({
  isClick,
  label,
  text,
  options = [],
}) {
  return (
    <div className=' w-full md:w-lg'>
      <span className={`${isClick ? "flex flex-col gap-2" : ""}`}>
        <span className='text-xl sm:text-2xl font-semibold mr-2'>{label}:</span>
        {isClick ? (
          <label className='select'>
            <select>
              {options.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <span className='text-lg sm:text-xl'>{text}</span>
        )}
      </span>
    </div>
  );
}
