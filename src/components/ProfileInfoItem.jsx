export default function ProfileInfoItem({
  isClick,
  label,
  text,
  placeholder,
  ...props
}) {
  return (
    <div className='w-full md:w-lg'>
      <span className={`${isClick ? "flex flex-col gap-2" : ""}`}>
        <span className='text-xl sm:text-2xl font-semibold mr-2'>{label}:</span>
        {isClick ? (
          <input
            {...props}
            required
            name='name'
            type='text'
            defaultValue={text}
            className='input text-sm w1/2'
            placeholder={placeholder}
          />
        ) : (
          <span className='text-lg sm:text-xl'>{text}</span>
        )}
      </span>
    </div>
  );
}
