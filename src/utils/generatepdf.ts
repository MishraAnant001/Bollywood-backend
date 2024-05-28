import path from 'path';
import puppeteer from 'puppeteer';
import fs from "fs"

export async function generatePDF(movieData: any) {
  // console.log(movieData)
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Generate HTML content dynamically
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Movie Data</title>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
          text-align: left;
        }
      </style>
    </head>
    <body>
      <h1>Movie Data</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Release Date</th>
            <th>Budget</th>
            <th>Collections</th>
            <th>Success Level</th>
            <th>Genre</th>
            <th>Cast</th>
            <th>Producer</th>
            <th>Director</th>
          </tr>
        </thead>
        <tbody id="movie-data">
          ${movieData.map((movie: { title: any; releaseDate: string | number | Date; budget: { toLocaleString: () => any; }; collections: { toLocaleString: () => any; }; success_level: any; genre: any[]; cast: any[]; producer: any[]; director: any; }) => `
            <tr>
              <td>${movie.title}</td>
              <td>${new Date(movie.releaseDate).toLocaleDateString()}</td>
              <td>${movie.budget.toLocaleString()}</td>
              <td>${movie.collections.toLocaleString()}</td>
              <td>${movie.success_level}</td>
              <td>${movie.genre.join(', ')}</td>
              <td>${movie.cast.join(', ')}</td>
              <td>${movie.producer.join(', ')}</td>
              <td>${movie.director}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Set HTML content
  await page.setContent(htmlContent);
  const outputDir: string = path.resolve(__dirname, '..', 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  // Generate PDF
  await page.pdf({
    path: path.join(outputDir, 'movies.pdf'), // Save PDF inside output folder
    format: 'A4',
    printBackground: true
  });
  await browser.close();
};
