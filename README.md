Simple CSV encoder
==================

Overview
--------

    import {CSVWriter} from '@funkybob/csv';

    const csv = CSVWriter(fields, [options])

 - fields: list of field keys
 - options:
   - headers: list of header labels for the fields (Defaults to fields)
   - SEP : field separator (Default: ',')
   - QUOTE : field quoting character (Default: '"')
   - LINEBREAK : record separator (Default: '\n')
   - ESCQUOTE : what to replace QUOTEs in values with (Default: '""')

   csv.write(Array)

   - write list of values

     Note: this ignores `fields`, and writes all the values to a row.

   csv.write\_map(Object)

   - write values from object according to fields.

   csv.write\_headers()

   - write headers as a row.

Usage
-----

Simple list of values:

    const data = [
        [1, 'one'],
        [2, 'two'], 
        [3, 'three']
    ]

    const csv = CSVWriter(['first', 'second'])

    const csvContent = data.map(csv.write).join('')


List of objects:

    const data = [
        {name: 'one', value: 1},
        {name: 'two', value: 2},
        {name: 'three', value: 3}
    ]

    const csv = CSVWriter(['name', 'value'])

    const csvContent = data.map(csv.write_map).join('')


Add headers:

    const data = [
        {name: 'one', value: 1},
        {name: 'two', value: 2},
        {name: 'three', value: 3}
    ]

    const csv = CSVWriter(['name', 'value'], ['First', 'Second'])

    const csvContent = csv.write_headers() + data.map(csv.write_map).join('')
