import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const VapiAgent = () => {
  const handleClick = () => {
    window.open('https://vapi.ai?demo=true&shareKey=c42849ce-d6c4-4dd3-ac8c-24482acfd70a&assistantId=5a0a4d9d-dc8e-4572-bb60-8390aaef1ddc', '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleClick}
        size="icon"
        className="h-12 w-12 rounded-full bg-nayidisha-blue hover:bg-nayidisha-blue-600 shadow-lg"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default VapiAgent; 