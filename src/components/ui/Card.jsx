import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', variant = 'default', ...props }) => {
  const baseClasses = 'rounded-lg shadow-sm border transition-shadow duration-200';
  
  const variants = {
    default: 'bg-white border-gray-200 hover:shadow-md',
    elevated: 'bg-white border-gray-200 shadow-lg hover:shadow-xl',
    outlined: 'bg-white border-2 border-gray-300',
    glass: 'bg-white/80 backdrop-blur-sm border-white/20',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

const ProductCard = ({ product, className = '' }) => {
  return (
    <Card className={`group cursor-pointer hover:scale-105 transition-transform duration-200 ${className}`}>
      {product.image && (
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      )}
      <CardBody>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">${product.price}</span>
          {product.rating && (
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined', 'glass']),
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  className: PropTypes.string,
};

export default Card;
export { CardHeader, CardBody, CardFooter, ProductCard };
