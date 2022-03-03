import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from '../../components/NotFoundPage/Loadable';
import DataPage from '../DataPage';
import { useTranslation } from 'react-i18next';
import { ReactFlowProvider } from 'react-flow-renderer';
import Widget from '../DataPage/Widget';
import styled from 'styled-components';
import Header from '../../components/Header';
import UiCanvas from '../../components/UiCanvas';

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
        <Container>
          <Widget />
          <Switch>
            <Route exact path={'/'}>
              <Redirect to={'/data'} />
            </Route>
            <Route exact path={'/data'} component={DataPage} />
            <Route exact path={'/ui'} component={UiCanvas} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </ReactFlowProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

const Container = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
`;
