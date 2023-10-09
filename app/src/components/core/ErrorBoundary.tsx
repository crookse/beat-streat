import React, { PropsWithChildren } from "react";

export class ErrorBoundary extends React.Component<
  PropsWithChildren<{
    message: string;
  }>
> {
  state: { hasError: boolean; error?: Error };

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.log(`ErrorBoundary: `, { error, info });
  }

  render() {
    if (this.state.hasError) {
      // @ts-ignore Don't really care about this typing
      return this.props.fallback;
    }

    return (
      <>
        {
          /* <div className="p-3 bg-white">
                <p>
                    {this.props.message}
                    {this.state.error?.message && this.state.error.message}
                </p>
            </div> */
        }
        {/* @ts-ignore Don't really care about this typing */}
        {this.props.children}
      </>
    );
  }
}
