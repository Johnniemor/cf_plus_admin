import React from 'react';

interface DividerProp {
  content?: string;
}

const Divider: React.FC<DividerProp> = ({ content }) => {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-gray-500"></div>
      {content && <span className="mx-4 flex-shrink font-bold text-gray-500">{content}</span>}
      <div className="flex-grow border-t border-gray-500"></div>
    </div>
  );
};

export default Divider;
