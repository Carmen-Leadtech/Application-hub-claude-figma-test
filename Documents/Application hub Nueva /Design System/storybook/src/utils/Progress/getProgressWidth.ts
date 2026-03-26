export interface GetProgressWidthOptions {
  minWidth?: string;
  progress: number;
  total: number;
}

export const getProgressWidth = ({
  minWidth = '10%',
  progress,
  total,
}: GetProgressWidthOptions): string => {
  if (progress === 0) return minWidth;

  const percentage = total > 0 ? (progress / total) * 100 : 0;
  return `${percentage}%`;
};

export const getProgressPercentage = (progress: number, total: number): number => {
  return total > 0 ? (progress / total) * 100 : 0;
};

export type ProgressVariant = 'success' | 'warning' | 'danger';

export const getProgressVariant = (percentage: number): ProgressVariant => {
  if (percentage >= 100) return 'success';
  if (percentage >= 50) return 'warning';
  return 'danger';
};
