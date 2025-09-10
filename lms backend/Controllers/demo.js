const express = require('express');
const CloudConvert = require('cloudconvert');
const router = express.Router();

const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzlmZDhmNTQ0YjU5YjRkYjFhZjZlMTJhNTIxOTJkMDJlNjA3ZjNmYzMxMzlhYjZmNjk0YmY0OWRkZmI2MTUwZmZmZDFiOTBmMzczMTMyNTgiLCJpYXQiOjE3NDc2NTgxNTIuNDY0Mzc3LCJuYmYiOjE3NDc2NTgxNTIuNDY0Mzc5LCJleHAiOjQ5MDMzMzE3NTIuNDU4OTE2LCJzdWIiOiI3MTk3MDcwMiIsInNjb3BlcyI6W119.p861BEDVqoizZbCZOV7UvhLlAyft5qSLSiGNxdrMQe2AdK3AjYdXVj4bYQkEqN9K_dQWKi9WOH4aaL3VYuK1YPa_CREwWJOs8KTSCtKP-rXP06miCyryE5z-dQVCMPqArbAqZwpkGtL6zZtwaX8ziwNe0AXh0pam4bICs_u5jA7W5cR-FCgcN-vHNnpe1R0MfESXkatwutx1C8jHW9BSA1s_LcA6UAkJqTFXpyttBEojzvxNyk2yn7TvwAW6rifwNFJux878EvzzJrflB1iA3nwZsOibu72D3WubTgZF9svO7npDsIldXAC3b2s9ePQX4sVV3rSuwIybq6KDNDFCfmBvLEPWNQbTJCzVyuzcnYbXGHPuE4-1hrK6edYPIECA_Y-zaY6n7mpVo7i5RYH_f0jP1m1BeCHIOJvvYGzoMXDXQ8DRi3V9Rwzc5a38jmnrQDxOy0987YyBvfFznOvUcPe71fCGrOR8U_cgNd1Po3FD9WN97fb5F5tncp8dWnUoQdnBy49GdFfyAfTJaWapXeeTTKy0AniE7eyoBc1G_I7YIRI78EkoUS-3rki59CHM5fZv24LJ05moTzOIYoZ6v6Y6_Tv0sFjw5OtFDP6SaL-ejVe9lfhRcfH44uQsroWTpnoXqMFHbVLVMStVzS2LD0Lhha1c4EmTNqXIbiAB9sc';
const cloudConvert = new CloudConvert(apiKey);


router.get('/convert-ppt', async (req, res) => {
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

    // Send back URLs as JSON response
    res.json({ slides: files.map(file => file.url) });

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

module.exports = router;
