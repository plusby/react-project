import React from 'react';
import { connect } from 'react-redux';

declare global {
  const React: typeof React;
  const ReduxConnect: typeof connect;
}