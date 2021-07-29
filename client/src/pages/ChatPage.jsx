import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const sendIcon = (
	<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M19 10L1 1L5 10L1 19L19 10Z' stroke='black' strokeWidth='2' strokeLinejoin='round' />
	</svg>
);

export const ChatPage = () => {
	const navigate = useNavigate();
	const { name } = useParams();

	return (
		<main className='chat-wrapper'>
		</main>
	);
};
