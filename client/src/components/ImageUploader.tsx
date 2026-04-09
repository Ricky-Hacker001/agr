import { useState } from 'react';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
}

const ImageUploader = ({ onUploadSuccess }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // 1. Package the file into a form payload
    const formData = new FormData();
    formData.append('image', file); // 'image' matches the upload.single('image') in your backend

    try {
      // 2. Send the file to your centralized backend route
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // 3. Give the new Cloudinary URL back to the page that asked for it!
        onUploadSuccess(data.imageUrl);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Could not connect to the server.');
    } finally {
      setUploading(false); // Turn off the loading spinner
    }
  };

  return (
    <div className="w-full">
      <label className={`cursor-pointer flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold border transition whitespace-nowrap ${
        uploading 
          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
      }`}>
        <span>{uploading ? '⏳ Uploading to Cloud...' : '☁️ Upload to Cloudinary'}</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default ImageUploader;