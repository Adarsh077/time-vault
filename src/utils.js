import { clsx } from 'clsx';
import { DateTime, Duration } from 'luxon';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export class AppError extends Error {
  name = '';
  message = '';
  errors = {};

  constructor({ errors, message, name }) {
    super(message || JSON.stringify(errors));

    if (!message && !import.meta.env.DEV) {
      message = 'Something went wrong!';
    }

    this.name = name;
    this.message = message;
    this.errors = errors;
  }
}

export const gracelyHandleError = (err) => {
  if (err instanceof AppError) {
    return err;
  } else {
    return new AppError({
      message: err.message,
      name: 'Error',
    });
  }
};

export const catchAsync = (fn) => {
  const asyncFunc = async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.log(err);
      }

      if (err instanceof AppError) {
        throw err;
      }

      throw new AppError({
        message: err.message,
        name: 'Error',
      });
    }
  };

  return asyncFunc;
};

export const getCurrentDateString = () => {
  return DateTime.now().setLocale('fr').startOf('day').toLocaleString();
};

export const secondsToHumanReadable = (minutes) => {
  const duration = Duration.fromObject({ minutes });

  const durationUnits = duration.shiftTo('hours', 'minutes').toObject();

  const paddedHours = `0${Math.floor(durationUnits.hours)}`.slice(-2);
  const paddedMinutes = `0${Math.floor(durationUnits.minutes)}`.slice(-2);

  return `${paddedHours}h ${paddedMinutes}m`;
};
