interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const ProgressIndicator = ({
  currentStep,
  totalSteps,
  labels,
}: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="relative flex items-center justify-between w-full max-w-2xl">

        {/* Base Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-muted-foreground/30" />

        {/* Active Progress Line */}
        <div
          className="absolute top-6 left-0 h-0.5 bg-primary transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        />

        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div key={step} className="relative flex flex-col items-center z-10">

              {/* Circle */}
              <div
                className={`
                  h-12 w-12 rounded-full border-2 flex items-center justify-center text-base font-medium transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-primary border-primary text-white"
                      : isActive
                      ? "border-primary text-primary bg-background"
                      : "border-muted-foreground/40 text-muted-foreground bg-background"
                  }
                `}
              >
                {step}
              </div>

              {/* Label */}
              {labels && labels[step - 1] && (
                <span
                  className={`mt-3 text-sm ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {labels[step - 1]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
