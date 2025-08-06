import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgba(250,245,235,1)]">
      <div className="relative">
        <Loader className="w-18 h-18 animate-spin" />
        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
