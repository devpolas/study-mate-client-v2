export default function SignWith({ icon, children, ...props }) {
  return (
    <button
      type='button'
      {...props}
      className='btn btn-primary btn-outline mt-4 text-sm shadow'
    >
      {icon} {children}
    </button>
  );
}
