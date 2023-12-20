import React, { useState, useEffect } from "react";
import Loader from "./component/Loader";
import AuthProvider from "./component/AuthProvider";
import CustomRoutes from "./component/CustomRoute";
// import PayPalButton from './component/PayPalButtonComponent'

function App() {
  
  //for loader 
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
 

  useEffect(() => {
    const simulateLoading = async () => {
      const totalSteps = 10;
      const stepDuration = 200;

      for (let step = 1; step <= totalSteps; step++) {
        setProgress((step / totalSteps) * 100);
        await new Promise(resolve => setTimeout(resolve, stepDuration));
      }

      setLoading(false);
    };

    simulateLoading();
  }, []);

  const handleSuccess = (details, data) => {
    console.log('Transaction completed by', details.payer.name.given_name);
    // Handle the success scenario (e.g., update order status)
  };

  const handleCancel = (data) => {
    console.log('Transaction was cancelled');
    // Handle the cancellation scenario (e.g., show a message to the user)
  };

  const handleError = (err) => {
    console.error('Error during the transaction', err);
    // Handle the error scenario (e.g., show an error message to the user)
  };

  return (    
    <div>      
      {loading ? (
        <Loader progress={progress} />
      ) : (      
      <>
        {/* <PayPalButton
        amount="10.00" 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        onError={handleError}
      /> */}
          <AuthProvider>
          <CustomRoutes />
        </AuthProvider>    
        </>
      )}
    </div>
  );
}

export default App;
