import { getCssText } from '@/styles';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
                
                {/* retorna o css para montar o html sempre sem depender do javascript
                Também evita o runtime para montar o css*/}
                <style id="stitches" dangerouslySetInnerHTML={{__html: getCssText}} ></style>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}