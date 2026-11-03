import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('System Diagnostic caught an unhandled exception:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetState = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // Storage access may be restricted
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090B0E] text-[#E8EDF2] p-6 font-sans">
          <div className="w-full max-w-md bg-[#121620] border border-[#232B38] rounded-2xl p-6 shadow-2xl flex flex-col space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-[#1E2532]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C5C] animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#E8EDF2] uppercase">
                System Diagnostic
              </span>
            </div>

            <p className="font-mono text-xs text-[#9AA6B2] leading-relaxed">
              An unexpected runtime exception occurred during rendering. Diagnostic logs have been recorded to the developer console.
            </p>

            {this.state.error && (
              <div className="bg-[#090C10] border border-[#1C222C] rounded-lg p-3 overflow-x-auto text-[11px] font-mono text-[#FFB86B]">
                {this.state.error.toString()}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg bg-[#7CF2C9] hover:bg-[#68e0b6] text-[#090B0E] font-mono text-xs font-bold tracking-wider uppercase transition-colors"
              >
                Reboot Interface
              </button>
              <button
                type="button"
                onClick={this.handleResetState}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#181F2B] hover:bg-[#202939] border border-[#2B3545] text-[#9AA6B2] hover:text-[#E8EDF2] font-mono text-xs tracking-wider transition-colors"
              >
                Clear Cache & Reboot
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

