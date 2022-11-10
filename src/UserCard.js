import React from 'react';
import './UserCard.css';
import { userIds } from './Users';

export default function UserCard(props) {
	return (
		<div className='card'>
			<div className='card-desc'>
				<span className='card-desc-first'>
					<strong>{props.name}</strong>
					<small>ID: #{userIds[props.name]}</small>
					<p className='price'>
						Total points: {props.points.reduce((prev, curr) => prev + curr)}
					</p>
				</span>

				<hr />

				<span className='card-desc-last'>
					<ul>
						<li>January: {props.points[0]}</li>
						<li>February: {props.points[1]}</li>
						<li>March: {props.points[2]}</li>
					</ul>
				</span>
			</div>
		</div>
	);
}
