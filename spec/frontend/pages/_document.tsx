import { Html, Head, Main, NextScript } from 'next/document'
import Footer from '../components/Footer';

function Document() {
	return (
		<Html lang="en">
			<Head>
			<script src="https://js.braintreegateway.com/web/dropin/1.34.0/js/dropin.min.js"></script>
			</Head>
			<body>
				<Main />
                <Footer />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
