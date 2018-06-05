
export class CSVWriter {
	constructor (fields, headers, options) {
		options = Object.assign({SEP: ',', QUOTE: '"', LINEBREAK: '\n'}, options);
		let {SEP, QUOTE, LINEBREAK, ESCQUOTE} = options;
		
		if (ESCQUOTE !== undefined) {
			let QUOTEre = new RegExp(QUOTE, 'g')
			this.escape_field = (value) => {
				return value.toString().replace(QUOTEre, ESCQUOTE)
			}
		} else {
			this.escape_field = (value) => {
				if (value.indexOf(SEP) !== -1) {
					return QUOTE + value + QUOTE
				}
				return value
			}
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
