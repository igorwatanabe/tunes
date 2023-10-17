import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <p
        className="
        h-12 w-12 border-4
        border-1-gray-200
        border-r-gray-200
        border-b-gray-200
        border-t-blue-200
        animate-spin
        ease-linear
        rounded-full"
      />
    );
  }
}
export default Loading;
