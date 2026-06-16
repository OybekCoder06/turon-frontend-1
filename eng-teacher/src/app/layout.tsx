'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="TeacherAI - AI English Speaking Teacher Platform" />
        <title>TeacherAI - Learn English with AI Teacher</title>
      </head>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
