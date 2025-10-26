'use client'
import React, {FC, useEffect, useState } from 'react';
import Image from 'next/image';
import "./big-product-card.css";
import { useStore } from "@/store/storeProvidert";
import {brandList, categoryList, mockdata} from "@/api/db"
import {IProduct} from "@/store/interfaces";
import { observer } from 'mobx-react';
import Tabs from "./Tabs/tabs"
import Tab from "./Tabs/tab"

interface Props {
	//el:IProduct;
}

export const Big_product_card:FC<Props> = observer(() => {
	const {Store, Product_Store, Cart_Store} = useStore()
	const [isLoading, setIsLoading] = useState(true)
	const [product, setProduct] = useState<IProduct>()
	const [imgsrc, setImgsrc] = useState<string>("no-img.png")
	const [isFav, setIsFav] = useState(false)
	const [isInCart, setIsInCart] = useState(false)

	useEffect(()=>{
		const product = mockdata.find((el)=> el.id === Product_Store.popupCardId)
		if(product){
			setProduct(product)
			setIsLoading(false);
		}	
		setImgsrc(product!.img[0])
	},[])

	useEffect(()=>{
			//console.log(typeof Store.user.fav)
			if(Store.user.fav&&product){
				if(Store.user.fav.includes(product.id)){
				setIsFav(true)
			} else {
				setIsFav(false)
			}}
	},[Store.user.fav, product])

		useEffect(()=>{
			if(Store.user.cart&&product){
			const findItem = Store.user.cart.find((elInCart)=> elInCart.id === product!.id)
			if(findItem){
				setIsInCart(true)
			} else {
				setIsInCart(false)
			}}
		},[Store.user.cart, product])
	



	const addToCartHandler = () =>{
        if(isInCart){
            //console.log("handler remove")
            Cart_Store.removeFromCart(product!.id)
            setIsInCart(false)
        } else {
            //console.log("handler add")
            Cart_Store.addToCart(product!.id)
            setIsInCart(true)
        }
    }

	const addToFavHandler = () =>{
        if(isFav){
            //console.log("handler remove")
            Store.removeFav(product!.id)
            setIsFav(false)
        } else {
            //console.log("handler add")
            Store.addToFav(product!.id)
            setIsFav(true)
        }
    }

	if(isLoading)return(
		<div>...Loading</div>
	)
	

	if(product)return (
	<div className="big-product-card-wrapper">
		<div className='popup-background' onClick={() => Store.SetPopup('')}></div>
		<div className="divshadow bounceIn">
			<button onClick={() => Store.SetPopup('')} className="close" />
			<div className='left-item'>
				<div className='title'>
					Id{product!.id} {brandList[product.brand]} {categoryList[product.cat-1]}
				</div>
				<div className="rating">
					<div className='star'></div>
					4.5
				</div>
				<div className="image relative">
					<div className="images-add">
						<Image src={imgsrc} fill sizes="10vw" alt="" className="img-responsive"/>
					</div>
					<div className="sticker">Хит</div>
				</div>
			</div>	
			

			<Tabs>
				<Tab title="Описание">
					<div className="caption">
						<div className='title'>
							<span className="stock">Производитель: {brandList[product.brand]}</span>
							<span className="stock">В наличии: {product.count} шт.</span>
							<span className="artikul">Артикул {product.id}</span>
						</div>					
						<div className='desc'>{product.desc}</div>


						<div className="card-footer">
							<div className='price'>
								ЦЕНА: {Store.isAuth?product.price:<div className='lock' title="Цена достувна авторизированым пользователям"/>}
							</div>


							<input 
								type='button' 
								className={`cart-icon `+(isInCart?"remove-cart":"add-cart")} 
								onClick={addToCartHandler}
							/>
							<input 
								type='button' 
								className={`fav-icon `+(isFav?"remove-fav":"add-fav")} 
								onClick={addToFavHandler}
							/>
						</div>
					</div>
				</Tab>
				<Tab title="отзывы">
					<div className='review'>Отзывы</div>
				</Tab>
			</Tabs>
			
		</div>
	</div>
  );
});
