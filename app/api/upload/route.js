// import formidable from 'formidable';
// import fs from 'fs-extra';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = './public/uploads';
//   form.keepExtensions = true;

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error('Error parsing form:', err);
//       res.status(500).json({ error: 'Error parsing form' });
//       return;
//     }

//     const oldPath = files.file.path;
//     const newPath = `./public/uploads/${files.file.name}`;

//     try {
//       await fs.move(oldPath, newPath);
//       res.status(200).json({ message: 'File uploaded successfully' });
//     } catch (error) {
//       console.error('Error moving file:', error);
//       res.status(500).json({ error: 'Error moving file' });
//     }
//   });
// }
import formidable from 'formidable';
import fs from 'fs-extra';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = './public/uploads';
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      res.status(500).json({ error: 'Error parsing form' });
      return;
    }

    const oldPath = files.file.path;
    const newPath = `./public/uploads/${files.file.name}`;

    try {
      await fs.move(oldPath, newPath);
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error moving file:', error);
      res.status(500).json({ error: 'Error moving file' });
    }
  });
}
