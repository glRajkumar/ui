
function Wrapper({ children }: readOnlyChildren) {
  return (
    <div className="flex items-center justify-center h-80 border rounded-sm shadow">
      {children}
    </div>
  )
}

export default Wrapper
