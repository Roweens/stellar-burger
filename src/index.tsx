import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { StoreProvider } from './services/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <DndProvider backend={HTML5Backend} context={window}>
    <React.StrictMode>
      <BrowserRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </BrowserRouter>
    </React.StrictMode>
  </DndProvider>
);
