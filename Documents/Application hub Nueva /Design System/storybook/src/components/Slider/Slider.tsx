import { useEffect, useRef, ChangeEvent } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './Slider.module.css';

export interface SliderProps
  extends CvElement,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  min?: number;
  max?: number;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  variant?: 'primary' | 'neutral';
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const Slider = ({
  'data-qa': dataQA,
  min = 0,
  max = 100,
  value,
  onChange,
  variant = 'primary',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className = '',
  ...rest
}: SliderProps) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateTrack(value, min, max, variant);
  }, [value, min, max, variant]);

  const updateTrack = (
    currentValue: number,
    minValue: number,
    maxValue: number,
    sliderVariant: string
  ) => {
    if (!sliderRef.current) return;

    const percentage = ((currentValue - minValue) / (maxValue - minValue)) * 100;

    let progressColor: string;
    let trackColor: string;

    if (sliderVariant === 'neutral') {
      progressColor = 'hsl(208, 4%, 48%)'; // neutral filled color
      trackColor = '#bec2c6'; // neutral bar color
    } else {
      // primary variant
      progressColor = 'var(--brand-500, #006dcc)';
      trackColor = 'var(--brand-500, #006dcc)'; // same color for primary
    }

    const gradient = `linear-gradient(to right, ${progressColor} ${percentage}%, ${trackColor} ${percentage}%)`;
    sliderRef.current.style.background = gradient;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  const containerClassName = classNames(
    styles.sliderContainer,
    styles[`slider${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    className
  );

  return (
    <div ref={containerRef} className={containerClassName} data-qa={dataQA} {...rest}>
      <input
        ref={sliderRef}
        type="range"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={handleChange}
        className={`${styles.slider} ${styles[`slider${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  );
};
