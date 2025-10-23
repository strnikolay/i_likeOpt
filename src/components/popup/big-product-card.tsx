'use client'

import React from 'react';
import "./big-product-card.css";
import { useStore } from "@/store/storeProvidert";


export default function LoginForm () {
	const {Store} = useStore()	


	return (
	<div className="login-wrapper">
		<div className='background' onClick={() => Store.SetPopup('')}></div>
		<div className="divshadow bounceIn">
			<button onClick={() => Store.SetPopup('')} className="close" />


		</div>
	</div>
  );
};
