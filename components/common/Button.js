import styles from './button.module.css'

export const Button = props => {
  return (
    <button
      className={`${
        props.selectable ? styles.selectable : styles.primaryButton
      } ${props.selected ? styles.selected : ''}`}
      {...props}
    />
  )
}
