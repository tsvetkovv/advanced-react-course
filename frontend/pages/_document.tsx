import Document, { Html, NextScript, Main, Head } from "next/document";
import { ServerStyleSheet } from "styled-components";
import {
  DocumentContext,
  DocumentInitialProps,
} from "next/dist/next-server/lib/utils";

export default class MyDocument extends Document {
  static async getInitialProps({
    renderPage,
  }: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      // eslint-disable-next-line react/jsx-props-no-spreading
      sheet.collectStyles(<App {...props} />)
    );
    const styles = sheet.getStyleElement();

    return { ...page, styles };
  }

  render() {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
