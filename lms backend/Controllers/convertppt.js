const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const fetch = require('node-fetch');
const CloudConvert = require('cloudconvert');
const { URL } = require('url');
global.URL = URL

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

// function execPromise(command) {
//   return new Promise((resolve, reject) => {
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(stderr);
//         return reject(error);
//       }
//       resolve(stdout);
//     });
//   });
// }

const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWU1NDA1ZGUzZjExODc1MzA3NTNhNWM3ZDBmNDViNTBiMGNjZTg1NDJjMmE4ZjE2NWU2ODU2NmM4YTg5ZTZkM2E3MGUyNWIxZjYwNDgwZjYiLCJpYXQiOjE3NDc2NTkzNTAuMTU0MzczLCJuYmYiOjE3NDc2NTkzNTAuMTU0Mzc0LCJleHAiOjQ5MDMzMzI5NTAuMTQ5MjM3LCJzdWIiOiI3MTk3MDcwMiIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.oamrZ8hMmNsCrXiqA7KtVLBhHP3qGLIRJNvzoYwHIbP6s8cdBnaW8gr28GO8lW2E7CNJ7Oh41IP5Pi9g4Q5ixdQd9HkvrRARpFNFwV2nLcSn4upIOyBIUXMhbfTUSi5OnbggblhtizKazOMrLRYnyptid05utEto22EBznEByoNr-JNNKsyJ1ITFxrMb3l-4drVqDNxZiWycauXhHqEL6x1JeifswEXZS98fIjiXuINe-GjDkyP0m6NGxmfYCe0fvyG1bFmDUIaoYMfuPRPdwOqgZey-3sI-1ulaADH4hw9HnTaI7TMQboQq5TnxnhJdJ30DxP_Wc7qEBxaUpZv7OPowt663aJ6ACBfrvW7plFgaUyFF0men4aMXBYxPylrUjf84ztaVX1Qs_5p-5FDRy6tv-8A-n2oQlT4zkvmhrudC56QqvsjJFtPYYGPvhNUdsmMOxEaM4dAwWCDjxaKYhjvZNDYolBtmQGCz_IU4H77KtzXCdvOj2gmcaaz4ZSQgtfEtRwrmCsPobVpta-BYCGwo7zlFFazYcBFW3LX0_iO8-1QpzT5RJ9VVBGdqeCXzmWkOTLEAEVGxxzB9RgcN0EYN_5WqSjas96s6vuuLBvPpjxEMTMZDgC-q2FgorP0hijX_0_qZTwfxQkISIdWutD6eo0D2SO8GOra8A011fgo';
const cloudConvert = new CloudConvert(apiKey);

async function convertPptToImages(req, res) {
  const pptUrl = req.query.url;
  if (!pptUrl) return res.status(400).json({ error: 'PPT URL is required' });



  try {
    // Create CloudConvert job for import, convert, export
    const job = await cloudConvert.jobs.create({
      tasks: {
        'import-my-file': {
          operation: 'import/url',
          url: pptUrl
        },
        'convert-my-file': {
          operation: 'convert',
          input: 'import-my-file',
          output_format: 'png',
          // You can add options here, e.g. dpi, page range
        },
        'export-my-file': {
          operation: 'export/url',
          input: 'convert-my-file'
        }
      }
    });

    // Wait for job to finish
    const completedJob = await cloudConvert.jobs.wait(job.id);

    // Find export task with finished status
    const exportTask = completedJob.tasks.find(
      task => task.name === 'export-my-file' && task.status === 'finished'
    );

    if (!exportTask) {
      return res.status(500).json({ error: 'Conversion failed, no export task found' });
    }

    // Get files array with URLs of converted images
    const files = exportTask.result.files;

    console.log(files);
    
    // Send back URLs as JSON response
    res.json({ slides: files.map(file => file.url) });

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
}



// async function test() {
//   const pptUrl = 'https://res.cloudinary.com/dfjueejma/raw/upload/v1739021491/course_ppts/lrsb6z1t3ktsyharguf1.pptx';

//   try {
//     const res = await fetch(pptUrl);
//     if (!res.ok) throw new Error('Network response was not ok');

//     const buffer = await res.buffer();
//     console.log('Success! Buffer length:', buffer.length);

//     // Optional: save to file
//     fs.writeFileSync('presentation.pptx', buffer);
//   } catch (err) {
//     console.error('Fetch error:', err.message);
//   }
// }

// test();


module.exports = { convertPptToImages };
