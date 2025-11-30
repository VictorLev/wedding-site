interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl text-darkBlue">{message}</p>
    </div>
  );
};

export default Loading;
