import { InputHTMLAttributes } from 'react'
import ReactInputMask from 'react-input-mask'
import { Mask } from '../../types'
import { masks } from './constants'
import styles from './InputMask.module.scss'

interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: Mask
  label?: string
  errorMessage?: string
  register?: any
}

export default function InputMask({
  mask,
  value,
  label,
  name,
  errorMessage,
  register,
  type,
  disabled,
  onChange,
  onBlur
}: InputMaskProps) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.messageWrapper}>
        {label && <label className={styles.label}>{label}</label>}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
      <ReactInputMask
        type={type}
        value={value}
        mask={masks[mask]}
        maskChar={null}
        className={styles.input}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        name={name}
        {...register}
      />
    </div>
  )
}
