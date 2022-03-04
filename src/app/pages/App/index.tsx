import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from '../../components/NotFoundPage/Loadable';
import DataPage from '../DataPage';
import { useTranslation } from 'react-i18next';
import { ReactFlowProvider } from 'react-flow-renderer';
import Header from '../../components/Header';
import UiPage from '../UiPage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <ReactFlowProvider>
        <Header />
        <Switch>
          <Route exact path={'/'}>
            <Redirect to={'/data'} />
          </Route>
          <Route exact path={'/data'} component={DataPage} />
          <Route exact path={'/ui'} component={UiPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ReactFlowProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
