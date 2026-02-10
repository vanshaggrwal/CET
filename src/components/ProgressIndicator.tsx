interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const ProgressIndicator = ({ currentStep, totalSteps, labels }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`step-dot ${
                step < currentStep
                  ? 'step-dot-completed'
                  : step === currentStep
                  ? 'step-dot-active'
                  : 'step-dot-inactive'
              }`}
            />
            {labels && labels[step - 1] && (
              <span className={`text-xs ${step === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {labels[step - 1]}
              </span>
            )}
          </div>
          {step < totalSteps && (
            <div className={`w-16 h-0.5 ${step < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
