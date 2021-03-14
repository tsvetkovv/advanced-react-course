import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";

import "../components/styles/nprogress.css";
import App, { AppContext } from "next/app";
import { ParsedUrlQuery } from "querystring";
import withData from "../lib/withData";
import Page from "../components/Page";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

type PageProps = { pageProps: { query: ParsedUrlQuery } };

class MyApp extends App<
  { apollo: ApolloClient<NormalizedCacheObject> },
  PageProps
> {
  static propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.any,
    apollo: PropTypes.object.isRequired,
  };

  // TODO get rid of getInitialProps to allow Automatic Static Optimization
  static async getInitialProps({ Component, ctx }: AppContext) {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx) as PageProps;
    }
    return Promise.resolve({
      pageProps: {
        query: ctx.query,
      },
    });
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Page>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
