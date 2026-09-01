const https = require('https');

https.get('https://res.cloudinary.com/c2wyo4vs/video/upload/v1788235447/13.mp4', (res) => {
  let data = [];
  res.on('data', chunk => {
    data.push(chunk);
    if (Buffer.concat(data).length > 200000) {
      res.destroy();
      const buffer = Buffer.concat(data);
      // Search for 'tkhd' or 'mvhd' atom
      const tkhdIdx = buffer.indexOf('tkhd');
      if (tkhdIdx !== -1) {
        // In tkhd, width and height are 32-bit fixed point at offset 76 and 80 from tkhd start (version 0)
        // or 88 and 92 (version 1)
        const version = buffer[tkhdIdx + 4];
        const offset = (version === 1) ? 88 : 76;
        const width = buffer.readUInt32BE(tkhdIdx + offset) >> 16;
        const height = buffer.readUInt32BE(tkhdIdx + offset + 4) >> 16;
        console.log(`Video Dimensions: ${width}x${height}`);
        console.log(`Aspect Ratio: ${width}/${height} = ${(width/height).toFixed(4)}`);
      } else {
        console.log('tkhd atom not found in first 200KB');
      }
    }
  });
});
