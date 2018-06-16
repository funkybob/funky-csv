
export class CSVWriter {
	constructor (fields, headers, options) {
		options = Object.assign({SEP: ',', QUOTE: '"', LINEBREAK: '\n'}, options);
		let {SEP, QUOTE, LINEBREAK, ESCQUOTE} = options;

		let QUOTEre = new RegExp(QUOTE, 'g')
		this.escape_field = (value) => {
			value = value.toString().replace(QUOTEre, ESCQUOTE || '""')
			return (value.indexOf(SEP) === -1) ? value : QUOTE + value + QUOTE
		}
		if (headers === undefined) {
			headers = fields
		}
		this.SEP = SEP
		this.LINEBREAK = LINEBREAK
		this.fields = fields
		this.headers = headers
	}

	write (values) {
		return values.map(this.escape_field).join(this.SEP) + this.LINEBREAK;
	}

	write_map (obj) {
		return this.write(this.fields.map(f => obj[f]))
	}

	write_headers () {
		return this.write(this.headers)
	}
}
