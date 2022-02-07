import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';

import db from '../firebase';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore';

const usersCollectionRef = collection(db, 'todos');
function Body() {
	const [todoList, setTodoList] = useState([]);
	const [todoName, setTodoName] = React.useState('');
	const [inputForm, setInputForm] = React.useState(false);
	const [editFormId, setEditFormId] = React.useState(null);

	const getUsers = async () => {
		const data = await getDocs(usersCollectionRef);
		setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		getUsers();
	}, []);

	const handleAddTodo = async (e) => {
		e.preventDefault();
		await addDoc(usersCollectionRef, {
			todo: todoName,
			completed: false,
		});
		setInputForm(false);
		setTodoName('');
		getUsers();
	};

	function editTodo(ourID) {
		setEditFormId(ourID);
		setTodoName(todoList.find((x) => x.id === ourID).name);
	}

	const handleUpdateTask = async (e) => {
		e.preventDefault();
		await updateDoc(doc(db, 'todos', editFormId), {
			todo: todoName,
		});
		setEditFormId(null);
		getUsers();
	};

	const deleteTodo = async (id) => {
		await deleteDoc(doc(db, 'todos', id));
		getUsers();
	};

	const handleRadioButton = async (ourID) => {
		const tempCompleted = todoList.find((x) => x.id === ourID).completed;
		await updateDoc(doc(db, 'todos', ourID), {
			completed: !tempCompleted,
		});
		getUsers();
	};

	return (
		<>
			<div className='taskAddition'>
				{inputForm === false && (
					<div>
						<Button
							className='addtaskButton'
							variant='contained'
							color='primary'
							onClick={() => {
								setInputForm(true);
								setEditFormId(null);
							}}>
							Add a New Task
						</Button>
					</div>
				)}
				{inputForm === true && (
					<div>
						<form className='addTaskForm' onSubmit={handleAddTodo}>
							<Grid container spacing={0}>
								<Grid item xs={8}>
									<input
										className='inputTaskAddition'
										type='text'
										placeholder='Enter Task Name'
										onChange={(e) => setTodoName(e.target.value)}
										value={todoName}
										required
									/>
								</Grid>
								<Grid item xs={2}>
									<button
										onClick={() => {
											setInputForm(false);
											setTodoName('');
										}}
										className='buttonTaskAdditiontick ButtonCancel'
										variant='contained'
										color='secondary'>
										<i className='fas fa-times' />
									</button>
								</Grid>
								<Grid item xs={2}>
									<button
										type='submit'
										className='buttonTaskAdditiontick ButtonTick'
										variant='contained'
										color='primary'>
										<i className='fas fa-check ' />
									</button>
								</Grid>
							</Grid>
						</form>
					</div>
				)}
			</div>

			{todoList.map((todo) => (
				<div className='todoListItem' key={todo.id}>
					{editFormId !== todo.id ? (
						<div id='listItemBar'>
							<div className='todoListItemStatus'>
								{todo.completed ? (
									<i
										className='fas fa-check-circle'
										onClick={() => handleRadioButton(todo.id)}
									/>
								) : (
									<i
										className='far fa-circle'
										onClick={() => handleRadioButton(todo.id)}
									/>
								)}
							</div>
							<div className='todoListItemHead'>
								<span className={todo.completed ? 'checkedTrue' : 'notChecked'}>
									{todo.todo}
								</span>
							</div>
							<div className='actionButtonContainer'>
								<div
									className='taskActionButtons editButton'
									onClick={() => {
										editTodo(todo.id);
										setTodoName(todo.todo);
										setInputForm(false);
									}}>
									<CreateIcon />
								</div>
								<div
									className='taskActionButtons deleteButton'
									onClick={() => deleteTodo(todo.id)}>
									<DeleteIcon />
								</div>
							</div>
						</div>
					) : (
						<div>
							<form className='addTaskForm' onSubmit={handleUpdateTask}>
								<Grid container spacing={0}>
									<Grid item xs={8}>
										<input
											className='inputTaskAddition'
											type='text'
											placeholder='Enter Task Name'
											onChange={(e) => setTodoName(e.target.value)}
											value={todoName}
											required
										/>
									</Grid>
									<Grid item xs={2}>
										<button
											className='buttonTaskAdditiontick ButtonCancel'
											onClick={() => {
												setTodoName('');
												setEditFormId(null);
											}}>
											<i className='fas fa-times' />
										</button>
									</Grid>
									<Grid item xs={2}>
										<button
											className='buttonTaskAdditiontick ButtonTick'
											type='submit'>
											<i className='fas fa-check ' />
										</button>
									</Grid>
								</Grid>
							</form>
						</div>
					)}
				</div>
			))}
		</>
	);
}

export default Body;
