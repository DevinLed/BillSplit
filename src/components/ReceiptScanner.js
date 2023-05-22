import React, { useState } from 'react';
import axios from 'axios';

const ReceiptScanner = () => {
  const [receiptImage, setReceiptImage] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setReceiptImage(file);
  };

  const handleScanReceipt = async () => {
    if (receiptImage) {
      const formData = new FormData();
      formData.append('file', receiptImage);

      try {
        const response = await axios.post(
          'https://api.mindee.net/v1/products/expenses/us_receipts/parse',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer 561e58edb1c93ab9fec230c1439fbf48',
            },
          }
        );

        // Extract the total amount from the response
        const total = response.data.total_amount;
        setTotalAmount(total);
      } catch (error) {
        console.error('Error scanning receipt:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleScanReceipt}>Scan Receipt</button>
      {totalAmount && <p>Total Amount: {totalAmount}</p>}
    </div>
  );
};

export default ReceiptScanner;
