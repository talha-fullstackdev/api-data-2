

export function Button({ variant = "default", size = "default", children, ...props }) {
 
  return (
    <button {...props}>
      {children}
    </button>
  )
}