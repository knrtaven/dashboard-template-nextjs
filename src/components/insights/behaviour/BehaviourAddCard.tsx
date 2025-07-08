import { Plus } from 'lucide-react';
import Button from '../../ui/button/Button';

const BehaviourAddCard = () => {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 px-4 py-6 md:flex-row md:justify-between md:px-6 md:py-10 dark:text-white">
        {/* Left Side */}
        <div className="space-y-1">
          <h4 className="md:text-xl">You can add metrics against this behaviour</h4>
          <p className="text-sm text-gray-500 md:text-base dark:text-gray-400">
            Simply link or upload your relevant metric reports or dashboards.
          </p>
        </div>

        {/* Right Side */}
        <Button variant="outline" size="sm">
          Add related metric <Plus />
        </Button>
      </div>
    </div>
  );
};

export default BehaviourAddCard;
