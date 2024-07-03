"use client"
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import ProductModel from "./models/product.model";

export default function Home() {

  const [products, setProducts] = useState([]) as [ProductModel[], Function];
  // get item from local storage
  useEffect(() => {
    const products = localStorage.getItem('products');
    if (products) {
      setProducts(JSON.parse(products) as ProductModel[]);
    }
  }, []);


  const descriptionRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);



  return (
    <main className="container mx-auto">
      {/*  */}
      <h1>Mercadinho Mimikemi</h1>
      <br />
      <form className="flex flex-col gap-4">
        <div className="input-group">
          <input
            type="text"
            min={0.01}
            step={0.01}
            name="description"
            ref={descriptionRef}
            required
            placeholder="Infome a descricão do produto" />
        </div>
        <div className="input-group">
          <input
            type="number"
            min={0.01}
            step={0.01}
            name="quantity"
            ref={quantityRef}
            required
            placeholder="Infome a quantidade" />
        </div>
        <button onClick={(e) => {
          // add product to local storage and prevent page refresh
          e.preventDefault();
          if (!descriptionRef.current || !quantityRef.current) return;
          const description = descriptionRef.current.value;
          const quantity = Number(quantityRef.current.value);
          const product = { description, quantity } as ProductModel;
          localStorage.setItem('products', JSON.stringify([...products, product]));
          setProducts([...products, product]);
        }} type="submit" className="btn btn-primary">Adicionar Produto</button>
      </form>
      {/* show a list of added products with increment and decrement button to add quantity to local storage */}
      <ul className="flex flex-col gap-4">
        <br />
        {products?.map((product, index) => (
          <li key={index} >
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                <button onClick={() => {
                  const newProducts = products.filter((p, i) => i !== index);
                  localStorage.setItem('products', JSON.stringify(newProducts));
                  setProducts(newProducts);
                }} className="btn btn-danger">X</button>
                <div className="flex items-center gap-2">
                  <h4 className="capitalize">{product.description}</h4>
                  {/* buttons do add and remove quantity */}
                </div>
                <div className="flex items-center gap-2 p">
                  <button onClick={() => {
                    const newProducts = products.map((p, i) => {
                      if (i === index) {
                        p.quantity -= 1;
                      }
                      return p;
                    });
                    localStorage.setItem('products', JSON.stringify(newProducts));
                    setProducts(newProducts);
                  }} className="btn btn-primary">-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => {
                    const newProducts = products.map((p, i) => {
                      if (i === index) {
                        p.quantity += 1;
                      }
                      return p;
                    });
                    localStorage.setItem('products', JSON.stringify(newProducts));
                    setProducts(newProducts);
                  }} className="btn btn-primary">+</button>
                  {/* a x icon to remove the entire product from the local storage */}

                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
