import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage, ChatPage, KickedPage } from './pages';

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<AuthPage />} />
				<Route path='/chat/:name' element={<ChatPage />} />
				<Route path='/kicked' element={<KickedPage />} />
			</Routes>
		</BrowserRouter>
	);
};
