export const defaultTemplate = (data: any): string => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>{{subject}}</title>
    </head>
    <body>
      <h1>${data}</h1>
    </body>
  </html>
  `;
};
