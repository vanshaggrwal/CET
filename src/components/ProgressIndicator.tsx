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
    <div className="flex items-center justify-center py-2 sm:py-6 px-2">
      <div className="relative flex items-center justify-between w-full max-w-lg">

        {/* Base Line */}
        <div className="absolute top-2.5 sm:top-5 left-[10%] w-[80%] h-[1.5px] bg-muted-foreground/30" />

        {/* Active Line */}
        <div
          className="absolute top-2.5 sm:top-5 left-[10%] h-[1.5px] bg-primary transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 80}%`,
          }}
        />

        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div
              key={step}
              className="relative flex flex-col items-center z-10"
            >
              {/* Circle */}
              <div
                className={`
                  h-6 w-6 sm:h-11 sm:w-11
                  rounded-full border-2
                  flex items-center justify-center
                  text-[10px] sm:text-base font-medium
                  transition-all duration-300
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

              {/* Hide labels on mobile */}
              {labels && labels[step - 1] && (
                <span
                  className={`
                    hidden sm:block mt-2 text-sm
                    ${
                      isActive
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }
                  `}
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
