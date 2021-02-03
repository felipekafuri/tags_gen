import express from 'express';
import {v4} from 'uuid';
import csv from 'fast-csv';
import fs from 'fs';
import {createObjectCsvWriter} from 'csv-writer'


const app  = express();
app.use(express.json());

const ws = fs.createWriteStream('test.csv');

const csvWriter = createObjectCsvWriter({
  path: './test.csv',
  header: ['id', "activated", 'created_at', 'updated_at'],
  encoding: 'utf-8'
});


const data = [];

for(let i = 0; i < 100000; i++){
  data.push({
    id: v4(),
    activated: false,
    created_at: '2020-12-10T15:00:00.000Z',
    updated_at: '2020-12-10T15:00:00.000Z',
  })
}

csvWriter.writeRecords(data)

app.listen(3333, ()=>{
  console.log('listening on http://localhost:3333');
})