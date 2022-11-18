import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    
}

function Button({ children, className, ...props}: ButtonProps) {
  const classes = `${styles.button} ${className}`

  return (
    <button className={classes} {...props}>{children}</button>
  )
};

export default Button;