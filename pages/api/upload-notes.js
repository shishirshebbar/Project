import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('❌ Form parse error:', err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const uploadedFile = files.file?.[0];
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const uploadResult = await cloudinary.uploader.upload(uploadedFile.filepath);
      return res.status(200).json({ url: uploadResult.secure_url });
    } catch (uploadErr) {
      console.error('❌ Cloudinary upload error:', uploadErr);
      return res.status(500).json({ error: 'Cloudinary upload failed' });
    }
  });
}
