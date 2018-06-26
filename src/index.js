export class CSVWriter {

	/**
 	 * @desc CSV generator
 	 * @param {Array<String>} fields - List of field keys
 	 * @param {Object} [options]
 	 * @param {Array<String>} [options.headers] - Field headings
 	 * @param {String} [options.SEP] - Field separator (Default: ',')
 	 * @param {String} [options.QUOTE] - Field quote character (Default: '"')
 	 * @param {String} [options.LINEBREAK] - Record separator (Default: '\n')
 	 * @param {String} [options.ESCQUOTE] - Character to replace QUOTE with when in value (Default: '""')
 	*/
	constructor (fields, options) {
		options = Object.assign({SEP: ',', QUOTE: '"', LINEBREAK: '\n'}, options);
		let {SEP, QUOTE, LINEBREAK, ESCQUOTE, headers} = options;

		let QUOTEre = new RegExp(QUOTE, 'g')
		this.escape_field = (value) => {
			value = (value || '').toString().replace(QUOTEre, ESCQUOTE || '""')
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

	/**
	 * @desc Generate a row of values
	 * @param {Array<any>} values
	 * @returns {String}
	 */
	write (values) {
		return values.map(this.escape_field).join(this.SEP) + this.LINEBREAK;
	}

	/**
	 * @desc Generate a row, pulling values from an object
	 * @params {Object} obj
	 * @returns {String}
	 */
	write_map (obj) {
		return this.write(this.fields.map(f => obj[f]))
	}

	/**
	 * @desc Generate a row from the field headers
	 * @returns {String}
	 */
	write_headers () {
		return this.write(this.headers)
	}
}
