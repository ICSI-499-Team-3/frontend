import React, { useState } from 'react';
import LogsViewHome from '../components/molecules/log_view_home/LogsViewHome';

export type LogsViewProps = {
  data: { title: string; content: string; categories: string[] }[];
};

const LogsView = () => {
  return (
    <LogsViewHome />
  );
};

export default LogsView;