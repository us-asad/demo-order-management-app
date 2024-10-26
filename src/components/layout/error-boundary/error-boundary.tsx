import React from 'react'
import { Props } from './types'
import { Box, Button, Typography } from '@mui/material';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { ErrorBoundaryStyles } from './error-boundary.styles';

export class ErrorBoundary extends React.Component<Props> {
  public state = { error: false }

  public static getDerivedStateFromError() {
    return { error: true }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error: ', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.error) {
      return (
        <Box
          sx={ErrorBoundaryStyles.wrapper}
        >
          <ErrorIcon sx={ErrorBoundaryStyles.errorIcon} />
          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            An unexpected error has occurred. Please try again later.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleReload}
            sx={ErrorBoundaryStyles.reloadButton}
          >
            Reload Page
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
