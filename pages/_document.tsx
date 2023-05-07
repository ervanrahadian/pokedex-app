import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { extractCritical } from "emotion-server";

export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <style
                        // @ts-ignore
                        data-emotion-css={this.props.ids.join(" ")}
                        // @ts-ignore
                        dangerouslySetInnerHTML={{ __html: this.props.css }}
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);

    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
        ],
        ...page,
        ...styles,
    };
};
