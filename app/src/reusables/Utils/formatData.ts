import moment from 'moment';
import React from 'react';

// Remove comma for formatted string
export const removeCommaString = (value: string) =>
  parseFloat(value.replace(/\$|,/g, ''));

// Add commas to int/float value
export const formatCommaString = (value: string | number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatDate = (date) => moment(date).format('MMM D');

export const formatTime = (date) => moment(date).format('LT');
