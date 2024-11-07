import React from 'react';
import { toast } from 'sonner';

export const AlertsSuccess = (message) => {
    toast.success(message, {
        position: 'top-right',
        duration: 2000,
      
        style: {
          padding: '1rem',
          margin: '1rem',
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#333',
          color: '#fff',
        }
    });
}

export const AlertError = (message) => {
    toast.error(message, {
        position: 'top-right',
        duration: 2000,
      
        style: {
          padding: '1rem',
          margin: '1rem',
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#333',
          color: '#fff',
        }
    });
}

