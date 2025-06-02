import jsPDF from "jspdf";
import { useLoaderData } from "react-router";


const OrderReceipt = () => {
    const item = useLoaderData()
    console.log(item);

    const generatePDF = () => {
        const doc = new jsPDF();

        //  Set initial styles
doc.setFont('helvetica');
doc.setFontSize(12);

// Title
doc.setFontSize(16);
doc.setFont('helvetica', 'bold');
        doc.text(`Pitha Peyari Order Receipt for ${item.customerInfo.name} `, 105, 20, { align: 'center' });

       // Reset font for body
doc.setFontSize(12);
doc.setFont('helvetica', 'normal');

// Customer information section
let yPos = 40;
doc.text(`Customer Name: ${item.customerInfo?.name || "N/A"}`, 20, yPos);
doc.text(`Address: ${item.customerInfo?.address || "N/A"}`, 20, yPos + 10);
doc.text(`Phone: ${item.customerInfo?.phone || "N/A"}`, 20, yPos + 20);

// Format date properly
const orderDate = item.orderDetails?.date ? 
  new Date(item.orderDetails.date).toLocaleDateString() : "N/A";
doc.text(`Order Date: ${orderDate}`, 20, yPos + 30);

// Payment method
doc.text(`Payment Method: ${item.orderDetails?.method || "N/A"}`, 20, yPos + 40);

// Pricing section with proper alignment
yPos += 60;
doc.setFont('helvetica', 'bold');
doc.text('Order Summary', 20, yPos);
doc.setFont('helvetica', 'normal');

// Format currency values
const formatCurrency = (amount) => isNaN(amount) ? "0 BDT" : `${amount} BDT`;

doc.text(`Subtotal: ${formatCurrency(item.orderDetails?.subtotal)}`, 20, yPos + 10);
doc.text(`Shipping Fee: ${formatCurrency(item.orderDetails?.shippingFee)}`, 20, yPos + 20);
doc.text(`Discount: ${formatCurrency(item.orderDetails?.discount)}`, 20, yPos + 30);

// Total with emphasis
doc.setFont('helvetica', 'bold');
doc.text(`Total Price: ${formatCurrency(item.orderDetails?.total)}`, 20, yPos + 45);

        // Save the PDF
        doc.save(`order-receipt of ${item.customerInfo.name}.pdf`);
    };
    return (
        <div>
            
                <div className="mb-8 p-4 border rounded-lg">
                    <h2 className="text-lg font-semibold">
                        Order for {item.customerInfo.name}
                    </h2>
                    <p>City: {item.customerInfo.city}</p>
                    
                    <div className="mt-3">
                        <h3 className="font-medium">Items:</h3>
                        <ul className="list-disc pl-5">
                            {item.products.map((product) => (
                                <li key={product._id}>
                                    {product.name} ({product.quantity})
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="mt-2 font-bold">
                        Sub Total: {item.orderDetails.subtotal} BDT
                        <br />
                        Shipping Fee: {item.orderDetails.shippingFee} BDT
                        <br />
                        Discount:  BDT
                        <br />
                        Grand Total: {item.orderDetails.total} BDT


                    </p>
                </div>
            

            <button onClick={generatePDF} className="btn">Download Pdf</button>
        </div>
    );
};

export default OrderReceipt;