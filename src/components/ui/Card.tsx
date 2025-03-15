import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  noPadding = false,
}) => {
  const cardClasses = `
    bg-white rounded-xl shadow-md overflow-hidden
    ${hoverable ? 'transition-all duration-300 hover:shadow-lg' : ''}
    ${noPadding ? '' : 'p-6'}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const cardContent = (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );

  if (hoverable) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default Card;