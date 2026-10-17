import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-[28px] mx-auto mb-4 border border-rose-500/20">
              ⚠️
            </div>
            <h2 className="text-[20px] font-bold text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-[13px] text-slate-400 mb-6 leading-relaxed">
              We encountered an unexpected display issue while rendering the luxury showcase.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[13px] font-bold transition shadow-lg shadow-rose-600/30"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
