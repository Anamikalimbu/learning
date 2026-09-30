import { motion } from 'framer-motion';

const EmptyState = ({ icon: Icon, title, message, actionText, onAction }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto"
    >
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
        {Icon && <Icon className="text-gray-400" size={32} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-md mb-6">{message}</p>
      
      {actionText && onAction && (
        <button 
          onClick={onAction}
          className="px-6 py-2.5 bg-emerald-50 text-emerald-600 font-bold rounded-xl hover:bg-emerald-100 transition-colors"
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
