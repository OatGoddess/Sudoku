import styles from './button.module.css'

export const Button = ({ selectable, selected, ...props }) => {
  return (
    <button
      className={`${selectable ? styles.selectable : styles.primaryButton} ${
        selected ? styles.selected : ''
      }`}
      {...props}
    />
  )
}
