import React, { useEffect, useState } from 'react';
import './bevasarLista.css'
import 'bootstrap/dist/css/bootstrap.css'

interface Product {
  id : number;
  name : string;
  amount : number;
  measuringUnit : string;
  sold : boolean;
}



function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductAmount, setNewProductAmount] = useState(0);
  const [newProductMeasuringUnit, setNewProductMeasuringUnit] = useState("");
  const [newProductSold, setNewProductSold] = useState(false);
  const [error, setError] = useState("");
  const [allPurchased, setAllPurchased] = useState(false);


  const addProduct = () => {
    if (newProductName.trim() === "" || newProductAmount <= 0 || newProductMeasuringUnit.trim() === ""){
      setError("All input fields are required!")
      return;
    }
    else if (newProductName.length > 30) {
      setError("Product name can't be longer than 30 characters")
      return;
    }
    
    const sameProduct = products.filter(product => product.name == newProductName)
    if (sameProduct == null){
      setError("This product already exists")
      return;
    }
    

    const newProduct : Product = {
      id: Date.now(),
      name: newProductName,
      amount: newProductAmount,
      measuringUnit: newProductMeasuringUnit,
      sold: newProductSold
    }


    setProducts((previousProducts) => [...previousProducts, newProduct]);
    setNewProductName("");
    setNewProductAmount(0);
    setNewProductMeasuringUnit("");
    setError("");
  }

  const removeProduct = (productId : number) => {
    setProducts((previousProducts) => 
      previousProducts.filter((product) => product.id != productId));
  }

  const soldProuct = (productId : number) => {
    setProducts((previousProducts) => 
      previousProducts.map((product) => product.id === productId ? {...product, sold : !product.sold} : product));
  }

  useEffect(() => {
    setAllPurchased(products.length > 0 && products.every(product => product.sold))
  }, [products]);

  const remainingProducts = products.filter(product => !product.sold).length;

  return (
    <>
      <form>
        <div className='container position-absolute top-50 start-50 translate-middle'>
          <div>
            <h2 className='text-center'>Bevásárló lista</h2>
            <div id='inputs'>
              <label htmlFor="productName">Terméknév</label>
              <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)}/>

              <label htmlFor="productAmount">Mennyiség</label>
              <input type="number" value={newProductAmount} onChange={(e) => setNewProductAmount(parseInt(e.target.value))}/>

              <label htmlFor="productMeasuringUnit">Mértékegység</label>
              <input type="text" value={newProductMeasuringUnit} onChange={(e) => setNewProductMeasuringUnit(e.target.value)}/>
            </div>
            <button type='button' onClick={addProduct}>Hozzáadás</button>
          </div>
          <div>
            {allPurchased && <div className='success'>Az összes termék megvásárlásra került</div>}
          </div>
            {remainingProducts > 0 && <p className="text-success">Hátralévő termékek száma: {remainingProducts}</p>} 
          <p>{error}</p>
          <ul>
            {products.map((product) => {
              const productClass = `item ${product.sold ? "sold" : ""}`;
              return(
                <li key={product.id} className={productClass}>
                  <span style={{opacity: product.sold? "0.5": "1"}}>
                    <p style={{paddingRight: "50px"} }>
                      {product.name} 
                    </p>
                    <p style={{paddingRight: "50px"}}>
                      {product.amount}
                    </p>
                    <p style={{paddingRight: "50px"}}>
                      {product.measuringUnit}
                    </p>
                  </span>
                    <button onClick={() => soldProuct(product.id)}>
                      {product.sold ? "Visszaállítás": "Megvásárolva"}
                    </button>
                    <button  onClick={() => removeProduct(product.id)}>Törlés</button>
                    <br/>
                </li>
              )})}
          </ul> 
        </div>
      </form>
      
    </>
  )
}

export default App
