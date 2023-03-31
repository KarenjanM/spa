import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
	return (
		<Html lang="en">
			<Head>
			<script src="https://js.braintreegateway.com/web/dropin/1.34.0/js/dropin.min.js"></script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
