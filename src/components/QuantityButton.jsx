import { useState } from 'react';

const QuantityButton = ({
  initialQuantity = 1,
  min = 1,
  max = 99,
  onQuantityChange,
  
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    const newQuantity = Math.min(max, quantity + 1);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(min, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || min;
    const newQuantity = Math.min(max, Math.max(min, value));
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  return (
    <div className={`flex items-center  rounded-lg overflow-hidden `}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="px-3 py-2 bg-gray-100 border dark:text-black border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-12 text-center  border-x  border-gray-300 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        aria-label="Quantity"
      />
      
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="px-3 py-2 bg-gray-100 border dark:text-black border-gray-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default QuantityButton;



