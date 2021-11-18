import styles from './statusbutton.module.css'
import { Button } from './Button'

export const StatusButton = ({ text, status, ...props }) => {
  return (
    <div className={styles.statusButton}>
      <Button {...props}>{text}</Button>
      <div className={styles.status}>{status}</div>
    </div>
  )
}
