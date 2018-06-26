import {CSVWriter} from './src/index.js';

const output = document.querySelector('dl');

function describe(name, cb) {
  let header = document.createElement('dt');
  header.appendChild(document.createTextNode(name));
  output.appendChild(header);
  let result = document.createElement('dd');
  let txt = document.createTextNode('');
  result.appendChild(txt);
  output.appendChild(result);

  try {
    cb()
    result.classList.add('pass');
    txt.data = 'PASS';
  } catch(e) {
    result.classList.add('fail');
    txt.data = 'FAIL';
    let message = document.createElement('dd')
    message.appendChild(document.createTextNode(e))
    output.appendChild(message);
  }
}

const assert = {
  equal: (a, b) => { if (a !== b) { throw `Not equal: ${a} <> ${b}` } }
}

describe('CSV', () => {

	const csv = new CSVWriter(['name', 'age'], ['Name', 'Age']);

	describe('#write()', () => {
		let output = csv.write(['bob', '42']);

		assert.equal(output, 'bob,42\n')
	})

	describe('#write_map()', () => {
		let output = csv.write_map({name: 'bob', age: '42'})

		assert.equal(output, 'bob,42\n')
	})

	describe('#write_headers()', () => {
		let output = csv.write_headers()

		assert.equal(output, 'Name,Age\n')
	})

	describe('#write() value with quote', () => {
		let output = csv.write(['bo"b', '42']);

		assert.equal(output, 'bo""b,42\n')
	})

	describe('#write() value with separator', () => {
		let output = csv.write(['bo,b', '42']);

		assert.equal(output, '"bo,b",42\n')
	})

	describe('#write_map()', () => {

		let data = [
			{name: 'one', age: 1},
			{name: 'two', age: 2},
			{name: 'three', age: 3}
		]

		let output = csv.write_headers() + data.map(r => csv.write_map(r)).join('');

		assert.equal(output, 'Name,Age\n' +
			'one,1\n' +
			'two,2\n' +
			'three,3\n'
		)

	})
})
