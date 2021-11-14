export const Cell = ({ value, position, className = '' }) => {
  return <input type='number' value={value} className={className} />
}
