import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";

function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };


const handleOnCheckout = async () => {
  setIsCheckingOut(true); 
  //basically says we're checking out
  setError(null); 
  //clear out old error messages before checking out 

  const cartTotal = Object.entries(cart).reduce((total, [productId, quantity]) => {
  const product = products.find((p) => p.id === Number(productId));
  //making sure the product exists 
  const price = product?.price || 0;
  //after that if the price does not exist for that specific product then default it to zero 
  return total + price * quantity;
  //basic arithmetic 
    }, 0);
//defaults to zero if all else fails
    //calculating the total price of all the items in the cart
    // .reduce() is a function that takes every item in the array and adds them to the total by doing the math with quan


  const payload = {
    //preparing an object called payload that contains the approrpiate information about the order such as price and status 
    // and customer id 
    customer_id: Number(userInfo.name),
    email: userInfo.email,
    total_price: cartTotal, 
    status: "completed"
  };




  const res = await fetch("http://localhost:3000/orders", {
    //now we're sending payload to the back end by posting it to the data base of orders
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const order = await res.json(); 
  //order is a order object like in prisma schema 
  //the response that the backend sends back after submitting the order

  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    //object.entries turns the cart that we've called from cart.js into a key value pair rather than an object
    //cart contains a customer_id and a quantity 
    //remember map is like looping through an array and destructuring the array so that it now will like like: product_id: 1 quantity: 4
    const product = products.find((p)=> p.id === Number(productId));
    //grabs all of that products specific info by looping through the products list 

    return{
  product_id: Number(productId),
  quantity,
  price: product?.price || 0
    }
});

for(const item of cartItems){
  // we are sending each cart item to that specific order
  await fetch(`http://localhost:3000/orders/${order.order_id}/items`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  }); 
}
 setCart({});
 //reset everythign there should be nothing in the cart 
setUserInfo({ name: "", email: "" });
setIsCheckingOut(false);
console.log("Checkout function finished");


}
  useEffect(() => {
    const fetchProducts = async () =>{
      try{
         const { data } = await axios.get(`http://localhost:3000/products/`);
        console.log(data);
        setProducts(data);
        console.log("Fetched products:", data)


      }catch(err){
          console.error("Error products: ", err);

      }
    }
    fetchProducts(); 
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 