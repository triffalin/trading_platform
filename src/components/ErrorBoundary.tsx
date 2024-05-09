import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Convert ErrorInfo into a plain object for Sentry
    const errorDetails = {
      componentStack: errorInfo.componentStack
    };
    Sentry.captureException(error, { extra: errorDetails });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops! Something went wrong.</h1>
          <p>
            We&apos;re having trouble displaying this part of our site.
            We&apos;ve noted the issue and will look into it!
          </p>
          <Link href="/" passHref>
            <a>Go to Home</a>
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
