import './App.css';
import UserCard from './UserCard';
import { useState, useEffect } from 'react';

function App() {
	const [pointsObj, setPointsObj] = useState({});

	useEffect(() => {
		// mock API call
		// fetch('https://charter.com/transactionsAPI')
		//	.then((res) => res.json())
		//	.then((data) => handleResponse(data.transactions));

		const data = {
			transactions: [
				{ customer: 'Eric', date: '01042022', total: 120 },       // 90 points
				{ customer: 'Eric', date: '01052022', total: 99.99 },     // 49 points
				{ customer: 'Eric', date: '02042022', total: 154.21 },    // 158 points
				{ customer: 'Eric', date: '03042022', total: 74.21 },     // 24 points
				{ customer: 'Nick', date: '01042022', total: 100 },       // 50 points
				{ customer: 'Nick', date: '02042022', total: 204.21 },    // 258 points
				{ customer: 'Nick', date: '02052022', total: 101.99 },    // 52 points
				{ customer: 'Steven', date: '03042022', total: 254.21 },  // 358 points
			],
		};

		const handleResponse = (res) => {
			/*
        - iterates through transactions
        - creates an object with customer name as the key, and an array of length 3 for the points earned for each of the 3 months
        eg. 
        {
          customer: [Jan, Feb, Mar]
          Eric:     [100,25,49],
          Nick:     [100,25,49],
          Steven:   [100,25,49],
        }
      */
			const obj = {};
			for (const transaction of res) {
				const month = getMonth(transaction.date);
				if (!(transaction.customer in obj)) {
					obj[transaction.customer] = [0, 0, 0];
					obj[transaction.customer][month] = calculatePoints(transaction.total);
				} else {
					obj[transaction.customer][month] += calculatePoints(transaction.total);
				}
			}
			setPointsObj(obj);
		};

		handleResponse(data.transactions);
	}, []);

	const calculatePoints = (transactionTotal) => {
		const amount = Math.floor(transactionTotal);
		if (amount < 50) {
			return 0;
		} else if (amount <= 100) {
			return amount - 50;
		} else {
			return (amount - 100) * 2 + 50;
		}
	};

	const getMonth = (date) => {
		// this is simplified and not as dynamic as it would be if the data set wasn't limited to Jan - Mar
		return date[1] - 1;
	};

	const cards = Object.entries(pointsObj).map((entry, index) => (
		<UserCard
			key={`key-${index}`}
			calcPoints={calculatePoints}
			name={entry[0]}
			points={entry[1]}
		/>
	));

	return (
		<div className='App'>
			<h1>Points Dashboard</h1>
			<div className='cards'>{cards}</div>
		</div>
	);
}

export default App;
