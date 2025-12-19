import React, { useState } from 'react';
import Button from './Button';

const BuggyComponent = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('I crashed!');
  }

  return (
    <div className="p-4 border border-yellow-400 bg-yellow-50 rounded-lg mt-4 text-center">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
        Error Boundary Tester
      </h3>
      <p className="text-yellow-700 mb-4">
        Clicking the button below will intentionally crash this component to
        test the error boundary.
      </p>
      <Button
        onClick={() => setHasError(true)}
        className="bg-yellow-600 hover:bg-yellow-700 w-auto px-6 h-10"
      >
        Throw Error
      </Button>
    </div>
  );
};

export default BuggyComponent;
