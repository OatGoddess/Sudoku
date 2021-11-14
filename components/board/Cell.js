export const Cell = ({ value, position, className = '', handleOnChange }) => {
  return (
    <input
      type='number'
      value={value}
      className={className}
      onChange={event => {
        handleOnChange(position, event.target.value)
      }}
    />
  )
}
