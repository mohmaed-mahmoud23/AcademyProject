"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  title?: string;
  description?: string;
}

interface State {
  hasError: boolean;
}

export class AnalyticsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <Card className="border-destructive/20 bg-destructive/5 glassy backdrop-blur-xl">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="p-4 bg-destructive/10 rounded-full">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight">
                {this.props.title || "Something went wrong"}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {this.props.description || "We encountered an error while loading this section. Please try again."}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={this.handleRetry}
              className="gap-2 border-destructive/20 hover:bg-destructive/10 transition-all hover:scale-105"
            >
              <RotateCcw className="h-4 w-4" />
              Retry Section
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
