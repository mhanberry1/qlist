import React, {useState, MouseEvent} from 'react'
import styles from 'styles/ListItem.module.css'

interface Props {
  index: number,
  title: string,
  completed: boolean,
  toggleCompleted: any,
  updateTitle: any,
  removeItem: any,
}

export default (props : Props) => {
  const {index, title, completed, toggleCompleted, updateTitle, removeItem} = props

  return (
    <div className={`${styles.itemCard} ${props.completed ? styles.completed : ''}`}>
      <button onClick={() => toggleCompleted(index)}>✔</button>
      <input onChange={e => updateTitle(index, e.target.value)} value={title} />
      <button onClick={() => removeItem(index)}>🗑</button>
    </div>
  )
}
