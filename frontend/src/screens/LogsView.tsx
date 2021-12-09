import React, { useState } from 'react';
import LogsViewHome from '../components/molecules/log_view_home/LogsViewHome';
import { useAuth } from '../contexts/Auth';

export type LogsViewProps = {
  data: { title: string; content: string; categories: string[] }[];
};

/**
 * @author Tony Comanzo 
 */
const LogsView = () => {

  const { authData } = useAuth();

  return (
    <LogsViewHome userId={authData!.id} />
  );
};

export default LogsView;