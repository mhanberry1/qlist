import React, {useState, useEffect, KeyboardEvent} from 'react'
import styles from 'styles/ItemCreator.module.css'
import ListItem from 'components/ListItem'

interface Item {
	title: string,
	completed: boolean
}

interface InputKeyboardEvent extends KeyboardEvent<HTMLInputElement> {
	target: HTMLInputElement
}

const getData = () : Item[] => {
	if (localStorage.data === undefined) return []

	try {
		return JSON.parse(localStorage.data)
	} catch (e) {
		console.error(e)
		return []
	}
}

const saveData = (data : Item[]) => {
	localStorage.data = JSON.stringify(data)
}

export default () => {
	const savedData = getData()
	const [items, setItems] = useState(getData())

	useEffect(() => saveData(items), [items])

	const addNewItem = ({key, target} : InputKeyboardEvent) => {
		if (key !== 'Enter') return

		setItems([{title: target.value, completed: false}, ...items])
		target.value = ''
	}

	const removeItem = (index : number) => setItems(
		items.filter((item, i) => index !== i)
	)

	const toggleCompleted = (index : number) => setItems(
		items.map((item, i) =>
			i === index ? {...item, completed: !item.completed} : item
		)
	)

	const updateTitle = (index: number, value: string) => setItems(
		items.map((item, i) =>
			i === index ? {...item, title: value} : item
		)
	)

	return (
		<>
			<div className={styles.creator}>
				<input placeholder="Add a new item" onKeyPress={addNewItem} />
			</div>
			{items.map(({title, completed}, index) =>
				<ListItem
					key={index}
					index={index}
					title={title}
					completed={completed}
					removeItem={removeItem}
					toggleCompleted={toggleCompleted}
					updateTitle={updateTitle}
				/>
			)}
		</>
	)
}
