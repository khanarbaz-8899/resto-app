const RestaurantSignUp = () => {
    return(
        <>
     <h1>  Restaurant  SignUp</h1>
      <div>
            <div className="input-wrapper">
            <input type="text" placeholder="Enter email id" className="input-field"/>
            </div>
             <div className="input-wrapper">
            <input type="password" placeholder="Enter password" className="input-field"/>
            </div>
             <div className="input-wrapper">
            <input type="password" placeholder="Confirm password" className="input-field"/>
            </div>
           <div className="input-wrapper">
             <button className="button">Login</button>
           </div>
        </div>
        </>
    )
}
export default RestaurantSignUp;